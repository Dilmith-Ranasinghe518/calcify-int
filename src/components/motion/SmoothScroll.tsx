"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { setLenis } from "@/lib/scroll";

/**
 * Inertial scrolling for the whole site.
 *
 * Lenis drives the native scroll position, so `position: sticky`, framer
 * motion's `useScroll` and anchor links all keep working unchanged. Skipped
 * under prefers-reduced-motion, where the browser's own scrolling is kinder.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      anchors: { offset: -80 },
      stopInertiaOnNavigate: true,
    });
    setLenis(lenis);

    return () => {
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
