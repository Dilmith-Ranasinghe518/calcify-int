import Link from "next/link";
import { footer, brand } from "@/lib/content";
import Wordmark from "@/components/ui/Wordmark";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[var(--container-max)]">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" aria-label={`${brand.name} — home`}>
              <Wordmark size="sm" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {footer.tagline}
            </p>
            <ul className="mt-6 space-y-2">
              <li>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="font-display text-sm text-muted transition-colors hover:text-pulse"
                >
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="font-display text-sm break-all text-muted transition-colors hover:text-pulse"
                >
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
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <p className="font-display text-xs text-muted">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
