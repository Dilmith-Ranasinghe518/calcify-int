import type Lenis from "lenis";

/**
 * Shared handle on the smooth-scroll instance.
 *
 * Anything that needs to freeze the page (the intro overlay, the mobile menu)
 * goes through `lockScroll`, so the native overflow lock and Lenis's virtual
 * scroll are always toggled together. Locking only `body` would leave Lenis
 * still consuming wheel events underneath.
 */
let lenis: Lenis | null = null;
let locks = 0;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
  if (lenis && locks > 0) lenis.stop();
}

export function lockScroll(locked: boolean) {
  locks = Math.max(0, locks + (locked ? 1 : -1));
  const frozen = locks > 0;
  document.documentElement.style.overflow = frozen ? "hidden" : "";
  if (frozen) lenis?.stop();
  else lenis?.start();
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
