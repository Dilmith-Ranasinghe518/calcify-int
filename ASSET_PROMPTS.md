# Asset generation prompts — Grok Imagine

Detailed prompts for the four case-study visuals the site needs, plus optional
extras. Generate, compress, drop into the listed path, then set the matching
`media` field in `src/lib/content.ts`.

Until a file exists the card renders a styled "visual pending" placeholder, so
you can add these one at a time without breaking anything.

---

## Before you start — read this once

**The three constraints that decide whether an image works here:**

1. **The bottom third must be near-black.** White text sits over it. If the
   composition puts its subject low in the frame, the card is unusable no
   matter how good the image is. Always ask for the subject in the upper two
   thirds and darkness falling away below.
2. **Exactly one colour of light: red `#E8262E`.** No blue, cyan, teal, orange
   or green accents. Blue is the default "tech render" colour that every model
   reaches for, so you have to actively push it away — that's why every prompt
   below explicitly forbids it.
3. **No text, no logos, no faces.** Generators love inserting fake UI labels
   and garbled signage. Those instantly look cheap and, if a mark resembles a
   real company's, become a legal problem.

**How to work:** generate 4–6 variations per slot, then pick. Judge them
*small and in place*, not full-screen — a busy image that looks impressive at
100% turns to noise at card size.

**Negative list — append to every prompt:**

> No text, no words, no letters, no numbers, no logos, no watermarks, no
> signatures, no UI labels, no human faces, no blue lighting, no cyan, no
> teal, no orange, no green, not cluttered, not busy, no lens flare spam,
> no oversaturation.

---

## 1. Global Banking Platform — flagship card

- **File:** `public/work/global-banking.jpg`
- **Ratio:** 4:3, at least 1600×1200 (this is the largest card — don't
  under-resolve it)
- **Field:** `work[0].media`

**Prompt:**

