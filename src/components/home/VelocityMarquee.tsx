"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";
import styles from "./VelocityMarquee.module.css";

const DISCIPLINES = ["ERP", "AI", "Cloud", "Mobile", "Web", "Security", "Data", "QA"];
const STACK = ["Next.js", "React", "Flutter", "Kotlin", "Swift", "Python", "Node.js", "PostgreSQL", "AWS", "Azure", "GCP", "Kubernetes", "TensorFlow", "OpenAI", "SAP", "Odoo"];

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * One endless row. It cruises on its own, and scrolling the page throws it
 * faster (and flips its direction when you scroll back up), with a little
 * skew so the speed reads physically.
 */
function Row({ items, speed, variant }: { items: string[]; speed: number; variant: "big" | "chips" }) {
  const reduced = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2500, 2500], [7, -7]);
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    let move = direction.current * speed * (delta / 1000);
    move += move * Math.abs(b);
    base.set(base.get() + move);
  });

  const doubled = [...items, ...items];
  return (
    <div className={styles.row}>
      <motion.div className={styles.track} style={{ x, skewX: reduced ? 0 : skew }}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className={variant === "big" ? styles.big : styles.chip} aria-hidden={i >= items.length}>
            {item}
            {variant === "big" && <i aria-hidden="true">✦</i>}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** What we do, and what we do it with — thrown along by the scroll. */
export default function VelocityMarquee() {
  return (
    <section className={styles.section} aria-label="Disciplines and technology" data-lattice="drift">
      <p className={styles.label}>
        <span>What we build · what we build it with</span>
        <span>Scroll faster ↓</span>
      </p>
      <Row items={DISCIPLINES} speed={-2.2} variant="big" />
      <Row items={STACK} speed={1.6} variant="chips" />
    </section>
  );
}
