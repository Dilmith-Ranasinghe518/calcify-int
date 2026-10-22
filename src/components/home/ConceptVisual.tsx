import styles from "./ConceptVisual.module.css";

export type ConceptKind = "bank" | "scan" | "city" | "commerce";

/* ---------- deterministic geometry, computed once at module load ---------- */

/** Tiny seeded PRNG so server and client render identical dot fields. */
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const SCAN_DOTS = (() => {
  const r = rand(7);
  const dots: { x: number; y: number; o: number; s: number }[] = [];
  for (let i = 0; i < 340; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * 140;
    const x = 400 + Math.cos(a) * d * 0.82;
    const y = 225 + Math.sin(a) * d;
    // Two denser lobes read as "tissue", without depicting real anatomy.
    const lobe = Math.min(Math.hypot(x - 360, y - 210), Math.hypot(x - 445, y - 245));
    const o = Math.max(0.12, 1 - lobe / 120) * (0.5 + r() * 0.5);
    dots.push({ x, y, o, s: 1 + r() * 1.6 });
  }
  return dots;
})();

const ISO = { cx: 400, cy: 120, s: 30 };
const iso = (x: number, y: number, z = 0) => [
  ISO.cx + (x - y) * ISO.s * 0.866,
  ISO.cy + (x + y) * ISO.s * 0.5 - z * ISO.s,
];
const pts = (list: number[][]) => list.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ");

const CITY_BLOCKS = (() => {
  const r = rand(21);
  const blocks: { top: string; left: string; right: string; pin?: number[]; delay: number }[] = [];
  for (let gy = 0; gy < 5; gy++) {
    for (let gx = 0; gx < 5; gx++) {
      const x = gx * 1.6;
      const y = gy * 1.6;
      const w = 1;
      const h = 0.4 + r() * 2.2;
      blocks.push({
        top: pts([iso(x, y, h), iso(x + w, y, h), iso(x + w, y + w, h), iso(x, y + w, h)]),
        left: pts([iso(x, y + w, h), iso(x + w, y + w, h), iso(x + w, y + w, 0), iso(x, y + w, 0)]),
        right: pts([iso(x + w, y, h), iso(x + w, y + w, h), iso(x + w, y + w, 0), iso(x + w, y, 0)]),
        pin: r() < 0.32 ? iso(x + w / 2, y + w / 2, h) : undefined,
        delay: r() * 2.4,
      });
    }
  }
  return blocks;
})();

/** Street centre-lines between the blocks, as SVG paths for the traffic. */
const STREETS = [1.3, 2.9, 4.5, 6.1].flatMap((c) => [
  `M${pts([iso(-0.3, c)])} L${pts([iso(7.4, c)])}`,
  `M${pts([iso(c, 7.4)])} L${pts([iso(c, -0.3)])}`,
]);

/* ------------------------------- scenes ------------------------------- */

