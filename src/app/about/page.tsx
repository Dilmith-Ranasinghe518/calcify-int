import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";

export const metadata: Metadata = {
  title: "About — Calcify International",
  description:
    "Founded in 2015, Calcify International builds enterprise ERP, AI, cloud, and security platforms for clients in more than 50 countries.",
};

const milestones = [
  {
    year: "2015",
    title: "Founded",
    description:
      "Calcify International established with a vision to revolutionize enterprise technology.",
  },
  {
    year: "2017",
    title: "First Fortune 500 Client",
    description:
      "Secured our first major enterprise contract, delivering a custom ERP solution.",
  },
  {
    year: "2019",
    title: "Global Expansion",
    description:
      "Expanded operations to 20+ countries with dedicated engineering teams worldwide.",
  },
  {
    year: "2021",
    title: "AI Division Launch",
    description:
      "Launched a dedicated AI and machine learning division, pioneering intelligent enterprise solutions.",
  },
  {
    year: "2023",
    title: "500+ Projects Milestone",
    description:
      "Surpassed 500 successfully delivered projects for clients across 50+ countries.",
  },
  {
    year: "2025",
    title: "Industry Leadership",
    description:
      "Recognized as a leading enterprise technology solutions provider globally.",
  },
];

const values = [
  {
    title: "Innovation First",
    description:
      "We push boundaries with cutting-edge technology, always staying ahead of industry trends.",
  },
  {
    title: "Uncompromising Quality",
    description:
      "Every line of code and every design decision reflects our commitment to excellence.",
  },
  {
    title: "Client Partnership",
    description:
      "We don't just build software — we become an extension of your team and share your vision.",
  },
  {
    title: "Global Impact",
    description:
      "Our solutions impact millions of users across 50+ countries, driving real-world change.",
  },
];

/**
 * Roles only — the original site listed no real names. Replace with actual
 * people (and photos) before launch rather than shipping initials.
 */
const leadership = [
  { role: "CEO & Founder", focus: "Strategic vision and leadership", key: "CF" },
  { role: "CTO", focus: "Technology and architecture", key: "CT" },
  { role: "VP Engineering", focus: "Engineering excellence", key: "VP" },
  { role: "Head of AI", focus: "AI and machine learning", key: "AI" },
];

const heroStats = [
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Countries" },
  { value: 200, suffix: "+", label: "Engineers" },
  { value: 10, suffix: "+", label: "Years Experience" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Calcify International"
        title="We engineer the future of enterprise"
        intro="Founded in 2015, Calcify International has grown from a small team of engineers into a global enterprise technology practice. We partner with leading brands to build systems that redefine industries and serve millions of users."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="primary">
            Work With Us
          </Button>
          <Button href="/services" variant="secondary">
            Our Services
          </Button>
        </div>
      </PageHero>

      {/* Stats */}
      <section className="border-y border-line px-6">
        <div className="mx-auto w-full max-w-[var(--container-max)]">
          <dl className="grid grid-cols-2 gap-px bg-line/50 lg:grid-cols-4">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-panel/55 px-6 py-10 text-center backdrop-blur-[10px]"
              >
                <dd className="font-mono text-4xl font-medium tracking-tight text-ink">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-3 text-sm text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Vision & Mission */}
      <Section eyebrow="Why we exist" title="Vision and mission">
        <div className="grid gap-px bg-line/50 md:grid-cols-2">
          <article className="bg-panel/55 p-8 backdrop-blur-[10px] sm:p-10">
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
              Our Vision
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              To be the global standard in enterprise technology — the partner
              every ambitious company turns to when they need solutions that
              genuinely transform their business and create lasting value.
            </p>
          </article>
          <article className="bg-panel/55 p-8 backdrop-blur-[10px] sm:p-10">
            <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
              Our Mission
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              To engineer tomorrow&apos;s digital infrastructure by combining
              deep technical expertise with relentless innovation, so
              enterprises can operate faster, smarter, and more securely.
            </p>
          </article>
        </div>
      </Section>

      {/* Values */}
      <Section
        eyebrow="Our core values"
        title="Principles that drive everything"
      >
        <ul className="grid gap-px bg-line/50 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <li key={value.title} className="bg-panel/55 p-8 backdrop-blur-[10px]">
              <p className="font-mono text-sm text-signal">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-ink">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {value.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Timeline */}
      <Section eyebrow="Our journey" title="A decade of delivery">
        <ol className="grid gap-px bg-line/50 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((milestone) => (
            <li
              key={milestone.year}
              className="bg-panel/55 p-8 backdrop-blur-[10px]"
            >
              <p className="font-mono text-2xl font-medium tracking-tight text-signal">
                {milestone.year}
              </p>
              <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-ink">
                {milestone.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {milestone.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Leadership */}
      <Section id="team" eyebrow="Leadership" title="Who you'll work with">
        <ul className="grid gap-px bg-line/50 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((leader) => (
            <li
              key={leader.role}
              className="bg-panel/55 p-8 text-center backdrop-blur-[10px]"
            >
              <span
                aria-hidden="true"
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-card border border-line font-mono text-lg text-signal"
              >
                {leader.key}
              </span>
              <h3 className="mt-6 font-display text-base font-semibold tracking-tight text-ink">
                {leader.role}
              </h3>
              <p className="mt-2 text-sm text-muted">{leader.focus}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
