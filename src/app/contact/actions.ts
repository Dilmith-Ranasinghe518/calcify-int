"use server";

import { headers } from "next/headers";
import { emailConfigured, sendEnquiryEmails } from "@/lib/email/send";
import { parseEnquiry, validateEnquiry, type EnquiryState } from "@/lib/enquiry";
import { allow } from "@/lib/rateLimit";

const TEN_MINUTES = 10 * 60 * 1000;
const ONE_HOUR = 60 * 60 * 1000;

/**
 * Receives the contact form. This is a public endpoint that sends mail to an
 * address the visitor types in, so it is guarded against being used to spam
 * other people: a honeypot field, limits per visitor and per address, and an
 * auto-reply that never repeats the visitor's own words (see templates.ts).
 */
export async function sendEnquiry(_previous: EnquiryState, data: FormData): Promise<EnquiryState> {
  const enquiry = parseEnquiry(data);

  // Honeypot: a field people never see. Bots that fill it get a quiet "success".
  if (String(data.get("website") ?? "") !== "") {
    return { status: "sent", email: enquiry.email, confirmed: false };
  }

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!allow(`ip:${ip}`, 5, TEN_MINUTES) || !allow(`to:${enquiry.email.toLowerCase()}`, 3, ONE_HOUR)) {
    return { status: "limited" };
  }

  if (!emailConfigured()) {
    console.error("[enquiry] email is not configured: set SMTP_PASS and ENQUIRY_NOTIFY_TO");
    return { status: "failed" };
  }

  try {
    const { confirmed } = await sendEnquiryEmails(enquiry);
    return { status: "sent", email: enquiry.email, confirmed };
  } catch (err) {
    console.error("[enquiry] could not deliver to the team", err);
    return { status: "failed" };
  }
}
