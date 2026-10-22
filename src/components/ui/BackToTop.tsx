"use client";

import { scrollToTop } from "@/lib/scroll";

export default function BackToTop() {
  return (
    <button type="button" onClick={scrollToTop} className="text-link eyebrow">
      Back to top <span aria-hidden="true">↑</span>
    </button>
  );
}
