import Image from "next/image";

/**
 * Case-study visual.
 *
 * Renders the real asset when one exists, and a styled placeholder when it
 * does not — so the layout is final and nothing 404s while the imagery is
 * still being produced. Drop files into /public/work/ and set `media` in
 * lib/content.ts to switch a card over. See ASSET_PROMPTS.md.
 */
export default function CaseMedia({
  src,
  alt,
  label,
  priority = false,
  className = "",
}: {
  src?: string;
  alt?: string;
  label: string;
  priority?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-card bg-panel ${className}`}
      >
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {/* Keeps overlaid text legible regardless of the image. */}
        <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/20 to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-card border border-line bg-panel ${className}`}
      role="img"
      aria-label={`${label} — visual pending`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 70% 20%, rgba(232,38,46,0.18) 0%, transparent 70%)," +
            "linear-gradient(#1F1F23 1px, transparent 1px)," +
            "linear-gradient(90deg, #1F1F23 1px, transparent 1px)",
          backgroundSize: "100% 100%, 44px 44px, 44px 44px",
        }}
      />
      <div className="absolute inset-0 flex items-end p-6">
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-muted">
          Visual pending
        </span>
      </div>
    </div>
  );
}
