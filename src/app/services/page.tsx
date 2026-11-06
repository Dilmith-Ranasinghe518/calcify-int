import ServicesPage from "@/components/pages/ServicesPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "/services",
  "Software Development Services | Calcify International",
  "Explore custom ERP, web and mobile development, AI, cloud, cybersecurity, data analytics, QA and digital transformation services from Calcify International.",
);

export default function Services() {
  return <ServicesPage />;
}
