"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import LatticePoster from "./LatticePoster";

// ssr:false — WebGL has no meaning on the server, and this keeps three.js
// out of the server bundle entirely.
const Lattice = dynamic(() => import("./Lattice"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Persistent Lattice layer sitting behind the whole page — Section 1.
 *
 * Purely decorative: aria-hidden and pointer-events:none, so it never
 * enters the tab order or swallows clicks (Section 7).
 *
 * Mount strategy (Section 6): the canvas is deferred until the browser is
 * idle so WebGL init never blocks first paint / LCP. Until then — and
 * permanently, under reduced motion or without WebGL — the static poster
 * holds the same space.
 */
export default function LatticeBackground() {
  // Single piece of state: setting mode and dim separately would fire two
  // renders, the second synchronously from the effect body.
  const [scene, setScene] = useState<{
    mode: "poster" | "live";
    dim: number;
  }>({ mode: "poster", dim: 6 });

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced || !supportsWebGL()) return; // stay on the poster

    // Mobile gets a materially smaller point count: 4^3 = 64 vs 6^3 = 216,
    // within the 60-100 / 150-250 budgets in Section 6.
    const coarse = window.matchMedia("(max-width: 768px)").matches;

    const start = () => setScene({ mode: "live", dim: coarse ? 4 : 6 });
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(start, { timeout: 1800 });
      return () => {
        const cancel = (window as Window & {
          cancelIdleCallback?: (h: number) => void;
        }).cancelIdleCallback;
        cancel?.(id);
      };
    }

    const timer = window.setTimeout(start, 600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    // z-0 (not a negative index): the layout gives the content z-10, so the
    // Lattice sits above the page background but below everything readable.
    // Negative z-index here is fragile — any ancestor stacking context hides it.
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 select-none"
    >
      {scene.mode === "live" ? (
        <Lattice dim={scene.dim} />
      ) : (
        <LatticePoster />
      )}
      {/* Vignette: settles the edges without crushing the centre. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_45%,transparent_0%,transparent_45%,var(--color-void)_100%)]" />
    </div>
  );
}
