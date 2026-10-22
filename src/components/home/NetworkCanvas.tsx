"use client";

import type { MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { INTRO_DONE, introPending } from "@/lib/intro";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Depth 0.35 (far) – 1 (near): size, brightness and parallax. */
  z: number;
  flash: number;
  orbit: number;
  angle: number;
  spin: number;
};
type Packet = { a: number; b: number; t: number; speed: number };
type Wave = { x: number; y: number; r: number; max: number };

/** Read a space-separated "r g b" token from :root and return "r,g,b". */
function rgbToken(name: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return (v || fallback).split(/\s+/).join(",");
}

/** A soft glow dot drawn once, then stamped with drawImage — far cheaper than a gradient per frame. */
function glowSprite(rgb: string, size: number) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, `rgba(${rgb},1)`);
  grad.addColorStop(0.3, `rgba(${rgb},0.5)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

const BUCKETS = 5;

/**
 * "The Lattice" — Calcify's signature: a living network in three depths.
 *
 * `drift` (hero): nodes wander with parallax depth, link to neighbours with
 * glowing strands, lean toward the pointer, and data packets race along the
 * links leaving light trails. Every few seconds a broadcast wave rolls out
 * from one node and lights every node it crosses — click anywhere to send
 * your own. Scrolling away (`scatter`) loosens the whole lattice.
 * `converge` (closing CTA): the nodes are reeled into slow orbits around one
 * pulsing core — every system resolving into a single point of contact.
 *
 * Plain 2D canvas: draws from the first frame, pauses off screen and in
 * hidden tabs, and renders one still frame under reduced motion.
 */
export default function NetworkCanvas({
  mode = "drift",
  className = "",
  scatter,
}: {
  mode?: "drift" | "converge";
  className?: string;
  scatter?: MotionValue<number>;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    const ACCENT = rgbToken("--accent-rgb", "212 255 63");
    const ACCENT2 = rgbToken("--accent-2-rgb", "185 168 255");
    const INK = rgbToken("--ink-rgb", "242 241 236");
    const glow = glowSprite(ACCENT, 64);
    const glowInk = glowSprite(INK, 64);

    let w = 0;
    let h = 0;
    let link = 160;
    let nodes: Node[] = [];
    const packets: Packet[] = [];
    const waves: Wave[] = [];
    const trail: { x: number; y: number }[][] = [];
    const pointer = { x: -9999, y: -9999, active: false, px: 0, py: 0 };
    let running = false;
    let visible = true;
    let raf = 0;
    let lastSpawn = 0;
    let lastWave = 0;
    let time = 0;
    // The lattice blooms in from the centre once the intro has lifted.
    let bloomStart = -1;

    const seed = () => {
      const small = w < 700 * dpr;
      const count = Math.round(Math.min(small ? 60 : 130, Math.max(34, (w * h) / (dpr * dpr) / (small ? 9500 : 11000))));
      link = (small ? 130 : 175) * dpr;
      nodes = Array.from({ length: count }, () => {
        const z = 0.35 + Math.random() * 0.65;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3 * dpr * z,
          vy: (Math.random() - 0.5) * 0.3 * dpr * z,
          z,
          flash: 0,
          orbit: (50 + Math.random() * Math.min(w, h) * 0.42) * (Math.random() < 0.15 ? 0.35 : 1),
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() * 0.5 + 0.2) * (Math.random() < 0.5 ? -1 : 1) * 0.0022,
        };
      });
      packets.length = 0;
      trail.length = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width * dpr));
      h = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = w;
      canvas.height = h;
      seed();
      if (!running) draw();
    };

    // Screen position of a node, including pointer parallax by depth.
    const sx = (n: Node) => n.x + pointer.px * (1 - n.z) * 40 * dpr;
    const sy = (n: Node) => n.y + pointer.py * (1 - n.z) * 40 * dpr;

    const sendWave = (x: number, y: number) => {
      waves.push({ x, y, r: 0, max: Math.hypot(w, h) * 0.55 });
    };

    const step = () => {
      const cx = w / 2;
      const cy = h / 2;
      const loose = scatter ? Math.min(1, Math.max(0, scatter.get())) : 0;
      pointer.px += ((pointer.active ? pointer.x / w - 0.5 : 0) - pointer.px) * 0.04;
      pointer.py += ((pointer.active ? pointer.y / h - 0.5 : 0) - pointer.py) * 0.04;

      for (const n of nodes) {
        if (mode === "converge") {
          n.angle += n.spin;
          const tx = cx + Math.cos(n.angle) * n.orbit;
          const ty = cy + Math.sin(n.angle) * n.orbit * 0.62;
          n.vx += (tx - n.x) * 0.0016;
          n.vy += (ty - n.y) * 0.0016;
          n.vx *= 0.94;
          n.vy *= 0.94;
        } else {
          if (pointer.active) {
            const dx = pointer.x - sx(n);
            const dy = pointer.y - sy(n);
            const d = Math.hypot(dx, dy);
            const reach = 220 * dpr;
            if (d < reach && d > 1) {
              // Near the pointer: a gentle pull at range, a push-away up close.
              const f = d < 70 * dpr ? -0.06 : 0.012 * (1 - d / reach);
              n.vx += (dx / d) * f * dpr;
              n.vy += (dy / d) * f * dpr;
            }
          }
          n.vx *= 0.975;
          n.vy *= 0.975;
          const speed = Math.hypot(n.vx, n.vy);
          if (speed < 0.1 * dpr * n.z) {
            n.vx += (Math.random() - 0.5) * 0.05 * dpr;
            n.vy += (Math.random() - 0.5) * 0.05 * dpr;
          }
          // Scrolling away nudges everything outward from the centre.
          n.vx += ((n.x - cx) / w) * loose * 0.06 * dpr;
          n.vy += ((n.y - cy) / h) * loose * 0.06 * dpr;
        }
        n.x += n.vx;
        n.y += n.vy;
        if (mode === "drift") {
          const m = 40 * dpr;
          if (n.x < -m) n.x = w + m;
          if (n.x > w + m) n.x = -m;
          if (n.y < -m) n.y = h + m;
          if (n.y > h + m) n.y = -m;
        }
        n.flash *= 0.95;
      }

      // Packets race between linked neighbours.
      if (time - lastSpawn > 90 && packets.length < 22 && nodes.length > 1) {
        lastSpawn = time;
        const a = (Math.random() * nodes.length) | 0;
        let best = -1;
        let bestD = link * link;
        for (let j = 0; j < nodes.length; j++) {
          if (j === a) continue;
          const dx = nodes[j].x - nodes[a].x;
          const dy = nodes[j].y - nodes[a].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < bestD && Math.random() < 0.55) {
            bestD = d2;
            best = j;
          }
        }
        if (best >= 0) packets.push({ a, b: best, t: 0, speed: 0.016 + Math.random() * 0.022 });
      }
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;
        if (p.t >= 1) {
          nodes[p.b].flash = 1;
          // Sometimes the packet hops on, so routes chain across the lattice.
          if (Math.random() < 0.45) {
            let next = -1;
            let bestD = link * link;
            for (let j = 0; j < nodes.length; j++) {
              if (j === p.b || j === p.a) continue;
              const dx = nodes[j].x - nodes[p.b].x;
              const dy = nodes[j].y - nodes[p.b].y;
              const d2 = dx * dx + dy * dy;
              if (d2 < bestD && Math.random() < 0.5) {
                bestD = d2;
                next = j;
              }
            }
            if (next >= 0) {
              p.a = p.b;
              p.b = next;
              p.t = 0;
              continue;
            }
          }
          packets.splice(i, 1);
        }
      }

      // Broadcast waves.
      if (mode === "drift" && time - lastWave > 4200 && nodes.length) {
        lastWave = time;
        const n = nodes[(Math.random() * nodes.length) | 0];
        sendWave(sx(n), sy(n));
      }
      for (let i = waves.length - 1; i >= 0; i--) {
        const wv = waves[i];
        const prev = wv.r;
        wv.r += 6 * dpr;
        for (const n of nodes) {
          const d = Math.hypot(sx(n) - wv.x, sy(n) - wv.y);
          if (d >= prev && d < wv.r) n.flash = Math.max(n.flash, 0.9 * (1 - wv.r / wv.max));
        }
        if (wv.r > wv.max) waves.splice(i, 1);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const bloom = bloomStart < 0 ? (reduced ? 1 : 0) : Math.min(1, (time - bloomStart) / 1600);
      const reveal = 1 - Math.pow(1 - bloom, 3);
      const radius = Math.hypot(w, h) * 0.6 * reveal;
      const cx = w / 2;
      const cy = h / 2;
      const shown = (n: Node) => reveal >= 1 || Math.hypot(sx(n) - cx, sy(n) - cy) < radius;

      // Links, batched into alpha buckets so the whole mesh is a few strokes.
      const paths: Path2D[] = Array.from({ length: BUCKETS }, () => new Path2D());
      const link2 = link * link;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!shown(a)) continue;
        const ax = sx(a);
        const ay = sy(a);
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = ax - sx(b);
          const dy = ay - sy(b);
          const d2 = dx * dx + dy * dy;
          if (d2 > link2 || !shown(b)) continue;
          // Nearer pairs and closer layers draw brighter.
          const closeness = 1 - d2 / link2;
          const depth = Math.min(a.z, b.z);
          const k = Math.min(BUCKETS - 1, Math.floor((1 - closeness * depth) * BUCKETS));
          paths[k].moveTo(ax, ay);
          paths[k].lineTo(sx(b), sy(b));
        }
      }
      ctx.lineCap = "round";
      for (let k = 0; k < BUCKETS; k++) {
        const t = 1 - k / BUCKETS;
        ctx.lineWidth = (0.6 + t * 1.3) * dpr;
        ctx.strokeStyle = `rgba(${INK},${(0.06 + t * 0.32).toFixed(3)})`;
        ctx.stroke(paths[k]);
      }

      // Broadcast rings.
      for (const wv of waves) {
        const life = 1 - wv.r / wv.max;
        ctx.beginPath();
        ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2);
        ctx.lineWidth = 1.5 * dpr;
        ctx.strokeStyle = `rgba(${ACCENT},${(life * 0.35).toFixed(3)})`;
        ctx.stroke();
      }

      // Pointer tethers.
      if (pointer.active && mode === "drift") {
        const reach2 = (190 * dpr) ** 2;
        ctx.beginPath();
        for (const n of nodes) {
          const dx = sx(n) - pointer.x;
          const dy = sy(n) - pointer.y;
          if (dx * dx + dy * dy < reach2) {
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(sx(n), sy(n));
          }
        }
        ctx.lineWidth = 1.2 * dpr;
        ctx.strokeStyle = `rgba(${ACCENT},0.55)`;
        ctx.stroke();
        const s = 28 * dpr;
        ctx.drawImage(glow, pointer.x - s / 2, pointer.y - s / 2, s, s);
      }

      // Packet trails: a short comet tail behind each packet.
      ctx.lineWidth = 2.4 * dpr;
      for (const p of packets) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!shown(a)) continue;
        const ax = sx(a);
        const ay = sy(a);
        const bx = sx(b);
        const by = sy(b);
        const t0 = Math.max(0, p.t - 0.35);
        const grad = ctx.createLinearGradient(ax + (bx - ax) * t0, ay + (by - ay) * t0, ax + (bx - ax) * p.t, ay + (by - ay) * p.t);
        grad.addColorStop(0, `rgba(${ACCENT},0)`);
        grad.addColorStop(1, `rgba(${ACCENT},0.95)`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(ax + (bx - ax) * t0, ay + (by - ay) * t0);
        ctx.lineTo(ax + (bx - ax) * p.t, ay + (by - ay) * p.t);
        ctx.stroke();
        const s = 18 * dpr;
        ctx.drawImage(glow, ax + (bx - ax) * p.t - s / 2, ay + (by - ay) * p.t - s / 2, s, s);
      }

      // Nodes, far to near.
      for (const n of nodes) {
        if (!shown(n)) continue;
        const x = sx(n);
        const y = sy(n);
        const r = (1.1 + n.z * 2.2) * dpr;
        if (n.flash > 0.05) {
          const s = (14 + n.flash * 26) * dpr;
          ctx.globalAlpha = n.flash;
          ctx.drawImage(glow, x - s / 2, y - s / 2, s, s);
          ctx.globalAlpha = 1;
        } else if (n.z > 0.85) {
          const s = 16 * dpr;
          ctx.globalAlpha = 0.18;
          ctx.drawImage(glowInk, x - s / 2, y - s / 2, s, s);
          ctx.globalAlpha = 1;
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.flash > 0.05 ? `rgba(${ACCENT},${0.6 + n.flash * 0.4})` : `rgba(${INK},${(0.3 + n.z * 0.55).toFixed(2)})`;
        ctx.fill();
      }

      if (mode === "converge") {
        const pulse = (time % 2400) / 2400;
        ctx.beginPath();
        ctx.arc(cx, cy, (12 + pulse * 90) * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ACCENT},${(1 - pulse) * 0.7})`;
        ctx.lineWidth = 1.5 * dpr;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, (40 + ((pulse + 0.5) % 1) * 90) * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ACCENT2},${(1 - ((pulse + 0.5) % 1)) * 0.35})`;
        ctx.stroke();
        const core = 70 * dpr;
        ctx.drawImage(glow, cx - core / 2, cy - core / 2, core, core);
      }
    };

    const loop = (now: number) => {
      time = now;
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const begin = () => {
      if (bloomStart < 0) bloomStart = performance.now();
    };
    let fallback = 0;
    if (introPending()) {
      window.addEventListener(INTRO_DONE, begin, { once: true });
      fallback = window.setTimeout(begin, 3000);
    } else begin();

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      pointer.active = inside && e.pointerType === "mouse";
      pointer.x = (e.clientX - rect.left) * dpr;
      pointer.y = (e.clientY - rect.top) * dpr;
    };
    const onClick = (e: PointerEvent) => {
      if (mode !== "drift") return;
      const rect = canvas.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      // Don't fire on links and buttons — those clicks mean something else.
      if ((e.target as HTMLElement | null)?.closest("a, button, input")) return;
      sendWave((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onClick, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    if (reduced) {
      for (let i = 0; i < (mode === "converge" ? 400 : 1); i++) step();
      draw();
    } else start();

    return () => {
      stop();
      window.clearTimeout(fallback);
      window.removeEventListener(INTRO_DONE, begin);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mode, scatter]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
