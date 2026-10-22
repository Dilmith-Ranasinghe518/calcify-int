"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SCREEN } from "./layout";
import styles from "./build.module.css";

type Kpi = { label: string; value: number; delta: number; format: (v: number) => string; spark: number[] };
type Order = { id: string; customer: string; amount: string; status: number };
type Event = { id: number; text: string; tone: "ok" | "info" | "warn" };

const STATUS = ["Processing", "Packed", "Shipped", "Delivered"];
const NAV = ["Overview", "Orders", "Inventory", "Finance", "People", "Reports", "Settings"];
const EVENTS: Omit<Event, "id">[] = [
  { text: "Order #18,233 paid · $1,240", tone: "ok" },
  { text: "Invoice INV-2291 sent to Summit Foods", tone: "info" },
  { text: "Stock low · SKU-114 (12 left)", tone: "warn" },
  { text: "Payroll run approved for October", tone: "ok" },
  { text: "New warehouse scan · Bay C-07", tone: "info" },
  { text: "Refund processed · #18,190", tone: "info" },
  { text: "Shipment ORB-552 delivered", tone: "ok" },
  { text: "Forecast updated by AI model v3", tone: "info" },
];

const money = (v: number) => `$${(v / 1_000_000).toFixed(2)}M`;
const count = (v: number) => Math.round(v).toLocaleString("en-US");
const pct = (v: number) => `${v.toFixed(1)}%`;
const seedSpark = (base: number) => Array.from({ length: 12 }, (_, i) => base + Math.sin(i * 0.9) * 6 + i * 1.6);

const initialKpis = (): Kpi[] => [
  { label: "Revenue · 30d", value: 2_481_300, delta: 12.4, format: money, spark: seedSpark(20) },
  { label: "Orders", value: 18_204, delta: 8.1, format: count, spark: seedSpark(14) },
  { label: "On-time delivery", value: 98.6, delta: 1.2, format: pct, spark: seedSpark(26) },
  { label: "Active users", value: 4_812, delta: 5.7, format: count, spark: seedSpark(10) },
];

const initialOrders: Order[] = [
  { id: "#18,229", customer: "Summit Foods", amount: "$4,820", status: 2 },
  { id: "#18,230", customer: "Blue Harbor Co.", amount: "$1,190", status: 1 },
  { id: "#18,231", customer: "Orbit Logistics", amount: "$12,400", status: 0 },
];

const initialBars = Array.from({ length: 18 }, (_, i) => 38 + ((i * 29) % 44) + i * 1.4);
const initialEvents: Event[] = EVENTS.slice(0, 6).map((e, i) => ({ ...e, id: i }));

