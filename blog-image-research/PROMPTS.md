# AI image-generation prompts

There is one template per direction. Each has a **fixed style block** that never changes, so the series stays consistent; a **subject slot** that changes per article; and a **negative block**.

**Use these mainly for Direction A (Object Study).** For B–E, the HTML templates in `templates/` are faster, exact and on-brand every time. The B–E prompts are here for when you want a richer, illustrated variant or need to make one outside the code pipeline.

**How to use**
- **Midjourney:** `/imagine` + `[STYLE] [SUBJECT] --ar 40:21 --style raw --s 50 --no [NEGATIVE as comma list]`. 40:21 is 1200×630.
- **GPT-image / Gemini:** paste `STYLE`, then `SUBJECT`, then `Avoid: NEGATIVE`. Request 1536×1024 or the nearest wide size, then crop to 1200×630 around the centre.
- **Hex colors:** generators won't hit them exactly. Run every output through a palette snap, or re-colour the vector, before publishing. If the field color drifts, the series breaks.
- **Shared negative (append to every template):** `text, letters, words, numbers, logo, watermark, people, person, face, hands, stock photo, photograph, gradient, glow, lens flare, light streaks, glassmorphism, frosted glass, drop shadow, 3D render, bevel, checkmark badge, arrows, emoji, red, orange, yellow, green, purple, clutter, multiple objects, UI cards, dashboard, busy background, border, frame, vignette`

---

## A. Object Study

**STYLE (fixed)**
> Minimal editorial illustration, single object centred, drawn as a clean monoline icon with uniform rounded strokes (stroke about 1% of image width), no fills, white lines. The object sits on a large flat circle one shade lighter than the background. The background is a perfectly flat solid deep blue #162da1, with a faint thin horizontal line crossing behind the circle. Exactly one small detail of the object is drawn in teal #2dd0e8. Very generous negative space: the object takes about 45% of the image height. Calm, precise, vector, flat, 2D. Wide 1.9:1 format, subject inside the central square.

**SUBJECT (variable)**
> `[ONE object that stands for the role or specialty], with the teal detail on [one part of that object]`

**NEGATIVE:** shared negative, plus `second object, background scene, desk, office, medical equipment clutter, pattern, texture`

**Examples**
1. *What Does a Dermatology VMA Do?*
   > SUBJECT: a magnifying glass, with the teal detail on a small curved glint inside the lens
2. *Can a Virtual Assistant Be HIPAA Compliant? Safeguards, Training and BAAs*
   > SUBJECT: a protective shield outline, with the teal detail on a simple tick inside the shield

(Field variants: replace `deep blue #162da1` with `primary blue #2345ff` or `pale blue-white #eef1ff with deep blue #162da1 lines`. Pick one per specialty and keep it fixed.)

---

## B. Two Fields

**STYLE (fixed)**
> Minimal editorial illustration split exactly down the vertical centre: left half flat pale blue-white #eef1ff, right half flat primary blue #2345ff. One monoline icon sits in each half, close to the centre seam and the same size (about a third of the image height), with uniform rounded strokes and no fills. The left icon is drawn in deep blue #162da1; the right icon is drawn in white, with one small detail in teal #2dd0e8. A small solid teal #2dd0e8 dot sits exactly on the seam at mid-height. Perfectly flat, symmetrical, quiet, lots of empty field. Wide 1.9:1 format.

**SUBJECT (variable)**
> `left icon: [the in-house / traditional option]; right icon: [the virtual option], teal detail on [part]`

**NEGATIVE:** shared negative, plus `"VS" text, versus symbol, lightning bolt, unequal sizes, scales of justice, third icon`

**Examples**
1. *Radiology Virtual Medical Assistant vs. In-House Staff: Cost, Pros, and Which to Choose*
   > SUBJECT: left icon: a small clinic building with a cross; right icon: a headset, teal detail on the microphone boom
2. *Bilingual Virtual Dental Receptionist vs. In-House Staff: Cost, Pros, and Which to Choose*
   > SUBJECT: left icon: a small clinic building with a cross; right icon: a globe with meridian lines, teal detail on the equator line

---

## C. Quiet Metric

