import type { Metadata } from "next";
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
import { SITE_URL } from "@/lib/site";

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
  title: "Calcify International",
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
      <body className="min-h-full flex flex-col bg-void text-ink font-sans">
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
      </body>
    </html>
  );
}
