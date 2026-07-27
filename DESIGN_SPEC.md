# Calcify International — Production Design Spec

This is the single reference document for building the site. It contains final, production-ready copy (no lorem ipsum, no placeholders), the full design system, technical architecture, and the build phases.

**Stack:** Next.js (App Router) + TypeScript, React Three Fiber + drei (Three.js), GSAP + ScrollTrigger, Tailwind CSS. All 3D content is procedural (built in code) — no external `.glb` model files to source, license, or host.

---

## 0. Implementation amendments

> This section records where the as-built implementation intentionally diverges from the original draft of this spec. It was added during Phase 1 after auditing the existing repository. Everything below Section 0 is the original spec text.

**0.1 — Framework versions.** The original draft specified Next.js 14 and Tailwind CSS v3. The repository is on **Next.js 16.2.9, React 19.2.4, and Tailwind CSS v4.3.1**. We build on the installed versions rather than downgrading two major versions. Consequences:

- There is **no `tailwind.config.ts`**. Tailwind v4 is CSS-first: design tokens live in an `@theme` block in `src/app/globals.css`. Section 8's folder structure and Section 11's Phase 1 wording assume v3 and are superseded here.
- Per `AGENTS.md`, the bundled docs in `node_modules/next/dist/docs/` are the authority for framework APIs, not general Next.js knowledge.
- Next.js 16 no longer overrides `scroll-behavior` during client-side navigation. Because `globals.css` sets `scroll-behavior: smooth` globally, the root `<html>` element carries `data-scroll-behavior="smooth"` so route transitions still jump instantly instead of smooth-scrolling.

**0.2 — Directory layout.** The repo uses a `src/` root with the `@/*` path alias. Section 8's tree is therefore rebased under `src/` (`src/app/`, `src/components/`, `src/lib/`).

**0.3 — Multi-route, not a one-pager.** The original draft described a single scrolling page. The repo has substantial `/about`, `/services`, and `/contact` routes. These are **kept** and restyled to the new design tokens. The homepage is the scrolling Lattice experience; the nav links to real routes.

**0.4 — Footer is global, not part of `CTAFooter`.** Section 8 merges the CTA and footer into one component. The footer is rendered by the root layout so it appears on every route, so it lives in `components/sections/Footer.tsx` separately from `components/sections/CTA.tsx`.

**0.5 — Open questions.** The verification notes in Section 3 (case-study figures, testimonial consent, SOC 2 / ISO 27001 claims) are unresolved and owned by the client. They are not invented or silently resolved in code. See Section 10.

---

## 1. Design direction

Calcify is enterprise B2B infrastructure — ERP, cloud, AI, security — for Fortune-500-scale clients. The visual language is *systems, networks, and precision engineering*, not decorative floating shapes.

**Signature element — "The Lattice":** one persistent WebGL node-and-edge network lives behind the entire page and reshapes as the visitor scrolls, rather than a different 3D graphic per section:

| Section | Lattice state |
|---|---|
| Hero | Loose, drifting cloud of nodes — unstructured potential |
| Stats | Nodes pull into a slowly rotating wireframe sphere |
| Services / Why Us | Nodes settle into a structured grid — order, precision |
| Contact / CTA | Everything converges into a single pulsing node |

This is the one place to spend visual boldness. Typography, spacing, and cards around it stay disciplined and quiet.

---

## 2. Design tokens

**Color**

```css
--bg-void:       #0B0D14;  /* page background */
--bg-panel:      #12151F;  /* card / glass panel surface, ~60-70% opacity with backdrop-blur */
--line-grid:     #232838;  /* hairlines, borders, wireframe */
--text-primary:  #EDEFF7;
--text-muted:    #8A90A6;
--accent-signal: #5B6EF5;  /* primary — indigo, the Lattice's core color */
--accent-pulse:  #3FE0D0;  /* secondary — cyan, hover/active states */
--accent-cta:    #FFB454;  /* amber — reserved ONLY for the 1-2 primary CTA buttons */
```

