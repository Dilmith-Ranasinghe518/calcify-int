import HeroSection from "@/components/HeroSection";
import TrustedBrands from "@/components/TrustedBrands";
import StatsBar from "@/components/StatsBar";
import ServicesSection from "@/components/ServicesSection";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBrands />
      <StatsBar />
      <ServicesSection />
      <ProjectsShowcase />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </>
  );
}
