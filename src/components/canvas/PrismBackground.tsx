"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PrismPoster from "./PrismPoster";

// ssr:false — WebGL means nothing on the server, and this keeps three.js and
// drei out of the server bundle entirely.
const Prism = dynamic(() => import("./Prism"), { ssr: false });

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
 * Persistent refractive-crystal layer behind the whole site.
 *
 * Purely decorative: aria-hidden and pointer-events:none, so it never enters
 * the tab order or swallows clicks.
 *
 * Mount strategy: deferred to browser idle so WebGL init never blocks first
 * paint. Until then — and permanently under reduced motion or without WebGL —
 * the static poster holds the same space.
 *
 * Transmission is genuinely expensive (it re-renders the scene into a buffer
 * every frame), so low quality is not cosmetic tuning: it is what keeps this
 * viable on mid-range phones.
 */
export default function PrismBackground() {
  const [scene, setScene] = useState<{
    mode: "poster" | "live";
    quality: "high" | "low";
  }>({ mode: "poster", quality: "high" });

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced || !supportsWebGL()) return; // stay on the poster

    const coarse =
      window.matchMedia("(max-width: 900px)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    // Very low core counts can't sustain a transmission pass at all.
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4;
    if (coarse && weak) return; // poster is the honest choice here

    const start = () =>
      setScene({ mode: "live", quality: coarse ? "low" : "high" });

    const w = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number }
      ) => number;
      cancelIdleCallback?: (h: number) => void;
    };

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(start, { timeout: 1800 });
      return () => w.cancelIdleCallback?.(id);
    }

    const timer = window.setTimeout(start, 600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
    >
      {scene.mode === "live" ? (
        <Prism quality={scene.quality} />
      ) : (
        <PrismPoster />
      )}

      {/* Readability scrim: darkens the left/centre where copy sits, so the
          prism stays vivid on the right without fighting the text. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, var(--color-void) 12%, color-mix(in srgb, var(--color-void) 62%, transparent) 46%, transparent 78%)",
        }}
      />
    </div>
  );
}
