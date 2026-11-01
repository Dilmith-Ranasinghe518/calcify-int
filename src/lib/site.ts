/**
 * Canonical site origin, used by metadataBase, the sitemap, robots.txt and
 * the Organization JSON-LD so they can never drift apart.
 *
 * Override per environment with NEXT_PUBLIC_SITE_URL (e.g. a preview domain).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.calcifyint.com"
).replace(/\/$/, "");
