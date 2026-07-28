import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium " +
  "transition-colors duration-200 ease-out whitespace-nowrap";

const variants: Record<Variant, string> = {
  // White pill on black — the primary action, highest contrast on the page.
  primary: "bg-cta text-void font-semibold hover:bg-cta/85",
  secondary: "border border-line text-ink hover:border-signal hover:text-ink",
  ghost: "text-muted hover:text-ink",
};

/** Circular companion button that sits beside a pill. */
function ArrowCircle({ variant }: { variant: Variant }) {
  return (
    <span
      aria-hidden="true"
      className={[
        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
        "transition-colors duration-200 ease-out",
        variant === "primary"
          ? "bg-cta text-void group-hover:bg-signal group-hover:text-ink"
          : "border border-line text-ink group-hover:border-signal",
      ].join(" ")}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

type Props = {
  variant?: Variant;
  href?: string;
  /** Render the circular arrow companion beside the pill. */
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export default function Button({
  variant = "primary",
  href,
  withArrow = false,
  children,
  className = "",
  ...rest
}: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;

  const inner = (
    <>
      <span className={classes}>{children}</span>
      {withArrow && <ArrowCircle variant={variant} />}
    </>
  );

  // The wrapper owns hover state so the pill and arrow react together.
  const wrapper = "group inline-flex items-center gap-2 align-middle";

  if (href) {
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          className={wrapper}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link href={href} className={wrapper}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={wrapper} {...rest}>
      {inner}
    </button>
  );
}
