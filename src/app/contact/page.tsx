import ContactPage from "@/components/pages/ContactPage";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/site";

const title = "Discuss Your Software Project | Calcify International";
const description =
  "Contact Calcify International in Colombo to discuss your software project. Share your requirements for an ERP, AI, web, mobile or cloud project with our team.";

export const metadata = pageMetadata("/contact", title, description);

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema("ContactPage", "/contact", title, description),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  ],
};

export default function Contact() {
  return (
    <>
      <JsonLd data={schema} />
      <ContactPage />
    </>
  );
}
