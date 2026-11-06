import ContactPage from "@/components/pages/ContactPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "/contact",
  "Discuss Your Software Project | Calcify International",
  "Contact Calcify International in Colombo to discuss your software project. Share your requirements for an ERP, AI, web, mobile or cloud project with our team.",
);

export default function Contact() {
  return <ContactPage />;
}