**Type**

- Display (h1/h2): **Sora**, 600–800 weight, tracking -0.02em — used at large sizes only.
- Body: **Inter**, 400–500 weight.
- Data/labels: **JetBrains Mono** for stat numbers, eyebrow labels, and case-study metrics — numbers-as-data-readouts fits an infrastructure company; don't use mono elsewhere.

All three are free (Google Fonts) — load via `next/font/google` for zero layout shift.

**Spacing & shape**

- 8px base unit; sections padded 120–160px vertical on desktop, 64–80px on mobile.
- Border-radius: 4px on buttons/cards (precise, engineered — not the soft 16–24px "friendly SaaS" default). 0px on wireframe/grid elements.
- Glass panels: `bg-panel` at ~60% opacity, 1px `line-grid` border, `backdrop-filter: blur(10px)` so the Lattice reads through content.

**Motion**

- Lattice state changes are scroll-linked via GSAP ScrollTrigger, not autoplaying — driven by the visitor.
- Content reveals: 300–400ms, opacity + 8–18px translateY, staggered ~60–80ms per item, `power2.out` easing. No bounce.
- Respect `prefers-reduced-motion: reduce`: freeze the Lattice, disable scroll-scrub and rotation, keep only simple opacity fades.

---

## 3. Production copy

Use this verbatim. It replaces the placeholder text from the old site.

### Header nav

`Home · Services · Work · About · Contact` — primary button: **Start a Project**

### Hero

- Eyebrow: `Enterprise Digital Infrastructure · Since 2015`
- H1: **Engineering Tomorrow's Digital Infrastructure**
- Subhead: "We build transformative digital solutions for the world's most ambitious enterprises. From ERP systems to AI-powered platforms, we turn complexity into competitive advantage — combining deep technical expertise with a relentless focus on business outcomes."
- Buttons: **Start a Project** (primary) · **Explore Services** (secondary)

### Trusted by

- Label: `Trusted by industry leaders worldwide`
- Marks: Google, Microsoft, Amazon, Meta, Apple, SAP, Oracle, Salesforce, IBM, Deloitte
- *Note: these are third-party trademarks. Render them as clean text/wordmarks in a consistent style, not as scraped or reproduced logo graphics, unless you have the actual usage rights/logo files from each company.*

### Stats

| Number | Label |
|---|---|
| 500+ | Projects Delivered |
| 50+ | Countries Served |
| 99.9% | Client Satisfaction |
| 200+ | Expert Engineers |

### Services

1. **ERP System Development** — "End-to-end enterprise resource planning solutions tailored for complex business workflows. We streamline operations, finance, HR, and supply chain management with custom-built ERP platforms designed around how your organization actually works."
2. **Web Development** — "High-performance web applications and enterprise portals built with cutting-edge technologies. From React ecosystems to full-stack Next.js solutions, we build for scale from day one."
3. **AI Development** — "Machine learning models, computer vision, natural language processing, and generative AI solutions that transform business intelligence. We help you harness AI to automate operations and unlock new sources of insight."
4. **Mobile App Development** — "Native and cross-platform mobile applications for iOS and Android. From consumer-facing apps to enterprise mobility solutions, we build products trusted by millions of active users."
5. **Cloud Solutions** — "Architecting and deploying scalable cloud infrastructure on AWS, Azure, and GCP. Our cloud migration, DevOps automation, and multi-cloud strategies are built for enterprise resilience."
6. **Cybersecurity** — "Comprehensive security assessments, zero-trust architecture, SOC operations, and compliance frameworks that protect critical digital assets for Fortune 500 enterprises."
7. **Digital Transformation** — "Strategic consulting and hands-on implementation of digital transformation roadmaps. We modernize legacy systems, automate workflows, and drive innovation at enterprise scale."
8. **Data Analytics** — "Real-time analytics dashboards, data warehousing, ETL pipelines, and business intelligence platforms that turn raw data into decisions that drive revenue."
9. **QA Services** — "Comprehensive quality assurance and testing — automated testing, performance testing, security audits, and CI/CD quality gates that ensure flawless software delivery, every release."

