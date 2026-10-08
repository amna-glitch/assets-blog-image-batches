// scenes-d.js  Scenes s55-s72. Each: SCENES[id] = { title, style, draw(ctx) }. No words on the image.
(() => { const S = window.SCENES;

// ---- local helpers -------------------------------------------------------
// IC: a brand icon drawn inside an SVG layer, centred on (cx, cy). Accent is inlined so icons don't share one CSS rule.
const IC = (n, cx, cy, size, sw = 8, col = '#2345ff', acc = '#2dd0e8') =>
  `<g transform="translate(${cx - size / 2},${cy - size / 2}) scale(${size / 120})" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${
    window.HT_ICONS[n].replace(/class="ac"/g, `style="stroke:${acc}"`)}</g>`;
// Filled heart centred on (cx, cy); k = 1 gives ~84px wide.
const HEART = 'M60 98C30 78 18 62 18 46c0-14 10-24 22-24 9 0 16 6 20 12 4-6 11-12 20-12 12 0 22 10 22 24 0 16-12 32-42 52z';
const heart = (cx, cy, k, attrs) => `<path d="${HEART}" transform="translate(${cx},${cy}) scale(${k}) translate(-60,-60)" ${attrs}/>`;
// Filled paw print, toes pointing to -y, centred near (0,0), ~56px wide at scale 1.
const PAW = `<path d="M0 2 C 16 2 30 14 28 27 C 26 39 14 40 0 35 C -14 40 -26 39 -28 27 C -30 14 -16 2 0 2Z"/>
  <ellipse cx="-25" cy="-8" rx="7" ry="9.5" transform="rotate(-25 -25 -8)"/><ellipse cx="-9" cy="-20" rx="7.5" ry="10"/>
  <ellipse cx="9" cy="-20" rx="7.5" ry="10"/><ellipse cx="25" cy="-8" rx="7" ry="9.5" transform="rotate(25 25 -8)"/>`;
// 5-point star path centred on (cx, cy).
const star = (cx, cy, R, r = R * .48) => 'M' + Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r : R;
  return `${(cx + q * Math.cos(a)).toFixed(1)} ${(cy + q * Math.sin(a)).toFixed(1)}`; }).join(' L') + 'Z';
// 4-point sparkle centred on (cx, cy).
const spark = (cx, cy, r) => `M${cx} ${cy - r} Q${cx} ${cy} ${cx + r} ${cy} Q${cx} ${cy} ${cx} ${cy + r} Q${cx} ${cy} ${cx - r} ${cy} Q${cx} ${cy} ${cx} ${cy - r}Z`;

// s55 Paw trail: paw prints cross the frame and end at a laptop showing a pet record.
S.s55 = { title: 'How Virtual Assistants Support Veterinary Practices', style: 'Paw trail', draw({ svg, glass, P }) {
  const p0 = [160, 320], c1 = [380, 150], p1 = [672, 262];
  let prints = '';
  const n = 7;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1) * .94 + .02, u = 1 - t;
    const x = u * u * p0[0] + 2 * u * t * c1[0] + t * t * p1[0], y = u * u * p0[1] + 2 * u * t * c1[1] + t * t * p1[1];
    const dx = 2 * u * (c1[0] - p0[0]) + 2 * t * (p1[0] - c1[0]), dy = 2 * u * (c1[1] - p0[1]) + 2 * t * (p1[1] - c1[1]);
    const L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L, side = i % 2 ? 1 : -1;
    const a = Math.atan2(dy, dx) * 180 / Math.PI + 90, k = .78 + .3 * t;
    prints += `<g transform="translate(${(x + side * 20 * nx).toFixed(1)},${(y + side * 20 * ny).toFixed(1)}) rotate(${a.toFixed(1)}) scale(${k.toFixed(2)})" fill="${i === n - 1 ? P.blue : P.mid}" opacity="${(.28 + .72 * t).toFixed(2)}">${PAW}</g>`;
  }
  svg(prints);
  // laptop
  svg(`<path d="M716 272 H1084 L1060 296 H740Z" fill="#fff" filter="url(#soft)"/><rect x="866" y="272" width="68" height="7" rx="3.5" fill="${P.sky}"/>`);
  glass(742, 62, 316, 212, 22);
  svg(`<rect x="762" y="82" width="276" height="172" rx="12" fill="#fff" opacity=".55"/>
    <circle cx="840" cy="168" r="54" fill="url(#gBC)"/>
    <g transform="translate(840,166) scale(1.15)" fill="#fff">${PAW}</g>
    <rect x="916" y="122" width="100" height="14" rx="7" fill="${P.blue}"/>
    <rect x="916" y="152" width="78" height="12" rx="6" fill="${P.sky}"/>
    <rect x="916" y="178" width="92" height="12" rx="6" fill="${P.sky}"/>
    ${heart(930, 220, .26, `fill="${P.teal}"`)}<rect x="952" y="214" width="56" height="12" rx="6" fill="${P.sky}"/>`);
} };

