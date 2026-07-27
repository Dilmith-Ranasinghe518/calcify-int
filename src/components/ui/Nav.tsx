"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, brand } from "@/lib/content";
import Button from "./Button";
import Wordmark from "./Wordmark";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the sheet on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-[var(--container-max)] items-center justify-between px-6"
      >
        <Link href="/" aria-label={`${brand.name} — home`}>
          <Wordmark />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-8">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs font-medium uppercase tracking-[0.16em] text-ink/80 transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button href={nav.cta.href} variant="primary">
            {nav.cta.label}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-200 ${
              mobileOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-200 ${
              mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="glass mt-3 border-x-0 lg:hidden"
        >
          <ul className="mx-auto flex max-w-[var(--container-max)] flex-col px-6 py-4">
            {nav.links.map((link) => (
              <li key={link.href} className="border-b border-line last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-4 text-base text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Button renders a Link, which doesn't close the sheet on its
                own — the nav persists across route changes. */}
            <li className="pt-5" onClick={() => setMobileOpen(false)}>
              <Button
                href={nav.cta.href}
                variant="primary"
                className="w-full"
              >
                {nav.cta.label}
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
