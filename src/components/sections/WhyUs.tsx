import Section from "@/components/ui/Section";
import { whyUs } from "@/lib/content";

export default function WhyUs() {
  return (
    <Section
      id="why"
      eyebrow="Why Calcify"
      title="Built to be the dependable option"
      intro="Enterprise buyers optimize for risk, not novelty. These are the reasons engagements land and stay."
    >
      <ul className="grid gap-px bg-line/50 sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.map((item) => (
          <li key={item.title} className="bg-panel/55 backdrop-blur-[10px] p-8">
            <p className="font-mono text-4xl font-medium tracking-tight text-signal">
              {item.metric}
            </p>
            <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-ink">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
