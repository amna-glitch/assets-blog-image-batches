# v7 brief: 72 word-free covers on the HT see-through gradient

## What the client asked for
- Convert the text into visuals: **no words on the image**. The title is told by objects, icons, people and composition.
- 72 covers that each look clearly different (the last round "looked kind of the same").
- Use the gradient from the current blog images, with a little transparency like Calendly's blog covers.

## What's shared (already built in `templates/cover.html`; never redraw it in a scene)
- Background `htBackground()`. It is a see-through blue wash measured from 319 current images:
  - strongest at the top-right (electric blue);
  - deeper blue at the bottom-left;
  - a cyan band along the bottom, a pale centre, and soft white waves at the bottom.
- The logo at the bottom-left.
- Helpers on `ctx`:
  - `add`, `svg`, `ico`, `glass`, `solid`, `tile`, `capsules`, `ghost`, `stripes`, `photo`, `P` (palette).
  - SVG gradient ids usable in `svg()` markup: `url(#gB)` blue, `url(#gBC)` blue→cyan, `url(#gCap)` capsule, `url(#gGlass)` frosted white, `url(#gGhost)` ghost white. `filter="url(#soft)"` gives a soft blue drop shadow.
- Icons for `ico(name, size, stroke, colour, accent)`: tooth, paw, stethoscope, phone, headset, calendar, clipboard, shield, lock, clinic, laptop, document, magnifier, rx, heart, person, check, globe, coin, wave, ear, eye, spine, brain, people. Draw anything else yourself in SVG.
- Photos for `photo(name, focal, x, y, w, h, tx, ty, zoom, radius)`:
  - files are in `v3/photos/*.webp`, with focal points in `v3/photos/focal.json`;
  - these are the current AI images, so crop tight on the person's face and shoulders to avoid the baked-in UI tiles and checkmarks.
- Palette `P`: blue #2345ff, deep #162da1, mid #3e59ff, teal #2dd0e8, electric #1344fd, bright #2e64fd, cyan #02d0fd, aqua #55e0fa, sky #a9d2f7, ink #0b1440, mute #8a93b8, line #dfe5f7.

## Hard rules
1. **No words, no letters.**
   - Digits are allowed only when they are part of an object, such as a calendar day, a clock face, a podium "1 2 3" or a numeric code chip.
   - No question marks. No prices or currency amounts.
2. **No third-party logos or brand marks** (Epic, Dentrix, Calendly, Stripe…).
   - Use generic shapes, such as a generic monitor window for "EHR".
   - Do not copy Calendly's or Rippling's artwork. Use their principles only: frosted glass, see-through capsules, ghosted shapes, light streaks, soft blur.
3. **Listing-card safe area.** The honesttaskers.com listing card shows only x 115–1085 and y 0–353.
   - The idea must read inside that band.
   - Below y 353, use only supporting or decorative material (reflections, capsules, shadows, a secondary object).
   - Keep x < 1085 and x > 115 for anything that matters.
4. **Brand colours only:** the blues, teal, cyan, white and ink. A soft coral `#ff8a8a` is allowed sparingly for a "problem" signal (a denial, a no-show).
5. **Every scene must be visually distinct.** Vary these across the set so no two look alike:
   - the composition (centred hero, left-weighted, diagonal, grid, scattered, full-bleed, layered depth);
   - the scale (one huge object vs. many small ones);
   - the technique (frosted glass, solid white cards, line art, isometric, paper-cut layers, photo cut-outs, patterns, ghosted giant shapes, capsules).
   - Do not make another "row of glass tiles with icons" unless the brief says so.
6. Every scene must be about its article title. Someone who sees only the image should be able to guess the topic.
7. Quality: crisp vector shapes, consistent stroke widths (6–9px for icons at around 60–120px), generous spacing and no clutter. Aim for the polish of Calendly, Stripe and Mercury blog covers.

## Scene file format
```js
// scenes-x.js
(() => { const S = window.SCENES;
S.s19 = { title: '<exact article title>', style: '<style name>', draw({ add, svg, ico, glass, solid, tile, capsules, ghost, stripes, photo, P }) { ... } };
})();
```
To render: `cd v7/templates && PW_MODULE=/opt/node-tools/node_modules/playwright node render.js s19 s20 …` writes `v7/renders/<id>.png`.

