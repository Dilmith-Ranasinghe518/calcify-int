"use client";

import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { useState } from "react";
import { highlight } from "./highlight";
import styles from "./build.module.css";

const SOURCE = `// app/overview/page.tsx
import { getMetrics, getOrders } from "@/lib/erp";
import { KpiRow, RevenueChart, LiveFeed } from "@/ui";

export default async function Overview() {
  const metrics = await getMetrics({ range: "30d" });
  const orders = await getOrders({ status: "open", take: 8 });

  return (
    <Shell nav={<Sidebar active="overview" />}>
      <Header title="Overview" search />
      <KpiRow items={metrics.kpis} live />
      <RevenueChart data={metrics.revenue} />
      <OrdersTable rows={orders} />
      <LiveFeed channel="events" />
    </Shell>
  );
}`;

const LINES = SOURCE.split("\n").map(highlight);
const TOTAL = SOURCE.length;
const LENGTHS = LINES.map((tokens) => tokens.reduce((n, t) => n + t.text.length, 0));
// Character offset where each line starts (+1 per line for the newline).
const STARTS = LENGTHS.map((_, i) => LENGTHS.slice(0, i).reduce((n, l) => n + l + 1, 0));
const FILES = ["page.tsx", "erp.ts", "schema.prisma"];
const TREE = ["app/", "  overview/", "    page.tsx", "lib/", "  erp.ts", "ui/", "prisma/"];

/**
 * Stage 02 — the screen's source writes itself as you scroll, keystroke
 * for keystroke, with a status bar that only goes green once it's complete.
 */
export default function CodeEditor({ progress }: { progress: MotionValue<number> }) {
  const [typed, setTyped] = useState(0);

  useMotionValueEvent(progress, "change", (p) => {
    // Finish typing at 85% of the stage so the finished file gets a beat on screen.
    const next = Math.round(Math.min(1, p / 0.85) * TOTAL);
    setTyped((prev) => (prev === next ? prev : next));
  });

  // The caret sits on the first line that typing hasn't finished yet.
  const caretLine = Math.max(0, STARTS.findIndex((start, i) => typed <= start + LENGTHS[i]));
  const done = typed >= TOTAL;

  return (
    <div className={styles.editor}>
      <aside className={styles.tree} aria-hidden="true">
        <span className={styles.treeHead}>Explorer</span>
        {TREE.map((item) => (
          <span key={item} className={item.trim() === "page.tsx" ? styles.treeActive : undefined}>
            {item}
          </span>
        ))}
      </aside>
      <div className={styles.editorMain}>
        <div className={styles.tabs} aria-hidden="true">
          {FILES.map((f, i) => (
            <span key={f} data-active={i === 0}>
              {f}
            </span>
          ))}
        </div>
        <pre className={styles.code} aria-label="Example source code for the dashboard">
          {LINES.map((tokens, li) => {
            const visible = Math.max(0, Math.min(LENGTHS[li], typed - STARTS[li]));
            const showCaret = li === caretLine;
            let left = visible;
            return (
              <div key={li} className={styles.codeLine} data-dim={visible === 0 && !showCaret}>
                <span className={styles.lineNo}>{li + 1}</span>
                <span>
                  {tokens.map((t, ti) => {
                    if (left <= 0) return null;
                    const text = t.text.slice(0, left);
                    left -= text.length;
                    return (
                      <span key={ti} className={styles[t.kind]}>
                        {text}
                      </span>
                    );
                  })}
                  {showCaret && <i className={styles.caret} />}
                </span>
              </div>
            );
          })}
        </pre>
        <div className={styles.statusBar} aria-hidden="true">
          <span>TypeScript · TSX</span>
          <span data-ok={done}>{done ? "✓ 0 problems" : `Ln ${Math.min(LINES.length, 1 + SOURCE.slice(0, typed).split("\n").length - 1)} · typing…`}</span>
        </div>
      </div>
    </div>
  );
}