### Work / case studies

1. **Global Banking Platform** — *ERP / FinTech* — "End-to-end digital banking transformation for a leading financial institution, serving more than ten million customers across thirty countries. We modernized core banking systems while maintaining zero downtime during migration." — **10M+ Users**
2. **AI-Powered Healthcare** — *AI / HealthTech* — "A machine learning diagnostic platform that reduced medical imaging analysis time by eighty-five percent for a global healthcare network, helping clinicians reach diagnoses faster without compromising accuracy." — **85% Faster**
3. **Smart City Infrastructure** — *IoT / Cloud* — "An IoT-enabled smart city platform managing more than fifty thousand connected sensors for traffic, energy, and waste management in real time, built on a resilient multi-cloud architecture." — **50K+ Sensors**
4. **E-Commerce Ecosystem** — *Web / Mobile* — "An omnichannel retail platform processing more than five hundred million dollars in annual transactions with a 99.99% uptime guarantee, unifying web, mobile, and in-store experiences into a single system." — **$500M+ Revenue**

*Note: these are the original site's case-study claims. Before launch, confirm the underlying figures and client names are accurate and that you have permission to publish each client's name and metrics — enterprise clients often require sign-off or NDAs on public case studies.*

### Why Calcify

1. **3× Rapid Delivery** — "Agile methodology with two-week sprint cycles. We ship faster without sacrificing quality."
2. **0 Breaches — Enterprise Security** — "SOC 2 and ISO 27001 compliant. Zero-trust architecture and twenty-four-seven monitoring protect every engagement."
3. **50+ Countries — Global Scale** — "Multi-region deployments serving millions of users across more than fifty countries."
4. **200+ Engineers — Dedicated Teams** — "Two hundred-plus senior engineers with deep domain expertise across finance, health, retail, and beyond."

*Note: SOC 2 / ISO 27001 compliance claims are the kind of statement that should be verified against your actual current certifications before this goes live — a false compliance claim on a live enterprise site is a real liability, not just a copy issue.*

### Testimonial

> "Calcify International transformed our legacy banking infrastructure into a modern, scalable platform. Their team's expertise in ERP systems and enterprise architecture is unmatched."
> — **James Richardson**, CTO, Global Finance Corp

*Note: using a real named individual's quote requires their (and their company's) consent to publish. Confirm this before launch, or replace with an anonymized version ("CTO, Global Finance Corp") if consent isn't on file.*

### CTA / Contact

- H2: **Let's Build Something Extraordinary**
- Body: "Ready to transform your business with cutting-edge technology? Let's discuss your next project and create solutions that drive real impact."
- Buttons: **Chat on WhatsApp** → `https://wa.me/94717170333` · **Send Us a Message** → `mailto:support.calcifylabs@gmail.com` (replace with a real contact-form endpoint before launch — see Section 7)

### Footer

- Tagline: "Engineering tomorrow's digital infrastructure. We build transformative technology solutions for the world's most ambitious enterprises."
- Contact: `+94 71 717 0333` · `support.calcifylabs@gmail.com`
- **Company:** About Us · Our Team · Careers · Contact
- **Services:** ERP Development · Web Development · AI Development · Mobile Apps · Cloud Solutions · Cybersecurity · QA Services
- **Resources:** Case Studies · Blog · Documentation · Privacy Policy
- Copyright: `© 2026 Calcify International. All rights reserved.`

*Note: Privacy Policy is linked but doesn't exist yet on the current site — a production launch needs a real one, not a placeholder link. Same for any "Blog" or "Documentation" links if those sections don't exist yet — either build a minimal real page or remove the link rather than shipping a 404.*

---

## 4. Section build notes (3D + interaction)