function Bank() {
  return (
    <svg viewBox="0 0 800 450" className={styles.svg}>
      <defs>
        <linearGradient id="cv-bank-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--c-accent)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--c-accent)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cv-card" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--c-accent-2)" />
          <stop offset="1" stopColor="#2b2546" />
        </linearGradient>
      </defs>
      <rect x="60" y="56" width="430" height="338" rx="18" className={styles.panel} />
      <text x="88" y="100" className={styles.label}>
        TOTAL BALANCE
      </text>
      <text x="88" y="148" className={styles.big}>
        $248,310.42
      </text>
      <text x="88" y="176" className={styles.up}>
        ▲ 4.2% this month
      </text>
      {[230, 270, 310, 350].map((y) => (
        <line key={y} x1="88" x2="462" y1={y} y2={y} className={styles.gridLine} />
      ))}
      <path d="M88 350 L136 330 L184 338 L232 300 L280 312 L328 268 L376 276 L424 236 L462 214 L462 362 L88 362 Z" fill="url(#cv-bank-area)" className={styles.fadeLoop} />
      <path d="M88 350 L136 330 L184 338 L232 300 L280 312 L328 268 L376 276 L424 236 L462 214" className={styles.drawLine} pathLength={1} />
      <circle cx="462" cy="214" r="5" className={styles.dotPulse} />

      <g className={styles.float}>
        <rect x="528" y="62" width="222" height="138" rx="16" fill="url(#cv-card)" transform="rotate(-7 639 131)" />
        <g transform="rotate(-7 639 131)">
          <rect x="548" y="96" width="34" height="26" rx="5" fill="#f2f1ec" opacity="0.55" />
          <text x="548" y="176" className={styles.cardText}>
            •••• •••• •••• 2048
          </text>
        </g>
      </g>

      <rect x="520" y="232" width="236" height="162" rx="16" className={styles.panel} />
      {[
        ["Salary", "+$4,200", true],
        ["Cloud invoice", "−$310", false],
        ["Transfer out", "−$1,000", false],
      ].map(([name, amt, pos], i) => (
        <g key={name as string} className={styles.rowIn} style={{ animationDelay: `${i * 0.5}s` }}>
          <circle cx="548" cy={274 + i * 42} r="12" className={styles.avatar} />
          <text x="570" y={278 + i * 42} className={styles.small}>
            {name}
          </text>
          <text x="736" y={278 + i * 42} textAnchor="end" className={pos ? styles.up : styles.small}>
            {amt}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Scan() {
  return (
    <svg viewBox="0 0 800 450" className={styles.svg}>
      <rect x="40" y="70" width="170" height="150" rx="14" className={styles.panel} />
      <text x="60" y="104" className={styles.label}>
        MODEL
      </text>
      <text x="60" y="134" className={styles.mid}>
        vision-v3
      </text>
      <text x="60" y="164" className={styles.label}>
        LATENCY
      </text>
      <rect x="60" y="178" width="130" height="6" rx="3" className={styles.track} />
      <rect x="60" y="178" width="130" height="6" rx="3" className={styles.meter} />

      <g>
        <rect x="230" y="55" width="340" height="340" rx="10" className={styles.frame} />
        {SCAN_DOTS.map((d, i) => (
          <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.s.toFixed(2)} fill="var(--c-ink)" opacity={d.o.toFixed(2)} />
        ))}
        {[
          [230, 55, 1, 1],
          [570, 55, -1, 1],
          [230, 395, 1, -1],
          [570, 395, -1, -1],
        ].map(([x, y, dx, dy]) => (
          <path key={`${x}-${y}`} d={`M${x} ${y + 26 * dy} V${y} H${x + 26 * dx}`} className={styles.bracket} />
        ))}
        <rect x="330" y="160" width="74" height="70" rx="4" className={styles.box} style={{ animationDelay: "0.9s" }} />
        <text x="330" y="152" className={styles.boxLabel} style={{ animationDelay: "0.9s" }}>
          FINDING · 0.94
        </text>
        <rect x="430" y="232" width="56" height="52" rx="4" className={styles.box} style={{ animationDelay: "1.6s" }} />
        <text x="430" y="300" className={styles.boxLabel} style={{ animationDelay: "1.6s" }}>
          CHECK · 0.81
        </text>
        <rect x="232" y="55" width="336" height="3" className={styles.scanLine} />
      </g>

      <rect x="592" y="70" width="170" height="210" rx="14" className={styles.panel} />
      <text x="612" y="104" className={styles.label}>
        TRIAGE QUEUE
      </text>
      {[
        ["Case 1042", "URGENT", true],
        ["Case 1043", "ROUTINE", false],
        ["Case 1044", "ROUTINE", false],
      ].map(([c, tag, urgent], i) => (
        <g key={c as string}>
          <text x="612" y={142 + i * 44} className={styles.small}>
            {c}
          </text>
          <rect x="690" y={128 + i * 44} width="56" height="20" rx="10" className={urgent ? styles.tagHot : styles.tag} />
          <text x="718" y={142 + i * 44} textAnchor="middle" className={urgent ? styles.tagHotText : styles.tagText}>
            {tag}
          </text>
        </g>
      ))}
    </svg>
  );
}

function City() {
  return (
    <svg viewBox="0 0 800 450" className={styles.svg}>
      <polygon points={pts([iso(-0.6, -0.6), iso(7.6, -0.6), iso(7.6, 7.6), iso(-0.6, 7.6)])} className={styles.ground} />
      {STREETS.map((d) => (
        <path key={d} d={d} className={styles.street} />
      ))}
      {CITY_BLOCKS.map((b, i) => (
        <g key={i}>
          <polygon points={b.left} className={styles.faceL} />
          <polygon points={b.right} className={styles.faceR} />
          <polygon points={b.top} className={styles.faceT} />
        </g>
      ))}
      {STREETS.map((d, i) => (
        <circle key={`car-${i}`} r="3" className={i % 3 === 0 ? styles.car2 : styles.car}>
          <animateMotion dur={`${4 + (i % 4)}s`} begin={`${-i * 0.7}s`} repeatCount="indefinite" path={d} />
        </circle>
      ))}
      {CITY_BLOCKS.filter((b) => b.pin).map((b, i) => (
        <g key={`pin-${i}`}>
          <circle cx={b.pin![0]} cy={b.pin![1]} r="10" className={styles.pinRing} style={{ animationDelay: `${b.delay}s` }} />
          <circle cx={b.pin![0]} cy={b.pin![1]} r="3.5" className={styles.pin} />
        </g>
      ))}
      <g>
        {["TRAFFIC", "ENERGY", "WASTE"].map((t, i) => (
          <g key={t}>
            <rect x={40 + i * 92} y="30" width="82" height="24" rx="12" className={i === 0 ? styles.tagHot : styles.tag} />
            <text x={81 + i * 92} y="46" textAnchor="middle" className={i === 0 ? styles.tagHotText : styles.tagText}>
              {t}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function Commerce() {
  return (
    <svg viewBox="0 0 800 450" className={styles.svg}>
      <rect x="70" y="34" width="210" height="382" rx="34" className={styles.phone} />
      <rect x="146" y="48" width="58" height="12" rx="6" fill="#1b1b20" />
      <rect x="90" y="78" width="170" height="150" rx="16" className={styles.product} />
      <path d="M175 108 l26 30 -26 30 -26 -30z" fill="var(--c-accent)" opacity="0.9" className={styles.spin} />
      <rect x="90" y="246" width="120" height="12" rx="6" className={styles.bar} />
      <rect x="90" y="268" width="80" height="10" rx="5" className={styles.barDim} />
      <text x="90" y="314" className={styles.mid}>
        $129
      </text>
      <rect x="90" y="340" width="170" height="46" rx="23" className={styles.buy} />
      <text x="175" y="369" textAnchor="middle" className={styles.buyText}>
        Add to cart
      </text>
      <text x="236" y="338" className={styles.plusOne}>
        +1
      </text>

      <rect x="320" y="56" width="430" height="338" rx="18" className={styles.panel} />
      <text x="348" y="98" className={styles.label}>
        ORDERS TODAY
      </text>
      <text x="348" y="142" className={styles.big}>
        1,284
      </text>
      <text x="520" y="142" className={styles.up}>
        ▲ live
      </text>
      <path d="M370 214 H700" className={styles.pipe} />
      {[
        [370, "Paid"],
        [535, "Packed"],
        [700, "Shipped"],
      ].map(([x, label], i) => (
        <g key={label as string}>
          <circle cx={x as number} cy="214" r="9" className={styles.stage} style={{ animationDelay: `${i * 1}s` }} />
          <text x={x as number} y="246" textAnchor="middle" className={styles.small}>
            {label}
          </text>
        </g>
      ))}
      <circle r="5" className={styles.parcel}>
        <animateMotion dur="3s" repeatCount="indefinite" path="M370 214 H700" />
      </circle>
      <text x="348" y="292" className={styles.label}>
        STOCK BY CHANNEL
      </text>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect
          key={i}
          x={348 + i * 54}
          y="306"
          width="34"
          height="66"
          rx="5"
          className={styles.stock}
          style={{ animationDelay: `${i * -0.45}s` }}
        />
      ))}
    </svg>
  );
}

/** Code-drawn, always-moving illustrations for the concept cards — no photos. */
export default function ConceptVisual({ kind }: { kind: ConceptKind }) {
  return (
    <div className={styles.wrap} aria-hidden="true">
      {kind === "bank" ? <Bank /> : kind === "scan" ? <Scan /> : kind === "city" ? <City /> : <Commerce />}
    </div>
  );
}
