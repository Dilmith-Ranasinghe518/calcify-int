"use client";

import { useEffect, useRef, useState } from "react";
import { lockScroll } from "@/lib/scroll";
import { finishIntro, markIntroPending } from "@/lib/intro";

/**
 * Intro loading overlay — a short boot sequence on every full page load.
 *
 * Design decisions that matter:
 *
 * - It is an *overlay*, not a gate. The page renders underneath it from the
 *   first paint, so if JS fails, is blocked, or the observer never runs, the
 *   visitor simply sees the site. Nothing is ever trapped behind it.
 * - It lifts once the page has loaded and the intro has had its minimum
 *   beat, and never later than a hard cap. A loader that waits indefinitely
 *   on a slow asset is how sites end up showing a spinner forever.
 * - The first visit in a session gets the full sequence; reloads after that
 *   get a quicker one. Client-side navigation never replays it — the route
 *   curtain (app/template.tsx) handles page changes.
 * - Skipped entirely under prefers-reduced-motion.
 *
 * Worth knowing: a preloader always *worsens* measured LCP, because it covers
 * the content that would otherwise have painted. The caps keep that bounded.
 */
const SESSION_KEY = "calcify:intro-shown";
const TIMING = {
  first: { min: 1700, cap: 2600 },
  repeat: { min: 900, cap: 1500 },
};

export default function Preloader() {
  const [active, setActive] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [pct, setPct] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private mode / storage disabled — treat as unseen, still capped.
    }
    const { min, cap } = seen ? TIMING.repeat : TIMING.first;

    // Synchronous, so effects further down the tree (the hero crystal) see it.
    markIntroPending();
    // Deliberately set in the effect: whether to show depends on matchMedia,
    // which doesn't exist during SSR, so a lazy initialiser would cause a
    // hydration mismatch. One extra render is the correct trade here.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
    setActive(true);
    lockScroll(true);
    let locked = true;
    const unlock = () => {
      if (!locked) return;
      locked = false;
      lockScroll(false);
    };

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
      unlock();
      finishIntro();
      // Matches the exit wipe in globals.css.
      window.setTimeout(() => setActive(false), 900);
    };

    // Progress is time-based and eased — it represents "the intro is playing",
    // not real asset bytes, and pretending otherwise would be dishonest.
    const tick = () => {
      const p = Math.min((performance.now() - started) / min, 1);
      setPct(Math.round((1 - Math.pow(1 - p, 2.2)) * 100));
      if (p < 1 && !done) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onLoad = () => {
      window.setTimeout(finish, Math.max(0, min - (performance.now() - started)));
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    const capTimer = window.setTimeout(finish, cap);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(capTimer);
      if (raf.current) cancelAnimationFrame(raf.current);
      unlock();
      if (!done) finishIntro();
    };
  }, []);

  if (!active) return null;

  // Boot log lines surface as the counter passes their threshold.
  const log = [
    [8, "resolving modules"],
    [34, "compiling interface"],
    [62, "connecting the lattice"],
    [88, "ready"],
  ] as const;

  return (
    <div
      // Not a focus trap and not announced: the page beneath is the real
      // content, and this disappears on its own.
      aria-hidden="true"
      className="preloader"
      data-leaving={leaving}
    >
      <div className="preloader-word">
        {"calcify".split("").map((c, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>
            {c}
          </span>
        ))}
        <i />
      </div>
      <div className="preloader-count">{String(pct).padStart(3, "0")}</div>
      <ul className="preloader-log">
        {log.map(([at, text]) => (
          <li key={text} data-on={pct >= at}>
            <span>›</span> {text} {pct >= at && <em>ok</em>}
          </li>
        ))}
      </ul>
      <div className="preloader-rail">
        <i style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </div>
  );
}
