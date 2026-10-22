"use client";

import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ConceptVisual from "./ConceptVisual";
import { work } from "@/lib/content";
import styles from "./WorkRail.module.css";

function Card({ item, index, progress }: { item: (typeof work)[number]; index: number; progress: MotionValue<number> }) {
  // The scene drifts against the direction of travel, so each frame reads as a window.
  const shift = useTransform(progress, [0, 1], ["-4%", "4%"]);
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <motion.div className={styles.mediaInner} style={{ x: shift }}>
          <ConceptVisual kind={item.visual} />
        </motion.div>
        <span className={styles.tag}>{item.category}</span>
        <span className={styles.num}>Concept 0{index + 1}</span>
      </div>
      <div className={styles.body}>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
        <ul className={styles.stack} aria-label="Typical stack">
          {item.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/**
 * Ch.04 — what we build, as concept platforms on a horizontal rail. The section is exactly as tall
 * as the rail is wide, so vertical scrolling moves the cards sideways one to
 * one. Reduced motion: a plain vertical list.
 */
export default function WorkRail() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const x = useTransform(smooth, (v) => -v * distance);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(work.length - 1, Math.max(0, Math.round(p * (work.length + 0.4) - 0.4)));
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <section
      ref={ref}
      id="work"
      className={styles.section}
      data-static={Boolean(reduced)}
      style={reduced ? undefined : { height: `calc(100svh + ${distance}px)` }}
    >
      <div className={styles.sticky}>
        <motion.div ref={trackRef} className={styles.track} style={reduced ? undefined : { x }}>
          <div className={styles.intro}>
            <span className={styles.kicker}>04 / What we build</span>
            <h2>
              Made for
              <br />
              <em>complex</em>
              <br />
              problems.
            </h2>
            <p>
              Four kinds of platform we are set up to design, build and run — the problems we want you to hand us.
            </p>
            <span className={styles.hint} aria-hidden="true">
              Keep scrolling <i>→</i>
            </span>
          </div>

          {work.map((item, i) => (
            <Card key={item.title} item={item} index={i} progress={smooth} />
          ))}

          <div className={styles.outro}>
            <p>Have a platform in mind?</p>
            <Link href="/contact" className="btn btn-primary">
              Start a project <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </motion.div>

        {!reduced && (
          <div className={styles.progress} aria-hidden="true">
            <span className={styles.count}>
              0{active + 1} <small>/ 0{work.length}</small>
            </span>
            <span className={styles.rail}>
              <motion.i style={{ scaleX: smooth }} />
            </span>
            <span className={styles.label}>{work[active].title}</span>
          </div>
        )}
      </div>
    </section>
  );
}