- **Hero:** Full-bleed `<Canvas>` fixed behind a `position: relative` text layer. ~150 instanced points, edges drawn only between fixed index-pairs (grid-neighbor connectivity), not per-frame distance checks — this is what keeps it cheap. Subtle pointer-parallax on the camera, capped magnitude.
- **Trusted-by:** CSS marquee, infinite scroll, pauses on hover.
- **Stats:** Numbers count up from 0 on scroll-into-view (GSAP). Lattice sphere rotates slowly and independently of scroll-scrub.
- **Services:** 3-column grid (1 column mobile), glass cards. On hover, brighten the card border/icon to `accent-pulse` — keep the Lattice's per-card cluster-mapping as a stretch goal, not a blocker, since precise 1:1 node-to-card mapping is a lot of extra state management for limited payoff.
- **Work:** Asymmetric layout — one larger "flagship" card (Global Banking Platform) plus three smaller cards below.
- **Why Us / Testimonial:** Lattice at its calmest (grid) state — reinforces "stable, reliable."
- **CTA/Footer:** Lattice converges to a single pulsing node. No 3D in the footer itself — let the page rest.

---

## 5. SEO & metadata

Use Next.js's `metadata` export in `app/layout.tsx` and per-route where relevant:

```ts
export const metadata = {
  title: "Calcify International — Enterprise Digital Infrastructure & AI Solutions",
  description: "Calcify International builds ERP, AI, cloud, and cybersecurity solutions for the world's most ambitious enterprises. 500+ projects delivered across 50+ countries.",
  openGraph: {
    title: "Calcify International — Engineering Tomorrow's Digital Infrastructure",
    description: "Enterprise ERP, AI, cloud, and cybersecurity solutions, delivered at global scale.",
    url: "https://calcify-international.com",
    siteName: "Calcify International",
    images: ["/og-image.png"],
    type: "website"
  },
  twitter: { card: "summary_large_image" }
}
```

- Add a real `/og-image.png` (1200×630) — don't ship without one, social shares will look broken.
- Add `sitemap.xml` and `robots.txt` via Next.js's built-in `app/sitemap.ts` / `app/robots.ts`.
- Add `Organization` JSON-LD structured data in the footer or layout with the real legal company name, logo, and `sameAs` social links.
- Favicon set: at minimum `favicon.ico`, `apple-touch-icon.png`, and a 32×32/16×16 PNG.

---

## 6. Performance budget

- Lighthouse targets: LCP < 2.5s, CLS < 0.1, TBT < 200ms on a throttled mid-tier mobile profile.
- Lazy-mount the `<Canvas>` only once it's near the viewport — don't block first paint on WebGL init.
- Cap the Lattice at ~150–250 points; profile on a mid-range laptop and a mid-range phone before raising that.
- **Mobile:** swap the live R3F scene for a lighter point count (already spec'd at ~60–100 in Section 8's config) or a static poster image. Full WebGL scroll-scrub is where most 3D marketing sites fail on real devices — test on an actual mid-range Android, not just desktop DevTools throttling.
- Images: use `next/image` everywhere (case-study visuals, OG image) for automatic sizing/format negotiation.
- Fonts: `next/font/google` with `display: swap`.

---

## 7. Accessibility & compliance

