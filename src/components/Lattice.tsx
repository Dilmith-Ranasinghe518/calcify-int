"use client";

import { useEffect, useRef } from "react";
import { INTRO_DONE, introPending } from "@/lib/intro";

/**
 * Section moods. Any element can set one with `data-lattice="…"`; whichever
 * section sits at the middle of the viewport decides the lattice's state.
 *
 * - drift    — free network, pointer-reactive (heroes)
 * - grid     — nodes settle into a triangular crystal lattice (build, capabilities)
 * - calm     — the drift, dimmed so long copy stays easy to read
 * - converge — nodes reel into orbits around one pulsing core (contact)
 */
export type LatticeMood = "drift" | "grid" | "calm" | "converge";
const MOODS: LatticeMood[] = ["drift", "grid", "calm", "converge"];

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Depth 0.35 (far) – 1 (near): size, brightness, parallax. */
  z: number;
  flash: number;
  hx: number;
  hy: number;
  orbit: number;
  angle: number;
  spin: number;
};
type Packet = { a: number; b: number; t: number; speed: number };
type Wave = { x: number; y: number; r: number; max: number };

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
 * "The Lattice" — one living network fixed behind the entire site.
 *
 * It never unmounts (it lives in the root layout), so it carries on across
 * page changes. Nodes sit at three depths with pointer and scroll parallax,
 * packets race along the links leaving light trails, broadcast waves roll
 * out every few seconds, and a click on empty space sends your own. As you
 * scroll, the section under the middle of the screen sets the mood and the
 * lattice blends smoothly between them.
 *
 * Plain 2D canvas. Pauses in hidden tabs; draws one still frame under
 * reduced motion.
 */
