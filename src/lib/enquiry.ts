import { services } from "@/lib/content";

/**
 * The enquiry form's shape, shared by the page (for its choices) and the
 * Server Action. Server Actions are public endpoints, so the action validates
 * everything again here rather than trusting the browser.
 */
export const INTERESTS = services.map((s) => s.title.replace(" Development", "").replace(" Services", ""));
export const BUDGETS = ["Under $10k", "$10k – $50k", "$50k +", "Not sure yet"];

const LIMITS = { name: 120, email: 254, company: 160, message: 4000 };
// Deliberately loose: real addresses vary, and the mail server has the last word.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Enquiry = {
  name: string;
  email: string;
  company: string;
  message: string;
  interests: string[];
  budget: string;
};

export type EnquiryField = "name" | "email" | "message";

export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<EnquiryField, string>> }
  | { status: "sent"; email: string; confirmed: boolean }
  /** Too many attempts from this visitor or for this address. */
  | { status: "limited" }
  /** Sending failed or isn't set up; the page offers direct contact details. */
  | { status: "failed" };

const text = (data: FormData, key: string, max: number) => String(data.get(key) ?? "").trim().slice(0, max);

export function parseEnquiry(data: FormData): Enquiry {
  return {
    // Single-line fields: no line breaks can reach a mail header.
    name: text(data, "name", LIMITS.name).replace(/\s+/g, " "),
    email: text(data, "email", LIMITS.email).replace(/\s+/g, ""),
    company: text(data, "company", LIMITS.company).replace(/\s+/g, " "),
    message: text(data, "message", LIMITS.message),
    // Only the choices the form offers, so nothing free-form slips in through these.
    interests: data.getAll("interests").map(String).filter((v) => INTERESTS.includes(v)),
    budget: BUDGETS.find((b) => b === data.get("budget")) ?? "",
  };
}

export function validateEnquiry(e: Enquiry) {
  const errors: Partial<Record<EnquiryField, string>> = {};
  if (e.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(e.email)) errors.email = "Please enter a valid email address.";
  if (e.message.length < 10) errors.message = "Please add a little more detail.";
  return errors;
}
