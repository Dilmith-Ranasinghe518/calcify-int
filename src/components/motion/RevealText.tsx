"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Tag = "h1" | "h2" | "h3" | "p" | "div";

/**
 * Line-by-line mask reveal: each line rises out of its own clipped row.
 *
 * Pass the copy pre-split into `lines` — breaking by hand keeps the rag
 * intentional at display sizes, which automatic splitting can't promise.
 * `label` gives assistive tech the sentence as one string.
 */
export default function RevealText({
  lines,
  as = "h2",
  className = "",
  delay = 0,
  onMount = false,
  label,
}: {
  lines: ReactNode[];
  as?: Tag;
  className?: string;
  /** Seconds before the first line starts. */
  delay?: number;
  /** Animate on mount instead of when scrolled into view (for heroes). */
  onMount?: boolean;
  label?: string;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  const trigger = onMount
    ? { initial: "hidden", animate: "shown" }
    : { initial: "hidden", whileInView: "shown", viewport: { once: true, amount: 0.35 } };

  return (
    <MotionTag className={className} aria-label={label} {...(reduced ? {} : trigger)}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-line" aria-hidden={label ? true : undefined}>
          <motion.span
            className="reveal-line-inner"
            variants={{
              // Far enough down to clear the descender room in .reveal-line.
              hidden: { y: "140%", rotate: 2.5 },
              shown: {
                y: "0%",
                rotate: 0,
                transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.09 },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
