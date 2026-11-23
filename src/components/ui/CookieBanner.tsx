"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { OPEN_CONSENT_EVENT, readConsent, saveConsent, type Consent } from "@/lib/consent";

/**
 * Asks once for analytics consent, then stays out of the way. Reopened from
 * the footer's "Cookie settings". Not a modal: the page stays usable and
 * focus is never stolen.
 */
export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Read after mount: the server can't know what this browser stored.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (consent: Consent) => {
    saveConsent(consent);
    setOpen(false);
  };

  return (
    <section className="cookie-banner" role="region" aria-labelledby="cookie-banner-title">
      <h2 id="cookie-banner-title" className="eyebrow">Cookies</h2>
      <p>
        We&rsquo;d like to use Google Analytics cookies to understand how people use this site, so we can
        improve it. If you decline, no analytics cookies are set.{" "}
        <Link href="/privacy" className="cookie-banner__link">Privacy policy</Link>
      </p>
      <div className="cookie-banner__actions">
        <button type="button" className="btn btn-ghost" onClick={() => choose("denied")}>
          Decline
        </button>
        <button type="button" className="btn btn-primary" onClick={() => choose("granted")}>
          Accept
        </button>
      </div>
    </section>
  );
}
