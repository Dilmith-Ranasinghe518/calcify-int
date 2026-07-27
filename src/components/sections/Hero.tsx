import Button from "@/components/ui/Button";
import { hero } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-32 pb-24">
      {/*
        The Lattice canvas (rendered by the root layout) provides the backdrop
        here. This adds only a soft signal wash behind the headline so the
        display type keeps its contrast over the moving nodes.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-signal-glow"
      />

      <div className="relative mx-auto w-full max-w-[var(--container-max)]">
        <p className="eyebrow mb-6">{hero.eyebrow}</p>

        <h1 className="display max-w-4xl text-4xl sm:text-5xl lg:text-7xl text-ink">
          {hero.h1}
        </h1>

        <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-muted">
          {hero.subhead}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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
