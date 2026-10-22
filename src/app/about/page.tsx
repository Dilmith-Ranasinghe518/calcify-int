import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About — Calcify International",
  description: "A software studio for ambitious companies: strategy, design and engineering under one roof.",
};

export default function About() {
  return <AboutPage />;
}
