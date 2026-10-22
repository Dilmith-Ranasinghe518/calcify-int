import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Services — Calcify International",
  description: "ERP, web, AI, mobile, cloud, security, data, QA and digital transformation — designed and built by one senior team.",
};

export default function Services() {
  return <ServicesPage />;
}
