import { trustedBy } from "@/lib/content";

/**
 * Third-party trademarks rendered as plain text wordmarks in one consistent
 * style — deliberately NOT reproduced logo graphics, since we hold no usage
 * rights or official logo files. See DESIGN_SPEC.md Section 3.
 *
 * CSS-only marquee: duplicating the list and translating -50% gives a
 * seamless loop. Pauses on hover; frozen entirely under reduced-motion.
 */
export default function TrustedBy() {
  return (
    <section className="border-y border-line px-6 py-16">
      <div className="mx-auto w-full max-w-[var(--container-max)]">
        <p className="eyebrow mb-10 text-center">{trustedBy.label}</p>

        <div className="marquee marquee-mask overflow-hidden">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex shrink-0 items-center"
                // The second copy is a visual duplicate for the seamless loop.
                aria-hidden={copy === 1 ? "true" : undefined}
              >
                {trustedBy.marks.map((mark) => (
                  <li
                    key={mark}
                    className="px-8 text-lg font-medium tracking-tight whitespace-nowrap text-muted sm:px-12 sm:text-xl"
                  >
                    {mark}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
