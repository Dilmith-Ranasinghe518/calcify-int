"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]=+*#";
const KEEP = /[\s.,/·—–-]/;

/**
 * Animate `el` from its current text to `to`, resolving left to right
 * through random glyphs. Returns a cancel function.
 */
export function scrambleTo(el: HTMLElement, to: string, duration = 650): () => void {
  const from = el.textContent ?? "";
  const length = Math.max(from.length, to.length);
  const start = performance.now();
  let raf = 0;

  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    let out = "";
    for (let i = 0; i < length; i++) {
      const settleAt = (i + 1) / length;
      const target = to[i] ?? "";
      if (t >= settleAt) out += target;
      else if (KEEP.test(target)) out += target;
      else if (t > settleAt - 0.45) out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      else out += from[i] ?? "";
    }
    el.textContent = out;
    if (t < 1) raf = requestAnimationFrame(frame);
    else el.textContent = to;
  };

  raf = requestAnimationFrame(frame);
  return () => {
    cancelAnimationFrame(raf);
    el.textContent = to;
  };
}

/**
 * Word that cycles through `words`, decoding each new one in.
 * Decorative: the surrounding heading carries the accessible sentence.
 */
export function CyclingWord({
  words,
  interval = 2600,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.textContent === words[index]) return;
    return scrambleTo(el, words[index]);
  }, [index, words]);

  return (
    <span ref={ref} aria-hidden="true" className={className}>
      {words[0]}
    </span>
  );
}

/** Text that decodes itself whenever its link or button is hovered or focused. */
export function HoverScramble({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.closest<HTMLElement>("a, button") ?? el;
    if (!el || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancel = () => {};
    let unlock = 0;
    const run = () => {
      cancel();
      window.clearTimeout(unlock);
      // Pin the width so random glyphs never nudge the neighbouring links.
      el.style.width = `${el.getBoundingClientRect().width}px`;
      el.textContent = text
        .split("")
        .map((c) => (KEEP.test(c) ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
        .join("");
      cancel = scrambleTo(el, text, 420);
      unlock = window.setTimeout(() => (el.style.width = ""), 440);
    };
    host.addEventListener("pointerenter", run);
    host.addEventListener("focus", run);
    return () => {
      cancel();
      host.removeEventListener("pointerenter", run);
      host.removeEventListener("focus", run);
    };
  }, [text]);

  return (
    <span className="relative inline-block">
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true" className={className}>
        {text}
      </span>
    </span>
  );
}
