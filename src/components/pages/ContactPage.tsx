"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import SubHero from "./SubHero";
import Magnetic from "@/components/motion/Magnetic";
import { brand, services } from "@/lib/content";
import styles from "./pages.module.css";

const INTERESTS = services.map((s) => s.title.replace(" Development", "").replace(" Services", ""));
const BUDGETS = ["Under $10k", "$10k – $50k", "$50k +", "Not sure yet"];
const NEXT = [
  ["You tell us the problem", "A few lines is plenty — what you want to change and why now."],
  ["We set up a short call", "We ask the awkward questions early, so the plan is real."],
  ["You get a plan and a quote", "Scope, timeline, team and price — in writing, no obligation."],
];

/**
 * Contact. There is no form backend yet, so sending composes an email with
 * everything filled in and opens the visitor's mail app — the page says so
 * plainly rather than pretending a message was delivered.
 */
export default function ContactPage() {
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const toggle = (v: string) => setInterests((list) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]));

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const lines = [
      `Name: ${name}`,
      `Email: ${String(data.get("email") ?? "").trim()}`,
      company ? `Company: ${company}` : null,
      interests.length > 0 ? `Interested in: ${interests.join(", ")}` : null,
      budget ? `Budget: ${budget}` : null,
      "",
      String(data.get("message") ?? "").trim(),
    ].filter((l): l is string => l !== null);
    const subject = `Project enquiry — ${name}${company ? `, ${company}` : ""}`;
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  return (
    <div className="studio-subpage">
      <SubHero
        index="01"
        eyebrow="Contact"
        label="Let's make the next move."
        lines={["Let’s make", <em key="em">the next move.</em>]}
        intro="Tell us what you're trying to change. We'll come back with a point of view, a practical path forward and the right people to make it happen."
      />

      <section className={styles.contact}>
        <div className={styles.contactSide}>
          <div className="section-topline">
            <span>02 / Start a conversation</span>
          </div>
          <h2>
            Bring us the <em>hard part.</em>
          </h2>
          <ol className={styles.next}>
            {NEXT.map(([title, body], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
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
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <a href={brand.whatsapp} target="_blank" rel="noreferrer">
                  Message us ↗
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form className={styles.form} onSubmit={submit}>
          <div className={styles.row2}>
            <label className={styles.field}>
              <span>Your name</span>
              <input name="name" required autoComplete="name" placeholder="Jane Perera" />
            </label>
            <label className={styles.field}>
              <span>Work email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" />
            </label>
          </div>
          <label className={styles.field}>
            <span>Company</span>
            <input name="company" autoComplete="organization" placeholder="Optional" />
          </label>

          <fieldset className={styles.chips}>
            <legend>What can we help with?</legend>
            {INTERESTS.map((v) => (
              <button key={v} type="button" aria-pressed={interests.includes(v)} onClick={() => toggle(v)}>
                {v}
              </button>
            ))}
          </fieldset>

          <fieldset className={styles.chips}>
            <legend>Rough budget</legend>
            {BUDGETS.map((v) => (
              <button key={v} type="button" aria-pressed={budget === v} onClick={() => setBudget(budget === v ? null : v)}>
                {v}
              </button>
            ))}
          </fieldset>

          <label className={styles.field}>
            <span>Tell us about it</span>
            <textarea name="message" required rows={5} placeholder="The product, the problem or the opportunity." />
          </label>

          <div className={styles.submitRow}>
            <Magnetic>
              <button type="submit" className="btn btn-primary btn-lg">
                Send via email <span aria-hidden="true">↗</span>
              </button>
            </Magnetic>
            <small>Opens your email app with everything filled in.</small>
          </div>

          <AnimatePresence>
            {sent && (
              <motion.p
                className={styles.sent}
                role="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Your email app should now be open with the message ready to send. Nothing opened?{" "}
                <a href={`mailto:${brand.email}`}>Email us directly</a> or{" "}
                <a href={brand.whatsapp} target="_blank" rel="noreferrer">
                  message us on WhatsApp
                </a>
                .
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </section>
    </div>
  );
}
