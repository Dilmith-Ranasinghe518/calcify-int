"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { REGIONS, SCREEN, type Region } from "./layout";
import styles from "./build.module.css";

/** One region: its outline draws itself, then its label and skeleton fill fade up. */
function Outline({ region, index, progress }: { region: Region; index: number; progress: MotionValue<number> }) {
  const start = 0.04 + index * 0.075;
  const pathLength = useTransform(progress, [start, start + 0.16], [0, 1]);
  const fill = useTransform(progress, [start + 0.12, start + 0.22], [0, 1]);
  const { x, y, w, h } = region;
  const pad = 6;

  return (
    <g>
      <motion.rect
        x={x + pad}
        y={y + pad}
        width={w - pad * 2}
        height={h - pad * 2}
        rx={6}
        className={styles.bpRect}
        style={{ pathLength }}
      />
      <motion.g style={{ opacity: fill }}>
        {/* Skeleton bars hint at the content to come */}
        {region.id === "nav" ? (
          Array.from({ length: 6 }, (_, i) => (
            <rect key={i} x={x + 22} y={y + 70 + i * 34} width={w - 60 - (i % 3) * 18} height={10} rx={5} className={styles.bpBar} />
          ))
        ) : region.id === "chart" ? (
          Array.from({ length: 16 }, (_, i) => {
            const bh = 40 + ((i * 37) % 110);
            return <rect key={i} x={x + 24 + i * 30} y={y + h - 24 - bh} width={16} height={bh} rx={3} className={styles.bpBar} />;
          })
        ) : region.id === "feed" || region.id === "table" ? (
          Array.from({ length: region.id === "feed" ? 7 : 3 }, (_, i) => (
            <rect key={i} x={x + 22} y={y + 44 + i * (region.id === "feed" ? 48 : 30)} width={w - 44 - (i % 2) * 40} height={12} rx={6} className={styles.bpBar} />
          ))
        ) : region.id.startsWith("kpi") ? (
          <>
            <rect x={x + 20} y={y + 24} width={70} height={9} rx={4.5} className={styles.bpBar} />
            <rect x={x + 20} y={y + 46} width={w - 70} height={22} rx={6} className={styles.bpBar} />
          </>
        ) : (
          <rect x={x + 24} y={y + 24} width={140} height={16} rx={8} className={styles.bpBar} />
        )}
        <text x={x + 16} y={y + 22} className={styles.bpLabel}>
          {region.label}
        </text>
      </motion.g>
    </g>
  );
}

/**
 * Stage 01 — the screen as a blueprint: a measured grid, then every region
 * outlined and skeleton-filled in turn as you scroll.
 */
export default function Blueprint({ progress }: { progress: MotionValue<number> }) {
  const guides = useTransform(progress, [0, 0.08], [0, 1]);
  const dims = useTransform(progress, [0.75, 0.9], [0, 1]);

  return (
    <svg viewBox={`0 0 ${SCREEN.w} ${SCREEN.h}`} className={styles.blueprint} aria-hidden="true">
      <defs>
        <pattern id="bp-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0V25" className={styles.bpGrid} />
        </pattern>
      </defs>
      <motion.rect width={SCREEN.w} height={SCREEN.h} fill="url(#bp-grid)" style={{ opacity: guides }} />
      {REGIONS.map((r, i) => (
        <Outline key={r.id} region={r} index={i} progress={progress} />
      ))}
      <motion.g style={{ opacity: dims }} className={styles.bpDims}>
        <path d="M196 620H716" />
        <path d="M196 614V626M716 614V626" />
        <text x={456} y={612} textAnchor="middle">
          520 · 8pt grid
        </text>
        <path d="M992 200V605" />
        <text x={986} y={402} textAnchor="end">
          405
        </text>
      </motion.g>
    </svg>
  );
}
