import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Standard section shell: 120–160px desktop / 64–80px mobile vertical rhythm
 * (--section-y), centered 1200px container, optional heading block.
 */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      className={`relative px-6 py-[var(--section-y)] ${className}`}
      style={{ scrollMarginTop: "6rem" }}
    >
      <div className="mx-auto w-full max-w-[var(--container-max)]">
        {(eyebrow || title || intro) && (
          <header className="mb-16 sm:mb-20 max-w-3xl">
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            {title && <h2 className="display-lg text-ink">{title}</h2>}
            {intro && (
              <p className="mt-7 text-base sm:text-lg leading-relaxed text-muted">
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
