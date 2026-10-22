import Link from "next/link";
import ScrubText from "@/components/motion/ScrubText";
import RollingNumber from "@/components/motion/RollingNumber";
import Reveal from "@/components/ui/Reveal";
import { facts } from "@/lib/content";
import styles from "./Manifesto.module.css";

export default function Manifesto() {
  return (
    <section className={styles.section} id="about" data-lattice="calm">
      <div className="section-topline">
        <span>01 / Who we are</span>
        <span>People × process × product</span>
      </div>

      <ScrubText
        className={styles.statement}
        text="We turn hard problems into *useful software.* Strategy, design and engineering under one roof — for companies that need their technology to *work harder* than they do."
      />

      <div className={styles.foot}>
        <p>
          ERP platforms, customer apps and AI systems — designed, built and supported by one senior team, from the
          first workshop to long after launch.
        </p>
        <Link href="/about" className="text-link">
          More about Calcify <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <dl className={styles.stats}>
        {facts.map((f, i) => (
          <Reveal key={f.label} delay={i * 80} className={styles.stat}>
            <dt>{f.label}</dt>
            <dd>
              <RollingNumber value={f.value} delay={i * 0.12} />
            </dd>
            <span aria-hidden="true" className={styles.bar} style={{ animationDelay: `${i * -0.7}s` }} />
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
