"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import RevealText from "@/components/motion/RevealText";
import styles from "./Process.module.css";

const STEPS = [
  {
    name: "Discover",
    time: "Week 1",
    body: "Workshops with your team to map the workflows, the users and the numbers that matter.",
    artifact: "discovery-notes.md",
  },
  {
    name: "Architect",
    time: "Weeks 2–3",
    body: "Data model, integrations and screen blueprints — agreed before a line of production code.",
    artifact: "architecture.svg",
  },
  {
    name: "Build",
    time: "Two-week sprints",
    body: "Working software every sprint, demoed to you, with tests and code review on every change.",
    artifact: "sprint-12.diff",
  },
  {
    name: "Launch",
    time: "Release day",
    body: "Zero-downtime release, data migration and hands-on training for the people who will use it.",
    artifact: "release v1.0.0",
  },
  {
    name: "Scale",
    time: "Ongoing",
    body: "Monitoring, support and a living roadmap — we stay on to make it better every month.",
    artifact: "status: healthy",
  },
];

/**
 * Ch.05 — the engagement as a timeline. The spine draws itself as you read
 * down, each milestone lights when the line reaches it, and the oversized
 * counter on the left flips to the current step.
 */
export default function Process({ index = "05" }: { index?: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(STEPS.length - 1, Math.max(0, Math.floor(p * STEPS.length)));
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <section className={styles.section} id="process">
      <div className="section-topline">
        <span>{index} / Process</span>
        <span>Simple on purpose</span>
      </div>

      <div className={styles.layout}>
        <div className={styles.aside}>
          <div className={styles.sticky}>
            <RevealText className={styles.title} label="Good work has a rhythm." lines={["Good work", <span key="2">has a <em>rhythm.</em></span>]} />
            <div className={styles.counter} aria-hidden="true">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  0{active + 1}
                </motion.span>
              </AnimatePresence>
              <small>/ 0{STEPS.length}</small>
            </div>
            <p className={styles.current} aria-hidden="true">
              {STEPS[active].name} · {STEPS[active].time}
            </p>
          </div>
        </div>

        <div className={styles.list}>
          <span className={styles.spine} aria-hidden="true">
            <motion.i style={{ scaleY: line }} />
          </span>
          <ol ref={listRef}>
            {STEPS.map((s, i) => (
              <li key={s.name} data-reached={i <= active}>
                <span className={styles.dot} aria-hidden="true" />
                <div className={styles.row}>
                  <span className={styles.time}>{s.time}</span>
                  <h3>{s.name}</h3>
                  <p>{s.body}</p>
                  <code className={styles.artifact}>{s.artifact}</code>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
