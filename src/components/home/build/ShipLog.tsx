"use client";

import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import styles from "./build.module.css";

type Step = { label: string; result: string; bar?: boolean };

const STEPS: Step[] = [
  { label: "Installing dependencies", result: "✓ 1.8s" },
  { label: "Type-checking 412 files", result: "✓ 0 errors" },
  { label: "Running 1,284 tests", result: "✓ passed", bar: true },
  { label: "Building production bundle", result: "✓ 4.2s" },
  { label: "Security scan · OWASP top 10", result: "✓ 0 critical" },
  { label: "Deploying to 3 regions", result: "✓ zero downtime", bar: true },
];

const REGIONS = [
  ["ap-south-1", "Mumbai", "42ms"],
  ["eu-west-1", "Ireland", "61ms"],
  ["us-east-1", "Virginia", "88ms"],
];

/**
 * Stage 03 — the release pipeline, step by step. Each line runs (spinner,
 * filling bar) and resolves as the scroll moves through it.
 */
export default function ShipLog({ progress }: { progress: MotionValue<number> }) {
  const [p, setP] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    const rounded = Math.round(v * 200) / 200;
    setP((prev) => (prev === rounded ? prev : rounded));
  });

  // Steps share the first 80% of the stage; the region checks and the URL take the rest.
  const span = 0.8 / STEPS.length;
  const live = p >= 0.92;

  return (
    <div className={styles.terminal} role="img" aria-label="Release pipeline: tests, build, security scan and deploy all passing">
      <div className={styles.termPrompt}>
        <span className={styles.termPath}>~/meridian</span> <span className={styles.termDollar}>$</span> calcify ship --prod
      </div>
      {STEPS.map((step, i) => {
        const local = Math.min(1, Math.max(0, (p - i * span) / span));
        if (local <= 0) return null;
        const finished = local >= 1;
        return (
          <div key={step.label} className={styles.termLine} data-done={finished}>
            <span className={styles.termMark}>{finished ? "›" : <i className={styles.spinner} />}</span>
            <span className={styles.termLabel}>{step.label}</span>
            {step.bar && (
              <span className={styles.termBar}>
                <i style={{ transform: `scaleX(${local})` }} />
              </span>
            )}
            <span className={styles.termResult}>{finished ? step.result : `${Math.round(local * 100)}%`}</span>
          </div>
        );
      })}
      {p > 0.8 && (
        <div className={styles.termRegions}>
          {REGIONS.map(([id, city, ms], i) => {
            const up = p > 0.82 + i * 0.03;
            return (
              <span key={id} data-up={up}>
                <i /> {id} <small>{city}</small> {up ? `healthy · ${ms}` : "starting…"}
              </span>
            );
          })}
        </div>
      )}
      {live && (
        <div className={styles.termLive}>
          ✓ Live at <u>app.meridian.example</u>
        </div>
      )}
    </div>
  );
}
