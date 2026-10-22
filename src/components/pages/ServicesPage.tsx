import Link from "next/link";
import SubHero from "./SubHero";
import RevealText from "@/components/motion/RevealText";
import Spotlight from "@/components/motion/Spotlight";
import Reveal from "@/components/ui/Reveal";
import ServiceVisual, { type VisualKind } from "@/components/home/ServiceVisual";
import Process from "@/components/home/Process";
import ClosingCta from "@/components/home/ClosingCta";
import { services } from "@/lib/content";
import styles from "./pages.module.css";

const VISUAL: Record<string, VisualKind> = {
  erp: "erp",
  web: "web",
  ai: "ai",
  mobile: "mobile",
  cloud: "cloud",
  security: "security",
  transformation: "transformation",
  data: "data",
  qa: "qa",
};

export default function ServicesPage() {
  return (
    <div className="studio-subpage">
      <SubHero
        index="01"
        eyebrow="Services"
        label="Ideas into momentum."
        lines={["Ideas into", <em key="em">momentum.</em>]}
        intro="Nine disciplines, one senior team. We turn complex operations, bold products and new opportunities into systems that move the business forward."
        aside={
          <nav className={styles.jump} aria-label="Jump to a service">
            {services.map((s) => (
              <Link key={s.slug} href={`#${s.slug}`}>
                {s.title.replace(" Development", "").replace(" Services", "")}
              </Link>
            ))}
          </nav>
        }
      />

      <section className={styles.block} data-lattice="grid">
        <div className="section-topline">
          <span>02 / Capabilities</span>
          <span>Strategy · Design · Engineering</span>
        </div>
        <RevealText
          className={styles.blockTitle}
          label="What we can take off your plate."
          lines={["What we can take", <span key="2">off your <em>plate.</em></span>]}
        />

        <div className={styles.serviceList}>
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={60}>
              <Spotlight className={styles.service} id={s.slug}>
                <div className={styles.serviceCopy}>
                  <span className={styles.cardIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <Link href="/contact" className="text-link">
                    Discuss {s.title.replace(" Development", "").replace(" Services", "").toLowerCase()} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <div className={styles.serviceVisual} aria-hidden="true">
                  <ServiceVisual kind={VISUAL[s.slug]} />
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      <Process index="03" />
      <ClosingCta index="04" />
    </div>
  );
}
