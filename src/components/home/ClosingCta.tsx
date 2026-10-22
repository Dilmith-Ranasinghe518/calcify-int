import Link from "next/link";
import CommandLine from "./CommandLine";
import Magnetic from "@/components/motion/Magnetic";
import RevealText from "@/components/motion/RevealText";
import { brand } from "@/lib/content";
import styles from "./ClosingCta.module.css";

export default function ClosingCta({ index = "06" }: { index?: string }) {
  return (
    <section className={styles.section} id="contact" data-lattice="converge">
      <div aria-hidden="true" className={styles.fade} />

      <div className={styles.inner}>
        <div className="section-topline">
          <span>{index} / Contact</span>
          <span>Start a conversation</span>
        </div>

        <RevealText
          className={styles.title}
          label="Let's build what's next."
          lines={["Let’s build", <em key="next">what’s next.</em>]}
        />

        <div className={styles.grid}>
          <div className={styles.left}>
            <p>
              Tell us what you&apos;re trying to change. We&apos;ll come back with a point of view, a practical plan and
              the people to deliver it.
            </p>
            <div className={styles.actions}>
              <Magnetic>
                <Link href="/contact" className="btn btn-primary btn-lg">
                  Start a project <span aria-hidden="true">↗</span>
                </Link>
              </Magnetic>
              <a href={brand.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost btn-lg">
                WhatsApp us
              </a>
            </div>
            <dl className={styles.details}>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
                </dd>
              </div>
            </dl>
          </div>
          <CommandLine />
        </div>
      </div>
    </section>
  );
}
