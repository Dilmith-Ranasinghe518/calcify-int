import Link from "next/link";
import RevealText from "@/components/motion/RevealText";
import Spotlight from "@/components/motion/Spotlight";
import Reveal from "@/components/ui/Reveal";
import ServiceVisual, { type VisualKind } from "./ServiceVisual";
import { services } from "@/lib/content";
import styles from "./Capabilities.module.css";

const FEATURED: { slug: string; visual: VisualKind; blurb: string; size: "wide" | "tall" | "base" }[] = [
  { slug: "erp", visual: "erp", size: "wide", blurb: "Operations, finance, HR and supply chain on one system shaped around how you actually work." },
  { slug: "ai", visual: "ai", size: "tall", blurb: "Models, vision and generative AI wired into real workflows — measured, not demoed." },
  { slug: "web", visual: "web", size: "base", blurb: "Portals and platforms that load instantly and scale from day one." },
  { slug: "mobile", visual: "mobile", size: "base", blurb: "Native and cross-platform apps people keep on their home screen." },
  { slug: "cloud", visual: "cloud", size: "base", blurb: "AWS, Azure and GCP architecture with automation and multi-region resilience." },
  { slug: "security", visual: "security", size: "wide", blurb: "Zero-trust architecture, assessments and monitoring around everything we ship." },
];

const titleOf = (slug: string) => services.find((s) => s.slug === slug)?.title.replace(" Development", "") ?? slug;
const MORE = services.filter((s) => !FEATURED.some((f) => f.slug === s.slug));

export default function Capabilities() {
  return (
    <section id="services" className={styles.section}>
      <div className="section-topline">
        <span>03 / Capabilities</span>
        <span>Strategy · Design · Engineering</span>
      </div>

      <div className={styles.head}>
        <RevealText
          className={styles.title}
          label="Everything it takes to ship."
          lines={["Everything it", <span key="2">takes to <em>ship.</em></span>]}
        />
        <p>
          One senior team across the whole stack — so the strategy, the interface, the data and the infrastructure
          are designed together instead of handed over.
        </p>
      </div>

      <div className={styles.grid}>
        {FEATURED.map((f, i) => (
          <Reveal key={f.slug} delay={(i % 3) * 90} className={styles[f.size]}>
            <Spotlight className={styles.card} id={`cap-${f.slug}`}>
              <div className={styles.visual} aria-hidden="true">
                <ServiceVisual kind={f.visual} />
              </div>
              <div className={styles.copy}>
                <span className={styles.index}>0{i + 1}</span>
                <h3>{titleOf(f.slug)}</h3>
                <p>{f.blurb}</p>
              </div>
              <Link href={`/services#${f.slug}`} className={styles.cardLink} aria-label={`${titleOf(f.slug)} — learn more`}>
                <span aria-hidden="true" className={styles.arrow}>
                  ↗
                </span>
              </Link>
            </Spotlight>
          </Reveal>
        ))}
      </div>

      <div className={styles.more}>
        <span>Also</span>
        {MORE.map((s) => (
          <Link key={s.slug} href={`/services#${s.slug}`} className={styles.chip}>
            {s.title}
          </Link>
        ))}
        <Link href="/services" className="text-link">
          All services <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