function Spark({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 64},${22 - ((v - min) / (max - min || 1)) * 20}`).join(" ");
  return (
    <svg viewBox="0 0 64 24" className={styles.spark}>
      <polyline points={pts} />
    </svg>
  );
}

/**
 * Stage 04 — the finished product, running. It boots through skeleton
 * placeholders, then every panel keeps moving: figures tick, bars re-balance,
 * orders change status and events stream into the feed.
 * All of it is sample data, and labelled as such.
 */
export default function LiveDashboard({ active, still = false }: { active: boolean; still?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, x: 0, y: 0 });
  const [booted, setBooted] = useState(false);
  const ready = still || (active && booted);
  const [kpis, setKpis] = useState(initialKpis);
  const [bars, setBars] = useState(initialBars);
  const [orders, setOrders] = useState(initialOrders);
  const [events, setEvents] = useState(initialEvents);
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // Contain the fixed 1000 × 625 screen inside whatever box the window has.
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const scale = Math.min(width / SCREEN.w, height / SCREEN.h);
      setFit({ scale, x: (width - SCREEN.w * scale) / 2, y: (height - SCREEN.h * scale) / 2 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Re-boot through the skeleton every time the stage is entered.
  useEffect(() => {
    if (still || !active) return;
    const id = window.setTimeout(() => setBooted(true), 900);
    return () => {
      window.clearTimeout(id);
      setBooted(false);
    };
  }, [active, still]);

  useEffect(() => {
    if (!active || !ready || still) return;
    let n = initialEvents.length;
    const id = window.setInterval(() => {
      setKpis((list) =>
        list.map((k, i) => {
          const drift = [Math.random() * 2400, Math.random() * 4, (Math.random() - 0.45) * 0.1, (Math.random() - 0.4) * 14][i];
          const value = i === 2 ? Math.min(99.9, Math.max(97.5, k.value + drift)) : k.value + drift;
          const last = k.spark[k.spark.length - 1];
          return { ...k, value, spark: [...k.spark.slice(1), last + (Math.random() - 0.35) * 6] };
        }),
      );
      setBars((list) => [...list.slice(1), 36 + Math.random() * 58]);
      const row = (Math.random() * initialOrders.length) | 0;
      setOrders((list) => list.map((o, j) => (j === row ? { ...o, status: (o.status + 1) % STATUS.length } : o)));
      setFlash(initialOrders[row].id);
      const next = EVENTS[n % EVENTS.length];
      n += 1;
      setEvents((list) => [{ ...next, id: n }, ...list].slice(0, 7));
    }, 1900);
    return () => window.clearInterval(id);
  }, [active, ready, still]);

  const max = Math.max(...bars);

  return (
    <div ref={wrapRef} className={styles.liveWrap}>
      <div
        className={styles.live}
        data-ready={ready}
        style={{ transform: `translate(${fit.x}px, ${fit.y}px) scale(${fit.scale})` }}
      >
        <aside className={styles.dNav}>
          <div className={styles.dBrand}>
            <span>M</span> Meridian
          </div>
          {NAV.map((item, i) => (
            <div key={item} className={styles.dNavItem} data-active={i === 0}>
              <i /> {ready ? item : <b className={styles.skel} style={{ width: 60 + (i % 3) * 14 }} />}
            </div>
          ))}
        </aside>

        <header className={styles.dHeader}>
          <strong>{ready ? "Overview" : <b className={styles.skel} style={{ width: 110, height: 16 }} />}</strong>
          <span className={styles.dSearch}>Search orders, people, SKUs… <kbd>/</kbd></span>
          <span className={styles.dChip}>Sample data</span>
          <span className={styles.dLive}>
            <i /> Live
          </span>
        </header>

        <div className={styles.dKpis}>
          {kpis.map((k, i) => (
            <div key={k.label} className={styles.dKpi} style={{ transitionDelay: `${i * 70}ms` }}>
              {ready ? (
                <>
                  <span>{k.label}</span>
                  <strong>{k.format(k.value)}</strong>
                  <em>▲ {k.delta}%</em>
                  <Spark data={k.spark} />
                </>
              ) : (
                <>
                  <b className={styles.skel} style={{ width: 80 }} />
                  <b className={styles.skel} style={{ width: 120, height: 22, marginTop: 12 }} />
                </>
              )}
            </div>
          ))}
        </div>

        <section className={styles.dChart}>
          <div className={styles.dPanelHead}>
            <span>Revenue by week</span>
            <span>Last 18 weeks</span>
          </div>
          <div className={styles.dBars}>
            {bars.map((b, i) => (
              <span key={i} data-skel={!ready} style={{ height: ready ? `${(b / max) * 100}%` : `${30 + (i % 4) * 12}%` }} />
            ))}
          </div>
        </section>

        <section className={styles.dTable}>
          <div className={styles.dPanelHead}>
            <span>Open orders</span>
            <span>Auto-refresh</span>
          </div>
          {orders.map((o) => (
            <div key={o.id} className={styles.dRow} data-flash={flash === o.id && ready}>
              {ready ? (
                <>
                  <span>{o.id}</span>
                  <span>{o.customer}</span>
                  <span>{o.amount}</span>
                  <span className={styles.dStatus} data-s={o.status}>
                    {STATUS[o.status]}
                  </span>
                </>
              ) : (
                <b className={styles.skel} style={{ width: "100%" }} />
              )}
            </div>
          ))}
        </section>

        <section className={styles.dFeed}>
          <div className={styles.dPanelHead}>
            <span>Activity</span>
            <span>Streaming</span>
          </div>
          <ul>
            <AnimatePresence initial={false}>
              {events.map((e) => (
                <motion.li
                  key={e.id}
                  layout={!still}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  data-tone={e.tone}
                >
                  {ready ? (
                    <>
                      <i />
                      <span>{e.text}</span>
                    </>
                  ) : (
                    <b className={styles.skel} style={{ width: "90%" }} />
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </section>
      </div>
    </div>
  );
}
