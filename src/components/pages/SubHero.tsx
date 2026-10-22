"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import NetworkCanvas from "@/components/home/NetworkCanvas";
import RevealText from "@/components/motion/RevealText";
import styles from "./pages.module.css";

/** Opening screen shared by the inner pages: the lattice, a big headline, a short intro. */
export default function SubHero({
  index,
  eyebrow,
  lines,
  label,
  intro,
  aside,
}: {
  index: string;
  eyebrow: string;
  lines: ReactNode[];
  /** The headline as one plain sentence, for assistive tech. */
  label: string;
  intro: string;
  aside?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className={styles.hero}>
      <div className={styles.heroCanvas}>
        <NetworkCanvas scatter={scrollYProgress} className={styles.canvas} />
      </div>
      <div aria-hidden="true" className={styles.heroFade} />
      <motion.div className={styles.heroInner} style={{ y, opacity }}>
        <div className="section-topline">
          <span>
            {index} / {eyebrow}
          </span>
          <span>Calcify International · Colombo → worldwide</span>
        </div>
        <RevealText as="h1" onMount delay={0.1} className={styles.heroTitle} label={label} lines={lines} />
        <div className={styles.heroBottom}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {intro}
          </motion.p>
          {aside}
        </div>
      </motion.div>
    </section>
  );
}
