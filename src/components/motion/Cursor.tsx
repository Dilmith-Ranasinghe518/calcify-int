"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [data-cursor]";

/**
 * Trailing cursor ring.
 *
 * The native pointer is kept — this only adds a soft follower that swells over
 * anything interactive, and turns into a label pill over elements that carry
 * `data-cursor="View"` (or any short word). Fine pointers only; nothing is
 * mounted on touch screens or under reduced motion.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!fine || reduced || !ring || !label) return;

    const pos = { x: -100, y: -100, tx: -100, ty: -100 };
    let raf = 0;

    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.2;
      pos.y += (pos.ty - pos.y) * 0.2;
      ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      pos.tx = e.clientX;
      pos.ty = e.clientY;
      ring.dataset.visible = "true";
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(INTERACTIVE);
      const word = target?.dataset.cursor;
      ring.dataset.mode = word ? "label" : target ? "hover" : "idle";
      label.textContent = word ?? "";
    };

    const onLeave = () => {
      ring.dataset.visible = "false";
    };
    const onDown = () => (ring.dataset.pressed = "true");
    const onUp = () => (ring.dataset.pressed = "false");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div ref={ringRef} aria-hidden="true" className="cursor-ring" data-visible="false" data-mode="idle">
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}
