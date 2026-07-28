"use client";

import { useState } from "react";

export default function FloatingVideo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className={`floating-video ${expanded ? "is-expanded" : ""}`} aria-label="Calcify motion preview">
      <button className="floating-video-close" type="button" onClick={() => setExpanded(false)} aria-label="Close motion preview">×</button>
      <button className="floating-video-toggle" type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} aria-label={expanded ? "Minimize motion preview" : "Open motion preview"}>
        <video src="/video/reference-intro.mp4" autoPlay muted loop playsInline aria-hidden="true" />
        <span className="floating-video-shade" />
        <span className="floating-video-copy"><strong>{expanded ? "−" : "↗"}</strong></span>
      </button>
    </aside>
  );
}
