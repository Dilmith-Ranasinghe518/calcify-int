import ServicesPage from "@/components/pages/ServicesPage";
import JsonLd from "@/components/JsonLd";
import { services } from "@/lib/content";
import { breadcrumbSchema, pageMetadata, SITE_URL, webPageSchema } from "@/lib/site";

const title = "Software Development Services | Calcify International";
const description =
  "Explore custom ERP, web and mobile development, AI, cloud, cybersecurity, data analytics, QA and digital transformation services from Calcify International.";

export const metadata = pageMetadata("/services", title, description);

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...webPageSchema("CollectionPage", "/services", title, description),
      mainEntity: {
        "@type": "ItemList",
        itemListElement: services.map(({ path, title: name }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name,
          url: `${SITE_URL}${path}`,
        })),
      },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
  ],
};

export default function Services() {
  return (
    <>
      <JsonLd data={schema} />
      <ServicesPage />
    </>
  );
}
