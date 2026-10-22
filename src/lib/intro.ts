/**
 * Handshake between the intro loader and anything that should wait for it
 * (the hero crystal condenses only once the curtain has lifted).
 *
 * The loader marks the intro pending synchronously in its effect, which runs
 * before the page's own effects, so waiters can check `introPending()` on
 * mount and otherwise start straight away.
 */
export const INTRO_DONE = "calcify:ready";

let pending = false;

export function markIntroPending() {
  pending = true;
}

export function finishIntro() {
  pending = false;
  window.dispatchEvent(new Event(INTRO_DONE));
}

export function introPending() {
  return pending;
}
