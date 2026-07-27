import Section from "@/components/ui/Section";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <Section
      id="services"
      eyebrow="What we do"
      title="Capabilities built for enterprise scale"
      intro="Nine practice areas, one delivery standard. Every engagement is staffed with senior engineers who have shipped systems at this scale before."
    >
      <ul className="grid gap-px bg-line/50 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug} className="group">
            <article
              id={service.slug}
              className="h-full bg-panel/55 backdrop-blur-[10px] p-8 transition-colors duration-300 ease-out group-hover:bg-panel"
              style={{ scrollMarginTop: "6rem" }}
            >
              <div className="text-signal transition-colors duration-300 ease-out group-hover:text-pulse">
                <ServiceIcon slug={service.slug} />
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-ink">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {service.body}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