## The 72 assignments
| id | Article title (exact) | Style | Concept |
|---|---|---|---|
| s01 | Virtual Medical Assistant in Epic | Glass pair | two frosted tiles joined by a liquid bridge: headset + EHR (done) |
| s02 | Healthcare Call Center Outsourcing: Services, Costs, and Providers | Capsule equaliser | see-through capsules as call volume, headset tile (done) |
| s03 | Physician Burnout and Admin Workload | Aurora blobs + one object | big soft blurred blobs, a glass battery nearly empty, a tall paper stack leaning |
| s04 | Medical Billing Virtual Assistant Guide | Layered depth stack | 3 stacked frosted cards in perspective (claim lines, payment, ledger) |
| s05 | How to Hire a Virtual Dental Receptionist | Ghosted giant shape | a huge see-through tooth outline filling the right half, a small solid headset badge and a chair silhouette |
| s06 | Telehealth Explained for Practices | Light streaks + window | horizontal light streaks left, a glass video-call window with a doctor/patient split (simple avatars) |
| s07 | Medical Coding Audits | Lens over pattern | a grid pattern of small code blocks; a big glass magnifier lens makes one area crisp and highlighted |
| s08 | Bilingual Virtual Medical Receptionist: The Complete Guide | Bubble stack | two overlapping big speech bubbles in glass, each with a different wave/dot rhythm, a globe badge |
| s09 | Credentialing vs Enrollment | Translucent venn | two big translucent overlapping circles (multiply-like overlap), an ID badge icon in one, a clinic in the other |
| s10 | Signs Your Practice Needs a Virtual Assistant (and When to Wait) | Toggle switches | a column of 4 large glass toggle switches, 3 on (teal), 1 off; small icons next to them |
| s11 | How to Hire a VA for Multi-Location Group Practices | Connected buildings | 3 small clinic buildings in glass at different depths linked by a dotted route to one central headset node |
| s12 | Home Office Setup and Equipment Every Healthcare Virtual Assistant Needs | Isometric desk | an isometric desk with laptop, second monitor, headset, plant, lamp (flat iso shading in blues) |
| s13 | How Do Dental Practices Use Virtual Assistants? A Full Walkthrough | Isometric room | isometric dental operatory (chair, light) with a floating remote screen connected by a beam |
| s14 | What Tasks Can a Dental Virtual Assistant Take Over? 25 Examples | Hero + constellation | a large solid white tooth hero; 25 tiny glass dots/chips in an arc constellation around it, a few with icons |
| s15 | Healthcare Staffing Shortages | Paper-cut layers | layered paper-cut hills in blues; a row of simple people silhouettes with gaps (empty outlines) |
| s16 | How Nurses Can Become Virtual Assistants | Continuous line | one continuous white line drawing a nurse cap that flows into a headset and a laptop |
| s17 | How Healthcare VA Staffing Works? | Blueprint flow | blueprint grid on a glass panel; practice node → matching node → VA node with technical connectors |
| s18 | Charge Entry Explained | Conveyor | documents on a conveyor belt moving into a claim box/envelope, motion lines |
| s19 | How to Reduce Claim Denials in Your Medical Practice | Maze | a top-down rounded maze; a claim document token finds the path out to an approved badge; dead ends with coral marks |
| s20 | Improving Patient Intake | Funnel | a glass funnel; scattered patient/document chips at top become one neat form card at the bottom |
| s21 | In-House vs Virtual: Cost Comparison | Balance scale | a large balance scale: clinic building on one pan, laptop+headset on the other, tilted |
| s22 | Virtual Medical Assistant vs In-Person Medical Assistant | Photo split | left: photo crop of a person in a rounded panel (muted); right: same-size glass screen with a headset avatar; a thin divider |
| s23 | The Highest-Paying Healthcare Virtual Assistant Roles | Stairs | ascending 3D stairs/blocks with a role icon on each step (calendar, stethoscope, document, shield), top step glowing |
| s24 | Best Medical Billing Companies | Podium | a 1-2-3 podium (digits on the blocks allowed) with glass trophies/stars |
| s25 | Is It Legal to Hire an Overseas Healthcare VA? | Globe + shield | a large dotted globe; a shield with a gavel/scale icon in front; an arc between two pins |
| s26 | US-Based vs. Offshore Virtual Medical Biller: Cost, Quality, and Compliance | Flight arc | two location pins on a dot-grid map strip connected by a dashed arc; two small glass cards under each pin |
| s27 | How a Physician Answering Service Works? | Night clock | a big clock face (digits allowed), the night segment shaded deep blue with a moon, a phone ringing at the edge |
| s28 | How to Outsource Medical Scheduling | Giant calendar | a big solid calendar page in perspective with booked slots filling in; one slot being dropped in by a glass cursor |
| s29 | Virtual Medical Records Specialist Skills | Keycaps | 3–5 large 3D keyboard keycaps with icons (folder, lock, magnifier, document) |
| s30 | How to Hire a Virtual Care Coordinator | Puzzle | 4 puzzle pieces, one being placed, each with a care icon (heart, calendar, phone, person) |
| s31 | Virtual Medical Records Specialist Guide | Folder fan | a fan of file folders with coloured tabs (no text) and one folder pulled out, a glass search lens |
| s32 | EOB vs ERA | Paper vs screen | a curled paper receipt on the left vs a glowing glass screen with the same rows on the right, an arrow between |
| s33 | CPT Codes Explained | Code mosaic | a mosaic of rounded chips with 5-digit numeric codes (made-up-looking but CPT-shaped like 99213), one chip lifted out |
| s34 | ICD-10 Codes Explained | Tree | a branching tree diagram of nodes (root → chapters → codes), one path highlighted teal |
| s35 | Medical Billing Modifiers Explained | Snap-on blocks | a base block (procedure) with small tag blocks snapping onto it like building bricks |
| s36 | Place of Service Codes | Pins on iso map | an isometric mini map with home, clinic, hospital and a laptop (telehealth), each with a map pin |
| s37 | Provider Taxonomy Codes | Circle packing | nested circles (circle packing) in blues, the smallest highlighted with a stethoscope |
| s38 | What Are SOAP Notes? | Four quadrants | a 2×2 grid of glass quadrants with icons: speech wave (subjective), stethoscope (objective), magnifier (assessment), clipboard (plan) |
| s39 | What Counts as PHI? | Exploded ID card | a patient ID card exploded into floating pieces (photo, name bar, date, barcode), some pieces covered by small shields |
| s40 | How Healthcare VAs Protect Patient Data? | Vault | a round vault door (bank-vault style) in blues with a folder/heart visible inside |
| s41 | EHR vs EMR | Network vs single | left: one monitor alone; right: a monitor linked by lines to clinic, lab, pharmacy nodes |
| s42 | Scribing vs Transcription | Wave to doc | top: a live voice wave flowing straight into a document; bottom: an audio file block → hourglass → document |
| s43 | Virtual Medical Scribe vs. AI Medical Scribe: Key Differences and Which to Choose | Half and half | a face profile split down the middle: one half a human (photo crop or warm illustration), one half circuit lines |
| s44 | Front Desk Burnout in Medical Offices, Signs and Fixes | Chaos desk | a desk seen from the front: 3 phones ringing (vibration marks), paper stacks, a sticky-note storm |
| s45 | Medical Office Staff Turnover, What It Costs and How to Cut It | Revolving door | a top-down / iso revolving door with person silhouettes entering and leaving |
| s46 | How to Measure the ROI of a Virtual Medical Assistant | Test tubes | 3–4 lab test tubes in glass filled to rising levels with coins inside, a ruler scale beside |
| s47 | Healthcare Virtual Assistant Career Path and Where the Role Can Lead | Winding road | a winding road going up and back into depth, milestone flags with icons along it |
| s48 | Healthcare Virtual Assistant Resume Guide (With Examples) | Resume sheet | a tilted paper resume (photo circle, bars for text, skill bars), a pen and a glass highlight |
| s49 | Where to Find Healthcare Virtual Assistant Jobs | Pinboard | a corkboard-like glass board with pinned cards (icon only), one card magnified |
| s50 | How Virtual Assistants Get Paid by US Companies | Coin arc | two wallets/bank buildings on each side, an arc of coins flying between them |
| s51 | Virtual Assistant Pay in Latin America, Country-by-Country Ranges | Bars from a map | a stylised dot map of the Americas with vertical range bars rising from 4–5 points (no numbers) |
| s52 | Virtual Assistant Salary in the Philippines | Islands | an abstract archipelago of dot-islands on a glass sea, a coin stack on one island, a laptop on another |
| s53 | How Virtual Assistants Keep Telehealth Practices Running | Photo in screen | a laptop whose screen shows a cropped photo of a person with a headset, small gears/glass status chips |
| s54 | How Virtual Assistants Support Therapy and Mental Health Practices | Calm room | two soft armchairs facing, a plant, a floating brain/heart glass badge; calm rounded shapes |
| s55 | How Virtual Assistants Support Veterinary Practices | Paw trail | a trail of paw prints crossing the frame and ending at a glass laptop with a paw on screen |
| s56 | Remote Patient Monitoring Assistant Guide | Devices to dashboard | a smartwatch and a BP cuff/pulse oximeter sending pulse lines into a glass dashboard |
| s57 | Telephone Triage Virtual Assistant Skills | Signal stack | a vertical stack of 3 glowing lights (deep/blue/teal) like a priority signal, a phone handset |
| s58 | How to Hire a Virtual Chronic Care Management Assistant | Month ring | a circular month ring (30 dots) with pill capsules on some days, heart at the centre |
| s59 | How to Hire a Pharmacy Virtual Assistant | Capsules macro | big translucent pill capsules (two-tone) and an Rx bottle, macro scale, slight tilt |
| s60 | How to Hire a Optometry VMA | Lens rings | concentric lens rings like an optical diagram, a pair of glasses in front, an eye icon |
| s61 | How to Hire a Cardiology VMA | Heart + ECG | a big glossy heart shape in glass, an ECG line running across the full width through it |
| s62 | How to Hire a Pediatrics VMA | Toy blocks | stacked toy blocks with simple symbols (heart, star, cross shapes, not letters), a small stethoscope |
| s63 | How to Hire a Sleep Medicine VMA | Night sky | a crescent moon, stars and a slow sleep wave line; a pillow shape; deep-blue dominant scene |
| s64 | How to Hire a Orthopedics VMA | X-ray negative | an x-ray-style negative of a knee/leg bone in white on a deep blue lightbox panel |
| s65 | How to Hire a Radiology VMA | Scan rings | a CT/MRI ring scanner shape (big torus) in glass with a scan line passing |
| s66 | How to Hire a VA for Med Spas | Serum drops | glass serum bottles with droppers, a big droplet, a lotus/leaf, a soft glow |
| s67 | How to Hire a VA for Hospice And Palliative Care | Hands + heart | two simple hands cupping a soft heart, warm and gentle, lots of space |
| s68 | How to Hire a VA for Skilled Nursing Facilities | Building windows | a facility building facade whose windows show small bed/heart icons, one window lit teal |
| s69 | Types of Virtual Medical Assistants Explained for Practice Owners | Avatar grid | a neat 3×2 grid of round avatar badges each with a role accessory icon (headset, stethoscope, coin, calendar, document, tooth) |
| s70 | What Software Do Virtual Medical Assistants Use? The Full Stack | Slab stack | an isometric stack of 4 glass slabs (layers) each with generic app glyphs, exploded vertically |
| s71 | How to Vet Virtual Assistant Staffing Companies and the Questions to Ask | Sieve/filter | a filter/sieve: many company-building chips go in at the top, few come out at the bottom |
| s72 | Top Reasons Claims Get Denied | Stamped stack | a fanned stack of claim papers, coral "denied" marks shown as a big X stamp shape (no words), one being lifted |
