/**
 * Line-art icon set, drawn in code — no external icon library or asset files.
 * Stroke-based, inherits currentColor so cards can shift them to accent-pulse
 * on hover. Purely decorative: each is aria-hidden, the card heading carries
 * the accessible name.
 */

const paths: Record<string, React.ReactNode> = {
  // Stacked planes — layered enterprise modules
  erp: (
    <>
      <path d="M3 7.5 12 3l9 4.5-9 4.5-9-4.5Z" />
      <path d="m3 12 9 4.5L21 12" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </>
  ),
  // Browser frame
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M3 9h18" />
      <path d="M6.5 6.5h.01M9.5 6.5h.01" />
    </>
  ),
  // Neural node
  ai: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="5" cy="6" r="1.5" />
      <circle cx="19" cy="6" r="1.5" />
      <circle cx="5" cy="18" r="1.5" />
      <circle cx="19" cy="18" r="1.5" />
      <path d="m6.3 7 3.6 3.4M17.7 7l-3.6 3.4M6.3 17l3.6-3.4M17.7 17l-3.6-3.4" />
    </>
  ),
  // Handset
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  // Cloud
  cloud: (
    <path d="M7 18h9.5a3.5 3.5 0 0 0 .3-7 5 5 0 0 0-9.6-1.2A4 4 0 0 0 7 18Z" />
  ),
  // Shield
  security: (
    <>
      <path d="M12 3l7 3v5.5c0 4.3-2.9 7.9-7 9.5-4.1-1.6-7-5.2-7-9.5V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  // Cycle / transformation
  transformation: (
    <>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 4v4h-4" />
    </>
  ),
  // Bar chart
  data: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-6M12 20V7M17 20v-9" />
    </>
  ),
  // Checklist
  qa: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="m8 9 1.6 1.6L13 7.2" />
      <path d="M8 15.5h8" />
    </>
  ),
};

export default function ServiceIcon({ slug }: { slug: string }) {
  const path = paths[slug];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className="h-7 w-7"
    >
      {path}
    </svg>
  );
}
