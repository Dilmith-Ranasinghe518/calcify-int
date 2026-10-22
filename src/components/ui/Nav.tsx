"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, brand } from "@/lib/content";
import { lockScroll } from "@/lib/scroll";
import { HoverScramble } from "@/components/motion/Scramble";
import Magnetic from "@/components/motion/Magnetic";
import Wordmark from "./Wordmark";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const lastY = useRef(0);

  // Solid after the first screenful; tucks away while scrolling down,
  // returns the moment you scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 240 && y > lastY.current + 2);
      if (y < lastY.current - 2 || y <= 240) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Freeze the page (native and smooth scroll) while the menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <header
      className={`studio-nav fixed inset-x-0 top-0 z-50 ${scrolled ? "studio-nav-scrolled" : ""}`}
      data-hidden={hidden && !mobileOpen}
    >
      <nav
        aria-label="Main"
        className="studio-nav-inner mx-auto flex w-full items-center justify-between"
      >
        <Link href="/" aria-label={`${brand.name} — home`} onClick={() => setMobileOpen(false)}>
          <Wordmark />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-5 lg:flex">
          <ul className="studio-nav-links flex items-center" onPointerLeave={() => setHovered(null)}>
            {nav.links.map((link) => (
              <li key={link.href} className="relative" onPointerEnter={() => setHovered(link.href)}>
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-hover"
                    className="studio-nav-hover"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <Link
                  href={link.href}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className="studio-nav-link uppercase transition-colors hover:text-ink"
                >
                  <HoverScramble text={link.label} />
                </Link>
              </li>
            ))}
          </ul>
          <Magnetic strength={0.2}>
            <Link href={nav.cta.href} className="btn btn-primary">
              {nav.cta.label} <span aria-hidden="true">↗</span>
            </Link>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-line lg:hidden"
        >
          <span
            className={`block h-px w-5 bg-ink transition-transform duration-300 ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-5 bg-ink transition-transform duration-300 ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-sheet lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {nav.links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={link.href} onClick={() => setMobileOpen(false)} aria-current={isCurrent(link.href) ? "page" : undefined}>
                    <span>0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mobile-sheet-foot">
              <Link href={nav.cta.href} className="btn btn-primary btn-lg" onClick={() => setMobileOpen(false)}>
                {nav.cta.label} <span aria-hidden="true">↗</span>
              </Link>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
