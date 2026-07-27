# Asset generation prompts — Grok Imagine

Prompts for the imagery this site expects. Generate them, drop the files in the
paths listed, then set the matching `media` field in `src/lib/content.ts`.
Until a file exists the card renders a styled "visual pending" placeholder, so
you can add them one at a time without breaking the build.

## House style — apply to every prompt

Paste this into each generation so the set looks like one system:

> Pure black background (#020202), high contrast, single red accent (#E8262E),
> cool desaturated greys, cinematic low-key lighting, sharp modern minimalism,
> no text, no logos, no watermarks, no people's faces, photoreal, 16:9.

Keep it **dark**. Every image sits on a black page with white type over the
lower third, so bright or busy visuals will fight the layout. Aim for detail in
the upper two-thirds and near-black at the bottom.

---

## 1. Global Banking Platform — flagship

- **File:** `public/work/global-banking.jpg`
- **Ratio:** 4:3 (flagship card) — generate 1600×1200 or larger
- **Field in content.ts:** `work[0].media`

> Abstract enterprise banking infrastructure, dark data centre corridor with
> glowing red server indicator lights receding into blackness, subtle floating
> holographic financial grid overlays, cool grey metal surfaces, one red accent
> light, cinematic depth of field, low-key, photoreal, no text, no logos.

---

## 2. AI-Powered Healthcare

- **File:** `public/work/ai-healthcare.jpg`
- **Ratio:** 16:10 — generate 1600×1000 or larger
- **Field:** `work[1].media`

> Abstract medical AI imaging, dark clinical environment, translucent
> greyscale anatomical scan slices floating in black space, thin red scanning
> line crossing the volume, cold clinical lighting, minimal, photoreal,
> no text, no logos, no recognisable faces.

---

## 3. Smart City Infrastructure

- **File:** `public/work/smart-city.jpg`
- **Ratio:** 16:10
- **Field:** `work[2].media`

> Aerial night view of a dense city grid, near-black, thin red traffic light
> trails threading the streets, faint sensor nodes glowing at intersections,
> cold blue-grey buildings, long exposure, cinematic, top-down, photoreal,
> no text, no logos.

---

## 4. E-Commerce Ecosystem

- **File:** `public/work/ecommerce.jpg`
- **Ratio:** 16:10
- **Field:** `work[3].media`

> Abstract omnichannel retail logistics, dark automated warehouse, robotic
> sorting arms and conveyor lines lit by red indicator strips, deep shadow,
> cold grey steel, geometric repetition receding into black, cinematic wide
> shot, photoreal, no text, no logos.

---

## 5. Optional — hero ambient video

Only add this if you want motion behind the headline. It must stay **very**
dark and near-static, or it will compete with the hero type and hurt LCP.

- **File:** `public/hero/ambient.mp4` (plus `ambient.webm` if Grok can export it)
- **Length:** 8–12s, seamless loop, no audio
- **Target size:** under 3 MB — compress before committing

> Extremely slow drifting abstract dark texture, black background, faint red
> volumetric haze moving slowly from upper right, subtle floating dust motes,
> almost static, no camera shake, no subjects, no text, seamless loop,
> cinematic, very low brightness.

**If you add this, tell me** — it needs `poster`, `muted`, `playsInline`,
`preload="none"`, and a `prefers-reduced-motion` guard, plus it should not load
at all on mobile. I'll wire that; don't just drop a `<video>` in.

---

## 6. Optional — About page team/office

- **File:** `public/about/studio.jpg`
- **Ratio:** 16:9

> Dark modern software studio interior at night, empty, rows of monitors
> glowing faintly, red accent lighting strip along one wall, cold grey
> concrete and glass, moody, architectural photography, wide angle, photoreal,
> no people, no text, no logos.

---

## After generating

1. **Compress before committing.** Run each through Squoosh or similar and
   target under ~300 KB per image. Prefer `.webp` over `.jpg` if Grok exports
   it — `next/image` will still serve modern formats either way.
2. **Set the field** in `src/lib/content.ts`, e.g.

   ```ts
   media: "/work/global-banking.jpg",
   mediaAlt: "Dark data centre corridor with red indicator lights",
   ```

3. **Write real `mediaAlt` text.** It is read aloud by screen readers and used
   by search engines — describe what the image shows, not the project name.
4. Re-run `npm run build` to confirm nothing 404s.

## One caution

These are illustrative, atmospheric images — they are not photographs of the
actual client systems. That is normal and fine for a consultancy site. It only
becomes a problem if a visual implies something untrue, such as showing a real
hospital or a named client's premises. Keep them abstract, and do not caption
them in a way that suggests they are photographs of delivered work.
