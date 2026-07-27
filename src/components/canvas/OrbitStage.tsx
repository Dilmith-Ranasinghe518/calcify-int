"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ssr:false keeps three.js out of the server bundle entirely.
const Orbit = dynamic(() => import("./Orbit"), { ssr: false });

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Hosts the wireframe globe in the hero's right-hand column.
 *
 * Decorative: aria-hidden, pointer-events:none, never in the tab order.
 * Mounted only after the browser is idle so WebGL never delays first paint,
 * and replaced by a static SVG under reduced motion or without WebGL.
 */
export default function OrbitStage({ className = "" }: { className?: string }) {
  const [state, setState] = useState<{
    mode: "static" | "live";
    detail: number;
  }>({ mode: "static", detail: 2 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!supportsWebGL()) return;

    const coarse = window.matchMedia("(max-width: 900px)").matches;
    const start = () => setState({ mode: "live", detail: coarse ? 1 : 2 });

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (h: number) => void;
    };

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(start, { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(start, 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      {state.mode === "live" ? (
        <Orbit detail={state.detail} />
      ) : (
        <StaticGlobe />
      )}
    </div>
  );
}

/** Static stand-in: same silhouette, no WebGL. */
function StaticGlobe() {
  const rings = [0.28, 0.52, 0.74, 0.92];
  return (
    <svg viewBox="-60 -60 120 120" className="h-full w-full">
      <g
        fill="none"
        stroke="#F5F5F6"
        strokeOpacity="0.3"
        strokeWidth="0.4"
      >
        <circle cx="0" cy="0" r="42" />
        {/* Latitude lines */}
        {rings.map((r) => (
          <ellipse key={`lat${r}`} cx="0" cy="0" rx="42" ry={42 * r} />
        ))}
        {/* Longitude lines */}
        {rings.map((r) => (
          <ellipse key={`lon${r}`} cx="0" cy="0" rx={42 * r} ry="42" />
        ))}
      </g>
      <ellipse
        cx="0"
        cy="0"
        rx="56"
        ry="20"
        fill="none"
        stroke="#E8262E"
        strokeWidth="0.7"
        transform="rotate(-24)"
      />
    </svg>
  );
}
