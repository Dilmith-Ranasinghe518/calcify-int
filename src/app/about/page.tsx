import AboutPage from "@/components/pages/AboutPage";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, pageMetadata, webPageSchema } from "@/lib/site";

const title = "About Our Software Engineering Studio | Calcify International";
const description =
  "Meet Calcify International, a Colombo software studio that brings product strategy, design and engineering together for businesses in Sri Lanka and worldwide.";

export const metadata = pageMetadata("/about", title, description);

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    webPageSchema("AboutPage", "/about", title, description),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ],
};

export default function About() {
  return (
    <>
      <JsonLd data={schema} />
      <AboutPage />
    </>
  );
}
