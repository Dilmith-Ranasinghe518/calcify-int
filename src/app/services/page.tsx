import type { Metadata } from "next";
import StudioSubpage from "@/components/StudioSubpage";

export const metadata: Metadata = {
  title: "Services — Calcify International",
  description: "Strategy, design, and engineering for ambitious businesses.",
};

export default function ServicesPage() {
  return <StudioSubpage page="services" />;
}
