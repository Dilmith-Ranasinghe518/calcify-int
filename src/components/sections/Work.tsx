import Section from "@/components/ui/Section";
import { work } from "@/lib/content";

/**
 * Asymmetric layout — one flagship card (Global Banking Platform) spanning
 * full width, with the remaining three below. See Section 4.
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
      <div className="grid gap-px bg-line/50">
        {/* Flagship */}
        <article className="bg-panel/55 backdrop-blur-[10px] p-8 sm:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-signal">{flagship.category}</p>
              <h3 className="display mt-4 text-2xl sm:text-3xl lg:text-4xl text-ink">
                {flagship.title}
              </h3>
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted">
                {flagship.body}
              </p>
            </div>
            <div className="shrink-0 lg:text-right">
              <p className="font-mono text-4xl font-medium tracking-tight text-pulse sm:text-5xl">
                {flagship.metric}
              </p>
              <p className="eyebrow mt-2">{flagship.metricLabel}</p>
            </div>
          </div>
        </article>

        {/* Supporting three */}
        <div className="grid gap-px bg-line/50 lg:grid-cols-3">
          {rest.map((item) => (
            <article key={item.title} className="bg-panel/55 backdrop-blur-[10px] p-8">
              <p className="eyebrow text-signal">{item.category}</p>
              <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
              <p className="mt-6 border-t border-line pt-5">
                <span className="font-mono text-2xl font-medium tracking-tight text-pulse">
                  {item.metric}
                </span>{" "}
                <span className="eyebrow">{item.metricLabel}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
