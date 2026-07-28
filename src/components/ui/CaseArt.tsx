/**
 * Code-drawn case-study visuals.
 *
 * Vector, not photographic — I can't generate photoreal imagery, so these are
 * geometric abstractions of each domain. They cost a few hundred bytes, are
 * always exactly on-palette, scale to any resolution, and can be replaced by
 * a real photo at any time by setting `media` in lib/content.ts.
 *
 * All geometry is computed deterministically (no Math.random) so the server
 * and client render identical markup and hydration never mismatches.
 */

const INK = "#F5F5F6";
const ACCENT = "#4D7CFF";
const LINE = "#2A2A31";

/** 16:9 drawing surface shared by every variant. */
const W = 320;
const H = 180;

export type ArtKind = "datacenter" | "scan" | "city" | "warehouse";

/* ------------------------------------------------------------------ */

/** One-point perspective corridor of server racks. */
function DataCentre() {
  const vx = W / 2;
  const vy = H * 0.52;
  const depths = [0.08, 0.2, 0.34, 0.5, 0.66, 0.8];

  return (
    <>
      {/* Ceiling and floor converging to the vanishing point */}
      <g stroke={LINE} strokeWidth="0.6">
        <path d={`M0 0 L${vx} ${vy}`} />
        <path d={`M${W} 0 L${vx} ${vy}`} />
        <path d={`M0 ${H} L${vx} ${vy}`} />
        <path d={`M${W} ${H} L${vx} ${vy}`} />
      </g>

      {/* Rack faces at receding depths, mirrored left and right */}
      {depths.map((d, i) => {
        // Linear interpolation toward the vanishing point.
        const lx = vx * d;
        const rx = W - vx * d;
        const top = vy - (vy - 6) * (1 - d);
        const bot = vy + (H - vy - 6) * (1 - d);
        const op = 0.14 + d * 0.5;

        return (
          <g key={i}>
            <rect
              x={lx - 14 * (1 - d)}
              y={top}
              width={14 * (1 - d)}
              height={bot - top}
              fill="none"
              stroke={INK}
              strokeOpacity={op * 0.55}
              strokeWidth="0.5"
            />
            <rect
              x={rx}
              y={top}
              width={14 * (1 - d)}
              height={bot - top}
              fill="none"
              stroke={INK}
              strokeOpacity={op * 0.55}
              strokeWidth="0.5"
            />
            {/* Red status LEDs down each rack */}
            {[0.2, 0.38, 0.56, 0.74].map((t) => (
              <g key={t}>
                <circle
                  cx={lx - 7 * (1 - d)}
                  cy={top + (bot - top) * t}
                  r={0.9 * (1 - d) + 0.35}
                  fill={ACCENT}
                  opacity={op}
                />
                <circle
                  cx={rx + 7 * (1 - d)}
                  cy={top + (bot - top) * t}
                  r={0.9 * (1 - d) + 0.35}
                  fill={ACCENT}
                  opacity={op}
                />
              </g>
            ))}
          </g>
        );
      })}

      {/* Faint glow at the vanishing point */}
      <circle cx={vx} cy={vy} r="26" fill="url(#ca-core)" />
    </>
  );
}

/** Stacked CT-style scan slices with a red scanning plane. */
function Scan() {
  const slices = Array.from({ length: 13 }, (_, i) => i);

  return (
    <>
      {slices.map((i) => {
        const t = i / (slices.length - 1);
        const y = 26 + t * (H - 58);
        // Slices bulge toward the middle, like a torso cross-section.
        const bulge = Math.sin(t * Math.PI);
        const rx = 30 + bulge * 46;
        const ry = 3.4 + bulge * 1.6;
        return (
          <ellipse
            key={i}
            cx={W / 2}
            cy={y}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={INK}
            strokeOpacity={0.1 + bulge * 0.3}
            strokeWidth="0.6"
          />
        );
      })}

      {/* Inner cavity outlines */}
      {[0.38, 0.5, 0.62].map((t) => {
        const y = 26 + t * (H - 58);
        const bulge = Math.sin(t * Math.PI);
        return (
          <g key={t}>
            <ellipse
              cx={W / 2 - 20}
              cy={y}
              rx={13 * bulge}
              ry={4 * bulge}
              fill="none"
              stroke={INK}
              strokeOpacity="0.22"
              strokeWidth="0.5"
            />
            <ellipse
              cx={W / 2 + 20}
              cy={y}
              rx={13 * bulge}
              ry={4 * bulge}
              fill="none"
              stroke={INK}
              strokeOpacity="0.22"
              strokeWidth="0.5"
            />
          </g>
        );
      })}

      {/* Red scanning plane */}
      <line
        x1="18"
        y1={H * 0.46}
        x2={W - 18}
        y2={H * 0.46}
        stroke={ACCENT}
        strokeWidth="1"
      />
      <rect
        x="18"
        y={H * 0.46 - 9}
        width={W - 36}
        height="18"
        fill="url(#ca-scan)"
      />
    </>
  );
}

