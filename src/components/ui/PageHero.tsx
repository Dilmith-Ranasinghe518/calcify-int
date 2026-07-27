import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
};

/**
 * Shared hero for every non-home route, so /about, /services and /contact
 * open with identical rhythm and type scale instead of three different looks.
 */
export default function PageHero({ eyebrow, title, intro, children }: Props) {
  return (
    <section className="relative overflow-hidden px-6 pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-signal-glow"
      />
      <div className="relative mx-auto w-full max-w-[var(--container-max)]">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="display max-w-4xl text-4xl sm:text-5xl lg:text-6xl text-ink">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-muted">
          {intro}
        </p>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
