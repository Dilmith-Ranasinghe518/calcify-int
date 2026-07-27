import { ImageResponse } from "next/og";

export const alt =
  "Calcify International — Engineering Tomorrow's Digital Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, generated at build time — no binary asset to maintain,
 * and it stays in sync with the brand tokens automatically.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0D14",
          padding: 72,
          position: "relative",
        }}
      >
        {/* Lattice motif */}
        <div
          style={{
            position: "absolute",
            right: -110,
            top: -110,
            display: "flex",
            opacity: 0.22,
          }}
        >
          <svg width="470" height="470" viewBox="0 0 32 32" fill="none">
            <g stroke="#5B6EF5" strokeWidth="0.35">
              <path d="M16 3.5 27 9.75 27 22.25 16 28.5 5 22.25 5 9.75Z" />
              <path d="M16 3.5 16 16M27 9.75 16 16M27 22.25 16 16M16 28.5 16 16M5 22.25 16 16M5 9.75 16 16" />
            </g>
            <g fill="#5B6EF5">
              <circle cx="16" cy="3.5" r="1.1" />
              <circle cx="27" cy="9.75" r="1.1" />
              <circle cx="27" cy="22.25" r="1.1" />
              <circle cx="16" cy="28.5" r="1.1" />
              <circle cx="5" cy="22.25" r="1.1" />
              <circle cx="5" cy="9.75" r="1.1" />
            </g>
            <circle cx="16" cy="16" r="1.9" fill="#3FE0D0" />
          </svg>
        </div>

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 3.5 27 9.75 27 22.25 16 28.5 5 22.25 5 9.75Z"
              stroke="#5B6EF5"
              strokeWidth="1.5"
            />
            <circle cx="16" cy="16" r="3.4" fill="#3FE0D0" />
          </svg>
          <div style={{ display: "flex", fontSize: 30, color: "#EDEFF7" }}>
            Calcify International
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              lineHeight: 1.05,
              color: "#EDEFF7",
              letterSpacing: -1.6,
              maxWidth: 900,
            }}
          >
            Engineering Tomorrow&apos;s Digital Infrastructure
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 26,
              color: "#8A90A6",
              maxWidth: 820,
            }}
          >
            Enterprise ERP, AI, cloud, and cybersecurity — delivered at global
            scale.
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #232838",
            paddingTop: 24,
            fontSize: 22,
            color: "#8A90A6",
          }}
        >
          500+ projects delivered · 50+ countries · 200+ engineers
        </div>
      </div>
    ),
    size
  );
}
