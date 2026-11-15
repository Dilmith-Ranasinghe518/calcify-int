import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Instrument_Serif, JetBrains_Mono, Onest } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import Preloader from "@/components/ui/Preloader";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Cursor from "@/components/motion/Cursor";
import Lattice from "@/components/Lattice";
import JsonLd from "@/components/JsonLd";
import CookieBanner from "@/components/ui/CookieBanner";
import { CONSENT_DEFAULT_SCRIPT } from "@/lib/consent";
import { brand } from "@/lib/content";
import { GA_MEASUREMENT_ID, SITE_DESCRIPTION, SITE_URL, siteSchema } from "@/lib/site";

// Three voices, all OFL via Google Fonts:
// Onest carries display and body; Instrument Serif italic is the accent
// (the emphasised word in a headline); JetBrains Mono is the system voice —
// labels, data, code and the terminal.
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: brand.name,
  description: SITE_DESCRIPTION,
  applicationName: brand.name,
  authors: [{ name: brand.name, url: SITE_URL }],
  creator: brand.name,
  publisher: brand.name,
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Google Search Console / Bing Webmaster Tools ownership checks (HTML tag method).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#08080A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-scroll-behavior: Next.js 16 no longer overrides `scroll-behavior`
    // during navigation. globals.css sets `smooth`, so without this, route
    // changes would smooth-scroll instead of jumping. See Next 16 upgrade guide.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${onest.variable} ${serif.variable} ${mono.variable} h-full`}
    >
      <head>
        {/* Consent Mode default — must run before gtag.js (see lib/consent.ts). */}
        {GA_MEASUREMENT_ID && <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />}
      </head>
      <body className="min-h-full flex flex-col bg-void text-ink font-sans">
        <JsonLd data={siteSchema} />
        {/* Overlay, not a gate — the page renders beneath it regardless. */}
        <Preloader />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        {/* The living network behind every page — persists across navigation. */}
        <Lattice />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main" className="relative z-10 flex-1">
          {children}
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
        {GA_MEASUREMENT_ID && <CookieBanner />}
      </body>
      {/* GA4 loads after hydration; page views on client navigation are
          tracked by GA4 enhanced measurement (browser history events). */}
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </html>
  );
}
