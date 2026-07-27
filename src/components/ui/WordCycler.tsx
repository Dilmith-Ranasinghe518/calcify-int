"use client";

import { useEffect, useState } from "react";

/**
 * Oversized ghost word that cycles through the practice areas.
 *
 * Purely decorative — aria-hidden, because the real <h1> beside it already
 * states the proposition. A screen reader should not have to sit through a
 * word looping forever, and search engines read the h1, not this.
 *
 * Frozen on the first word under prefers-reduced-motion.
 */
export default function WordCycler({
  words,
  intervalMs = 2200,
}: {
  words: string[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      intervalMs
    );
    return () => window.clearInterval(id);
  }, [words.length, intervalMs]);

  return (
    <div aria-hidden="true" className="pointer-events-none select-none">
      {/* Fixed height so the cycling word never reflows the layout. */}
      <span
        key={index}
        className="ghost-word ghost-word-enter block whitespace-nowrap"
      >
        {words[index]}
      </span>
    </div>
  );
}
