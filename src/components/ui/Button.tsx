import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-card px-6 py-3 text-sm font-medium " +
  "transition-colors duration-200 ease-out whitespace-nowrap";

const variants: Record<Variant, string> = {
  // accent-cta (amber) is reserved for primary CTAs only — see Section 2.
  primary: "bg-cta text-void font-semibold hover:bg-cta/90",
  secondary:
    "border border-line text-ink hover:border-pulse hover:text-pulse",
  ghost: "text-muted hover:text-ink",
};

type Props = {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...rest
}: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    // External links and protocol links bypass the client router.
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
