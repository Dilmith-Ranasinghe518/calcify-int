"use client";

import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

type Word = { text: string; accent: boolean };

/** `*like this*` marks accent words; the markers can span several words. */
function parse(text: string): Word[] {
  let accent = false;
  return text.split(/\s+/).map((raw) => {
    let word = raw;
    const opens = word.startsWith("*");
    if (opens) word = word.slice(1);
    const closes = word.endsWith("*");
    if (closes) word = word.slice(0, -1);
    const isAccent = accent || opens;
    if (opens) accent = true;
    if (closes) accent = false;
    return { text: word, accent: isAccent };
  });
}

const FLOOR = 0.16;

/**
 * Scroll-scrubbed reading: each word brightens from 16% to full as the
 * paragraph travels up the viewport, so the copy is "read in" by the scroll.
 * Words are real text the whole time; reduced motion renders it fully lit.
 */
export default function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = parse(text);

  const paint = (p: number) => {
    const spans = ref.current?.querySelectorAll<HTMLElement>("[data-w]");
    if (!spans) return;
    const n = spans.length;
    spans.forEach((span, i) => {
      const t = Math.min(1, Math.max(0, p * n - i));
      span.style.opacity = String(FLOOR + (1 - FLOOR) * t);
    });
  };

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!reduced) paint(p);
  });

  useEffect(() => {
    if (reduced) return;
    paint(scrollYProgress.get());
  }, [reduced, scrollYProgress]);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span data-w="" className="scrub-word">
            {w.accent ? <em>{w.text}</em> : w.text}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
