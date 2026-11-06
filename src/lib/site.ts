import type { Metadata } from "next";
import { brand } from "./content";

/**
 * Canonical site origin, used by metadataBase, the sitemap, robots.txt and
 * the Organization JSON-LD so they can never drift apart.
 *
 * Override per environment with NEXT_PUBLIC_SITE_URL (e.g. a preview domain).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.calcifyint.com"
).replace(/\/$/, "");

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = new URL(path, SITE_URL).href;
  const image = {
    url: `${SITE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: "Calcify International — Engineering software, AI and cloud at scale",
  };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title,
      description,
      siteName: brand.name,
      type: "website",
      locale: "en_US",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
