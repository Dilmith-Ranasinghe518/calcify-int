import type { Metadata } from "next";
import StudioSubpage from "@/components/StudioSubpage";

export const metadata: Metadata = {
  title: "Contact — Calcify International",
  description: "Start a conversation with Calcify International.",
};

export default function ContactPage() {
  return <StudioSubpage page="contact" />;
}
