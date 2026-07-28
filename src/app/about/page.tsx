import type { Metadata } from "next";
import StudioSubpage from "@/components/StudioSubpage";

export const metadata: Metadata = {
  title: "About — Calcify International",
  description: "A software studio for ambitious companies.",
};

export default function AboutPage() {
  return <StudioSubpage page="about" />;
}
