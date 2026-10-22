"use client";

import { useRef, type ReactNode } from "react";

type Tag = "article" | "div" | "li";

/**
 * Card whose border and surface catch a soft light that follows the pointer.
 * The glow is pure CSS reading two custom properties, so moving the mouse
 * never re-renders React.
 */
export default function Spotlight({
  children,
  as: TagName = "article",
  className = "",
  id,
  cursor,
}: {
  children: ReactNode;
  as?: Tag;
  className?: string;
  id?: string;
  /** Optional word shown in the cursor ring over this card. */
  cursor?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <TagName
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      id={id}
      data-cursor={cursor}
      className={`spotlight ${className}`}
      onPointerMove={onMove}
    >
      {children}
    </TagName>
  );
}
