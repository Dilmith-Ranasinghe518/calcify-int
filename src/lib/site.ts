import type { Metadata } from "next";
import { brand, services } from "./content";

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
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SITE_DESCRIPTION =
  "Calcify International is a software development company in Colombo, Sri Lanka, building custom ERP systems, AI solutions, web and mobile apps, and cloud platforms.";

/**
 * GA4 measurement ID ("Calcify Int" web stream). It is public by design: it
 * ships in every page's HTML. Override with NEXT_PUBLIC_GA_ID, or set it to
 * an empty string to switch analytics off. Development builds never load GA,
 * so local work doesn't pollute the reports.
 */
export const GA_MEASUREMENT_ID =
  process.env.NODE_ENV === "production"
    ? (process.env.NEXT_PUBLIC_GA_ID ?? "G-LKZBMLHQBM")
    : undefined;

/** Serialise JSON-LD for a <script> tag without letting "</script>" break out. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

/** Organization + WebSite, rendered once in the root layout for every page. */
export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: brand.name,
      alternateName: brand.short,
      url: `${SITE_URL}/`,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon`, width: 128, height: 128 },
      image: `${SITE_URL}/opengraph-image`,
      email: brand.email,
      telephone: brand.phone,
      description: SITE_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Colombo",
        addressCountry: "LK",
      },
      areaServed: "Worldwide",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: brand.email,
        telephone: brand.phone,
        url: `${SITE_URL}/contact`,
        availableLanguage: ["English"],
      },
      knowsAbout: services.map(({ title }) => title),
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: brand.name,
      alternateName: brand.short,
      inLanguage: "en",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: new URL(path, SITE_URL).href,
    })),
  };
}

/** WebPage-type node (WebPage, AboutPage, ContactPage, CollectionPage…) tied to the site. */
export function webPageSchema(type: string, path: string, name: string, description: string) {
  const url = new URL(path, SITE_URL).href;
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
  };
}

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
