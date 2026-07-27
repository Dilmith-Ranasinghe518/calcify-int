import Button from "@/components/ui/Button";
import WordCycler from "@/components/ui/WordCycler";
import { hero } from "@/lib/content";

/** Practice areas cycled behind the headline. */
const WORDS = ["ERP.", "AI.", "CLOUD.", "SECURITY.", "DATA."];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pt-36 pb-16">
      {/* Restrained red wash; the crystal canvas sits behind this. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-signal-glow"
      />

      <div className="relative mx-auto flex w-full max-w-[var(--container-max)] flex-1 flex-col justify-center">
        <p className="eyebrow mb-8 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-signal" />
          {hero.eyebrow}
        </p>

        {/* Ghost word cycler — decorative, sits above the real headline. */}
        <WordCycler words={WORDS} />

        {/* Deliberately the smaller of the two: the ghost word carries the
            scale, this carries the meaning. Both oversized would collide. */}
        <h1 className="display-lg mt-4 max-w-[15ch] text-ink">{hero.h1}</h1>
      </div>

      {/* Baseline row: social proof left, proposition and actions right. */}
      <div className="relative mx-auto grid w-full max-w-[var(--container-max)] gap-10 lg:grid-cols-2 lg:items-end">
        <div>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-signal"
                role="presentation"
              >
                <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6L2.5 9.5l6.6-.9z" />
              </svg>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">
            Trusted by enterprise clients in 50+ countries
          </p>
        </div>

        <div>
          <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {hero.subhead}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={hero.primary.href} variant="primary" withArrow>
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="secondary">
              {hero.secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