export default function Lattice() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const ACCENT = rgbToken("--accent-rgb", "212 255 63");
    const ACCENT2 = rgbToken("--accent-2-rgb", "185 168 255");
    const INK = rgbToken("--ink-rgb", "242 241 236");
    const glow = glowSprite(ACCENT, 64);
    const glowInk = glowSprite(INK, 64);

    let w = 0;
    let h = 0;
    let link = 160;
    let spacing = 100;
    let nodes: Node[] = [];
    const packets: Packet[] = [];
    const waves: Wave[] = [];
    const pointer = { x: -9999, y: -9999, active: false, px: 0, py: 0 };
    // Current blend of moods; eases toward the target one-hot each frame.
    const mix: Record<LatticeMood, number> = { drift: 1, grid: 0, calm: 0, converge: 0 };
    let target: LatticeMood = "drift";
    let running = false;
    let raf = 0;
    let lastSpawn = 0;
    let lastWave = 0;
    let time = 0;
    let frame = 0;
    let lastScroll = window.scrollY;
    let bloomStart = -1;

    const seed = () => {
      const small = w < 760 * dpr;
      const count = Math.round(Math.min(small ? 64 : 140, Math.max(36, (w * h) / (dpr * dpr) / (small ? 8000 : 10000))));
      link = (small ? 130 : 170) * dpr;
      // Triangular lattice sized so there are a few more cells than nodes.
      spacing = Math.sqrt((w * h) / (count * 1.25) / 0.866);
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / (spacing * 0.866)) + 1;
      const cells: [number, number][] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) cells.push([c * spacing + (r % 2 ? spacing / 2 : 0), r * spacing * 0.866]);
      }
      // Shuffle so each node gets a random home.
      for (let i = cells.length - 1; i > 0; i--) {
        const j = (Math.random() * (i + 1)) | 0;
        [cells[i], cells[j]] = [cells[j], cells[i]];
      }
      const short = Math.min(w, h);
      nodes = Array.from({ length: count }, (_, i) => {
        const z = 0.35 + Math.random() * 0.65;
        const [hx, hy] = cells[i % cells.length];
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3 * dpr * z,
          vy: (Math.random() - 0.5) * 0.3 * dpr * z,
          z,
          flash: 0,
          hx,
          hy,
          orbit: (40 + Math.random() * short * 0.4) * (Math.random() < 0.15 ? 0.35 : 1),
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() * 0.5 + 0.2) * (Math.random() < 0.5 ? -1 : 1) * 0.0024,
        };
      });
      packets.length = 0;
    };

    const resize = () => {
      const nw = Math.max(1, Math.round(window.innerWidth * dpr));
      const nh = Math.max(1, Math.round(window.innerHeight * dpr));
      // Mobile browsers resize the viewport as their toolbars slide in and
      // out; only re-seed on a real layout change, never on that.
      const reseed = nw !== w || Math.abs(nh - h) > 160 * dpr;
      w = nw;
      h = nh;
      canvas.width = w;
      canvas.height = h;
      if (reseed) seed();
      if (!running) draw();
    };

    const sx = (n: Node) => n.x + pointer.px * (1 - n.z) * 40 * dpr;
    const sy = (n: Node) => n.y + pointer.py * (1 - n.z) * 40 * dpr;

    // Which mood is the section in the middle of the screen asking for?
    const readMood = () => {
      const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      const mood = el?.closest<HTMLElement>("[data-lattice]")?.dataset.lattice as LatticeMood | undefined;
      target = mood && MOODS.includes(mood) ? mood : "calm";
    };

    const sendWave = (x: number, y: number) => {
      waves.push({ x, y, r: 0, max: Math.hypot(w, h) * 0.55 });
    };

    const step = () => {
      for (const m of MOODS) mix[m] += ((m === target ? 1 : 0) - mix[m]) * 0.035;

      // Content scrolls past a fixed canvas; nudging nodes by depth makes the
      // lattice feel like it lives in the same space as the page.
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;

      pointer.px += ((pointer.active ? pointer.x / w - 0.5 : 0) - pointer.px) * 0.04;
      pointer.py += ((pointer.active ? pointer.y / h - 0.5 : 0) - pointer.py) * 0.04;

      const free = mix.drift + mix.calm;
      const cx = w * (w > 900 * dpr ? 0.68 : 0.5);
      const cy = h * 0.42;

      for (const n of nodes) {
        // Free wandering + pointer.
        if (pointer.active && free > 0.2) {
          const dx = pointer.x - sx(n);
          const dy2 = pointer.y - sy(n);
          const d = Math.hypot(dx, dy2);
          const reach = 220 * dpr;
          if (d < reach && d > 1) {
            const f = (d < 70 * dpr ? -0.06 : 0.012 * (1 - d / reach)) * free;
            n.vx += (dx / d) * f * dpr;
            n.vy += (dy2 / d) * f * dpr;
          }
        }
        if (Math.hypot(n.vx, n.vy) < 0.1 * dpr * n.z * free) {
          n.vx += (Math.random() - 0.5) * 0.05 * dpr;
          n.vy += (Math.random() - 0.5) * 0.05 * dpr;
        }

        // Crystal lattice: spring toward the node's home cell.
        if (mix.grid > 0.01) {
          n.vx += (n.hx - n.x) * 0.0022 * mix.grid;
          n.vy += (n.hy - n.y) * 0.0022 * mix.grid;
        }

        // Converge: reel into an orbit around the core.
        if (mix.converge > 0.01) {
          n.angle += n.spin;
          const tx = cx + Math.cos(n.angle) * n.orbit * dpr;
          const ty = cy + Math.sin(n.angle) * n.orbit * dpr * 0.62;
          n.vx += (tx - n.x) * 0.0018 * mix.converge;
          n.vy += (ty - n.y) * 0.0018 * mix.converge;
        }

        const damping = 0.975 - (mix.grid + mix.converge) * 0.04;
        n.vx *= damping;
        n.vy *= damping;
        n.x += n.vx;
        n.y += n.vy - dy * dpr * n.z * 0.18 * free;

        if (free > 0.5) {
          const m = 40 * dpr;
          if (n.x < -m) n.x = w + m;
          if (n.x > w + m) n.x = -m;
          if (n.y < -m) n.y = h + m;
          if (n.y > h + m) n.y = -m;
        }
        n.flash *= 0.95;
      }

      // Packets race between linked neighbours, sometimes hopping on.
      const reach2 = linkNow() ** 2;
      if (time - lastSpawn > 90 && packets.length < 22 && nodes.length > 1) {
        lastSpawn = time;
        const a = (Math.random() * nodes.length) | 0;
        const b = neighbour(a, -1, reach2);
        if (b >= 0) packets.push({ a, b, t: 0, speed: 0.016 + Math.random() * 0.022 });
      }
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;
        if (p.t < 1) continue;
        nodes[p.b].flash = 1;
        const next = Math.random() < 0.45 ? neighbour(p.b, p.a, reach2) : -1;
        if (next >= 0) {
          p.a = p.b;
          p.b = next;
          p.t = 0;
        } else packets.splice(i, 1);
      }

      if (time - lastWave > 4200 && nodes.length && mix.calm < 0.5) {
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

    // In crystal mode only true neighbours link, so the triangles read cleanly;
    // in converge the nodes crowd together, so shorter links keep it airy (and cheap).
    const linkNow = () => (link + (spacing * 1.12 - link) * mix.grid) * (1 - 0.4 * mix.converge);

    const neighbour = (from: number, not: number, reach2: number) => {
      let best = -1;
      let bestD = reach2;
      const a = nodes[from];
      for (let j = 0; j < nodes.length; j++) {
        if (j === from || j === not) continue;
        const dx = nodes[j].x - a.x;
        const dy = nodes[j].y - a.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < bestD && Math.random() < 0.55) {
          bestD = d2;
          best = j;
        }
      }
      return best;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const bloom = bloomStart < 0 ? (reduced ? 1 : 0) : Math.min(1, (time - bloomStart) / 1600);
      const reveal = 1 - Math.pow(1 - bloom, 3);
      const radius = Math.hypot(w, h) * 0.6 * reveal;
      const shown = (n: Node) => reveal >= 1 || Math.hypot(sx(n) - w / 2, sy(n) - h / 2) < radius;
      // Calm sections dim the whole lattice so copy stays the focus.
      const level = 1 - mix.calm * 0.6;

      const paths: Path2D[] = Array.from({ length: BUCKETS }, () => new Path2D());
      const reach = linkNow();
      const reach2 = reach * reach;
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
          if (d2 > reach2 || !shown(b)) continue;
          const closeness = 1 - d2 / reach2;
          const depth = Math.min(a.z, b.z) + mix.grid * 0.3;
          const k = Math.max(0, Math.min(BUCKETS - 1, Math.floor((1 - closeness * depth) * BUCKETS)));
          paths[k].moveTo(ax, ay);
          paths[k].lineTo(sx(b), sy(b));
        }
      }
      ctx.lineCap = "round";
      for (let k = 0; k < BUCKETS; k++) {
        const t = 1 - k / BUCKETS;
        ctx.lineWidth = (0.6 + t * 1.3) * dpr;
        ctx.strokeStyle = `rgba(${INK},${((0.06 + t * 0.32) * level).toFixed(3)})`;
        ctx.stroke(paths[k]);
      }

      for (const wv of waves) {
        const life = 1 - wv.r / wv.max;
        ctx.beginPath();
        ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2);
        ctx.lineWidth = 1.5 * dpr;
        ctx.strokeStyle = `rgba(${ACCENT},${(life * 0.35 * level).toFixed(3)})`;
        ctx.stroke();
      }

      if (pointer.active && mix.drift > 0.3) {
        const tether2 = (190 * dpr) ** 2;
        ctx.beginPath();
        for (const n of nodes) {
          const dx = sx(n) - pointer.x;
          const dy = sy(n) - pointer.y;
          if (dx * dx + dy * dy < tether2) {
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(sx(n), sy(n));
          }
        }
        ctx.lineWidth = 1.2 * dpr;
        ctx.strokeStyle = `rgba(${ACCENT},${(0.55 * mix.drift).toFixed(3)})`;
        ctx.stroke();
        const s = 28 * dpr;
        ctx.globalAlpha = mix.drift;
        ctx.drawImage(glow, pointer.x - s / 2, pointer.y - s / 2, s, s);
        ctx.globalAlpha = 1;
      }

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
        const x0 = ax + (bx - ax) * t0;
        const y0 = ay + (by - ay) * t0;
        const x1 = ax + (bx - ax) * p.t;
        const y1 = ay + (by - ay) * p.t;
        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, `rgba(${ACCENT},0)`);
        grad.addColorStop(1, `rgba(${ACCENT},${(0.95 * level).toFixed(3)})`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        const s = 18 * dpr;
        ctx.globalAlpha = level;
        ctx.drawImage(glow, x1 - s / 2, y1 - s / 2, s, s);
        ctx.globalAlpha = 1;
      }

      for (const n of nodes) {
        if (!shown(n)) continue;
        const x = sx(n);
        const y = sy(n);
        const r = (1.1 + n.z * 2.2) * dpr;
        if (n.flash > 0.05) {
          const s = (14 + n.flash * 26) * dpr;
          ctx.globalAlpha = n.flash * level;
          ctx.drawImage(glow, x - s / 2, y - s / 2, s, s);
          ctx.globalAlpha = 1;
        } else if (n.z > 0.85) {
          const s = 16 * dpr;
          ctx.globalAlpha = 0.18 * level;
          ctx.drawImage(glowInk, x - s / 2, y - s / 2, s, s);
          ctx.globalAlpha = 1;
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle =
          n.flash > 0.05
            ? `rgba(${ACCENT},${0.6 + n.flash * 0.4})`
            : `rgba(${INK},${((0.3 + n.z * 0.55) * level).toFixed(2)})`;
        ctx.fill();
      }

      if (mix.converge > 0.02) {
        const cx = w * (w > 900 * dpr ? 0.68 : 0.5);
        const cy = h * 0.42;
        const c = mix.converge;
        const pulse = (time % 2400) / 2400;
        const pulse2 = (pulse + 0.5) % 1;
        ctx.beginPath();
        ctx.arc(cx, cy, (12 + pulse * 90) * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ACCENT},${(1 - pulse) * 0.7 * c})`;
        ctx.lineWidth = 1.5 * dpr;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, (40 + pulse2 * 90) * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ACCENT2},${(1 - pulse2) * 0.35 * c})`;
        ctx.stroke();
        const core = 70 * dpr;
        ctx.globalAlpha = c;
        ctx.drawImage(glow, cx - core / 2, cy - core / 2, core, core);
        ctx.globalAlpha = 1;
      }
    };

    const loop = (now: number) => {
      time = now;
      if (frame++ % 8 === 0) readMood();
      step();
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced || document.hidden) return;
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
      pointer.active = e.pointerType === "mouse";
      pointer.x = e.clientX * dpr;
      pointer.y = e.clientY * dpr;
    };
    const onLeave = () => {
      pointer.active = false;
    };
    const onClick = (e: PointerEvent) => {
      // Clicks on anything interactive mean something else.
      if ((e.target as HTMLElement | null)?.closest("a, button, input, textarea, select, label, [role='application']")) return;
      sendWave(e.clientX * dpr, e.clientY * dpr);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onClick, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    if (reduced) {
      readMood();
      draw();
    } else start();

    return () => {
      stop();
      window.clearTimeout(fallback);
      window.removeEventListener(INTRO_DONE, begin);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="lattice" />;
}
