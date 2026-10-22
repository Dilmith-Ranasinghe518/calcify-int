"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import RevealText from "@/components/motion/RevealText";
import Magnetic from "@/components/motion/Magnetic";
import { CyclingWord } from "@/components/motion/Scramble";
import styles from "./Hero.module.css";

const WORDS = ["software", "AI systems", "data platforms", "cloud", "ERP", "mobile apps"];
const DISCIPLINES = ["ERP", "Web", "AI", "Mobile", "Cloud", "Security", "Data", "QA"];

/** Colombo wall clock — ticks so the hero never sits perfectly still. */
function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Colombo",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return <span className={styles.clock}>{now ?? "--:--:--"}</span>;
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className={styles.hero} data-lattice="drift">
      <div aria-hidden="true" className={styles.vignette} />

      <motion.div className={styles.inner} style={{ y, opacity }}>
        <motion.div
          className={styles.meta}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className={styles.status}>
            <i aria-hidden="true" /> Now taking on new projects
          </span>
          <span className={styles.metaRight}>
            Colombo <LocalTime /> · Worldwide
          </span>
        </motion.div>

        <h1 className={styles.title}>
          <span className="sr-only">
            Engineering software, AI systems, data platforms, cloud, ERP and mobile apps at scale.
          </span>
          <span aria-hidden="true">
            <RevealText as="div" onMount delay={0.15} lines={["Engineering"]} />
            <span className={styles.cycleRow}>
              <motion.span
                className={styles.cycleBracket}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.6 }}
              >
                <CyclingWord words={WORDS} className={styles.cycle} />
                <span className={styles.caret} />
              </motion.span>
            </span>
            <RevealText as="div" onMount delay={0.3} lines={["at scale."]} />
          </span>
        </h1>

        <div className={styles.bottom}>
          <motion.p
            className={styles.lede}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            We design and engineer the platforms ambitious companies need to run on — ERP, customer apps and AI
            that actually ships.
          </motion.p>
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnetic>
              <Link href="/contact" className="btn btn-primary">
                Start a project <span aria-hidden="true">↗</span>
              </Link>
            </Magnetic>
            <Link href="/#work" className="btn btn-ghost">
              See the work
            </Link>
          </motion.div>
        </div>

        <motion.div
          className={styles.foot}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className={styles.scrollCue}>
            <i aria-hidden="true" /> Scroll to explore
          </span>
          <ul className={styles.disciplines} aria-label="Disciplines">
            {DISCIPLINES.map((d, i) => (
              <li key={d} style={{ animationDelay: `${i * 0.35}s` }}>
                {d}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
