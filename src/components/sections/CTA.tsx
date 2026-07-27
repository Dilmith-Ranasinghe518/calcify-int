import Button from "@/components/ui/Button";
import { cta } from "@/lib/content";

export default function CTA() {
  return (
    <section
      id="contact-cta"
      className="relative overflow-hidden px-6 py-[var(--section-y)]"
      style={{ scrollMarginTop: "6rem" }}
    >
      {/* Decorative — the Lattice converges to a single pulsing node here. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-signal-glow rotate-180"
      />

      <div className="relative mx-auto w-full max-w-3xl text-center">
        <h2 className="display-lg text-ink">{cta.h2}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted">
          {cta.body}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={cta.primary.href} variant="primary">
            {cta.primary.label}
          </Button>
          <Button href={cta.secondary.href} variant="secondary">
            {cta.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
