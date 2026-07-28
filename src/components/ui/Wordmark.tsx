/**
 * Logo lockup: "C" monogram + CALCIFY over INTERNATIONAL.
 *
 * The mark is inline SVG and the lettering is live text set in Onest, so the
 * whole logo is one DOM node group — sharp at every size, recolourable by
 * CSS, and costing zero network requests.
 *
 * Our own geometry and lettering. Not derived from any other company's mark.
 */
export default function Wordmark({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const markSize = size === "md" ? "h-9 w-9" : "h-8 w-8";
  const name = size === "md" ? "text-xl sm:text-2xl" : "text-lg";
  const sub =
    size === "md"
      ? "text-[0.7rem] tracking-[0.3em]"
      : "text-[0.64rem] tracking-[0.28em]";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        focusable="false"
        className={`${markSize} shrink-0`}
      >
        {/* Open "C" ring */}
        <path
          d="M33 12a20 20 0 1 0 0 40 20 20 0 0 0 17.3-10"
          fill="none"
          stroke="#F5F5F6"
          strokeWidth="7"
        />
        {/* Red node in the aperture — the single accent */}
          <circle cx="47" cy="22" r="6" fill="#4D7CFF" />
      </svg>

      <span className="inline-flex flex-col leading-none">
        <span
          className={`${name} font-extrabold uppercase tracking-[-0.01em] text-ink`}
        >
          Calcify
        </span>
        <span className={`${sub} mt-1.5 font-medium uppercase text-ink/65`}>
          International
        </span>
      </span>
    </span>
  );
}
