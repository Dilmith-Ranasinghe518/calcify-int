import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { services, cta } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Calcify International",
  description:
    "ERP, web, AI, mobile, cloud, cybersecurity, digital transformation, data analytics, and QA services for enterprise clients.",
};

const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Deep dive into your business requirements, technical landscape, and strategic goals.",
  },
  {
    step: "02",
    title: "Architecture",
    description:
      "Design scalable, secure system architecture with detailed technical specifications.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "Agile sprint-based development with continuous integration and quality assurance.",
  },
  {
    step: "04",
    title: "Deployment",
    description:
      "Production deployment with monitoring, maintenance, and ongoing optimization.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Enterprise solutions built to scale"
        intro="From ERP systems to AI-powered platforms, we deliver end-to-end technology solutions for the world's most demanding enterprises."
      >
        <Button href="/contact" variant="primary">
          Start a Project
        </Button>
      </PageHero>

      {/* Practice areas — same surface treatment as the homepage section. */}
      <Section eyebrow="Practice areas" title="Where we go deep">
        <ul className="grid gap-px bg-line/50 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug} className="group">
              <article
                id={service.slug}
                className="h-full bg-panel/55 p-8 backdrop-blur-[10px] transition-colors duration-300 ease-out group-hover:bg-panel"
                style={{ scrollMarginTop: "6rem" }}
              >
                <div className="text-signal transition-colors duration-300 ease-out group-hover:text-pulse">
                  <ServiceIcon slug={service.slug} />
                </div>
                <h2 className="mt-6 font-display text-lg font-semibold tracking-tight text-ink">
                  {service.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.body}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      {/* Process */}
      <Section
        eyebrow="How we work"
        title="A delivery process built to de-risk"
        intro="The same four stages on every engagement, so you always know what happens next."
      >
        <ol className="grid gap-px bg-line/50 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <li key={item.step} className="bg-panel/55 p-8 backdrop-blur-[10px]">
              <p className="font-display text-3xl font-medium tracking-tight text-signal">
                {item.step}
              </p>
              <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Closing CTA — mirrors the homepage so the routes read as one site. */}
      <section className="border-t border-line px-6 py-[var(--section-y)]">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="display text-3xl sm:text-4xl text-ink">{cta.h2}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted">
            {cta.body}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" variant="primary">
              Start a Project
            </Button>
            <Button href={cta.primary.href} variant="secondary">
              {cta.primary.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
