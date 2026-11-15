import { jsonLd } from "@/lib/site";

/** Structured data for search engines. Rendered on the server; no client JS. */
export default function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(data)} />;
}
