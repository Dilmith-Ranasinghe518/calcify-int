"use client";

import { openConsentSettings } from "@/lib/consent";

export default function CookieSettingsButton() {
  return (
    <button type="button" onClick={openConsentSettings} className="text-link eyebrow">
      Cookie settings
    </button>
  );
}
