"use client";

import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { brand, services, work } from "@/lib/content";
import styles from "./ClosingCta.module.css";

type Line = { id: number; kind: "in" | "out" | "ok" | "err"; content: ReactNode };

const HELP = "help · services · work · process · contact · about · whoami · start · clear";
let uid = 0;
const line = (kind: Line["kind"], content: ReactNode): Line => ({ id: uid++, kind, content });

/**
 * A real (tiny) shell for the closing section. Visitors can type their way
 * around the studio; if they don't, it demos itself once by typing `help`.
 */
export default function CommandLine() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const outRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const touched = useRef(false);
  const inView = useInView(rootRef, { once: true, amount: 0.6 });
  const [value, setValue] = useState("");
  const [lines, setLines] = useState<Line[]>(() => [
    line("out", "Calcify shell v2.6 — type a command, or `help`."),
  ]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const echo = line("in", raw);
    let reply: Line[] = [];

    if (!cmd) reply = [];
    else if (cmd === "help") reply = [line("out", HELP)];
    else if (cmd === "services") reply = services.map((s, i) => line("out", `${String(i + 1).padStart(2, "0")}  ${s.title}`));
    else if (cmd === "work") reply = work.map((w) => line("out", `${w.category.padEnd(16)} ${w.title}`));
    else if (cmd === "process") reply = [line("out", "discover → architect → build → launch → scale")];
    else if (cmd === "about") reply = [line("out", "Calcify International · software studio · Colombo → worldwide")];
    else if (cmd === "whoami") reply = [line("out", "visitor — most likely someone with a hard problem worth solving")];
    else if (cmd === "contact")
      reply = [
        line("ok", <a href={`mailto:${brand.email}`}>{brand.email}</a>),
        line("ok", <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>),
        line("ok", <a href={brand.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>),
      ];
    else if (cmd === "start" || cmd === "hire") {
      reply = [line("ok", "Opening the project brief…")];
      window.setTimeout(() => router.push("/contact"), 700);
    } else if (cmd === "clear") {
      setLines([]);
      return;
    } else if (cmd.startsWith("sudo")) reply = [line("err", "Permission denied — but we like the confidence.")];
    else reply = [line("err", `command not found: ${cmd.split(" ")[0]} — try \`help\``)];

    setLines((prev) => [...prev, echo, ...reply].slice(-40));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    touched.current = true;
    run(value);
    setValue("");
  };

  // Self-demo: type `help` once, unless the visitor got there first.
  useEffect(() => {
    if (!inView || touched.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const word = "help";
    const timers: number[] = [];
    word.split("").forEach((_, i) => {
      timers.push(window.setTimeout(() => !touched.current && setValue(word.slice(0, i + 1)), 600 + i * 140));
    });
    timers.push(
      window.setTimeout(() => {
        if (touched.current) return;
        run(word);
        setValue("");
      }, 600 + word.length * 140 + 350),
    );
    return () => timers.forEach(window.clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once when first seen
  }, [inView]);

  useEffect(() => {
    const out = outRef.current;
    if (out) out.scrollTop = out.scrollHeight;
  }, [lines]);

  return (
    <div ref={rootRef} className={styles.shell} onClick={() => inputRef.current?.focus()}>
      <div className={styles.shellBar} aria-hidden="true">
        <span>
          <i />
          <i />
          <i />
        </span>
        calcify — zsh
      </div>
      <div ref={outRef} className={styles.shellOut} aria-live="polite" data-lenis-prevent>
        {lines.map((l) => (
          <div key={l.id} className={styles[l.kind]}>
            {l.kind === "in" && <span className={styles.prompt}>visitor@calcify ~ %</span>} {l.content}
          </div>
        ))}
        <form onSubmit={submit} className={styles.shellForm}>
          <label htmlFor="calcify-shell" className={styles.prompt}>
            visitor@calcify ~ %
          </label>
          <input
            id="calcify-shell"
            ref={inputRef}
            value={value}
            onChange={(e) => {
              touched.current = true;
              setValue(e.target.value);
            }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Type a command, for example help"
          />
        </form>
      </div>
    </div>
  );
}
