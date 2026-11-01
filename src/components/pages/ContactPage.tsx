"use client";

import { AnimatePresence, motion } from "framer-motion";
import { startTransition, useActionState, useState, type FormEvent } from "react";
import SubHero from "./SubHero";
import { sendEnquiry } from "@/app/contact/actions";
import Magnetic from "@/components/motion/Magnetic";
import { brand } from "@/lib/content";
import { BUDGETS, INTERESTS, type EnquiryState } from "@/lib/enquiry";
import styles from "./pages.module.css";

const NEXT = [
  ["You tell us the problem", "A few lines is plenty — what you want to change and why now."],
  ["We set up a short call", "We ask the awkward questions early, so the plan is real."],
  ["You get a plan and a quote", "Scope, timeline, team and price — in writing, no obligation."],
];

const DirectContact = () => (
  <>
    <a href={`mailto:${brand.email}`}>email us directly</a> or{" "}
    <a href={brand.whatsapp} target="_blank" rel="noreferrer">
      message us on WhatsApp
    </a>
  </>
);

/**
 * Contact. The form posts to a Server Action, which alerts the team and sends
 * the visitor a confirmation. If sending fails the page says so and offers
 * other ways to reach us, rather than claiming the message was delivered.
 */
export default function ContactPage() {
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, { status: "idle" });
  const errors = state.status === "invalid" ? state.errors : {};

  const toggle = (v: string) => setInterests((list) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]));

  // Dispatching by hand keeps what they typed if there's an error; a plain
  // `action` submit would clear the form. `action` stays on the <form> so an
  // early submit, before the page has hydrated, still posts safely.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
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

      <section className={styles.contact} data-lattice="calm">
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
          <dl className={styles.details} data-touch-pad>
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

        {state.status === "sent" ? (
          <motion.div
            className={`${styles.form} ${styles.success}`}
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span aria-hidden="true" className={styles.successMark}>
              ✓
            </span>
            <h3>
              Message <em>sent.</em>
            </h3>
            {state.confirmed ? (
              <p>
                We&apos;ve emailed a confirmation to <strong>{state.email}</strong>. If you can&apos;t see it, check your
                spam folder.
              </p>
            ) : (
              <p>Your enquiry has reached the team, and we&apos;ll be in touch soon.</p>
            )}
            <p>
              Need us sooner? You can <DirectContact />.
            </p>
          </motion.div>
        ) : (
          <form className={styles.form} action={action} onSubmit={submit}>
            {/* Honeypot: hidden from people, irresistible to bots. */}
            <div className={styles.trap} aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className={styles.row2}>
              <label className={styles.field}>
                <span>Your name</span>
                <input
                  name="name"
                  required
                  maxLength={120}
                  autoComplete="name"
                  placeholder="Jane Perera"
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <small className={styles.fieldError}>{errors.name}</small>}
              </label>
              <label className={styles.field}>
                <span>Work email</span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="jane@company.com"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <small className={styles.fieldError}>{errors.email}</small>}
              </label>
            </div>
            <label className={styles.field}>
              <span>Company</span>
              <input name="company" maxLength={160} autoComplete="organization" placeholder="Optional" />
            </label>

            <fieldset className={styles.chips}>
              <legend>What can we help with?</legend>
              {INTERESTS.map((v) => (
                <button key={v} type="button" aria-pressed={interests.includes(v)} onClick={() => toggle(v)}>
                  {v}
                </button>
              ))}
              {interests.map((v) => (
                <input key={v} type="hidden" name="interests" value={v} />
              ))}
            </fieldset>

            <fieldset className={styles.chips}>
              <legend>Rough budget</legend>
              {BUDGETS.map((v) => (
                <button key={v} type="button" aria-pressed={budget === v} onClick={() => setBudget(budget === v ? null : v)}>
                  {v}
                </button>
              ))}
              {budget && <input type="hidden" name="budget" value={budget} />}
            </fieldset>

            <label className={styles.field}>
              <span>Tell us about it</span>
              <textarea
                name="message"
                required
                maxLength={4000}
                rows={5}
                placeholder="The product, the problem or the opportunity."
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && <small className={styles.fieldError}>{errors.message}</small>}
            </label>

            <div className={styles.submitRow}>
              <Magnetic>
                <button type="submit" className="btn btn-primary btn-lg" disabled={pending}>
                  {pending ? "Sending…" : "Send enquiry"} <span aria-hidden="true">↗</span>
                </button>
              </Magnetic>
              <small>You&apos;ll get a confirmation by email.</small>
            </div>

            <AnimatePresence>
              {(state.status === "failed" || state.status === "limited") && (
                <motion.p
                  className={styles.alert}
                  role="alert"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {state.status === "failed"
                    ? "Sorry, your message didn't go through. "
                    : "That's a few messages in a short time, so please try again later. "}
                  You can also <DirectContact />.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        )}
      </section>
    </div>
  );
}
