import AboutPage from "@/components/pages/AboutPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "/about",
  "About Our Software Engineering Studio | Calcify International",
  "Meet Calcify International, a Colombo software studio that brings product strategy, design and engineering together for businesses in Sri Lanka and worldwide.",
);

export default function About() {
  return <AboutPage />;
}
