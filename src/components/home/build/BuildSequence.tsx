"use client";

import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Blueprint from "./Blueprint";
import CodeEditor from "./CodeEditor";
import ShipLog from "./ShipLog";
import LiveDashboard from "./LiveDashboard";
import { scrambleTo } from "@/components/motion/Scramble";
import styles from "./build.module.css";
import { useReducedMotion } from "@/lib/useReducedMotion";

const STAGES = [
  {
    key: "blueprint",
    name: "Blueprint",
    body: "We map the workflows, data and edge cases first, then wireframe every screen on a measured grid.",
    url: "design.calcify / meridian / overview",
  },
  {
    key: "code",
    name: "Code",
    body: "Senior engineers turn the blueprint into typed, reviewed, tested code — no throwaway prototypes.",
    url: "~/meridian/app/overview/page.tsx",
  },
  {
    key: "ship",
    name: "Ship",
    body: "Every release runs the same gate: tests, type checks, security scan, then a zero-downtime rollout.",
    url: "ci.calcify / meridian / run 2291",
  },
  {
    key: "live",
    name: "Live",
    body: "Then it runs. Real-time data, monitoring and a team that keeps improving it after launch.",
    url: "app.meridian.example / overview",
  },
] as const;

const N = STAGES.length;

function StepBar({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const scaleX = useTransform(progress, [index / N, (index + 1) / N], [0, 1]);
  return <motion.i className={styles.stepBar} style={{ scaleX }} />;
}

/** Address-bar text that decodes itself whenever the stage changes. */
function Address({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || el.textContent === text) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = text;
      return;
    }
    return scrambleTo(el, text, 520);
  }, [text]);
  return <span ref={ref}>{STAGES[0].url}</span>;
}

/**
 * Ch.02 — "From blank page to live system".
 *
 * A pinned stage ~four screens tall. Scrolling drives one product through
 * Calcify's whole delivery: the blueprint draws itself, the source types
 * itself, the pipeline runs, and the finished dashboard boots from skeletons
 * into a live, streaming UI. Under reduced motion it renders the finished
 * product once, unpinned.
 */
export default function BuildSequence() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const seg = (i: number) => [i / N, (i + 1) / N];
  const blueprintP = useTransform(scrollYProgress, seg(0), [0, 1]);
  const codeP = useTransform(scrollYProgress, seg(1), [0, 1]);
  const shipP = useTransform(scrollYProgress, seg(2), [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(N - 1, Math.floor(p * N));
    setStage((prev) => (prev === next ? prev : next));
  });

  const current = reduced ? N - 1 : stage;

  return (
    <section ref={ref} id="build" className={styles.section} data-static={Boolean(reduced)} data-lattice="grid">
      <div className={styles.sticky}>
        <div className="section-topline">
          <span>02 / How we build</span>
          <span>Scroll to build a product</span>
        </div>

        <div className={styles.layout}>
          <div className={styles.copy}>
            <h2 className={styles.title}>
              From blank page
              <br />
              to <em>live system.</em>
            </h2>
            <ol className={styles.steps}>
              {STAGES.map((s, i) => (
                <li key={s.key} data-active={i === current} data-done={i < current}>
                  <span className={styles.stepNum}>0{i + 1}</span>
                  <div>
                    <h3>{s.name}</h3>
                    <p>{s.body}</p>
                  </div>
                  {!reduced && <StepBar progress={scrollYProgress} index={i} />}
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.window} data-stage={STAGES[current].key}>
            <div className={styles.chrome}>
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.address}>
                <Address text={STAGES[current].url} />
              </span>
              <span className={styles.stagePill}>
                <i aria-hidden="true" /> {STAGES[current].name}
              </span>
            </div>
            <div className={styles.screen}>
              <div className={styles.layer} data-active={current === 0}>
                <Blueprint progress={blueprintP} />
              </div>
              <div className={styles.layer} data-active={current === 1}>
                <CodeEditor progress={codeP} />
              </div>
              <div className={styles.layer} data-active={current === 2}>
                <ShipLog progress={shipP} />
              </div>
              <div className={styles.layer} data-active={current === 3}>
                <LiveDashboard active={current === 3} still={Boolean(reduced)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
