/**
 * Logo: a text-only wordmark — "calcify" set tight in Onest, closed by a
 * chartreuse square that turns into a crystal (45°) on hover. Live text, so
 * it is sharp at every size and costs nothing to load.
 */
export default function Wordmark({
  className = "",
  size = "md",
  sub = true,
}: {
  className?: string;
  size?: "sm" | "md" | "xl";
  /** Show the INTERNATIONAL line under the name. */
  sub?: boolean;
}) {
  return (
    <span className={`wordmark ${className}`} data-size={size}>
      <span className="wordmark-name">
        calcify
        <i aria-hidden="true" className="wordmark-dot" />
      </span>
      {sub && <span className="wordmark-sub">International</span>}
    </span>
  );
}
