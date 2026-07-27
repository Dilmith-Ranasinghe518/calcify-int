"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-into-view reveal: fade plus a short rise.
 *
 * Starts visible and only hides itself once JS confirms it will animate, so
 * content is never trapped invisible if the observer never runs or scripting
 * is unavailable. Skipped entirely under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  /** Stagger in ms. */
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    // Only now do we hide it — after this point we know we can reveal it.
    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden = armed && !shown;

  return (
    <Tag
      // Callback ref: assignable regardless of which element Tag resolves to.
      // Braced body so nothing is returned — React 19 treats a returned value
      // as a cleanup function.
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(22px)" : "none",
        transition:
          "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: `${delay}ms`,
        willChange: hidden ? "opacity, transform" : undefined,
      }}
    >
      {children}
    </Tag>
  );
}
