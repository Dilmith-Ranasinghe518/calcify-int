import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

type Entry = { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" };

/**
 * Served at /sitemap.xml and referenced from robots.txt. Submit that URL in
 * Google Search Console (Sitemaps) and Bing Webmaster Tools.
 *
 * `lastModified` is left out on purpose: stamping every page with the build
 * time would tell Google that everything changed on each deploy, which makes
 * it ignore the field.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    ...services.map(({ path }) => ({ path, priority: 0.8, changeFrequency: "monthly" as const })),
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  ];

  return entries.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, SITE_URL).href,
    changeFrequency,
    priority,
  }));
}