// s56 Devices to dashboard: a smartwatch and a BP gauge stream pulse lines into a glass dashboard.
S.s56 = { title: 'Remote Patient Monitoring Assistant Guide', style: 'Devices to dashboard', draw({ svg, glass, P }) {
  // pulse streams
  const ecg = (y, x0, x1) => { let d = `M${x0} ${y}`; const seg = 110; for (let x = x0; x < x1; x += seg) d += ` H${x + 40} l10 -10 l10 30 l12 -58 l12 52 l8 -14 H${Math.min(x + seg, x1)}`; return d; };
  svg(`<path d="${ecg(124, 334, 650)}" fill="none" stroke="${P.mid}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" opacity=".75"/>
       <path d="${ecg(290, 392, 650)}" fill="none" stroke="${P.teal}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`);
  // smartwatch
  svg(`<rect x="214" y="22" width="72" height="206" rx="30" fill="${P.deep}"/>
    <rect x="184" y="58" width="132" height="132" rx="38" fill="#fff" filter="url(#soft)"/>
    <rect x="196" y="70" width="108" height="108" rx="30" fill="${P.ink}"/>
    ${heart(250, 112, .36, `fill="${P.teal}"`)}
    <path d="M212 150 h18 l6 -10 l8 20 l8 -16 l6 6 h26" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="316" y="98" width="10" height="28" rx="4" fill="#fff"/>`);
  // blood-pressure cuff, tube and gauge
  svg(`<g filter="url(#soft)"><rect x="140" y="252" width="132" height="80" rx="18" fill="${P.blue}"/></g>
    <rect x="152" y="264" width="44" height="56" rx="10" fill="${P.mid}"/><path d="M212 270 V314 M228 270 V314 M244 270 V314" stroke="#fff" stroke-width="3" opacity=".35" stroke-linecap="round"/>
    <path d="M272 292 H282" stroke="${P.deep}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="334" cy="290" r="56" fill="#fff" filter="url(#soft)"/>
    <circle cx="334" cy="290" r="44" fill="none" stroke="${P.line}" stroke-width="7"/>
    <path d="M300 318 A44 44 0 1 1 368 318" fill="none" stroke="${P.teal}" stroke-width="7" stroke-linecap="round" stroke-dasharray="2 12"/>
    <path d="M334 290 L360 266" stroke="${P.blue}" stroke-width="6" stroke-linecap="round"/><circle cx="334" cy="290" r="8" fill="${P.blue}"/>`);
  // dashboard
  glass(650, 40, 410, 300, 30);
  const bars = [.45, .7, .55, .85, .6, .95, .75];
  svg(`<rect x="676" y="64" width="358" height="132" rx="20" fill="#fff" opacity=".8"/>
    <circle cx="726" cy="130" r="30" fill="url(#gBC)"/>${heart(726, 131, .34, 'fill="#fff"')}
    <path d="M772 130 H820 l10 -18 l12 46 l14 -70 l14 60 l10 -18 H1012" fill="none" stroke="${P.blue}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="676" y="212" width="170" height="108" rx="20" fill="#fff" opacity=".8"/>
    <circle cx="761" cy="266" r="34" fill="none" stroke="${P.line}" stroke-width="10"/>
    <path d="M761 232 A34 34 0 1 1 727 266" fill="none" stroke="${P.teal}" stroke-width="10" stroke-linecap="round"/>
    <rect x="864" y="212" width="170" height="108" rx="20" fill="#fff" opacity=".8"/>
    ${bars.map((h, i) => `<rect x="${884 + i * 20}" y="${300 - h * 70}" width="12" height="${h * 70}" rx="6" fill="${i === 5 ? P.teal : P.mid}"/>`).join('')}`);
} };

// s57 Signal stack: a phone call routed by a three-light priority signal to the right level of care.
S.s57 = { title: 'Telephone Triage Virtual Assistant Skills', style: 'Signal stack', draw({ svg, glass, solid, ico, P }) {
  // ring arcs + handset
  svg(`<g fill="none" stroke="${P.mid}" stroke-linecap="round" stroke-width="6">
      <path d="M352 112 A100 100 0 0 1 352 268" opacity=".55"/><path d="M380 88 A132 132 0 0 1 380 292" opacity=".3"/></g>`);
  solid(170, 110, 160, 160, 80, {}, ico('phone', 92, 8));
  // connectors from the signal to three destinations
  const ys = [85, 185, 285], cols = [P.deep, P.blue, P.teal];
  svg(`<path d="M332 190 H500" stroke="#fff" stroke-width="5" stroke-dasharray="2 14" stroke-linecap="round"/>
    ${ys.map((y, i) => `<path d="M690 ${y} H830" stroke="${cols[i]}" stroke-width="5" stroke-dasharray="2 14" stroke-linecap="round" opacity=".9"/>`).join('')}`);
  // housing
  glass(510, 20, 180, 330, 90);
  svg(`<defs><filter id="d57g" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="14"/></filter></defs>
    ${ys.map((y, i) => `<circle cx="600" cy="${y}" r="${i === 0 ? 58 : 46}" fill="${cols[i]}" opacity="${i === 0 ? .55 : .35}" filter="url(#d57g)"/>
      <circle cx="600" cy="${y}" r="44" fill="${cols[i]}"/><circle cx="600" cy="${y}" r="44" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>
      <ellipse cx="588" cy="${y - 16}" rx="16" ry="9" fill="#fff" opacity=".45"/>`).join('')}`);
  // destinations: clinic (urgent), calendar (book a visit), heart (home care)
  [['clinic', P.deep], ['calendar', P.blue], ['heart', P.blue]].forEach(([n], i) =>
    glass(836, ys[i] - 46, 92, 92, 46, {}, ico(n, 56, 9, P.blue, P.teal)));
} };

// s58 Month ring: 30 day-dots around a heart, pill capsules on the days already covered.
S.s58 = { title: 'How to Hire a Virtual Chronic Care Management Assistant', style: 'Month ring', draw({ svg, solid, ico, P }) {
  const cx = 600, cy = 194, R = 140; let ring = '';
  for (let i = 0; i < 30; i++) {
    const a = -Math.PI / 2 + i * 2 * Math.PI / 30, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a), deg = a * 180 / Math.PI + 90;
    if (i < 21 && i % 1 === 0) ring += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${deg.toFixed(1)})">
        <rect x="-9" y="-18" width="18" height="36" rx="9" fill="#fff"/><path d="M-9 0 V9 A9 9 0 0 0 9 9 V0Z" fill="${i % 3 === 2 ? P.teal : P.blue}"/>
        <rect x="-9" y="-18" width="18" height="36" rx="9" fill="none" stroke="${P.deep}" stroke-opacity=".15" stroke-width="1.5"/></g>`;
    else ring += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" fill="#fff" stroke="${P.mid}" stroke-opacity=".35" stroke-width="2.5"/>`;
  }
  svg(`<circle cx="${cx}" cy="${cy}" r="${R + 36}" fill="url(#gGhost)" opacity=".7"/>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#fff" stroke-width="2" opacity=".5"/>
    <path d="M${cx} ${cy - R + 34} A${R - 34} ${R - 34} 0 1 1 ${(cx + (R - 34) * Math.cos(-Math.PI / 2 + 21 * 2 * Math.PI / 30)).toFixed(1)} ${(cy + (R - 34) * Math.sin(-Math.PI / 2 + 21 * 2 * Math.PI / 30)).toFixed(1)}"
      fill="none" stroke="${P.teal}" stroke-width="6" stroke-linecap="round" opacity=".8"/>${ring}`);
  solid(cx - 80, cy - 80, 160, 160, 80, {}, ico('heart', 96, 8));
} };

