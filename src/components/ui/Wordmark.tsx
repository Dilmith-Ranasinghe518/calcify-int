/**
 * Letter-based wordmark: CALCIFY over INTERNATIONAL, with a single red
 * accent dot. Set in Onest rather than drawn as paths, so it stays crisp at
 * every size, scales with the type system, and needs no image request.
 *
 * Our own lettering and lockup — not derived from any other company's mark.
 */
export default function Wordmark({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const name =
    size === "md"
      ? "text-lg sm:text-xl"
      : "text-base";
  const sub =
    size === "md"
      ? "text-[0.58rem] tracking-[0.42em]"
      : "text-[0.52rem] tracking-[0.38em]";

  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="flex items-baseline gap-1">
        {/* Accent dot — the one place red appears in the mark */}
        <span
          aria-hidden="true"
          className="mb-[0.15em] h-1.5 w-1.5 shrink-0 self-end rounded-full bg-signal"
        />
        <span
          className={`${name} font-extrabold uppercase tracking-[-0.01em] text-ink`}
        >
          Calcify
        </span>
      </span>
      <span
        className={`${sub} mt-1.5 pl-[0.6rem] font-medium uppercase text-muted`}
      >
        International
      </span>
    </span>
  );
}
