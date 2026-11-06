import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/services", "/about", "/contact", ...services.map(({ path }) => path)]
    .map((path) => ({ url: `${SITE_URL}${path}` }));
}
