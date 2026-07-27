"use client";

import { useEffect, useRef, useState } from "react";
import Wordmark from "./Wordmark";

/**
 * Intro loading overlay.
 *
 * Design decisions that matter:
 *
 * - It is an *overlay*, not a gate. The page renders underneath it from the
 *   first paint, so if JS fails, is blocked, or the observer never runs, the
 *   visitor simply sees the site. Nothing is ever trapped behind it.
 * - It dismisses on `window.load` OR a hard 2s cap, whichever comes first.
 *   A preloader that waits indefinitely on a slow asset is how sites end up
 *   showing a spinner forever.
 * - It runs once per browsing session (sessionStorage), so internal
 *   navigation and reloads while working don't replay it.
 * - Skipped entirely under prefers-reduced-motion.
 *
 * Worth knowing: a preloader always *worsens* measured LCP, because it covers
 * the content that would otherwise have painted. This one is capped and
 * one-shot to keep that cost bounded.
 */
const SESSION_KEY = "calcify:intro-shown";
const MAX_MS = 2000;

export default function Preloader() {
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [pct, setPct] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private mode / storage disabled — treat as unseen, still capped.
    }
    if (seen) return;

    // Deliberately set in the effect. Whether to show at all depends on
    // matchMedia and sessionStorage, neither of which exists during SSR, so a
    // lazy initialiser would render `true` on the client and `false` on the
    // server — a hydration mismatch. One extra render on first visit is the
    // correct trade here.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
    setActive(true);
    // Lock scroll only while the overlay is genuinely up.
    document.body.style.overflow = "hidden";

    const started = performance.now();
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      setPct(100);
      setLeaving(true);
      document.body.style.overflow = "";
      // Matches the exit transition duration below.
      window.setTimeout(() => setActive(false), 700);
    };

    // Progress is time-based and eased — it represents "the intro is playing",
    // not real asset bytes, and pretending otherwise would be dishonest.
    const tick = () => {
      const elapsed = performance.now() - started;
      const p = Math.min(elapsed / MAX_MS, 1);
      const eased = 1 - Math.pow(1 - p, 2);
      setPct(Math.round(eased * 100));
      if (p < 1 && !done) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onLoad = () => {
      // Let the intro breathe for a beat even on a fast connection, but never
      // exceed the cap.
      const elapsed = performance.now() - started;
      window.setTimeout(finish, Math.max(0, 650 - elapsed));
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);

    const cap = window.setTimeout(finish, MAX_MS);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(cap);
      if (raf.current) cancelAnimationFrame(raf.current);
      document.body.style.overflow = "";
    };
  }, []);

  if (!active) return null;

  return (
    <div
      // Not a focus trap and not announced: the page beneath is the real
      // content, and this disappears on its own.
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 700ms cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      <div
        style={{
          opacity: leaving ? 0 : 1,
          transition: "opacity 300ms ease-out",
        }}
      >
        <Wordmark />
      </div>

      {/* Progress rail */}
      <div className="mt-10 h-px w-56 overflow-hidden bg-line sm:w-72">
        <div
          className="h-full bg-signal"
          style={{
            width: `${pct}%`,
            transition: "width 120ms linear",
          }}
        />
      </div>

      <div className="mt-5 text-xs font-medium tabular-nums tracking-[0.2em] text-muted">
        {String(pct).padStart(3, "0")}
      </div>
    </div>
  );
}