/** Top-down street grid with red traffic trails. */
function City() {
  const cols = [22, 58, 96, 140, 186, 226, 268, 300];
  const rows = [20, 48, 78, 112, 146];
  // Fixed picks so the "busy" arteries are stable between renders.
  const hotCols = new Set([96, 186, 268]);
  const hotRows = new Set([78, 146]);

  return (
    <>
      {/* Blocks */}
      {rows.slice(0, -1).map((y, ri) =>
        cols.slice(0, -1).map((x, ci) => (
          <rect
            key={`${ri}-${ci}`}
            x={x + 2}
            y={y + 2}
            width={cols[ci + 1] - x - 4}
            height={rows[ri + 1] - y - 4}
            fill={INK}
            opacity="0.022"
          />
        ))
      )}

      {/* Street grid */}
      <g stroke={LINE} strokeWidth="0.5">
        {cols.map((x) => (
          <line key={`c${x}`} x1={x} y1="12" x2={x} y2={H - 12} />
        ))}
        {rows.map((y) => (
          <line key={`r${y}`} x1="12" y1={y} x2={W - 12} y2={y} />
        ))}
      </g>

      {/* Red arteries */}
      <g stroke={ACCENT} strokeLinecap="round">
        {cols
          .filter((x) => hotCols.has(x))
          .map((x) => (
            <line
              key={`hc${x}`}
              x1={x}
              y1="16"
              x2={x}
              y2={H - 16}
              strokeWidth="1.1"
              opacity="0.85"
            />
          ))}
        {rows
          .filter((y) => hotRows.has(y))
          .map((y) => (
            <line
              key={`hr${y}`}
              x1="16"
              y1={y}
              x2={W - 16}
              y2={y}
              strokeWidth="1.1"
              opacity="0.85"
            />
          ))}
      </g>

      {/* Intersection nodes where hot streets cross */}
      {[...hotCols].map((x) =>
        [...hotRows].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill={ACCENT} />
        ))
      )}
    </>
  );
}

/** Receding warehouse racking with red indicator strips. */
function Warehouse() {
  const vx = W * 0.52;
  const vy = H * 0.44;
  const bays = [0.06, 0.18, 0.32, 0.47, 0.62, 0.76];

  return (
    <>
      {/* Floor lines converging */}
      <g stroke={LINE} strokeWidth="0.5">
        {[-1, -0.55, -0.2, 0.2, 0.55, 1].map((k) => (
          <path key={k} d={`M${vx + k * W * 0.85} ${H} L${vx} ${vy}`} />
        ))}
      </g>

      {bays.map((d, i) => {
        const scale = 1 - d;
        const halfW = W * 0.46 * scale;
        const top = vy - (vy - 10) * scale;
        const bot = vy + (H - vy - 8) * scale;
        const op = 0.12 + d * 0.42;

        return (
          <g key={i}>
            {/* Racking uprights either side of the aisle */}
            <rect
              x={vx - halfW}
              y={top}
              width={halfW * 0.42}
              height={bot - top}
              fill="none"
              stroke={INK}
              strokeOpacity={op * 0.5}
              strokeWidth="0.5"
            />
            <rect
              x={vx + halfW * 0.58}
              y={top}
              width={halfW * 0.42}
              height={bot - top}
              fill="none"
              stroke={INK}
              strokeOpacity={op * 0.5}
              strokeWidth="0.5"
            />
            {/* Red shelf indicator strips */}
            {[0.3, 0.55, 0.8].map((t) => (
              <g key={t} opacity={op}>
                <line
                  x1={vx - halfW}
                  y1={top + (bot - top) * t}
                  x2={vx - halfW * 0.58}
                  y2={top + (bot - top) * t}
                  stroke={ACCENT}
                  strokeWidth={0.9 * scale + 0.3}
                />
                <line
                  x1={vx + halfW * 0.58}
                  y1={top + (bot - top) * t}
                  x2={vx + halfW}
                  y2={top + (bot - top) * t}
                  stroke={ACCENT}
                  strokeWidth={0.9 * scale + 0.3}
                />
              </g>
            ))}
          </g>
        );
      })}

      <circle cx={vx} cy={vy} r="22" fill="url(#ca-core)" />
    </>
  );
}

/* ------------------------------------------------------------------ */

const VARIANTS: Record<ArtKind, () => React.JSX.Element> = {
  datacenter: DataCentre,
  scan: Scan,
  city: City,
  warehouse: Warehouse,
};

export default function CaseArt({
  kind,
  className = "",
}: {
  kind: ArtKind;
  className?: string;
}) {
  const Variant = VARIANTS[kind];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <radialGradient id="ca-core">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.22" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ca-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0" />
          <stop offset="50%" stopColor={ACCENT} stopOpacity="0.28" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill="#050506" />
      <Variant />

      {/* Bottom fade: the card's heading and metric sit over this edge. */}
      <rect x="0" y={H * 0.55} width={W} height={H * 0.45} fill="url(#ca-fade)" />
      <defs>
        <linearGradient id="ca-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020202" stopOpacity="0" />
          <stop offset="100%" stopColor="#020202" stopOpacity="0.92" />
        </linearGradient>
      </defs>
    </svg>
  );
}
