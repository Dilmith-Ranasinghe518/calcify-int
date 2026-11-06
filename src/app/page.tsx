import HomeExperience from "@/components/HomeExperience";
import { brand } from "@/lib/content";
import { ORGANIZATION_ID, pageMetadata, SITE_URL } from "@/lib/site";

const description =
  "Calcify International is a software development company in Colombo, Sri Lanka, building custom ERP systems, AI solutions, web and mobile apps, and cloud platforms.";

export const metadata = pageMetadata(
  "/",
  "Software Development Company in Sri Lanka | Calcify International",
  description,
);

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: brand.name,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon`,
      email: brand.email,
      telephone: brand.phone,
      description,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: brand.name,
      alternateName: brand.short,
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema).replace(/</g, "\\u003c") }}
      />
      <HomeExperience />
    </>
  );
}
