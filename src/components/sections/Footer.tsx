import Link from "next/link";
import Image from "next/image";
import { footer, brand } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[var(--container-max)]">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt=""
                aria-hidden="true"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-base tracking-tight">
                <span className="font-semibold text-ink">{brand.short}</span>{" "}
                <span className="font-light text-muted">International</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {footer.tagline}
            </p>
            <ul className="mt-6 space-y-2">
              <li>
                <a
                  href={`tel:${brand.phone.replace(/\s/g, "")}`}
                  className="font-mono text-sm text-muted transition-colors hover:text-pulse"
                >
                  {brand.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${brand.email}`}
                  className="font-mono text-sm break-all text-muted transition-colors hover:text-pulse"
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
          <p className="font-mono text-xs text-muted">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
