# Calcify International — design system

Dark, precise, alive. Every visual on the site is drawn in code — there are no
image, video or logo files in the repository.

## Brand

- **Logo**: text-only wordmark, `calcify` set tight in Onest 600, closed by a
  chartreuse square (`src/components/ui/Wordmark.tsx`). The square turns 45°
  into a "crystal" on hover. Favicon and share card are generated in code
  (`src/app/icon.tsx`, `src/app/opengraph-image.tsx`).
- **Honesty rule**: no client names, project counts, user numbers or
  certifications until they are real and cleared. `src/lib/content.ts` holds
  all copy; its `facts` describe the offer, and `work` lists concept
  platforms, labelled as concepts.

## Tokens (`src/app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--c-bg` | `#08080a` | page |
| `--c-surface` / `--c-surface-2` | `#0f0f12` / `#16161a` | cards, panels |
| `--c-line` / `--c-line-2` | `#222227` / `#2f2f36` | hairlines |
| `--c-ink` / `--c-muted` / `--c-subtle` | `#f2f1ec` / `#9a9aa2` / `#66666e` | text |
| `--c-accent` (`--accent-rgb`) | `#d4ff3f` | the one accent: CTAs, emphasis, live state |
| `--c-accent-2` (`--accent-2-rgb`) | `#b9a8ff` | secondary detail, data |
| `--c-amber` | `#ffb454` | warnings in demo UIs |

Change the accent in `:root` (hex and rgb) and everything follows, canvases included.

**Type**: Onest (display + body), Instrument Serif italic (the one emphasised
phrase per headline, via `<em>`), JetBrains Mono (labels, data, code).

## Motion

- Smooth scrolling: Lenis (`src/components/motion/SmoothScroll.tsx`); anything
  that freezes the page uses `lockScroll` from `src/lib/scroll.ts`.
- Kit in `src/components/motion/`: `RevealText` (line mask reveal), `ScrubText`
  (scroll-lit words), `Scramble` (decoding text), `RollingNumber` (odometer),
  `Magnetic`, `Spotlight` (pointer-lit cards), `Cursor`, `ScrollProgress`.
- Only `transform` and `opacity` are animated on scroll. Canvases pause off
  screen and in hidden tabs.
- `prefers-reduced-motion`: no smooth scroll, no cursor, pinned sections
  unpin, canvases render one still frame.
- Loading: a boot-sequence loader on every full page load (shorter on repeat
  visits, hard-capped) and a wordmark curtain between pages (`src/app/template.tsx`).

## Homepage chapters (`src/components/home/`)

1. **Hero** — "the Lattice" (`NetworkCanvas`): a three-depth node network with
   parallax, packet trails and broadcast waves; click to send one.
2. **VelocityMarquee** — disciplines and stack, thrown along by scroll speed.
3. **Manifesto** — scroll-lit statement plus offer facts.
4. **BuildSequence** (`build/`) — pinned: blueprint draws → code types →
   pipeline ships → a live dashboard boots from skeletons and streams sample data.
5. **Capabilities** — bento of spotlight cards with CSS-animated service visuals.
6. **WorkRail** — horizontal pinned rail of concept platforms (`ConceptVisual`).
7. **Process** — timeline whose spine draws as you read.
8. **ClosingCta** — converging lattice and a real mini shell (`CommandLine`).

Inner pages live in `src/components/pages/` and reuse the same parts.
