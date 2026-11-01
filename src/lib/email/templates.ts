import { brand } from "@/lib/content";
import type { Enquiry } from "@/lib/enquiry";
import { SITE_URL } from "@/lib/site";

/**
 * Enquiry emails in the site's design: graphite, warm white, one chartreuse
 * accent, and the wordmark closed by its square.
 *
 * Mail clients ignore most modern CSS, so these are tables with inline styles.
 * The site's fonts load where a client allows it (Apple Mail, Thunderbird) and
 * fall back to system fonts elsewhere (Gmail, Outlook). Every value a visitor
 * typed goes through `esc`.
 */
const C = {
  bg: "#08080a",
  surface: "#0f0f12",
  line: "#222227",
  ink: "#f2f1ec",
  muted: "#9a9aa2",
  subtle: "#66666e",
  accent: "#d4ff3f",
};
const SANS = "Onest,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const SERIF = "'Instrument Serif',Georgia,'Times New Roman',serif";
const MONO = "'JetBrains Mono',SFMono-Regular,Menlo,Consolas,monospace";
const FONTS =
  "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@500&family=Onest:wght@400;500;600&display=swap";

const SITE_NAME = new URL(SITE_URL).host.replace(/^www\./, "");
const tel = `tel:${brand.phone.replace(/\s/g, "")}`;

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** The visitor's first name, if it looks like one; otherwise we simply don't use it. */
function firstName(name: string) {
  const first = name.split(" ")[0];
  return /^\p{L}[\p{L}'’-]{0,29}$/u.test(first) ? first : "";
}

const link = (href: string, label: string) =>
  `<a href="${esc(href)}" style="color:${C.ink};text-decoration:underline;text-underline-offset:3px">${label}</a>`;

const topline = (label: string) => `
  <p style="margin:0 0 22px;font:500 11px/1.2 ${MONO};letter-spacing:1.4px;text-transform:uppercase;color:${C.muted}">
    <span style="display:inline-block;width:7px;height:7px;margin-right:9px;background:${C.accent}"></span>${label}
  </p>`;

const heading = (lead: string, accent: string) => `
  <h1 style="margin:0 0 20px;font:500 38px/1.05 ${SANS};letter-spacing:-1.6px;color:${C.ink}">
    ${lead}<br /><em style="font:italic 400 42px/1.05 ${SERIF};letter-spacing:-.5px;color:${C.accent}">${accent}</em>
  </h1>`;

const paragraph = (html: string) =>
  `<p style="margin:0 0 18px;font:400 16px/1.6 ${SANS};color:${C.muted}">${html}</p>`;

const label = (text: string) =>
  `<p style="margin:30px 0 12px;font:500 11px/1.2 ${MONO};letter-spacing:1.4px;text-transform:uppercase;color:${C.subtle}">${text}</p>`;

const button = (text: string, href: string) => `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:30px 0 6px">
    <tr><td bgcolor="${C.accent}" style="border-radius:999px;background:${C.accent}">
      <a href="${esc(href)}" style="display:inline-block;padding:15px 26px;font:600 15px/1 ${SANS};color:${C.bg};text-decoration:none">${text}</a>
    </td></tr>
  </table>`;

/** Label and value rows, separated by hairlines. */
const facts = (rows: [string, string][]) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    ${rows
      .map(
        ([name, value]) => `
    <tr>
      <td width="120" valign="top" style="padding:11px 12px 11px 0;border-top:1px solid ${C.line};font:500 11px/1.6 ${MONO};letter-spacing:.8px;text-transform:uppercase;color:${C.subtle}">${name}</td>
      <td valign="top" style="padding:11px 0;border-top:1px solid ${C.line};font:400 15px/1.5 ${SANS};color:${C.ink}">${value}</td>
    </tr>`,
      )
      .join("")}
  </table>`;

function layout({ preheader, body, footnote }: { preheader: string; body: string; footnote: string }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <link href="${FONTS}" rel="stylesheet" />
  <style>
    :root { color-scheme: dark; }
    @media (max-width: 520px) {
      .card { padding: 28px 22px !important; }
    }
  </style>
</head>
<body bgcolor="${C.bg}" style="margin:0;padding:0;background:${C.bg}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${C.bg}" style="background:${C.bg}">
    <tr><td align="center" style="padding:36px 14px 44px">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px">
        <tr><td style="padding:0 6px 26px">
          <a href="${SITE_URL}" style="text-decoration:none">
            <span style="font:600 27px/1 ${SANS};letter-spacing:-1.7px;color:${C.ink}">calcify</span><span style="display:inline-block;width:6px;height:6px;margin-left:2px;background:${C.accent}"></span>
          </a>
          <div style="margin-top:6px;font:500 9px/1 ${MONO};letter-spacing:3px;text-transform:uppercase;color:${C.subtle}">International</div>
        </td></tr>
        <tr><td class="card" bgcolor="${C.surface}" style="padding:38px 34px;background:${C.surface};border:1px solid ${C.line};border-radius:20px">
          ${body}
        </td></tr>
        <tr><td style="padding:26px 6px 0;font:400 13px/1.7 ${SANS};color:${C.subtle}">
          <a href="mailto:${brand.email}" style="color:${C.muted};text-decoration:none">${brand.email}</a> &nbsp;·&nbsp;
          <a href="${tel}" style="color:${C.muted};text-decoration:none">${brand.phone}</a> &nbsp;·&nbsp;
          <a href="${SITE_URL}" style="color:${C.muted};text-decoration:none">${SITE_NAME}</a>
          <br />${footnote}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const NEXT_STEPS = [
  ["We read your message", "Someone on the team goes through it properly, with your goals in mind."],
  ["We set up a short call", "We ask the awkward questions early, so the plan is real."],
  ["You get a plan and a quote", "Scope, timeline, team and price — in writing, no obligation."],
];

/**
 * The confirmation sent to the visitor.
 *
 * It goes to whatever address was typed into a public form, so it must never
 * repeat free text: otherwise anyone could use it to send their own words to a
 * stranger from our domain. Only the first name (if it looks like one) and the
 * form's fixed choices appear here. The full message goes to the team.
 */
export function autoReply(enquiry: Enquiry) {
  const first = firstName(enquiry.name);
  const chosen: [string, string][] = [];
  if (enquiry.interests.length > 0) chosen.push(["Interested in", enquiry.interests.map(esc).join(", ")]);
  if (enquiry.budget) chosen.push(["Budget", esc(enquiry.budget)]);

  const steps = NEXT_STEPS.map(
    ([title, body], i) => `
    <tr>
      <td width="38" valign="top" style="padding:13px 0;border-top:1px solid ${C.line};font:500 12px/1.7 ${MONO};color:${C.accent}">0${i + 1}</td>
      <td valign="top" style="padding:13px 0;border-top:1px solid ${C.line}">
        <div style="font:500 16px/1.4 ${SANS};letter-spacing:-.2px;color:${C.ink}">${title}</div>
        <div style="margin-top:3px;font:400 14px/1.5 ${SANS};color:${C.muted}">${body}</div>
      </td>
    </tr>`,
  ).join("");

  const body = `
    ${topline("Enquiry received")}
    ${heading(first ? `Thanks, ${esc(first)}.` : "Thank you.", "We’ve got your message.")}
    ${paragraph("Your enquiry has reached the team at Calcify. One of us will read it properly and come back to you personally, with a point of view and a practical next step.")}
    ${chosen.length > 0 ? `${label("What you told us")}${facts(chosen)}` : ""}
    ${label("What happens next")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${steps}</table>
    ${button("See how we work ↗", `${SITE_URL}/about#how`)}
    <p style="margin:22px 0 0;font:400 14px/1.6 ${SANS};color:${C.muted}">
      Need us sooner? Just reply to this email, call ${link(tel, brand.phone)} or ${link(brand.whatsapp, "message us on WhatsApp")}.
    </p>`;

  return {
    subject: "We’ve got your enquiry — Calcify International",
    html: layout({
      preheader: "Thanks for reaching out. Here’s what happens next.",
      body,
      footnote: "You’re receiving this because this address was used on our contact form. If that wasn’t you, you can safely ignore this email.",
    }),
    text: [
      first ? `Thanks, ${first}.` : "Thank you.",
      "",
      "We’ve got your message. Your enquiry has reached the team at Calcify. One of us will read it properly and come back to you personally, with a point of view and a practical next step.",
      "",
      ...(enquiry.interests.length > 0 ? [`Interested in: ${enquiry.interests.join(", ")}`] : []),
      ...(enquiry.budget ? [`Budget: ${enquiry.budget}`] : []),
      ...(chosen.length > 0 ? [""] : []),
      "What happens next",
      ...NEXT_STEPS.map(([title, detail], i) => `${i + 1}. ${title}: ${detail}`),
      "",
      `Need us sooner? Reply to this email, call ${brand.phone} or message us on WhatsApp: ${brand.whatsapp}`,
      "",
      `Calcify International · ${SITE_URL}`,
      "You’re receiving this because this address was used on our contact form. If that wasn’t you, you can safely ignore this email.",
    ].join("\n"),
  };
}

/** The alert sent to the team, with everything the visitor entered. Replying goes straight to them. */
export function teamNotification(enquiry: Enquiry) {
  const { name, email, company, message, interests, budget } = enquiry;
  const received = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Colombo",
  }).format(new Date());

  const rows: [string, string][] = [
    ["Name", esc(name)],
    ["Email", `<a href="mailto:${esc(email)}" style="color:${C.accent};text-decoration:none">${esc(email)}</a>`],
  ];
  if (company) rows.push(["Company", esc(company)]);
  if (interests.length > 0) rows.push(["Interested in", interests.map(esc).join(", ")]);
  if (budget) rows.push(["Budget", esc(budget)]);
  rows.push(["Received", `${received} · Colombo`]);

  const replySubject = encodeURIComponent("Re: your enquiry to Calcify");
  const body = `
    ${topline("New enquiry")}
    ${heading(esc(name), "wants to talk.")}
    ${facts(rows)}
    ${label("Their message")}
    <div style="padding:16px 18px;background:${C.bg};border-left:2px solid ${C.accent};border-radius:0 10px 10px 0;font:400 15px/1.6 ${SANS};color:${C.ink};white-space:pre-wrap">${esc(message)}</div>
    ${button(`Reply to ${esc(firstName(name) || name)} ↗`, `mailto:${email}?subject=${replySubject}`)}`;

  return {
    subject: `New enquiry: ${name}${company ? `, ${company}` : ""}`,
    html: layout({
      preheader: `${esc(name)} sent an enquiry through the website.`,
      body,
      footnote: `Sent from the contact form on ${SITE_NAME}. Replying to this email goes straight to ${esc(name)}.`,
    }),
    text: [
      "New enquiry from the website",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      ...(company ? [`Company: ${company}`] : []),
      ...(interests.length > 0 ? [`Interested in: ${interests.join(", ")}`] : []),
      ...(budget ? [`Budget: ${budget}`] : []),
      `Received: ${received} (Colombo)`,
      "",
      "Message:",
      message,
    ].join("\n"),
  };
}
