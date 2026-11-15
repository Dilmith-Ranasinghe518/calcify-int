import HomeExperience from "@/components/HomeExperience";
import JsonLd from "@/components/JsonLd";
import { pageMetadata, SITE_DESCRIPTION, webPageSchema } from "@/lib/site";

const title = "Software Development Company in Sri Lanka | Calcify International";

export const metadata = pageMetadata("/", title, SITE_DESCRIPTION);

const schema = {
  "@context": "https://schema.org",
  ...webPageSchema("WebPage", "/", title, SITE_DESCRIPTION),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={schema} />
      <HomeExperience />
    </>
  );
}
