import Hero from "@/components/home/Hero";
import VelocityMarquee from "@/components/home/VelocityMarquee";
import Manifesto from "@/components/home/Manifesto";
import BuildSequence from "@/components/home/build/BuildSequence";
import Capabilities from "@/components/home/Capabilities";
import WorkRail from "@/components/home/WorkRail";
import Process from "@/components/home/Process";
import ClosingCta from "@/components/home/ClosingCta";

/**
 * The homepage as one scroll story:
 * hero → proof → who we are → how we build (pinned) → capabilities →
 * selected work (horizontal) → process → contact.
 */
export default function HomeExperience() {
  return (
    <div className="studio-home">
      <Hero />
      <VelocityMarquee />
      <Manifesto />
      <BuildSequence />
      <Capabilities />
      <WorkRail />
      <Process />
      <ClosingCta />
    </div>
  );
}
