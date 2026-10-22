import styles from "./ServiceVisual.module.css";

export type VisualKind = "erp" | "ai" | "web" | "mobile" | "cloud" | "security" | "data" | "qa" | "transformation";

const LAYER = [0, 1, 2, 3];
const AI_EDGES = [0, 1].flatMap((layer) => LAYER.flatMap((n) => LAYER.map((m) => ({ layer, n, m }))));
const AI_NODES = [0, 1, 2].flatMap((layer) => LAYER.map((n) => ({ layer, n })));
const TESTS = ["auth · signs in with SSO", "orders · totals reconcile", "api · p95 under 200ms", "a11y · keyboard reachable"];
// Documentation-range addresses (RFC 5737) — illustrative, not real traffic.
const LOG = ["blocked · 198.51.100.4", "mfa · verified", "tls 1.3 · ok", "scan · 0 critical", "blocked · 203.0.113.9", "keys · rotated"];

/**
 * Tiny always-running illustrations for the capability cards. All motion is
 * CSS (transforms, offsets, dash patterns), so a grid of them costs no JS.
 */
export default function ServiceVisual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "erp":
      return (
        <div className={styles.erp}>
          {["Requested", "Approved", "Fulfilled"].map((col, c) => (
            <div key={col} className={styles.erpCol}>
              <span>{col}</span>
              {Array.from({ length: 3 }, (_, r) => (
                <i key={r} style={{ animationDelay: `${(c * 3 + r) * -0.6}s` }} />
              ))}
            </div>
          ))}
          <b className={styles.erpTravel} />
        </div>
      );
    case "ai":
      return (
        <svg viewBox="0 0 240 260" className={styles.ai}>
          {AI_EDGES.map(({ layer, n, m }) => (
            <line
              key={`${layer}-${n}-${m}`}
              x1={40 + layer * 80}
              y1={50 + n * 54}
              x2={120 + layer * 80}
              y2={50 + m * 54}
              className={styles.aiEdge}
              style={{ animationDelay: `${(n + m + layer) * -0.35}s` }}
            />
          ))}
          {AI_NODES.map(({ layer, n }) => (
            <circle
              key={`${layer}-${n}`}
              cx={40 + layer * 80}
              cy={50 + n * 54}
              r={7}
              className={styles.aiNode}
              style={{ animationDelay: `${(layer * 4 + n) * 0.18}s` }}
            />
          ))}
        </svg>
      );
    case "web":
      return (
        <div className={styles.web}>
          <div className={styles.webBar}>
            <i />
            <i />
            <i />
          </div>
          <div className={styles.webBody}>
            <b />
            <b />
            <b />
            <span className={styles.webScore}>
              <svg viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" />
                <circle cx="18" cy="18" r="15.5" className={styles.webRing} />
              </svg>
              <em>100</em>
            </span>
          </div>
        </div>
      );
    case "mobile":
      return (
        <div className={styles.mobile}>
          <div className={styles.phone}>
            <span className={styles.toast}>Order shipped · 2 min ago</span>
            <div className={styles.apps}>
              {Array.from({ length: 8 }, (_, i) => (
                <i key={i} style={{ animationDelay: `${i * 0.25}s` }} />
              ))}
            </div>
          </div>
        </div>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 260 150" className={styles.cloud}>
          <path d="M40 110 C 90 20, 170 20, 220 110" className={styles.cloudPath} />
          <path d="M40 110 H 220" className={styles.cloudPath} />
          <circle r="3.5" className={styles.packet}>
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M40 110 C 90 20, 170 20, 220 110" />
          </circle>
          <circle r="3.5" className={styles.packet}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M220 110 H 40" />
          </circle>
          {[
            [40, 110, "ap-south"],
            [130, 46, "eu-west"],
            [220, 110, "us-east"],
          ].map(([x, y, label]) => (
            <g key={label as string}>
              <circle cx={x as number} cy={y as number} r={13} className={styles.region} />
              <circle cx={x as number} cy={y as number} r={4} className={styles.regionCore} />
              <text x={x as number} y={(y as number) + 30} textAnchor="middle">
                {label}
              </text>
            </g>
          ))}
        </svg>
      );
    case "security":
      return (
        <div className={styles.security}>
          <svg viewBox="0 0 80 92" className={styles.shield}>
            <path d="M40 4 74 16v28c0 22-15 38-34 44C21 82 6 66 6 44V16Z" />
            <path d="m26 46 10 10 19-21" className={styles.check} />
          </svg>
          <div className={styles.log}>
            <ul>
              {[...LOG, ...LOG].map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
          <span className={styles.scan} />
        </div>
      );
    case "data":
      return (
        <div className={styles.data}>
          <div className={styles.dataBars}>
            {Array.from({ length: 12 }, (_, i) => (
              <i key={i} style={{ animationDelay: `${i * -0.3}s` }} />
            ))}
          </div>
          <svg viewBox="0 0 240 80" className={styles.dataLine} preserveAspectRatio="none">
            <path d="M0 60 C 30 50, 50 64, 80 40 S 140 30, 170 22 S 220 12, 240 8" pathLength={1} />
          </svg>
        </div>
      );
    case "qa":
      return (
        <ul className={styles.qa}>
          {TESTS.map((t, i) => (
            <li key={t} style={{ animationDelay: `${i * 0.55}s` }}>
              <b style={{ animationDelay: `${i * 0.55}s` }}>✓</b> {t}
            </li>
          ))}
          <li className={styles.qaSum}>4 / 4 passed</li>
        </ul>
      );
    case "transformation":
      return (
        <div className={styles.transform}>
          <div className={styles.legacy}>
            <span>legacy</span>
            {Array.from({ length: 4 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
          <div className={styles.flow}>
            {Array.from({ length: 4 }, (_, i) => (
              <b key={i} style={{ animationDelay: `${i * 0.45}s` }} />
            ))}
          </div>
          <div className={styles.modern}>
            <span>modern</span>
            {Array.from({ length: 4 }, (_, i) => (
              <i key={i} style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>
        </div>
      );
  }
}
