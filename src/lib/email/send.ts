import "server-only";
import nodemailer from "nodemailer";
import { brand } from "@/lib/content";
import type { Enquiry } from "@/lib/enquiry";
import { autoReply, teamNotification } from "./templates";

/**
 * Sending goes through the hello@ mailbox over SMTP. The password and the
 * team's addresses live in environment variables, never in this repository:
 *
 *   SMTP_PASS            the hello@ mailbox password
 *   ENQUIRY_NOTIFY_TO    comma-separated addresses to notify
 *
 * Host, port and user default to Spacemail and hello@, and can be overridden
 * with SMTP_HOST, SMTP_PORT and SMTP_USER.
 */
const recipients = () =>
  (process.env.ENQUIRY_NOTIFY_TO ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

export function emailConfigured() {
  return Boolean(process.env.SMTP_PASS) && recipients().length > 0;
}

function transport() {
  const port = Number(process.env.SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "mail.spacemail.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER ?? brand.email, pass: process.env.SMTP_PASS },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

/**
 * The team is told first: that is the send that must not be lost, so a failure
 * there throws and the visitor is shown other ways to reach us. A failed
 * auto-reply only means no confirmation email, and is logged.
 */
export async function sendEnquiryEmails(enquiry: Enquiry) {
  const mailer = transport();
  const from = { name: brand.name, address: process.env.SMTP_USER ?? brand.email };

  try {
    await mailer.sendMail({ from, to: recipients(), replyTo: enquiry.email, ...teamNotification(enquiry) });

    try {
      await mailer.sendMail({
        from,
        to: enquiry.email,
        replyTo: brand.email,
        // Tells out-of-office robots not to answer the auto-reply.
        headers: { "Auto-Submitted": "auto-replied", "X-Auto-Response-Suppress": "All" },
        ...autoReply(enquiry),
      });
      return { confirmed: true };
    } catch (err) {
      console.error("[enquiry] auto-reply failed", err);
      return { confirmed: false };
    }
  } finally {
    mailer.close();
  }
}