// s59 Capsules macro: big see-through two-tone capsules tumbling past a prescription bottle.
S.s59 = { title: 'How to Hire a Pharmacy Virtual Assistant', style: 'Capsules macro', draw({ svg, P }) {
  const cap = (x, y, w, h, rot, op, a = P.blue, id) => `<g transform="translate(${x},${y}) rotate(${rot})" opacity="${op}" filter="url(#soft)">
      <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="url(#gGlass)" stroke="#fff" stroke-width="2"/>
      <path d="M0 ${-h / 2} H${w / 2 - h / 2} A${h / 2} ${h / 2} 0 0 1 ${w / 2 - h / 2} ${h / 2} H0Z" fill="url(#${id})"/>
      <rect x="-1.5" y="${-h / 2}" width="3" height="${h}" fill="#fff" opacity=".9"/>
      <rect x="${-w / 2 + h * .35}" y="${-h / 2 + h * .16}" width="${w * .72}" height="${h * .14}" rx="${h * .07}" fill="#fff" opacity=".75"/>
      ${[[-.3, .1], [-.22, -.05], [-.15, .12], [-.36, -.08], [-.08, 0]].map(([fx, fy]) => `<circle cx="${(fx * w).toFixed(1)}" cy="${(fy * h).toFixed(1)}" r="${h * .045}" fill="${P.sky}"/>`).join('')}
    </g>`;
  svg(`<defs><linearGradient id="d59a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e59ff" stop-opacity=".95"/><stop offset="1" stop-color="#1344fd" stop-opacity=".85"/></linearGradient>
      <linearGradient id="d59b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#55e0fa" stop-opacity=".95"/><stop offset="1" stop-color="#02d0fd" stop-opacity=".8"/></linearGradient>
      <linearGradient id="d59c" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity=".8"/></linearGradient>
      <filter id="d59blur"><feGaussianBlur stdDeviation="3"/></filter></defs>
    <g filter="url(#d59blur)">${cap(900, 72, 170, 66, 24, .5, P.blue, 'd59b')}</g>
    ${cap(700, 236, 380, 140, -22, 1, P.blue, 'd59a')}
    ${cap(1000, 262, 200, 78, 62, .95, P.teal, 'd59b')}
    <!-- bottle -->
    <g filter="url(#soft)">
      <rect x="226" y="40" width="208" height="58" rx="14" fill="#fff"/>
      ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${240 + i * 24}" y="50" width="8" height="38" rx="4" fill="${P.line}"/>`).join('')}
      <rect x="216" y="94" width="228" height="20" rx="8" fill="${P.sky}"/>
      <rect x="226" y="110" width="208" height="250" rx="30" fill="url(#d59c)" stroke="#fff" stroke-width="2"/>
      <path d="M226 236 H434 V330 A30 30 0 0 1 404 360 H256 A30 30 0 0 1 226 330Z" fill="${P.teal}" opacity=".28"/>
      <rect x="248" y="150" width="164" height="132" rx="16" fill="#fff"/>
      <rect x="306" y="170" width="48" height="92" rx="12" fill="url(#gB)"/><rect x="284" y="192" width="92" height="48" rx="12" fill="url(#gB)"/>
      <rect x="244" y="126" width="14" height="214" rx="7" fill="#fff" opacity=".8"/>
    </g>`);
} };

// s60 Lens rings: an optical diagram of concentric rings and focusing rays, a pair of glasses in front, an eye badge.
S.s60 = { title: 'How to Hire a Optometry VMA', style: 'Lens rings', draw({ svg, glass, ico, P }) {
  const cx = 600, cy = 190;
  svg(`<circle cx="${cx}" cy="${cy}" r="176" fill="url(#gGhost)" opacity=".55"/>
    ${[56, 96, 136, 176].map((r, i) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${P.mid}" stroke-width="${i % 2 ? 2 : 3}" opacity="${.32 - i * .05}"/>`).join('')}
    ${[-64, -32, 0, 32, 64].map(o => `<path d="M150 ${cy + o} H${cx - 150}" stroke="${P.mid}" stroke-width="4" opacity=".4" stroke-linecap="round"/>
      <path d="M${cx + 170} ${cy + o * .8} L${930} ${cy + o * .12}" stroke="#fff" stroke-width="4" opacity=".85" stroke-linecap="round"/>`).join('')}`);
  // glasses
  svg(`<defs><linearGradient id="d60l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#a9d2f7" stop-opacity=".45"/></linearGradient>
      <filter id="d60s" x="-20%" y="-40%" width="140%" height="200%"><feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#1344fd" flood-opacity=".22"/></filter></defs>
    <g filter="url(#d60s)">
      <path d="M422 162 L392 118" fill="none" stroke="${P.deep}" stroke-width="12" stroke-linecap="round"/>
      <path d="M778 162 L808 118" fill="none" stroke="${P.deep}" stroke-width="12" stroke-linecap="round"/>
      <rect x="420" y="134" width="160" height="122" rx="54" fill="url(#d60l)" stroke="${P.blue}" stroke-width="14"/>
      <rect x="620" y="134" width="160" height="122" rx="54" fill="url(#d60l)" stroke="${P.blue}" stroke-width="14"/>
      <path d="M580 172 C 590 156, 610 156, 620 172" fill="none" stroke="${P.blue}" stroke-width="12" stroke-linecap="round"/>
      <path d="M450 164 C 462 150, 480 146, 496 146" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
      <path d="M650 164 C 662 150, 680 146, 696 146" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
    </g>`);
  glass(930, cy - 66, 132, 132, 66, {}, ico('eye', 84, 8));
} };

// s61 Heart + ECG: a big glossy glass heart with an ECG line running the full width through it.
S.s61 = { title: 'How to Hire a Cardiology VMA', style: 'Heart + ECG', draw({ svg, P }) {
  const k = 4.1, cx = 600, cy = 186;
  const y = 196, line = `M0 ${y} H360 l14 -16 l14 16 H470 l18 34 l30 -150 l34 190 l22 -94 l16 20 H660 l16 -22 l16 22 H840 l14 -16 l14 16 H1200`;
  svg(`<defs><linearGradient id="d61h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".5" stop-color="#a9d2f7" stop-opacity=".6"/><stop offset="1" stop-color="#2e64fd" stop-opacity=".55"/></linearGradient>
      <linearGradient id="d61l" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3e59ff" stop-opacity=".55"/><stop offset=".45" stop-color="#3e59ff"/><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#fff"/></linearGradient>
      <clipPath id="d61c"><path d="${HEART}" transform="translate(${cx},${cy}) scale(${k}) translate(-60,-60)"/></clipPath>
      <filter id="d61g" x="-10%" y="-50%" width="120%" height="200%"><feGaussianBlur stdDeviation="6"/></filter></defs>
    ${heart(cx, cy + 6, k * 1.08, 'fill="#fff" opacity=".18"')}
    <path d="${line}" fill="none" stroke="url(#d61l)" stroke-width="14" opacity=".45" filter="url(#d61g)"/>
    <path d="${line}" fill="none" stroke="url(#d61l)" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
    <g filter="url(#soft)">${heart(cx, cy, k, 'fill="url(#d61h)" stroke="#fff" stroke-width=".8"')}</g>
    <path d="M470 128 C 462 96, 482 70, 514 66" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" opacity=".9"/>
    <g clip-path="url(#d61c)"><path d="${line}" fill="none" stroke="${P.blue}" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/></g>`);
} };

// s62 Toy blocks: a pyramid of chunky toy blocks with simple symbols, a stethoscope resting beside it.
S.s62 = { title: 'How to Hire a Pediatrics VMA', style: 'Toy blocks', draw({ svg, P }) {
  const s = 94, d = 24; // block size and top/side depth
  const sym = {
    heart: (x, y, c) => heart(x, y + 2, .52, `fill="${c}"`),
    star: (x, y, c) => `<path d="${star(x, y + 2, 34)}" fill="${c}" stroke="${c}" stroke-width="6" stroke-linejoin="round"/>`,
    cross: (x, y, c) => `<rect x="${x - 12}" y="${y - 32}" width="24" height="64" rx="6" fill="${c}"/><rect x="${x - 32}" y="${y - 12}" width="64" height="24" rx="6" fill="${c}"/>`,
    circle: (x, y, c) => `<circle cx="${x}" cy="${y}" r="28" fill="none" stroke="${c}" stroke-width="12"/>`,
    tri: (x, y, c) => `<path d="M${x} ${y - 28} L${x + 30} ${y + 24} H${x - 30}Z" fill="${c}" stroke="${c}" stroke-width="8" stroke-linejoin="round"/>`,
    plus: (x, y, c) => `<path d="${star(x, y + 2, 34, 34)}" fill="none"/>`,
  };
  const block = (x, y, face, top, side, sy, sc, rot = 0) => `<g transform="rotate(${rot} ${x + s / 2} ${y + s / 2})">
      <path d="M${x} ${y} l${d} ${-d} h${s} l${-d} ${d}Z" fill="${top}"/>
      <path d="M${x + s} ${y} l${d} ${-d} v${s} l${-d} ${d}Z" fill="${side}"/>
      <rect x="${x}" y="${y}" width="${s}" height="${s}" rx="6" fill="${face}"/>
      <rect x="${x + 8}" y="${y + 8}" width="${s - 16}" height="${s - 16}" rx="10" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="3"/>
      ${sym[sy](x + s / 2, y + s / 2, sc)}</g>`;
  const by = 246, x0 = 360;
  svg(`<g filter="url(#soft)">
    ${block(x0, by, '#fff', '#e6eeff', P.sky, 'heart', P.teal)}
    ${block(x0 + s + 8, by, P.blue, P.mid, P.deep, 'star', '#fff')}
    ${block(x0 + 2 * (s + 8), by, P.teal, P.aqua, '#1fb6cf', 'cross', '#fff')}
    ${block(x0 + (s + 8) / 2, by - s - 4, P.mid, '#6f86ff', P.deep, 'circle', '#fff')}
    ${block(x0 + 1.5 * (s + 8), by - s - 4, '#fff', '#e6eeff', P.sky, 'tri', P.blue)}
    ${block(x0 + (s + 8) + 6, by - 2 * (s + 4), P.cyan, P.aqua, '#03a9d0', 'heart', '#fff', 8)}
  </g>
  ${IC('stethoscope', 820, 270, 180, 10, '#fff', P.deep)}
  `);
} };

// s63 Night sky: deep blue night, crescent moon, stars, a slow sleep wave, a pillow.
S.s63 = { title: 'How to Hire a Sleep Medicine VMA', style: 'Night sky', draw({ svg, add, P }) {
  add('abs', { inset: 0, background: 'linear-gradient(180deg, rgba(11,20,64,.92) 0%, rgba(22,45,161,.85) 45%, rgba(22,45,161,.35) 75%, rgba(22,45,161,0) 92%)' });
  const stars = [[180, 60, 7], [300, 120, 4], [420, 46, 5], [520, 150, 3], [660, 70, 4], [740, 30, 3], [1000, 210, 5], [1050, 60, 4], [240, 200, 3], [600, 220, 3], [140, 140, 3]];
  let wave = 'M120 250'; for (let x = 120; x <= 1080; x += 4) { const t = (x - 120) / 960; wave += ` L${x} ${(250 + Math.sin(t * Math.PI * 5.5) * (36 - 22 * t) + Math.sin(t * 40) * 3 * (1 - t)).toFixed(1)}`; }
  svg(`<defs><filter id="d63g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
      <mask id="d63m"><rect width="1200" height="630" fill="#fff"/><circle cx="905" cy="98" r="78" fill="#000"/></mask></defs>
    <circle cx="860" cy="130" r="110" fill="${P.aqua}" opacity=".35" filter="url(#d63g)"/>
    <circle cx="860" cy="130" r="86" fill="#fff" mask="url(#d63m)"/>
    ${stars.map(([x, y, r]) => r > 3 ? `<path d="${spark(x, y, r * 2.4)}" fill="#fff" opacity=".9"/>` : `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".7"/>`).join('')}
    <path d="${wave}" fill="none" stroke="${P.aqua}" stroke-width="12" opacity=".35" filter="url(#d63g)"/>
    <path d="${wave}" fill="none" stroke="${P.aqua}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <g filter="url(#soft)"><path d="M392 290 C 470 316, 730 316, 808 290 C 782 350, 782 410, 808 470 C 730 444, 470 444, 392 470 C 418 410, 418 350, 392 290Z" fill="url(#gGlass)" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></g>
    <path d="M470 322 C 540 312, 660 312, 730 322" fill="none" stroke="#fff" stroke-width="5" opacity=".85" stroke-linecap="round"/>
    <path d="M408 300 C 430 320, 440 330, 452 340 M792 300 C 770 320, 760 330, 748 340 M408 460 C 430 440, 440 430, 452 420 M792 460 C 770 440, 760 430, 748 420" fill="none" stroke="#fff" stroke-width="3" opacity=".6" stroke-linecap="round"/>`);
} };

// s64 X-ray negative: a knee in white on a deep blue lightbox film.
S.s64 = { title: 'How to Hire a Orthopedics VMA', style: 'X-ray negative', draw({ svg, P }) {
  const x = 420, y = 26, w = 360, h = 330;
  const grid = Array.from({ length: 9 }, (_, i) => `<path d="M${x + 20 + i * 40} ${y + 10} V${y + h - 10}" stroke="#fff" stroke-opacity=".05" stroke-width="2"/>`).join('');
  svg(`<defs><linearGradient id="d64f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#162da1"/><stop offset="1" stop-color="#0b1440"/></linearGradient>
      <filter id="d64g" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8"/></filter>
      <linearGradient id="d64b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient></defs>
    <rect x="${x + 60}" y="${y + 10}" width="${w}" height="${h}" rx="22" fill="url(#gGhost)" transform="rotate(7 ${x + w} ${y + h})" opacity=".8"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="url(#d64f)" filter="url(#soft)"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>
    ${grid}
    <g filter="url(#d64g)" opacity=".55">
      <path d="M560 26 L566 130 C 540 150, 536 182, 560 192 C 580 200, 594 186, 600 186 C 606 186, 620 200, 640 192 C 664 182, 660 150, 634 130 L640 26Z" fill="${P.aqua}"/>
      <path d="M554 214 C 580 206, 620 206, 646 214 L630 236 L622 356 H578 L570 236Z" fill="${P.aqua}"/></g>
    <path d="M562 ${y} L568 128 C 540 148, 536 182, 560 192 C 580 200, 594 186, 600 186 C 606 186, 620 200, 640 192 C 664 182, 660 148, 632 128 L638 ${y}Z" fill="url(#d64b)"/>
    <path d="M582 ${y} L586 128" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>
    <ellipse cx="664" cy="168" rx="16" ry="24" fill="#fff" opacity=".7"/>
    <path d="M552 214 C 580 204, 620 204, 648 214 C 652 226, 640 236, 628 240 L622 ${y + h} H578 L572 240 C 560 236, 548 226, 552 214Z" fill="url(#d64b)"/>
    <path d="M654 236 C 666 236, 668 246, 664 254 L660 ${y + h} H648 L646 254 C 642 246, 644 236, 654 236Z" fill="#fff" opacity=".7"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="none"/>
    <rect x="${x + 100}" y="${y - 10}" width="40" height="24" rx="6" fill="${P.sky}"/><rect x="${x + w - 140}" y="${y - 10}" width="40" height="24" rx="6" fill="${P.sky}"/>
    <circle cx="${x + 34}" cy="${y + h - 34}" r="10" fill="${P.teal}"/>`);
} };

// s65 Scan rings: a CT/MRI gantry ring in glass, a patient on the table, a teal scan plane passing.
S.s65 = { title: 'How to Hire a Radiology VMA', style: 'Scan rings', draw({ svg, glass, P }) {
  const cx = 560, cy = 186, hx = 64, hy = 106;
  svg(`<defs><linearGradient id="d65r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".65" stop-color="#e4eeff"/><stop offset="1" stop-color="#bcd4ff"/></linearGradient>
      <mask id="d65m"><rect width="1200" height="630" fill="#fff"/><ellipse cx="${cx}" cy="${cy + 8}" rx="${hx}" ry="${hy}" fill="#000"/></mask>
      <filter id="d65g" x="-80%" y="-30%" width="260%" height="160%"><feGaussianBlur stdDeviation="10"/></filter></defs>
    <!-- bore interior -->
    <ellipse cx="${cx}" cy="${cy + 8}" rx="${hx}" ry="${hy}" fill="${P.deep}" opacity=".35"/>
    <!-- table + patient sliding into the bore -->
    <path d="M190 258 H${cx + 40} V280 H190 a11 11 0 0 1 0 -22Z" fill="#fff" filter="url(#soft)"/>
    <path d="M250 280 H290 L278 340 H262Z" fill="#fff" opacity=".85"/>
    <rect x="236" y="222" width="300" height="38" rx="19" fill="${P.blue}"/>
    <circle cx="${cx - 2}" cy="232" r="24" fill="${P.blue}"/>
    <rect x="${cx - 100}" y="${cy + 150}" width="200" height="44" rx="14" fill="#fff" opacity=".9" filter="url(#soft)"/>
    <!-- gantry ring -->
    <g filter="url(#soft)"><ellipse cx="${cx}" cy="${cy}" rx="134" ry="178" fill="url(#d65r)" mask="url(#d65m)"/></g>
    <ellipse cx="${cx}" cy="${cy}" rx="134" ry="178" fill="none" stroke="#fff" stroke-width="2"/>
    <ellipse cx="${cx}" cy="${cy + 4}" rx="100" ry="142" fill="none" stroke="${P.sky}" stroke-width="3"/>
    <ellipse cx="${cx}" cy="${cy + 8}" rx="${hx + 2}" ry="${hy + 2}" fill="none" stroke="${P.teal}" stroke-width="5"/>
    <!-- scan plane -->
    <ellipse cx="${cx}" cy="${cy + 8}" rx="14" ry="${hy - 6}" fill="${P.aqua}" opacity=".75" filter="url(#d65g)"/>
    <path d="M${cx} ${cy + 8 - hy + 6} V${cy + 8 + hy - 6}" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <path d="M${cx + 120} 132 C 680 120, 740 128, 800 132" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="2 11" stroke-linecap="round"/>`);
  // monitor showing the slices
  glass(806, 40, 250, 180, 24);
  svg(`<rect x="824" y="58" width="214" height="144" rx="14" fill="${P.ink}" opacity=".92"/>
    ${[0, 1, 2].map(i => `<circle cx="${872 + i * 59}" cy="130" r="26" fill="none" stroke="#fff" stroke-width="3" opacity="${.45 + i * .25}"/>
      <ellipse cx="${872 + i * 59}" cy="130" rx="${10 + i * 2}" ry="${14 - i * 2}" fill="${i === 2 ? P.teal : P.aqua}" opacity="${.5 + i * .2}"/>`).join('')}`);
} };

// s66 Serum drops: glass serum bottles with droppers, one big droplet, a leaf, a soft glow.
S.s66 = { title: 'How to Hire a VA for Med Spas', style: 'Serum drops', draw({ svg, P }) {
  const bottle = (x, y, w, h, lv, id) => `<g filter="url(#soft)">
      <rect x="${x + w * .3}" y="${y - 70}" width="${w * .4}" height="62" rx="${w * .2}" fill="${P.deep}"/>
      <rect x="${x + w * .22}" y="${y - 18}" width="${w * .56}" height="26" rx="8" fill="#fff"/>
      <rect x="${x + w * .28}" y="${y + 4}" width="${w * .44}" height="16" rx="4" fill="${P.sky}"/>
      <rect x="${x}" y="${y + 16}" width="${w}" height="${h}" rx="${w * .22}" fill="url(#gGlass)" stroke="#fff" stroke-width="2"/>
      <path d="M${x + 2} ${y + 16 + h * (1 - lv)} C ${x + w * .3} ${y + 6 + h * (1 - lv)}, ${x + w * .7} ${y + 26 + h * (1 - lv)}, ${x + w - 2} ${y + 16 + h * (1 - lv)} V${y + 16 + h - w * .2} Q${x + w - 2} ${y + 14 + h} ${x + w - w * .22} ${y + 14 + h} H${x + w * .22} Q${x + 2} ${y + 14 + h} ${x + 2} ${y + 16 + h - w * .2}Z" fill="url(#${id})"/>
      <rect x="${x + w * .12}" y="${y + 36}" width="${w * .1}" height="${h * .7}" rx="${w * .05}" fill="#fff" opacity=".85"/></g>`;
  const drop = 'M0 -70 C 22 -36, 50 -8, 50 22 C 50 52, 28 72, 0 72 C -28 72, -50 52, -50 22 C -50 -8, -22 -36, 0 -70Z';
  svg(`<defs><linearGradient id="d66a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#55e0fa" stop-opacity=".85"/><stop offset="1" stop-color="#2345ff" stop-opacity=".85"/></linearGradient>
      <linearGradient id="d66b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9d2f7" stop-opacity=".9"/><stop offset="1" stop-color="#2dd0e8" stop-opacity=".9"/></linearGradient>
      <linearGradient id="d66d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".6" stop-color="#a9d2f7" stop-opacity=".55"/><stop offset="1" stop-color="#55e0fa" stop-opacity=".7"/></linearGradient>
      <filter id="d66g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter></defs>
    <circle cx="600" cy="200" r="200" fill="#fff" opacity=".45" filter="url(#d66g)"/>
    <!-- leaves -->
    <g opacity=".9"><path d="M300 350 C 250 300, 250 220, 300 170 C 350 220, 350 300, 300 350Z" fill="${P.teal}" opacity=".55"/>
      <path d="M300 350 C 230 330, 190 270, 200 210 C 266 222, 300 290, 300 350Z" fill="${P.aqua}" opacity=".5"/>
      <path d="M300 350 C 370 330, 410 270, 400 210 C 334 222, 300 290, 300 350Z" fill="${P.aqua}" opacity=".5"/>
      <path d="M300 340 V200" stroke="#fff" stroke-width="3" opacity=".7"/></g>
    ${bottle(430, 120, 130, 220, .62, 'd66a')}
    ${bottle(590, 190, 110, 150, .5, 'd66b')}
    <!-- dropper + droplet -->
    <g transform="rotate(14 820 70)" filter="url(#soft)">
      <rect x="800" y="10" width="40" height="56" rx="20" fill="${P.deep}"/><rect x="792" y="60" width="56" height="16" rx="6" fill="#fff"/>
      <path d="M806 76 H834 V150 L824 176 H816 L806 150Z" fill="url(#gGlass)" stroke="#fff" stroke-width="2"/>
      <path d="M808 120 H832 V150 L823 172 H817 L808 150Z" fill="${P.aqua}" opacity=".8"/></g>
    <g transform="translate(780,270)" filter="url(#soft)"><path d="${drop}" fill="url(#d66d)" stroke="#fff" stroke-width="2"/>
      <path d="M-28 20 C -28 0, -18 -14, -8 -26" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".9"/></g>
    ${[[930, 120, 10], [960, 230, 7], [880, 330, 6]].map(([x, y, r]) => `<path d="${spark(x, y, r * 2)}" fill="#fff"/>`).join('')}`);
} };

// s67 Hands + heart: two simple hands cupping a soft glowing heart, lots of space.
S.s67 = { title: 'How to Hire a VA for Hospice And Palliative Care', style: 'Hands + heart', draw({ svg, P }) {
  // left hand (palm up, fingers curling up on the outer side); the right hand mirrors it about x = 600
  const hand = `<path d="M446 440 C 440 380, 412 324, 418 276 C 420 240, 418 214, 434 200 C 448 188, 466 196, 464 216
      C 462 236, 464 252, 478 262 C 514 292, 560 302, 597 290 C 610 300, 610 320, 599 330
      C 588 352, 576 380, 572 440Z"/>`;
  const lines = `<path d="M590 312 C 578 304, 564 300, 550 302 M570 328 C 556 320, 540 316, 526 318 M542 340 C 530 334, 516 330, 502 332" fill="none" stroke="${P.sky}" stroke-width="4" stroke-linecap="round"/>
    <rect x="440" y="404" width="138" height="40" rx="12" fill="${P.mid}" opacity=".85"/>`;
  svg(`<defs><linearGradient id="d67h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#e3edff"/></linearGradient>
      <linearGradient id="d67r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#55e0fa"/><stop offset="1" stop-color="#2e64fd"/></linearGradient>
      <filter id="d67g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="30"/></filter></defs>
    <circle cx="600" cy="170" r="120" fill="#fff" opacity=".55" filter="url(#d67g)"/>
    <g filter="url(#soft)">${heart(600, 206, 1.6, 'fill="url(#d67r)"')}</g>
    <path d="M556 176 C 560 162, 572 154, 586 154" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/>
    <g filter="url(#soft)" fill="url(#d67h)" stroke="#c9dcff" stroke-width="2">${hand}<g transform="translate(1200,0) scale(-1,1)">${hand}</g></g>
    ${lines}<g transform="translate(1200,0) scale(-1,1)">${lines}</g>
    ${[[470, 110, 9], [740, 80, 7], [760, 190, 5]].map(([x, y, r]) => `<path d="${spark(x, y, r * 2)}" fill="#fff" opacity=".9"/>`).join('')}`);
} };

// s68 Building windows: a care-facility facade; windows show beds and hearts, one window lit teal.
S.s68 = { title: 'How to Hire a VA for Skilled Nursing Facilities', style: 'Building windows', draw({ svg, P }) {
  const bx = 330, bw = 540, top = 52, cols = 4, rows = 3, ww = 96, wh = 72, gx = (bw - cols * ww) / (cols + 1);
  const bed = (x, y, c) => `<path d="M${x - 26} ${y + 14} V${y - 12} M${x - 26} ${y + 4} H${x + 28} V${y + 14}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="${x - 6}" y="${y - 6}" width="34" height="10" rx="5" fill="${c}"/><circle cx="${x - 14}" cy="${y - 4}" r="7" fill="${c}"/>`;
  let wins = '';
  for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++) {
    const x = bx + gx + k * (ww + gx), y = top + 40 + r * (wh + 24), lit = r === 1 && k === 2, cx = x + ww / 2, cy = y + wh / 2;
    wins += `<rect x="${x}" y="${y}" width="${ww}" height="${wh}" rx="10" fill="${lit ? P.teal : '#dbe8ff'}"/>
      ${lit ? `<rect x="${x - 10}" y="${y - 10}" width="${ww + 20}" height="${wh + 20}" rx="16" fill="${P.teal}" opacity=".35" filter="url(#d68g)"/>` : ''}
      ${(r + k) % 3 === 1 && !lit ? heart(cx, cy + 2, .34, `fill="${P.mid}" opacity=".8"`) : bed(cx, cy, lit ? '#fff' : P.mid)}
      <rect x="${x - 6}" y="${y + wh + 4}" width="${ww + 12}" height="6" rx="3" fill="${P.line}"/>`;
  }
  svg(`<defs><filter id="d68g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter></defs>
    <rect x="170" y="150" width="200" height="300" rx="16" fill="url(#gGhost)" opacity=".8"/>
    <rect x="830" y="110" width="220" height="340" rx="16" fill="url(#gGhost)" opacity=".8"/>
    <g filter="url(#soft)"><rect x="${bx}" y="${top}" width="${bw}" height="420" rx="18" fill="#fff"/></g>
    <rect x="${bx - 14}" y="${top - 16}" width="${bw + 28}" height="30" rx="12" fill="${P.deep}"/>
    ${wins}
    <rect x="${bx + bw / 2 - 70}" y="${top + 330}" width="140" height="18" rx="9" fill="${P.blue}"/>
    <rect x="${bx + bw / 2 - 50}" y="${top + 348}" width="100" height="72" rx="8" fill="#dbe8ff"/><path d="M${bx + bw / 2} ${top + 352} V${top + 420}" stroke="#fff" stroke-width="3"/>
    <circle cx="${bx + bw / 2}" cy="${top + 0}" r="0"/>
    <g transform="translate(${bx + bw / 2},${top - 1})"><circle r="30" fill="${P.blue}" stroke="#fff" stroke-width="5"/>
      <rect x="-6" y="-17" width="12" height="34" rx="3" fill="#fff"/><rect x="-17" y="-6" width="34" height="12" rx="3" fill="#fff"/></g>`);
} };

// s69 Avatar grid: six round avatars, each wearing the accessory of a different VA role.
S.s69 = { title: 'Types of Virtual Medical Assistants Explained for Practice Owners', style: 'Avatar grid', draw({ svg, P }) {
  const roles = ['headset', 'stethoscope', 'clipboard', 'calendar', 'document', 'tooth'];
  const fills = ['url(#gB)', 'url(#gBC)', P.deep, 'url(#gBC)', P.mid, 'url(#gB)'];
  let out = '';
  roles.forEach((n, i) => {
    const cx = 390 + (i % 3) * 210, cy = 100 + Math.floor(i / 3) * 168, r = 66, id = 'd69c' + i;
    out += `<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
      <g filter="url(#soft)"><circle cx="${cx}" cy="${cy}" r="${r + 7}" fill="#fff"/></g>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fills[i]}"/>
      <g clip-path="url(#${id})" fill="#fff"><circle cx="${cx}" cy="${cy - 14}" r="23"/><path d="M${cx - 46} ${cy + 72} C ${cx - 46} ${cy + 30}, ${cx - 26} ${cy + 16}, ${cx} ${cy + 16} C ${cx + 26} ${cy + 16}, ${cx + 46} ${cy + 30}, ${cx + 46} ${cy + 72}Z"/></g>
      <g filter="url(#soft)"><circle cx="${cx + 52}" cy="${cy + 46}" r="34" fill="#fff"/></g>${IC(n, cx + 52, cy + 46, 48, 10, P.blue, P.teal)}`;
  });
  svg(`<rect x="250" y="12" width="700" height="350" rx="44" fill="url(#gGhost)" opacity=".55"/>${out}`);
} };

// s70 Slab stack: an exploded isometric stack of four glass layers, each with a generic app glyph.
S.s70 = { title: 'What Software Do Virtual Medical Assistants Use? The Full Stack', style: 'Slab stack', draw({ svg, P }) {
  const cx = 600, W = 180, H = 80, T = 14, gap = 76, n = 4, y0 = 96;
  const M = cy => `matrix(${W / 100} ${-H / 100} ${W / 100} ${H / 100} ${cx - W} ${cy})`; // maps a 100x100 square onto the slab top
  const glyph = [
    // messages
    `<rect x="24" y="26" width="34" height="22" rx="7" fill="${P.blue}"/><rect x="42" y="54" width="34" height="22" rx="7" fill="${P.teal}"/>`,
    // calendar
    `<rect x="28" y="28" width="44" height="44" rx="7" fill="none" stroke="${P.blue}" stroke-width="5"/>${[0, 1, 2].map(r => [0, 1, 2].map(k => `<rect x="${35 + k * 11}" y="${36 + r * 11}" width="7" height="7" rx="2" fill="${r === 1 && k === 2 ? P.teal : P.sky}"/>`).join('')).join('')}`,
    // donut chart
    `<circle cx="50" cy="50" r="18" fill="none" stroke="${P.sky}" stroke-width="9"/><path d="M50 32 A18 18 0 1 1 32 50" fill="none" stroke="${P.blue}" stroke-width="9"/>`,
    // records folder
    `<path d="M26 34 H44 L50 40 H74 V70 H26Z" fill="${P.blue}"/><rect x="30" y="46" width="44" height="24" rx="3" fill="${P.mid}"/><rect x="40" y="54" width="20" height="5" rx="2.5" fill="${P.teal}"/>`,
  ];
  let out = '';
  for (let i = n - 1; i >= 0; i--) {
    const cy = y0 + i * gap;
    out += `<g filter="url(#soft)">
      <path d="M${cx - W} ${cy} L${cx} ${cy + H} V${cy + H + T} L${cx - W} ${cy + T}Z" fill="${i === 0 ? P.mid : '#c9dcff'}"/>
      <path d="M${cx + W} ${cy} L${cx} ${cy + H} V${cy + H + T} L${cx + W} ${cy + T}Z" fill="${i === 0 ? P.deep : '#9fb6ff'}"/>
      <path d="M${cx} ${cy - H} L${cx + W} ${cy} L${cx} ${cy + H} L${cx - W} ${cy}Z" fill="#fff" fill-opacity="${i === 0 ? 1 : .72}" stroke="#fff" stroke-width="2"/></g>
      <g transform="${M(cy)}">${glyph[i]}</g>`;
  }
  const guide = [-W, W].map(dx => `<path d="M${cx + dx} ${y0 + 16} V${y0 + (n - 1) * gap}" stroke="#fff" stroke-width="2" stroke-dasharray="3 8" opacity=".8"/>`).join('');
  const icons = ['headset', 'calendar', 'document', 'lock'];
  const tags = icons.map((nm, i) => { const cy = y0 + i * gap + 10, left = i % 2 === 1, x = left ? cx - W - 120 : cx + W + 120;
    return `<path d="M${left ? cx - W + 40 : cx + W - 40} ${cy} H${left ? x + 40 : x - 40}" stroke="#fff" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>
      <g filter="url(#soft)"><circle cx="${x}" cy="${cy}" r="38" fill="#fff"/></g>${IC(nm, x, cy, 50, 9, P.blue, P.teal)}`; }).join('');
  svg(guide + out + tags);
} };

// s71 Sieve/filter: many company chips pour onto a mesh; only two vetted ones drop through.
S.s71 = { title: 'How to Vet Virtual Assistant Staffing Companies and the Questions to Ask', style: 'Sieve/filter', draw({ svg, P }) {
  const cx = 600, sy = 196;
  const bld = (x, y, s, op, fill = '#fff', stroke = P.blue) => `<g transform="translate(${x},${y})" opacity="${op}">
      <rect x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" rx="${s * .26}" fill="${fill}" filter="url(#d71s)"/>
      <g transform="scale(${s / 100})" fill="none" stroke="${stroke}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M-22 30 V-24 a4 4 0 0 1 4 -4 H18 a4 4 0 0 1 4 4 V30 M-32 30 H32"/>
        <path d="M-10 -14 h0 M10 -14 h0 M-10 0 h0 M10 0 h0" stroke-width="8"/><path d="M-6 30 V16 H6 V30" style="stroke:${P.teal}"/></g></g>`;
  const above = [[420, 70, 60, .8], [520, 40, 52, .7], [612, 96, 62, .9], [720, 52, 56, .75], [790, 112, 48, .65], [470, 140, 50, .75], [350, 120, 42, .5], [860, 60, 40, .5], [680, 140, 46, .8]];
  let mesh = '';
  for (let i = -6; i <= 6; i++) mesh += `<path d="M${cx + i * 40} ${sy - 50} V${sy + 50}" stroke="#fff" stroke-width="2" opacity=".6"/>`;
  for (let j = -2; j <= 2; j++) mesh += `<path d="M${cx - 300} ${sy + j * 16} H${cx + 300}" stroke="#fff" stroke-width="2" opacity=".6"/>`;
  svg(`<defs><filter id="d71s" x="-80%" y="-80%" width="260%" height="300%"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#1344fd" flood-opacity=".2"/></filter><clipPath id="d71c"><ellipse cx="${cx}" cy="${sy}" rx="270" ry="44"/></clipPath></defs>
    <path d="M${cx + 280} ${sy - 4} L${cx + 440} ${sy - 30}" stroke="#fff" stroke-width="22" stroke-linecap="round" filter="url(#soft)"/>
    <path d="M${cx + 300} ${sy - 7} L${cx + 430} ${sy - 28}" stroke="${P.sky}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="${cx}" cy="${sy + 8}" rx="292" ry="58" fill="${P.deep}" opacity=".18"/>
    <ellipse cx="${cx}" cy="${sy}" rx="290" ry="58" fill="url(#gGlass)" stroke="#fff" stroke-width="3"/>
    <ellipse cx="${cx}" cy="${sy}" rx="270" ry="44" fill="${P.sky}" opacity=".5"/>
    <g clip-path="url(#d71c)">${mesh}</g>
    <path d="M${cx - 290} ${sy} V${sy + 16} A290 58 0 0 0 ${cx + 290} ${sy + 16} V${sy}" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/>
    ${above.map(([x, y, s, o]) => bld(x, y, s, o)).join('')}
    <path d="M${cx - 50} ${sy + 66} V${sy + 92} M${cx + 60} ${sy + 66} V${sy + 92}" stroke="#fff" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round"/>
    ${bld(cx - 50, sy + 132, 68, 1, 'url(#gB)', '#fff')}${bld(cx + 60, sy + 132, 68, 1, 'url(#gB)', '#fff')}
    <circle cx="${cx - 16}" cy="${sy + 100}" r="15" fill="${P.teal}" stroke="#fff" stroke-width="3"/><path d="M${cx - 23} ${sy + 100} l5 5 l9 -9" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${cx + 94}" cy="${sy + 100}" r="15" fill="${P.teal}" stroke="#fff" stroke-width="3"/><path d="M${cx + 87} ${sy + 100} l5 5 l9 -9" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`);
} };

// s72 Stamped stack: a fanned stack of claim forms, a coral X stamp on top, one claim being lifted off.
S.s72 = { title: 'Top Reasons Claims Get Denied', style: 'Stamped stack', draw({ svg, P }) {
  const pw = 230, ph = 290;
  const paper = (x, y, rot, stamp = false, extra = '') => `<g transform="translate(${x},${y}) rotate(${rot})" ${extra}>
      <rect x="${-pw / 2}" y="${-ph / 2}" width="${pw}" height="${ph}" rx="14" fill="#fff" filter="url(#soft)"/>
      <rect x="${-pw / 2 + 24}" y="${-ph / 2 + 26}" width="44" height="44" rx="10" fill="${P.sky}"/>
      <rect x="${-pw / 2 + 80}" y="${-ph / 2 + 30}" width="100" height="12" rx="6" fill="${P.blue}"/>
      <rect x="${-pw / 2 + 80}" y="${-ph / 2 + 52}" width="70" height="10" rx="5" fill="${P.line}"/>
      ${[0, 1, 2, 3, 4].map(i => `<rect x="${-pw / 2 + 24}" y="${-ph / 2 + 96 + i * 26}" width="${[180, 150, 170, 120, 160][i]}" height="10" rx="5" fill="${P.line}"/>`).join('')}
      <rect x="${-pw / 2 + 24}" y="${ph / 2 - 46}" width="80" height="20" rx="10" fill="${P.line}"/>
      ${stamp ? `<g transform="translate(26,14) rotate(-12)" opacity=".92"><circle r="72" fill="none" stroke="#ff8a8a" stroke-width="9"/><circle r="58" fill="none" stroke="#ff8a8a" stroke-width="3"/>
        <path d="M-30 -30 L30 30 M30 -30 L-30 30" stroke="#ff8a8a" stroke-width="16" stroke-linecap="round"/></g>` : ''}</g>`;
  svg(`${paper(400, 214, -16)}${paper(450, 204, -7)}${paper(510, 198, 3, true)}
    <ellipse cx="800" cy="356" rx="120" ry="14" fill="${P.deep}" opacity=".12"/>
    <path d="M752 330 V364 M800 338 V376 M848 330 V364" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>
    <g transform="translate(800,176) scale(.98) translate(-800,-176)">${paper(800, 176, 12, true)}</g>`);
} };
})();
