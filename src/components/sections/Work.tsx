import Section from "@/components/ui/Section";
import CaseMedia from "@/components/ui/CaseMedia";
import { work } from "@/lib/content";

/**
 * Asymmetric layout — one flagship case, then the remaining three.
 * Media-forward: each card leads with its visual.
 */
export default function Work() {
  const [flagship, ...rest] = work;

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Systems running in production, at scale"
      intro="A sample of platforms we've delivered for enterprise clients across finance, healthcare, public infrastructure, and retail."
    >
      {/* Flagship */}
      <article className="group grid gap-10 lg:grid-cols-2 lg:items-center">
        <CaseMedia
          src={flagship.media}
          alt={flagship.mediaAlt}
          label={flagship.title}
          priority
          className="aspect-video w-full"
        />
        <div>
          <p className="eyebrow flex items-center gap-3 text-signal">
            <span className="inline-block h-px w-6 bg-signal" />
            {flagship.category}
          </p>
          <h3 className="display mt-5 text-3xl text-ink sm:text-4xl">
            {flagship.title}
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
            {flagship.body}
          </p>
          <p className="mt-8 flex items-baseline gap-3 border-t border-line pt-6">
            <span className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {flagship.metric}
            </span>
            <span className="eyebrow">{flagship.metricLabel}</span>
          </p>
        </div>
      </article>

      {/* Supporting three */}
      <div className="mt-20 grid gap-10 lg:grid-cols-3">
        {rest.map((item) => (
          <article key={item.title} className="group">
            <CaseMedia
              src={item.media}
              alt={item.mediaAlt}
              label={item.title}
              className="aspect-video w-full"
            />
            <p className="eyebrow mt-6 text-signal">{item.category}</p>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
            <p className="mt-5 flex items-baseline gap-2.5 border-t border-line pt-4">
              <span className="text-2xl font-bold tracking-tight text-ink">
                {item.metric}
              </span>
              <span className="eyebrow">{item.metricLabel}</span>
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
