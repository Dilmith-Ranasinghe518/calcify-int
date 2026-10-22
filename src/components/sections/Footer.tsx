import Link from "next/link";
import { footer, brand } from "@/lib/content";
import Wordmark from "@/components/ui/Wordmark";
import BackToTop from "@/components/ui/BackToTop";

export default function Footer() {
  return (
    <footer className="site-footer border-t border-line px-6 pt-16 sm:pt-20">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" aria-label={`${brand.name} — home`}>
              <Wordmark size="sm" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted">{footer.tagline}</p>
            <ul className="mt-6 space-y-2">
              <li>
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="text-sm text-muted transition-colors hover:text-signal">
                  {brand.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="text-sm break-all text-muted transition-colors hover:text-signal">
                  {brand.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3">
            {footer.columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="eyebrow mb-5">{column.heading}</h2>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={`${column.heading}-${link.label}`}>
                      <Link href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between gap-6 border-t border-line pt-6">
          <p className="eyebrow">{footer.copyright}</p>
          <BackToTop />
        </div>
      </div>

      {/* The sign-off: the wordmark at full bleed, sinking into the page edge. */}
      <div aria-hidden="true" className="footer-giant">
        calcify<i />
      </div>
    </footer>
  );
}
