import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

/**
 * Hydration-safe prefers-reduced-motion.
 *
 * framer-motion's own hook answers from matchMedia on the very first client
 * render, which differs from the server's guess and makes React throw away
 * the server HTML (error #418) for anyone with reduced motion on. Here the
 * server snapshot (`false`) is used while hydrating, then React re-renders
 * with the real preference — and follows it if it changes later.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
