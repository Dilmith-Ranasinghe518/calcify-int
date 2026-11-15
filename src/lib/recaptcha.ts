/**
 * Google reCAPTCHA v3, shared by the contact form (client) and its Server
 * Action (server).
 *
 * The site key is public: it ships in the page. The secret key must only
 * live in environment variables (RECAPTCHA_SECRET_KEY) — this repository is
 * public. Verification is skipped while the secret is unset, so local work
 * without it still runs.
 */
export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "6LfZ9CAuAAAAAHfErS74AZHFNRFnH2twV-zgs3rZ";

export const RECAPTCHA_ACTION = "contact";

/** v3 scores run 0.0 (likely a bot) to 1.0 (likely a person). Google suggests 0.5 to start. */
const MIN_SCORE = Number(process.env.RECAPTCHA_MIN_SCORE ?? 0.5);

type SiteverifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

declare global {
  interface Window {
    grecaptcha?: {
      ready(callback: () => void): void;
      execute(siteKey: string, options: { action: string }): Promise<string>;
    };
  }
}

/**
 * Browser: fetch a fresh token right before submitting (tokens expire after
 * two minutes). Resolves to "" if the script is blocked or fails, and the
 * server then decides.
 */
export function getRecaptchaToken(): Promise<string> {
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha || !RECAPTCHA_SITE_KEY) return Promise.resolve("");
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(""), 8000);
    grecaptcha.ready(() => {
      grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION })
        .then(resolve, () => resolve(""))
        .finally(() => clearTimeout(timer));
    });
  });
}

/** Server: true when the token belongs to a likely human submitting this form. */
export async function verifyRecaptcha(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true; // Not configured (e.g. local development).
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip && ip !== "unknown") body.set("remoteip", ip);

  let result: SiteverifyResponse;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    result = await res.json();
  } catch (err) {
    // Google unreachable: don't lose a real enquiry over it. The honeypot
    // and rate limits still apply.
    console.error("[recaptcha] verification request failed; allowing", err);
    return true;
  }

  const ok =
    result.success && result.action === RECAPTCHA_ACTION && (result.score ?? 0) >= MIN_SCORE;
  if (!ok) {
    console.warn("[recaptcha] rejected", {
      score: result.score,
      action: result.action,
      errors: result["error-codes"],
    });
  }
  return ok;
}