> Ultra-wide symmetrical corridor inside a modern enterprise data centre,
> receding into deep blackness at the vanishing point. Tall matte-black server
> racks line both sides in strict repetition, each rack punctuated by tiny
> crimson red status LEDs (#E8262E) forming vertical rhythms of light. Cold
> dark grey brushed-metal surfaces, subtle reflections on a polished dark
> floor. Single-point perspective, camera at chest height, dead centre.
> Volumetric haze catching faint red light in the upper half. Lighting is
> low-key and dramatic: 95% of the frame is near-black, illumination comes
> only from the equipment itself. Shot on 35mm, f/2.8, shallow depth of field
> with the far end of the corridor soft. Cinematic, restrained, architectural,
> photorealistic, high detail in shadow, deep blacks, no crushed highlights.
> The bottom third of the frame falls into near-total darkness.

**Why this composition:** the one-point perspective gives the flagship card a
strong focal centre that survives being cropped, and the receding corridor
naturally darkens toward the bottom where the headline sits.

**Variations worth trying:** swap "corridor" for "server hall seen from a
raised walkway"; or "close-up of a single rack, extreme shallow focus, red
LEDs as bokeh".

**Reject if:** you see blue equipment glow, readable text on the racks, a
person in frame, or the floor is bright.

---

## 2. AI-Powered Healthcare

- **File:** `public/work/ai-healthcare.jpg`
- **Ratio:** 16:10, at least 1600×1000
- **Field:** `work[1].media`

**Prompt:**

> Abstract medical imaging visualisation floating in a pitch-black void. A
> translucent greyscale cross-section of a human ribcage and lungs, rendered
> as stacked semi-transparent scan slices separated in space, like an exploded
> CT volume. Cool neutral grey and bone-white tones only. A single thin
> crimson red (#E8262E) horizontal scanning plane cuts through the volume,
> casting a faint red edge glow where it intersects the tissue. Clinical,
> precise, scientific. Centred composition, subject occupying the upper two
> thirds, dissolving into pure black at the bottom. Soft rim lighting, no
> harsh speculars. Volumetric depth, fine particulate detail. Photorealistic
> medical visualisation, museum-quality render, extremely dark background.

**Why this composition:** anatomy reads instantly as healthcare without
needing a hospital, a patient, or anything that could imply a real client.

**Variations worth trying:** a brain volume instead of a ribcage; or an
abstract point-cloud of a skeletal structure.

**Reject if:** it looks gory or wet, shows a recognisable face, includes fake
readouts or vital-sign text, or the red reads as blood rather than as light.

---

## 3. Smart City Infrastructure

- **File:** `public/work/smart-city.jpg`
- **Ratio:** 16:10, at least 1600×1000
- **Field:** `work[2].media`

**Prompt:**

> Aerial top-down night photograph of a dense city grid from roughly 800
> metres, shot straight down. Buildings are near-black silhouettes with only
> faint cool grey edge definition — almost no window light. The street grid is
> traced by long-exposure crimson red (#E8262E) vehicle light trails flowing
> through the arteries, brighter at major intersections where they pool into
> small nodes of light. The overall impression is a circuit board made of
> streets. 90% of the frame is black; the red trails are the only significant
> light source. Long exposure, 30 seconds, sharp, high altitude, orthographic
> feel, no perspective distortion. Cinematic aerial photography,
> photorealistic, deep blacks, fine detail, cool desaturated shadows.

**Why this composition:** top-down reads as "infrastructure" and "systems"
rather than "travel photo", and it keeps the light distributed evenly instead
of pooling in one bright corner.

**Variations worth trying:** a motorway interchange filling the frame; or a
port terminal with container rows in strict grid.

**Reject if:** trails are white or amber (the default for car headlights — you
must push red), buildings are lit up, or it looks like a daytime shot darkened.

---

## 4. E-Commerce Ecosystem

- **File:** `public/work/ecommerce.jpg`
- **Ratio:** 16:10, at least 1600×1000
- **Field:** `work[3].media`

**Prompt:**

> Interior of a vast automated fulfilment warehouse at night, lights mostly
> off. Endless rows of matte-black storage racking recede into darkness in
> strong linear perspective. Robotic sorting units and conveyor lines run
> through the frame, their edges marked by thin crimson red (#E8262E)
> indicator strips and status lights. Cold dark grey powder-coated steel,
> polished concrete floor with faint reflections. Geometric repetition,
> industrial precision, completely deserted. Wide-angle shot from a low
> vantage, subject in the upper two thirds, foreground floor falling into
> black. Low-key cinematic lighting, volumetric haze, photorealistic,
> architectural photography, deep shadow detail, no bright areas.

**Why this composition:** logistics infrastructure communicates commerce at
scale far better than shopfronts or products, and stays abstract enough not to
imply a specific client.

**Variations worth trying:** a close-up of a single robotic arm with red
indicators, extreme shallow focus; or conveyor lines from directly overhead.

**Reject if:** it shows branded packaging, readable barcodes or labels,
workers, or bright overhead lighting.

---

## 5. Optional — About page studio shot

- **File:** `public/about/studio.jpg`
- **Ratio:** 16:9
- **Field:** wire manually into `/about`

**Prompt:**

> Interior of a modern software engineering studio at night, completely empty.
> Long desks with rows of dark monitors, screens off or showing only faint grey
> glow. Exposed concrete, dark steel, floor-to-ceiling glass reflecting the
> dark room. A single crimson red (#E8262E) LED strip runs along one wall at
> desk height, the only colour in the frame. Cold, quiet, precise. Wide-angle
> architectural interior photography, one-point perspective, tripod, long
> exposure, low-key, photorealistic, deep blacks, no people, no text on screens.

---

## 6. Optional — hero ambient video

Only if you want motion behind the headline. **Read the caution below first.**

- **File:** `public/hero/ambient.mp4`
- **Length:** 8–12s, seamless loop, silent
- **Hard limit:** under 3 MB after compression

**Prompt:**

> Extremely slow-moving abstract dark atmosphere. Pure black background with
> faint crimson red volumetric haze drifting almost imperceptibly from the
> upper right toward centre frame. Sparse slow-floating dust particles
> catching minimal light. Near-static, no discernible subject, no camera
> movement, no shake, no zoom. Continuous seamless loop with no visible cut.
> Cinematic, very low brightness, film grain, moody.

**Caution:** this is the single easiest way to wreck the performance budget.
It must not autoplay on mobile, needs a poster frame, `preload="none"`,
`muted`, `playsInline`, and a `prefers-reduced-motion` guard. **Tell me if you
generate it and I'll wire it properly — don't drop a raw `<video>` in.**

---

## 7. Optional — portfolio hover clips

Short silent loops that play when a case-study card is hovered, desktop only.

- **Files:** `public/work/<slug>-loop.mp4`
- **Length:** 5–8s, seamless, silent, **under 2 MB each**

Use the same prompt as the matching still image, with this appended:

> Very slow subtle camera push-in, almost imperceptible movement, seamless
> loop, no cuts, no people entering frame, static composition.

Tell me if you generate these and I'll wire the hover behaviour with proper
poster frames and a mobile bypass.

---

## After generating

1. **Compress.** Run through [Squoosh](https://squoosh.app). Target under
   ~300 KB per image. Export WebP if offered.
2. **Set the field** in `src/lib/content.ts`:

   ```ts
   media: "/work/global-banking.jpg",
   mediaAlt: "Dark data centre corridor lined with red server status lights",
   ```

3. **Write real alt text.** It is read aloud by screen readers and indexed by
   search engines. Describe what the image *shows* — not the project name,
   which is already in the heading right beside it.
4. Run `npm run build` and confirm no 404s.

## One thing to keep straight

These are atmospheric, illustrative images — not photographs of the actual
delivered systems. That is completely normal for a consultancy site. It only
becomes a problem if a visual implies something untrue: a real hospital, a
named client's premises, or a screenshot presented as their live product. Keep
them abstract, and never caption them in a way that suggests they document
real work.
