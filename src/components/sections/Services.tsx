import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
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
      <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal
            as="li"
            key={service.slug}
            delay={(i % 3) * 90}
            className="group border-b border-r border-line"
          >
            <article
              id={service.slug}
              className="relative h-full overflow-hidden p-8 sm:p-10"
              style={{ scrollMarginTop: "6rem" }}
            >
              {/* Red wash sweeps in from the bottom on hover. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-y-full bg-gradient-to-t from-signal/12 to-transparent transition-transform duration-500 ease-out group-hover:translate-y-0"
              />
              {/* Top rule fills red, left to right. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out group-hover:scale-x-100"
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-ink transition-colors duration-300 group-hover:text-signal">
                    <ServiceIcon slug={service.slug} />
                  </span>
                  <span className="text-xs font-medium tracking-[0.1em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-8 text-lg font-bold tracking-tight text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.body}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
