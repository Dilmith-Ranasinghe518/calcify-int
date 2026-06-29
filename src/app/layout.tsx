import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calcify International | Enterprise Technology Solutions",
  description:
    "Calcify International delivers world-class enterprise technology solutions — ERP systems, AI development, web & mobile applications, cloud architecture, and cybersecurity for global brands.",
  keywords: [
    "Calcify International",
    "Enterprise Software",
    "ERP Development",
    "AI Development",
    "Web Development",
    "Mobile App Development",
    "Cloud Solutions",
    "Cybersecurity",
    "Digital Transformation",
  ],
  openGraph: {
    title: "Calcify International | Engineering Tomorrow's Digital Infrastructure",
    description:
      "We build transformative digital solutions for the world's most ambitious enterprises.",
    type: "website",
    locale: "en_US",
    siteName: "Calcify International",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcify International",
    description: "Enterprise Technology Solutions for Global Brands",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-deep)] text-white font-[family-name:var(--font-inter)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
