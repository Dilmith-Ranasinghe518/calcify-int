/**
 * Canonical site origin, used by metadataBase, the sitemap, robots.txt and
 * the Organization JSON-LD so they can never drift apart.
 *
 * Override per environment with NEXT_PUBLIC_SITE_URL (e.g. a preview domain).
 * NOTE: confirm the production domain before launch — this is the value that
 * ends up in search results and social cards.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://calcify-international.com"
).replace(/\/$/, "");
