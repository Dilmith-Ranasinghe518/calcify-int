"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  suffix?: string;
  /** Decimal places — required for values like 99.9. */
  decimals?: number;
  duration?: number;
};

/**
 * Counts up on scroll-into-view.
 *
 * Renders the final value as the initial state so the number is correct
 * without JS and never counts up twice. Under `prefers-reduced-motion` it
 * skips the animation entirely.
 */
export default function CountUp({
  value,
  suffix = "",
  decimals = 0,
  duration = 1600,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        // Reset only at the moment we animate, so the correct value is never
        // replaced by a zero the visitor can see.
        setDisplay(0);

        let start: number | null = null;
        const step = (ts: number) => {
          if (start === null) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          setDisplay(value * eased);
          if (p < 1) requestAnimationFrame(step);
          else setDisplay(value);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
