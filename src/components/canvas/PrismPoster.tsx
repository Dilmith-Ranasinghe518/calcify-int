/**
 * Static stand-in for the WebGL prism — used under prefers-reduced-motion,
 * when WebGL is unavailable, and as the pre-mount placeholder so the page
 * never shows an empty void while the canvas initialises.
 *
 * A faceted crystal silhouette over an iridescent wash, drawn in code so it
 * stays in sync with the palette.
 */
export default function PrismPoster() {
  return (
    <div className="h-full w-full">
      {/* Iridescent wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 68% 32%, rgba(124,92,255,0.30) 0%, transparent 70%)," +
            "radial-gradient(ellipse 40% 35% at 82% 20%, rgba(255,79,216,0.18) 0%, transparent 70%)," +
            "radial-gradient(ellipse 50% 45% at 30% 70%, rgba(34,228,224,0.14) 0%, transparent 70%)",
        }}
      />

      {/* Crystal silhouette */}
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        focusable="false"
        className="absolute right-[8%] top-1/2 h-[52vmin] w-[52vmin] -translate-y-1/2 opacity-70"
      >
        <defs>
          <linearGradient id="prism-face-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#22E4E0" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="prism-face-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF4FD8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Icosahedron-style facets */}
        <polygon points="100,18 158,52 130,104" fill="url(#prism-face-a)" />
        <polygon points="100,18 130,104 70,104" fill="url(#prism-face-b)" />
        <polygon points="100,18 70,104 42,52" fill="url(#prism-face-a)" />
        <polygon points="42,52 70,104 58,152" fill="url(#prism-face-b)" />
        <polygon points="158,52 130,104 142,152" fill="url(#prism-face-b)" />
        <polygon points="70,104 130,104 100,182" fill="url(#prism-face-a)" />
        <polygon points="58,152 70,104 100,182" fill="url(#prism-face-b)" />
        <polygon points="142,152 130,104 100,182" fill="url(#prism-face-a)" />

        <g
          stroke="#A99BFF"
          strokeWidth="0.7"
          strokeOpacity="0.5"
          fill="none"
          strokeLinejoin="round"
        >
          <polygon points="100,18 158,52 142,152 100,182 58,152 42,52" />
          <path d="M100,18 100,182M42,52 130,104M158,52 70,104M70,104 130,104M58,152 70,104M142,152 130,104" />
        </g>
      </svg>
    </div>
  );
}