- `prefers-reduced-motion: reduce` → freeze Lattice, disable ScrollTrigger scrub, keep opacity-only fades.
- All interactive elements keyboard-reachable with a visible focus ring (`accent-pulse` outline); the 3D canvas must not swallow tab order (`pointer-events: none` on the canvas, as it's purely decorative).
- Color contrast: verify `--text-muted` on `--bg-panel` with an actual contrast checker (it's borderline) before shipping — everything else in the palette passes AA comfortably.
- Real `<button>`/`<a>` semantics throughout — no div-as-button.
- `alt` text on any logo images; `aria-label`s on icon-only controls (nav toggle, etc.).
- **Cookie/privacy:** if you add analytics (Section 9), you likely need a cookie consent banner depending on your visitors' jurisdictions (GDPR/CCPA) — decide this before launch, not after.

---

## 8. Folder structure

Rebased under `src/` per amendment 0.2. No `tailwind.config.ts` per amendment 0.1.

```
calcify-int-1/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── globals.css        # tokens live here in an @theme block
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── Lattice.tsx          # persistent R3F scene + morph states
│   │   │   └── LatticePoster.tsx    # static mobile/reduced-motion fallback
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustedBy.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Work.tsx
│   │   │   ├── WhyUs.tsx
│   │   │   ├── Testimonial.tsx
│   │   │   ├── CTA.tsx
│   │   │   └── Footer.tsx           # global, rendered by layout (amendment 0.4)
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Section.tsx          # section shell + heading block
│   │       ├── PageHero.tsx         # shared hero for non-home routes
│   │       ├── CountUp.tsx          # scroll-triggered stat counter
│   │       ├── ServiceIcon.tsx      # code-drawn line icons
│   │       └── Nav.tsx
│   ├── lib/
│   │   ├── content.ts               # all copy from Section 3, typed — single source of truth
│   │   └── useLatticeScroll.ts      # GSAP ScrollTrigger hook driving lattice state
│   └── hooks/
│       ├── useCountUp.ts
│       └── useScrollReveal.ts
├── public/
│   ├── og-image.png
│   └── favicon assets
├── .env.example
└── DESIGN_SPEC.md                   # this file
```

---

## 9. Integrations & environment variables

The current "Send Us a Message" CTA is a bare `mailto:` link — fine for a first pass, not production-grade (no delivery confirmation, easy to typo-block, no spam protection). For a real launch, wire up an actual contact-form endpoint:

```
# .env.example
NEXT_PUBLIC_WHATSAPP_NUMBER=94717170333
CONTACT_FORM_ENDPOINT=            # e.g. a Resend, Formspree, or custom API route
NEXT_PUBLIC_ANALYTICS_ID=         # GA4 / Plausible — leave blank until a decision is made
```

Don't commit real API keys or endpoint secrets to the repo — `.env.local` stays gitignored, `.env.example` documents the shape only.

---

## 10. Pre-launch QA checklist

- [ ] All case-study figures and client names confirmed accurate and cleared for publication
- [ ] Testimonial has documented consent from James Richardson / Global Finance Corp, or is anonymized
- [ ] Compliance claims (SOC 2, ISO 27001) match current, valid certifications
- [ ] Privacy Policy page exists and is linked (not a dead link)
- [ ] Blog/Documentation footer links either go to real pages or are removed
- [ ] Contact form endpoint tested end-to-end, spam protection in place
- [ ] OG image, favicon, sitemap, robots.txt all present
- [ ] Hero background media self-hosted or on a controlled CDN account (currently hotlinked third-party Cloudinary)
- [ ] Lighthouse pass on mobile: LCP/CLS/TBT within budget (Section 6)
- [ ] Tested on an actual mid-range Android device, not just desktop
- [ ] `prefers-reduced-motion` verified in a real browser setting
- [ ] Keyboard-only pass through the whole page (tab order, focus visibility)
- [ ] Legal company name / registration details correct in footer and structured data

---

## 11. Implementation phases

1. Scaffold + design tokens — wire Section 2 tokens as CSS variables in a Tailwind v4 `@theme` block; load the three fonts
2. Static layout pass — all sections, the real copy from Section 3, fully responsive, no 3D yet
3. `Lattice.tsx` v1 — static node cloud behind the hero only
4. Wire GSAP ScrollTrigger + `useLatticeScroll` to drive the four Lattice states through the page
5. Stat count-up, marquee, service/work card interactions
6. Mobile fallback (`LatticePoster`) + `prefers-reduced-motion` handling
7. SEO metadata, sitemap/robots, OG image, structured data
8. Performance pass (Lighthouse + real-device test) and accessibility pass (Section 7)
9. Wire the real contact-form endpoint; remove the bare `mailto:` fallback
10. Run the Section 10 checklist end-to-end before shipping
