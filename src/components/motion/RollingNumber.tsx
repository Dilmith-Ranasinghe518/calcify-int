"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const DIGITS = "0123456789";

/**
 * Odometer-style figure: every digit is a 0–9 strip that rolls into place
 * when the number scrolls into view. Prefixes, suffixes and separators
 * ("$", "M+", ".", "%") sit still beside the rolling digits.
 */
export default function RollingNumber({
  value,
  className = "",
  delay = 0,
}: {
  /** The figure exactly as it should finally read, e.g. "99.9%" or "$500M+". */
  value: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const settled = inView || reduced;
  const chars = Array.from(value);
  const digitCount = chars.filter((c) => DIGITS.includes(c)).length;
  let seen = 0;

  return (
    <span ref={ref} className={`rolling-number ${className}`}>
      <span className="sr-only">{value}</span>
      {chars.map((c, i) => {
        if (!DIGITS.includes(c)) {
          return (
            <span key={i} aria-hidden="true">
              {c}
            </span>
          );
        }
        const order = seen++;
        const d = Number(c);
        // Later digits travel further (an extra lap) so the roll reads as counting.
        const laps = digitCount - order;
        const offset = settled ? d + laps * 10 : 0;
        return (
          <span key={i} aria-hidden="true" className="rolling-digit">
            <span
              className="rolling-strip"
              style={{
                transform: `translateY(-${offset * 10 / (laps + 1)}%)`,
                transitionDelay: `${delay + order * 0.08}s`,
              }}
            >
              {Array.from({ length: (laps + 1) * 10 }, (_, k) => (
                <span key={k}>{DIGITS[k % 10]}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
