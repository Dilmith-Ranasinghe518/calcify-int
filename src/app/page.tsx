import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import WhyUs from "@/components/sections/WhyUs";
import Testimonial from "@/components/sections/Testimonial";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Stats />
      <Services />
      <Work />
      <WhyUs />
      <Testimonial />
      <CTA />
    </>
  );
}
