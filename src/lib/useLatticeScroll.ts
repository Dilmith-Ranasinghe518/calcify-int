"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Drives the Lattice's morph state from overall page scroll — Section 2:
 * "scroll-linked via ScrollTrigger, not autoplaying".
 *
 * Writes into a ref rather than React state on purpose: the value is read
 * inside useFrame every frame, and re-rendering the tree 60x a second would
 * defeat the point.
 */
export function useLatticeScroll(): RefObject<number> {
  const progress = useRef(0);

  useEffect(() => {
    // Reduced motion: freeze at the calm grid state, no scrub. Section 7.
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      progress.current = 0.6;
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    // Content below the fold changes page height as it settles (fonts,
    // images); recalculate so the morph stays aligned with the sections.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      trigger.kill();
    };
  }, []);

  return progress;
}
