import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact — Calcify International",
  description: "Tell us what you're trying to change — start a conversation with Calcify International.",
};

export default function Contact() {
  return <ContactPage />;
}
