/**
 * Cookie consent for Google Analytics, using Google Consent Mode v2.
 *
 * Analytics storage is denied until the visitor accepts. While denied, GA
 * sets no cookies (it may send cookieless pings that Google uses for
 * modelling). Ad storage is always denied: the site runs no ads.
 *
 * The choice lives in localStorage under CONSENT_KEY. CONSENT_DEFAULT_SCRIPT
 * runs inline in <head>, before gtag.js loads, so a returning visitor's
 * choice applies to the very first hit.
 */
export const CONSENT_KEY = "calcify:consent";
export const OPEN_CONSENT_EVENT = "calcify:consent-open";

export type Consent = "granted" | "denied";

export const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var c = null;
try { c = localStorage.getItem(${JSON.stringify(CONSENT_KEY)}); } catch (e) {}
gtag('consent', 'default', {
  analytics_storage: c === 'granted' ? 'granted' : 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
`;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// gtag only accepts an Arguments object, not an array — keep `arguments`.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  (window.dataLayer ??= []).push(arguments);
}

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(consent: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  gtag("consent", "update", { analytics_storage: consent });
  if (consent === "denied") clearAnalyticsCookies();
}

/** Remove GA cookies left from an earlier "accept" (_ga, _ga_<id>). */
function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