**STYLE (fixed)**
> Minimal editorial data illustration: a simple unlabelled bar chart, centred, on a perfectly flat pale blue-white #eef1ff background. Bars are flat rounded rectangles in soft periwinkle #c9d1ff, sitting on a thin baseline. Exactly one bar is solid primary blue #2345ff, with a small solid teal #2dd0e8 dot floating just above it. No axes, no labels, no numbers, no gridlines. The chart takes up the central 45% of the image width. Flat vector, calm, precise, lots of empty space. Wide 1.9:1 format.

**SUBJECT (variable)**
> `[N] bars [shape: descending / rising / floating range pills], the highlighted bar is [which one]`

**NEGATIVE:** shared negative, plus `dollar sign, currency, coins, money, arrows, trend line, pie chart, axis labels, legend, percent sign`

**Examples**
1. *How Much Does a Telephone Triage Virtual Assistant Cost?*
   > SUBJECT: 3 bars descending from left to right; the highlighted bar is the shortest, on the right
2. *Medical Office Staff Turnover, What It Costs and How to Cut It*
   > SUBJECT: 4 bars rising from left to right; the highlighted bar is the tallest, on the right

---

## D. Path

**STYLE (fixed)**
> Minimal editorial illustration on a perfectly flat primary blue #2345ff background. One thin smooth white line runs from the left edge to the right edge, rising into a gentle arch in the middle. Three circular nodes sit on the line: the first two are white outline circles holding white monoline icons, and the third is a solid white circle holding a blue monoline icon with one small teal #2dd0e8 detail. All icons use uniform rounded strokes and no fills. The three nodes sit within the central square of the image. Flat vector, calm, ordered, lots of empty field. Wide 1.9:1 format.

**SUBJECT (variable)**
> `node 1: [start of the workflow]; node 2: [middle step]; node 3: [outcome], teal detail on [part]`

**NEGATIVE:** shared negative, plus `arrowheads, numbers in nodes, step labels, fourth node, flowchart boxes, connectors with arrows`

**Examples**
1. *How a Scribe Works in Epic?*
   > SUBJECT: node 1: a sound waveform; node 2: a document with lines; node 3: a check inside a circle, teal detail on the check
2. *How to Hire a Virtual Case Manager*
   > SUBJECT: node 1: a document with lines; node 2: a simple person bust outline; node 3: a check inside a circle, teal detail on the check

---

## E. Numeral Plate

**Use the HTML template for this one.** Image generators still misspell words and set numerals unevenly. If you do generate it, generate only the field and numeral, then set the eyebrow and label yourself in Sequel Sans.

**STYLE (fixed)**
> Minimal editorial cover graphic on a perfectly flat pale blue-white #eef1ff background. One very large bold geometric sans-serif numeral in primary blue #2345ff takes up about 60% of the image height, placed just left of centre. To its right, a short thin teal #2dd0e8 horizontal tick, with empty space below it reserved for a label. Nothing else. Flat, typographic, Swiss-style, calm. Wide 1.9:1 format.

**SUBJECT (variable)**
> `the numeral "[N]"`, or a single large question mark when the post has no count

**NEGATIVE:** shared negative, **minus** `numbers` (keep `text, letters, words`), plus `trophy, medal, stars, ribbon, "top", "best", decorative flourishes`

**Examples**
1. *10 Best Medical Billing Virtual Assistant Companies (2026)*
   > SUBJECT: the numeral "10". *Then add in Sequel Sans: eyebrow "COMPANIES · 2026", label "Medical billing VAs".*
2. *Virtual Medical Office Manager Interview Questions*
   > SUBJECT: a single large question mark. *Then add: eyebrow "INTERVIEW GUIDE", label "Office manager".*

---

## QA checklist for every generated image

- [ ] Background is one flat color from the kit (`#162da1`, `#2345ff` or `#eef1ff`), with no gradient
- [ ] One focal object or structure, and 55%+ of the canvas empty
- [ ] Teal appears on exactly one element, plus the signature dot if you add it in post
- [ ] No people, text (except E's label), badges, shadows or glow
- [ ] Key art sits inside the centre square (x 285–915 on a 1200×630 canvas)
- [ ] Next to three other posts in the grid, it looks like the same series
