import Button from "@/components/ui/Button";
import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-36 pb-24">
      {/*
        The crystal canvas (rendered by the root layout) provides the backdrop.
        This adds only an iridescent wash so the display type keeps contrast.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-signal-glow"
      />

      <div className="relative mx-auto w-full max-w-[var(--container-max)]">
        <p className="eyebrow mb-8">{hero.eyebrow}</p>

        {/* Narrow measure on purpose: the headline stacks into a tall left
            column, leaving the right third of the viewport to the crystal. */}
        <h1 className="display-xl max-w-[11ch] text-ink">{hero.h1}</h1>

        <p className="mt-10 max-w-xl text-base sm:text-lg leading-relaxed text-muted">
          {hero.subhead}
        </p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href={hero.primary.href} variant="primary">
            {hero.primary.label}
          </Button>
          <Button href={hero.secondary.href} variant="secondary">
            {hero.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
