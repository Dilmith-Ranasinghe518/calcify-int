import SubHero from "./SubHero";
import ScrubText from "@/components/motion/ScrubText";
import RevealText from "@/components/motion/RevealText";
import RollingNumber from "@/components/motion/RollingNumber";
import Spotlight from "@/components/motion/Spotlight";
import Reveal from "@/components/ui/Reveal";
import Process from "@/components/home/Process";
import ClosingCta from "@/components/home/ClosingCta";
import { facts } from "@/lib/content";
import styles from "./pages.module.css";

const PRINCIPLES = [
  {
    title: "Built around clarity",
    body: "We make complicated businesses easier to understand, operate and grow — the system should explain itself.",
    code: "clarity > cleverness",
  },
  {
    title: "Senior people, start to finish",
    body: "The people in the first workshop are the people writing the code and the people supporting it after launch.",
    code: "handoffs = 0",
  },
  {
    title: "Ready for scale",
    body: "Architecture, tests and monitoring designed for the next stage of your business, not just the next launch.",
    code: "load(10×) // planned",
  },
];

export default function AboutPage() {
  return (
    <div className="studio-subpage">
      <SubHero
        index="01"
        eyebrow="About Calcify"
        label="We make useful things."
        lines={["We make", <em key="em">useful things.</em>]}
        intro="Calcify is a software studio for ambitious companies. Strategy, design and engineering under one roof — so the next version of your business actually gets built."
      />

      <section className={styles.statement} data-lattice="calm">
        <div className="section-topline">
          <span>02 / The short version</span>
          <span>Why we exist</span>
        </div>
        <ScrubText
          className={styles.statementText}
          text="Software should feel less like a project and more like a *new capability* — something your team reaches for every day, and that keeps getting *better.*"
        />
      </section>

      <section className={styles.block} id="how" data-lattice="grid">
        <div className="section-topline">
          <span>03 / How we work</span>
          <span>People × process × product</span>
        </div>
        <RevealText
          className={styles.blockTitle}
          label="Three promises we build on."
          lines={["Three promises", <span key="2">we <em>build on.</em></span>]}
        />
        <div className={styles.cards}>
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <Spotlight className={styles.card}>
                <span className={styles.cardIndex}>0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <code>{p.code}</code>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.block} data-lattice="calm">
        <div className="section-topline">
          <span>04 / What you get</span>
          <span>On every engagement</span>
        </div>
        <dl className={styles.facts}>
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 80} className={styles.fact}>
              <dt>{f.label}</dt>
              <dd>
                <RollingNumber value={f.value} delay={i * 0.12} />
              </dd>
            </Reveal>
          ))}
        </dl>
        <p className={styles.founding}>
          <span className={styles.liveDot} aria-hidden="true" />
          We are taking on a small number of founding clients, with senior engineers on every project.
        </p>
      </section>

      <Process index="05" />
      <ClosingCta index="06" />
    </div>
  );
}
