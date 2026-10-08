// scenes-c.js  Scenes s37-s54. Each: SCENES[id] = { title, style, draw(ctx) }. No words on the image.
(() => { const S = window.SCENES;

// Local helpers --------------------------------------------------------------
// icon(): brand icon as an SVG <g> (accent inlined so it never leaks between icons), centred on (cx, cy).
const icon = (n, cx, cy, size, sw = 7, col = '#2345ff', acc = '#2dd0e8') => {
  const k = size / 120, body = window.HT_ICONS[n].replace(/class="ac"/g, `style="stroke:${acc}"`);
  return `<g transform="translate(${cx - size / 2} ${cy - size / 2}) scale(${k})" fill="none" stroke="${col}" stroke-width="${sw / k}" stroke-linecap="round" stroke-linejoin="round">${body}</g>`;
};
const CORAL = '#ff8a8a';
const inPoly = (x, y, poly) => { let ins = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) ins = !ins; } return ins; };
// Catmull-Rom sampler through points -> array of [x, y]
const spline = (pts, steps = 30) => { const out = [];
  for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let s = 0; s < steps; s++) { const t = s / steps, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map(k => .5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3))); } }
  out.push(pts[pts.length - 1]); return out; };
// person silhouette (head + shoulders), centred at cx, top at y
const bust = (cx, y, h, fill, op = 1) => { const r = h * .2;
  return `<g fill="${fill}" opacity="${op}"><circle cx="${cx}" cy="${y + r}" r="${r}"/><path d="M${cx - h * .36} ${y + h} C ${cx - h * .36} ${y + h * .55}, ${cx + h * .36} ${y + h * .55}, ${cx + h * .36} ${y + h}Z"/></g>`; };
const PH = '../../v3/photos/';
// photo crop as raw HTML (for nesting inside rotated cards)
const crop = (src, focal, w, h, tx, ty, zoom) => { const k = Math.max(w / 1200, h / 630) * zoom, iw = 1200 * k, ih = 630 * k;
  let l = tx - focal[0] / 100 * iw, t = ty - focal[1] / 100 * ih; l = Math.min(0, Math.max(w - iw, l)); t = Math.min(0, Math.max(h - ih, t));
  return `<img src="${PH}${src}.webp" style="position:absolute;width:${iw}px;height:${ih}px;left:${l}px;top:${t}px">`; };

// s37 Circle packing: taxonomy as nested circles; the smallest, most specific one carries the stethoscope.
S.s37 = { title: 'Provider Taxonomy Codes', style: 'Circle packing', draw({ svg, P }) {
  const C = (x, y, r, fill, op, st = '#fff', so = .85, sw = 1.5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" fill-opacity="${op}" stroke="${st}" stroke-opacity="${so}" stroke-width="${sw}"/>`;
  let s = '';
  // quiet sibling packs at the sides (other taxonomy groups)
  s += C(255, 195, 100, '#fff', .10, '#fff', .55) + C(232, 162, 46, '#fff', .14, '#fff', .5) + C(292, 236, 36, '#fff', .14, '#fff', .5) + C(214, 238, 22, '#fff', .14, '#fff', .5);
  s += C(950, 165, 110, '#fff', .10, '#fff', .55) + C(915, 132, 50, '#fff', .14, '#fff', .5) + C(986, 206, 42, '#fff', .14, '#fff', .5) + C(982, 106, 22, '#fff', .14, '#fff', .5) + C(910, 214, 24, '#fff', .14, '#fff', .5);
  // main pack
  s += `<circle cx="600" cy="185" r="172" fill="url(#gGlass)" opacity=".55" filter="url(#soft)"/>` + C(600, 185, 172, '#fff', 0, '#fff', 1, 2);
  [[530, 130, 75], [690, 140, 66], [640, 265, 62], [480, 250, 34]].forEach(([x, y, r]) => s += C(x, y, r, P.sky, .7, '#fff', .95, 1.5));
  [[505, 115, 32, 'tooth'], [560, 160, 28, 'eye'], [555, 88, 18], [490, 166, 14], [620, 250, 30, 'heart'], [670, 290, 22, 'brain'], [665, 233, 14], [480, 250, 18], [650, 110, 12]]
    .forEach(([x, y, r, n]) => { s += C(x, y, r, P.mid, .55, '#fff', .8, 1.2); if (n) s += icon(n, x, y, r * 1.25, 4, '#fff', '#fff'); });
  // highlighted chain
  s += C(700, 150, 48, P.teal, .28, P.teal, 1, 2.5);
  s += `<circle cx="708" cy="158" r="40" fill="none" stroke="${P.teal}" stroke-width="6" opacity=".25"/>`;
  s += `<circle cx="708" cy="158" r="31" fill="#fff" filter="url(#soft)"/>` + icon('stethoscope', 709, 159, 42, 5.5, P.blue, P.teal);
  svg(s);
} };

// s38 Four quadrants: a note sheet split into S / O / A / P zones, each with its own icon.
S.s38 = { title: 'What Are SOAP Notes?', style: 'Four quadrants', draw({ svg, glass, P }) {
  glass(385, 34, 430, 312, 34);
  let s = `<rect x="540" y="18" width="120" height="34" rx="12" fill="url(#gB)" filter="url(#soft)"/><circle cx="600" cy="35" r="7" fill="#fff" opacity=".9"/>`;
  const qs = [[405, 66, 'S'], [605, 66, 'O'], [405, 210, 'A'], [605, 210, 'P']];
  const tints = ['#ffffff', '#ffffff', '#ffffff', '#ffffff'];
  qs.forEach(([x, y, k], i) => {
    s += `<rect x="${x}" y="${y}" width="190" height="124" rx="20" fill="${tints[i]}" opacity=".96" filter="url(#soft)"/>`;
    const cx = x + 58, cy = y + 62;
    s += `<circle cx="${cx}" cy="${cy}" r="36" fill="${P.sky}" opacity=".35"/>`;
    if (k === 'S') s += `<path d="M${cx - 28} ${cy - 20} h56 a10 10 0 0 1 10 10 v28 a10 10 0 0 1 -10 10 h-30 l-14 12 v-12 h-12 a10 10 0 0 1 -10 -10 v-28 a10 10 0 0 1 10 -10z" fill="none" stroke="${P.blue}" stroke-width="5.5" stroke-linejoin="round"/>` +
      [-14, -5, 4, 13].map((dx, j) => `<path d="M${cx + dx} ${cy - 2 - [6, 11, 8, 4][j]} v${2 * [6, 11, 8, 4][j]}" stroke="${P.teal}" stroke-width="5" stroke-linecap="round"/>`).join('');
    if (k === 'O') s += icon('stethoscope', cx, cy, 64, 6);
    if (k === 'A') s += icon('magnifier', cx, cy, 62, 6);
    if (k === 'P') s += icon('clipboard', cx, cy, 62, 6);
    s += `<rect x="${x + 112}" y="${y + 40}" width="56" height="9" rx="4.5" fill="${P.blue}" opacity=".85"/><rect x="${x + 112}" y="${y + 58}" width="44" height="9" rx="4.5" fill="${P.line}"/><rect x="${x + 112}" y="${y + 76}" width="50" height="9" rx="4.5" fill="${P.line}"/>`;
  });
  // pen resting on the sheet
  s += `<g transform="translate(905 110) rotate(24)" filter="url(#soft)"><rect x="-11" y="-10" width="22" height="190" rx="11" fill="url(#gB)"/><rect x="-11" y="-10" width="22" height="34" rx="11" fill="${P.deep}"/><path d="M-11 178 L0 210 L11 178Z" fill="#fff"/><path d="M-4 199 L0 210 L4 199Z" fill="${P.ink}"/><rect x="-3" y="30" width="6" height="70" rx="3" fill="#fff" opacity=".35"/></g>`;
  svg(s);
} };

// s39 Exploded ID card: the pieces of a patient ID float apart; sensitive pieces are covered by shields.
S.s39 = { title: 'What Counts as PHI?', style: 'Exploded ID card', draw({ svg, P }) {
  const shield = (x, y, sz) => `<g transform="translate(${x - sz / 2} ${y - sz / 2}) scale(${sz / 120})" filter="url(#soft)"><path d="M60 8l42 15v34c0 30-18 48-42 58C36 105 18 87 18 57V23z" fill="url(#gB)" stroke="#fff" stroke-width="6"/><path d="M42 60l12 12 24-26" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  let s = '';
  // the empty card the pieces came from
  s += `<rect x="440" y="95" width="320" height="200" rx="26" fill="#fff" fill-opacity=".14" stroke="#fff" stroke-width="2.5" stroke-dasharray="10 9" opacity=".9"/>`;
  s += `<rect x="440" y="95" width="320" height="36" rx="0" fill="none"/>`;
  // motion ticks from the centre
  [[520, 150, 400, 110], [640, 140, 640, 90], [700, 190, 830, 165], [610, 250, 640, 290], [500, 230, 420, 285]].forEach(([x1, y1, x2, y2]) =>
    s += `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 12" opacity=".8"/>`);
  // photo piece
  s += `<g transform="translate(300 52) rotate(-9)" filter="url(#soft)"><rect width="128" height="150" rx="20" fill="#fff"/><rect x="14" y="14" width="100" height="122" rx="14" fill="${P.sky}" opacity=".55"/>${bust(64, 38, 98, P.blue)}</g>`;
  s += shield(420, 196, 74);
  // name bar
  s += `<g transform="translate(560 30) rotate(4)" filter="url(#soft)"><rect width="250" height="62" rx="20" fill="#fff"/><rect x="24" y="18" width="140" height="11" rx="5.5" fill="${P.deep}"/><rect x="24" y="37" width="96" height="9" rx="4.5" fill="${P.line}"/><rect x="184" y="16" width="44" height="30" rx="9" fill="${P.teal}" opacity=".85"/></g>`;
  // date chip (calendar page)
  s += `<g transform="translate(850 112) rotate(10)" filter="url(#soft)"><rect width="118" height="118" rx="20" fill="#fff"/><path d="M0 20 a20 20 0 0 1 20 -20 h78 a20 20 0 0 1 20 20 v14 h-118z" fill="url(#gB)"/><rect x="30" y="-10" width="9" height="22" rx="4.5" fill="${P.deep}"/><rect x="79" y="-10" width="9" height="22" rx="4.5" fill="${P.deep}"/>` +
    Array.from({ length: 12 }, (_, i) => `<circle cx="${22 + (i % 4) * 25}" cy="${54 + Math.floor(i / 4) * 22}" r="5" fill="${i === 6 ? P.teal : P.line}"/>`).join('') + `</g>`;
  s += shield(968, 104, 62);
  // barcode / record number strip
  const bars = [4, 2, 6, 2, 3, 7, 2, 4, 2, 6, 3, 2, 5, 2, 7, 3, 2, 4, 6, 2, 3, 5, 2];
  let bx = 26; const bc = bars.map((w, i) => { const r = i % 2 ? '' : `<rect x="${bx}" y="18" width="${w}" height="46" rx="1" fill="${P.ink}"/>`; bx += w + 3; return r; }).join('');
  s += `<g transform="translate(565 262) rotate(-4)" filter="url(#soft)"><rect width="230" height="84" rx="18" fill="#fff"/>${bc}<rect x="${bx + 12}" y="22" width="36" height="9" rx="4.5" fill="${P.line}"/><rect x="${bx + 12}" y="40" width="28" height="9" rx="4.5" fill="${P.line}"/></g>`;
  s += shield(800, 296, 62);
  // address chip (home)
  s += `<g transform="translate(235 250) rotate(-6)" filter="url(#soft)"><rect width="150" height="70" rx="18" fill="#fff"/><path d="M24 40 l20 -18 l20 18 v20 h-40z" fill="none" stroke="${P.blue}" stroke-width="5.5" stroke-linejoin="round"/><path d="M39 60 v-10 h10 v10" fill="none" stroke="${P.teal}" stroke-width="5" stroke-linejoin="round"/><rect x="80" y="24" width="50" height="9" rx="4.5" fill="${P.deep}" opacity=".8"/><rect x="80" y="42" width="38" height="9" rx="4.5" fill="${P.line}"/></g>`;
  svg(s);
} };

// s40 Vault: a round vault door swung open, a patient folder with a heart safe inside.
S.s40 = { title: 'How Healthcare VAs Protect Patient Data?', style: 'Vault', draw({ svg, P }) {
  const cx = 480, cy = 185;
  let s = `<defs><linearGradient id="v40a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3e59ff"/><stop offset="1" stop-color="#162da1"/></linearGradient>
    <radialGradient id="v40b" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#2e64fd"/><stop offset=".7" stop-color="#162da1"/><stop offset="1" stop-color="#0b1440"/></radialGradient>
    <radialGradient id="v40c" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#55e0fa" stop-opacity=".75"/><stop offset="1" stop-color="#55e0fa" stop-opacity="0"/></radialGradient>
    <linearGradient id="v40d" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#a9d2f7"/></linearGradient></defs>`;
  // frame
  s += `<circle cx="${cx}" cy="${cy}" r="168" fill="url(#v40a)" filter="url(#soft)"/><circle cx="${cx}" cy="${cy}" r="168" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>`;
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; s += `<circle cx="${cx + Math.cos(a) * 148}" cy="${cy + Math.sin(a) * 148}" r="5.5" fill="#fff" opacity=".55"/>`; }
  s += `<circle cx="${cx}" cy="${cy}" r="128" fill="url(#v40b)" stroke="#a9d2f7" stroke-opacity=".6" stroke-width="3"/>`;
  s += `<circle cx="${cx}" cy="${cy + 6}" r="110" fill="url(#v40c)"/>`;
  // shelf
  s += `<rect x="${cx - 92}" y="${cy + 62}" width="184" height="10" rx="5" fill="#fff" opacity=".35"/>`;
  // folder with heart
  s += `<g transform="translate(${cx - 72} ${cy - 66})" filter="url(#soft)"><path d="M0 18 a12 12 0 0 1 12 -12 h40 l14 14 h66 a12 12 0 0 1 12 12 v90 a12 12 0 0 1 -12 12 h-120 a12 12 0 0 1 -12 -12z" fill="#fff"/><path d="M0 40 h144 v74 a12 12 0 0 1 -12 12 h-120 a12 12 0 0 1 -12 -12z" fill="url(#v40d)"/>
    <path d="M72 108 C52 95 44 84 44 73 c0-9 6-15 14-15 6 0 11 4 14 8 3-4 8-8 14-8 8 0 14 6 14 15 0 11-8 22-28 35z" fill="${P.teal}"/></g>`;
  // hinge
  s += `<rect x="${cx + 158}" y="${cy - 80}" width="52" height="26" rx="8" fill="${P.deep}"/><rect x="${cx + 158}" y="${cy + 54}" width="52" height="26" rx="8" fill="${P.deep}"/>`;
  // swung-open door (seen at an angle)
  const dx = cx + 270;
  s += `<ellipse cx="${dx - 16}" cy="${cy}" rx="62" ry="166" fill="${P.deep}" filter="url(#soft)"/>`;
  s += `<ellipse cx="${dx}" cy="${cy}" rx="62" ry="166" fill="url(#v40a)"/><ellipse cx="${dx}" cy="${cy}" rx="48" ry="132" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="2.5"/>`;
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; s += `<circle cx="${dx + Math.cos(a) * 55}" cy="${cy + Math.sin(a) * 150}" r="4" fill="#fff" opacity=".5"/>`; }
  // wheel handle
  s += `<ellipse cx="${dx}" cy="${cy}" rx="26" ry="70" fill="none" stroke="#fff" stroke-width="7"/>`;
  for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI; s += `<path d="M${dx + Math.cos(a) * 26} ${cy + Math.sin(a) * 70} L${dx - Math.cos(a) * 26} ${cy - Math.sin(a) * 70}" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`; }
  s += `<ellipse cx="${dx}" cy="${cy}" rx="9" ry="20" fill="${P.teal}"/>`;
  // glow streaks spilling out
  svg(s);
} };

// s41 Network vs single: one isolated monitor (EMR) vs a monitor wired to clinic, lab and pharmacy (EHR).
S.s41 = { title: 'EHR vs EMR', style: 'Network vs single', draw({ svg, P }) {
  const mon = (cx, cy, w, h, lit) => `<g filter="url(#soft)"><rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="16" fill="${lit ? '#fff' : '#fff'}" opacity="${lit ? 1 : .8}"/>
    <rect x="${cx - w / 2 + 12}" y="${cy - h / 2 + 12}" width="${w - 24}" height="${h - 24}" rx="9" fill="${lit ? 'url(#gB)' : P.sky}" opacity="${lit ? 1 : .7}"/>
    <rect x="${cx - w / 2 + 26}" y="${cy - h / 2 + 28}" width="${w * .22}" height="${h - 56}" rx="6" fill="#fff" opacity=".3"/>
    ${[0, 1, 2].map(i => `<rect x="${cx - w / 2 + 40 + w * .22}" y="${cy - h / 2 + 30 + i * (h - 60) / 3}" width="${(w * .5) * [1, .75, .9][i]}" height="${h * .09}" rx="${h * .045}" fill="#fff" opacity="${i === 0 ? .95 : .55}"/>`).join('')}
    <path d="M${cx - 14} ${cy + h / 2} l-8 34 h44 l-8 -34z" fill="#fff" opacity="${lit ? 1 : .8}"/><rect x="${cx - 52}" y="${cy + h / 2 + 32}" width="104" height="12" rx="6" fill="#fff" opacity="${lit ? 1 : .8}"/></g>`;
  let s = '';
  // left: alone
  s += `<circle cx="300" cy="185" r="120" fill="#fff" opacity=".12" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-dasharray="4 10"/>`;
  s += mon(300, 168, 190, 130, false);
  // divider
  s += `<path d="M500 40 V330" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>`;
  // right: networked
  const hub = [780, 175];
  const nodes = [[620, 92, 'clinic'], [960, 82, 'lab'], [975, 285, 'rx'], [600, 290, 'person']];
  nodes.forEach(([x, y]) => s += `<path d="M${hub[0]} ${hub[1]} L${x} ${y}" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".5"/><path d="M${hub[0]} ${hub[1]} L${x} ${y}" stroke="${P.teal}" stroke-width="4" stroke-linecap="round"/>`);
  s += mon(hub[0], hub[1] - 14, 200, 136, true);
  nodes.forEach(([x, y, n]) => {
    s += `<circle cx="${x}" cy="${y}" r="50" fill="#fff" filter="url(#soft)"/>`;
    if (n === 'lab') s += `<g transform="translate(${x} ${y})" fill="none" stroke="${P.blue}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M-10 -28 v20 l-18 30 a6 6 0 0 0 5 9 h46 a6 6 0 0 0 5 -9 l-18 -30 v-20"/><path d="M-15 -28 h30"/><path d="M-19 12 h38" stroke="${P.teal}"/></g>`;
    else s += icon(n, x, y, 58, 6.5);
  });
  svg(s);
} };

// s42 Wave to doc: live voice flows straight into a note (scribing) vs recording -> wait -> document (transcription).
S.s42 = { title: 'Scribing vs Transcription', style: 'Wave to doc', draw({ svg, glass, P }) {
  const doc = (x, y, fillLines) => `<g filter="url(#soft)"><path d="M${x} ${y} h78 l30 30 v110 a12 12 0 0 1 -12 12 h-96 a12 12 0 0 1 -12 -12 v-128 a12 12 0 0 1 12 -12z" fill="#fff"/><path d="M${x + 78} ${y} v30 h30" fill="${P.line}"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${x + 14}" y="${y + 50 + i * 22}" width="${[70, 80, 60, 74][i]}" height="9" rx="4.5" fill="${i < fillLines ? P.teal : P.line}"/>`).join('')}</g>`;
  glass(175, 36, 850, 138, 69, { background: 'linear-gradient(90deg, rgba(255,255,255,.55), rgba(255,255,255,.25))' });
  glass(175, 196, 850, 138, 69, { background: 'linear-gradient(90deg, rgba(255,255,255,.4), rgba(255,255,255,.15))' });
  let s = '';
  // top lane: speaker -> live wave -> doc
  s += `<circle cx="248" cy="105" r="44" fill="url(#gB)"/>` + bust(248, 80, 54, '#fff');
  const n = 30; for (let i = 0; i < n; i++) { const x = 320 + i * 15.5, h = 8 + 54 * Math.abs(Math.sin(i * .55) * Math.sin(i * .21 + .6)) * (1 - i / n * .35);
    s += `<rect x="${x}" y="${105 - h / 2}" width="7" height="${h}" rx="3.5" fill="url(#gBC)" opacity="${.55 + .45 * i / n}"/>`; }
  s += `<path d="M790 105 h24" stroke="${P.teal}" stroke-width="6" stroke-linecap="round"/><path d="M806 93 l14 12 -14 12" fill="none" stroke="${P.teal}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<g transform="translate(866 43) scale(.82)">${doc(0, 0, 3)}</g>`;
  // bottom lane: audio file -> hourglass -> doc
  s += `<g filter="url(#soft)"><rect x="210" y="222" width="150" height="88" rx="16" fill="#fff"/><path d="M232 266 l0 0" /></g>`;
  s += `<circle cx="244" cy="266" r="17" fill="${P.blue}"/><path d="M239 257 l14 9 -14 9z" fill="#fff"/>`;
  for (let i = 0; i < 9; i++) { const h = [10, 22, 32, 18, 26, 36, 20, 14, 24][i]; s += `<rect x="${274 + i * 9}" y="${266 - h / 2}" width="5" height="${h}" rx="2.5" fill="${P.sky}"/>`; }
  s += `<path d="M380 266 H520" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 12"/>`;
  // hourglass
  s += `<g transform="translate(580 266)" filter="url(#soft)"><rect x="-38" y="-52" width="76" height="12" rx="6" fill="${P.deep}"/><rect x="-38" y="40" width="76" height="12" rx="6" fill="${P.deep}"/>
    <path d="M-28 -40 h56 c0 26 -22 30 -22 40 c0 10 22 14 22 40 h-56 c0 -26 22 -30 22 -40 c0 -10 -22 -14 -22 -40z" fill="#fff" fill-opacity=".8" stroke="#fff" stroke-width="3"/>
    <path d="M-16 -24 h32 c-4 10 -14 14 -16 20 c-2 -6 -12 -10 -16 -20z" fill="${P.sky}"/><path d="M-20 38 c4 -14 14 -16 20 -18 c6 2 16 4 20 18z" fill="${P.blue}"/><path d="M0 0 v18" stroke="${P.blue}" stroke-width="3" stroke-dasharray="3 4"/></g>`;
  s += `<path d="M640 266 H780" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 12"/>`;
  s += `<path d="M766 254 l14 12 -14 12" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` + `<g transform="translate(866 203) scale(.82)">${doc(0, 0, 1)}</g>`;
  svg(s);
} };

// s43 Half and half: one face, the left half a real person, the right half circuitry.
S.s43 = { title: 'Virtual Medical Scribe vs. AI Medical Scribe: Key Differences and Which to Choose', style: 'Half and half', draw({ svg, photo, P }) {
  const cx = 600, cy = 180, R = 165;
  svg(`<circle cx="${cx}" cy="${cy}" r="${R + 14}" fill="#fff" opacity=".25"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" filter="url(#soft)"/>`);
  photo('how-a-scribe-works-in-epic', [78, 25], cx - R, cy - R, R, 2 * R, R + 4, 150, 2.6, `${R}px 0 0 ${R}px`);
  let s = `<defs><linearGradient id="c43" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2345ff"/><stop offset="1" stop-color="#162da1"/></linearGradient></defs>`;
  s += `<path d="M${cx} ${cy - R} A${R} ${R} 0 0 1 ${cx} ${cy + R}Z" fill="url(#c43)"/>`;
  // circuit traces
  const tr = [[0, -95, 60, -95, 90, -125, 120, -125], [0, -60, 40, -60, 70, -30, 140, -30], [0, -20, 70, -20], [0, 15, 30, 15, 60, 45, 150, 45], [0, 60, 50, 60, 80, 90, 120, 90], [0, 105, 30, 105, 50, 125, 80, 125], [0, -130, 40, -130, 55, -145]];
  tr.forEach(p => { let d = `M${cx + p[0]} ${cy + p[1]}`; for (let i = 2; i < p.length; i += 2) d += ` L${cx + p[i]} ${cy + p[i + 1]}`;
    s += `<path d="${d}" fill="none" stroke="${P.aqua}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/><circle cx="${cx + p[p.length - 2]}" cy="${cy + p[p.length - 1]}" r="7" fill="${P.deep}" stroke="${P.aqua}" stroke-width="3.5"/>`; });
  // "eye" and chip
  s += `<rect x="${cx + 62}" y="${cy - 72}" width="54" height="54" rx="12" fill="${P.deep}" stroke="${P.aqua}" stroke-width="3.5"/>` +
    [0, 1, 2].map(i => `<path d="M${cx + 74 + i * 15} ${cy - 80} v8 M${cx + 74 + i * 15} ${cy - 18} v8" stroke="${P.aqua}" stroke-width="3" stroke-linecap="round"/>`).join('') +
    `<circle cx="${cx + 89}" cy="${cy - 45}" r="11" fill="${P.teal}"/>`;
  // seam
  s += `<path d="M${cx} ${cy - R - 18} V${cy + R + 18}" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#fff" stroke-width="5"/>`;
  svg(s);
  // badges
  const b = (x, y, inner) => svg(`<circle cx="${x}" cy="${y}" r="46" fill="url(#gGlass)" stroke="#fff" stroke-width="1.5" filter="url(#soft)"/>${inner}`);
  b(330, 250, icon('headset', 330, 250, 56, 6.5));
  b(870, 110, `<g transform="translate(870 110)" fill="none" stroke="${P.blue}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><rect x="-17" y="-17" width="34" height="34" rx="7"/><path d="M-8 -17 v-9 M8 -17 v-9 M-8 17 v9 M8 17 v9 M-17 -8 h-9 M-17 8 h-9 M17 -8 h9 M17 8 h9"/><rect x="-6" y="-6" width="12" height="12" rx="3" stroke="${P.teal}"/></g>`);
} };

// s44 Chaos desk: front desk with ringing phones, toppling paper stacks and a storm of sticky notes.
S.s44 = { title: 'Front Desk Burnout in Medical Offices, Signs and Fixes', style: 'Chaos desk', draw({ svg, P }) {
  let s = '';
  // sticky-note storm
  const notes = [[205, 70, -14, P.sky], [300, 34, 10, '#fff'], [395, 98, -6, P.aqua], [470, 28, 18, '#fff'], [560, 84, -20, CORAL], [655, 22, 8, P.sky], [735, 92, 14, '#fff'], [820, 40, -10, P.aqua], [905, 104, 22, '#fff'], [990, 46, -16, P.sky], [250, 160, 24, '#fff'], [960, 170, -8, P.aqua], [610, 150, 6, '#fff']];
  notes.forEach(([x, y, r, c], i) => { const z = i % 3 === 0 ? 62 : 50;
    s += `<g transform="translate(${x} ${y}) rotate(${r})" filter="url(#soft)"><path d="M${-z / 2} ${-z / 2} h${z} v${z * .72} l${-z * .28} ${z * .28} h${-z * .72}z" fill="${c}" opacity=".96"/><path d="M${z / 2} ${z * .22} l${-z * .28} ${z * .28} v${-z * .28}z" fill="#000" opacity=".08"/><rect x="${-z / 2 + 9}" y="${-z / 2 + 12}" width="${z * .5}" height="5" rx="2.5" fill="${c === '#fff' ? P.line : '#fff'}" opacity=".85"/><rect x="${-z / 2 + 9}" y="${-z / 2 + 23}" width="${z * .35}" height="5" rx="2.5" fill="${c === '#fff' ? P.line : '#fff'}" opacity=".85"/></g>`; });
  // desk
  s += `<path d="M150 296 L1050 296 L1080 330 L120 330Z" fill="#fff" filter="url(#soft)"/><rect x="120" y="330" width="960" height="120" fill="#fff" opacity=".55"/><rect x="120" y="330" width="960" height="8" fill="${P.sky}" opacity=".7"/>`;
  // phones
  const phone = (x, rot, ring) => `<g transform="translate(${x} 296)"><path d="M-62 0 L-50 -52 a10 10 0 0 1 10 -8 h80 a10 10 0 0 1 10 8 L62 0z" fill="url(#gB)"/>
    ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<circle cx="${-18 + c * 18}" cy="${-38 + r * 12}" r="4" fill="#fff" opacity=".75"/>`).join('')).join('')}
    <g transform="translate(0 -74) rotate(${rot})"><path d="M-62 4 c0 -16 10 -22 26 -22 h72 c16 0 26 6 26 22 l-4 10 a6 6 0 0 1 -7 4 l-18 -4 a6 6 0 0 1 -4 -6 v-6 h-58 v6 a6 6 0 0 1 -4 6 l-18 4 a6 6 0 0 1 -7 -4z" fill="${P.deep}"/></g>
    ${ring ? `<g fill="none" stroke="${ring}" stroke-width="5" stroke-linecap="round"><path d="M-80 -96 a40 40 0 0 0 -10 30"/><path d="M-96 -108 a58 58 0 0 0 -14 46"/><path d="M80 -96 a40 40 0 0 1 10 30"/><path d="M96 -108 a58 58 0 0 1 14 46"/></g>` : ''}</g>`;
  s += phone(285, -12, CORAL) + phone(915, 10, '#fff');
  // paper stacks
  const stack = (x, n, lean) => { let o = ''; for (let i = 0; i < n; i++) o += `<rect x="${x - 58 + Math.sin(i * 1.7) * 6 + i * lean}" y="${290 - i * 11}" width="116" height="9" rx="2" fill="${i % 2 ? '#fff' : '#eef3ff'}" stroke="${P.line}" stroke-width="1"/>`; return `<g filter="url(#soft)">${o}</g>`; };
  s += stack(470, 11, 1.2) + stack(735, 14, -1.6);
  // centre phone (the third, ringing too)
  s += phone(600, 6, null).replace('translate(600 296)', 'translate(600 296) scale(.9)') + `<g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"><path d="M578 196 a26 26 0 0 1 44 0"/><path d="M566 182 a42 42 0 0 1 68 0"/></g>`;
  svg(s);
} };

// s45 Revolving door: people keep entering and leaving through a spinning glass door.
S.s45 = { title: 'Medical Office Staff Turnover, What It Costs and How to Cut It', style: 'Revolving door', draw({ svg, P }) {
  const cx = 600, top = 86, bot = 300, R = 170, ry = 36;
  let s = '';
  // floor + canopy
  s += `<ellipse cx="${cx}" cy="${bot}" rx="${R + 40}" ry="${ry + 10}" fill="#fff" opacity=".25"/><ellipse cx="${cx}" cy="${bot}" rx="${R}" ry="${ry}" fill="#fff" opacity=".55"/>`;
  // rotation arrows on the floor
  s += `<path d="M${cx - R - 22} ${bot + 6} A${R + 22} ${ry + 12} 0 0 0 ${cx - 40} ${bot + ry + 11}" fill="none" stroke="${P.teal}" stroke-width="6" stroke-linecap="round"/><path d="M${cx - 52} ${bot + ry + 2} l14 9 -12 11" fill="none" stroke="${P.teal}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<path d="M${cx + R + 22} ${bot - 6} A${R + 22} ${ry + 12} 0 0 0 ${cx + 40} ${bot - ry - 11}" fill="none" stroke="${P.teal}" stroke-width="6" stroke-linecap="round"/><path d="M${cx + 52} ${bot - ry - 2} l-14 -9 12 -11" fill="none" stroke="${P.teal}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
  // wings: back ones first
  const wings = [30, 120, 210, 300].map(a => a * Math.PI / 180).map(a => ({ a, x: Math.cos(a) * R, y: Math.sin(a) * ry })).sort((p, q) => p.y - q.y);
  const wing = w => `<path d="M${cx} ${top} L${cx + w.x} ${top + w.y} L${cx + w.x} ${bot + w.y} L${cx} ${bot}Z" fill="url(#gGlass)" fill-opacity="${w.y < 0 ? .5 : .75}" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>`;
  // person inside, between wings
  s += wings.filter(w => w.y < 0).map(wing).join('');
  s += bust(cx - 64, 176, 124, 'url(#gB)');
  s += wings.filter(w => w.y >= 0).map(wing).join('');
  s += `<path d="M${cx} ${top} V${bot}" stroke="#fff" stroke-width="9" stroke-linecap="round"/>`;
  // canopy
  s += `<path d="M${cx - R} ${top} A${R} ${ry} 0 0 0 ${cx + R} ${top} L${cx + R} ${top - 22} A${R} ${ry} 0 0 1 ${cx - R} ${top - 22}Z" fill="url(#gB)"/><ellipse cx="${cx}" cy="${top - 22}" rx="${R}" ry="${ry}" fill="${P.bright}"/><ellipse cx="${cx}" cy="${top - 22}" rx="${R}" ry="${ry}" fill="#fff" opacity=".25"/>`;
  // cylinder edge rails
  s += `<path d="M${cx - R} ${top} V${bot}" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/><path d="M${cx + R} ${top} V${bot}" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>`;
  // arriving (left) and leaving (right)
  s += bust(270, 160, 140, '#fff') + `<path d="M330 330 h70" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M388 318 l14 12 -14 12" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += bust(930, 160, 140, '#fff', .45) + `<path d="M820 330 h70" stroke="${CORAL}" stroke-width="6" stroke-linecap="round"/><path d="M878 318 l14 12 -14 12" fill="none" stroke="${CORAL}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
  svg(s);
} };

// s46 Test tubes: ROI measured like an experiment; coin-filled tubes rise against a ruler.
S.s46 = { title: 'How to Measure the ROI of a Virtual Medical Assistant', style: 'Test tubes', draw({ svg, P }) {
  let s = `<defs><linearGradient id="t46" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#55e0fa" stop-opacity=".9"/><stop offset="1" stop-color="#2345ff" stop-opacity=".9"/></linearGradient></defs>`;
  // ruler
  s += `<rect x="236" y="30" width="58" height="300" rx="12" fill="#fff" filter="url(#soft)"/>`;
  for (let i = 0; i <= 26; i++) { const y = 46 + i * 10.6, l = i % 5 === 0 ? 26 : 14; s += `<rect x="${246}" y="${y - 1.5}" width="${l}" height="3" rx="1.5" fill="${i % 5 === 0 ? P.blue : P.sky}"/>`; }
  const xs = [420, 540, 660, 780], lv = [.34, .52, .7, .9], tTop = 30, tBot = 330, w = 74;
  xs.forEach((x, i) => {
    const h = (tBot - tTop - 30) * lv[i], ly = tBot - h;
    s += `<path d="M${x - w / 2} ${tTop} V${tBot - w / 2} a${w / 2} ${w / 2} 0 0 0 ${w} 0 V${tTop}" fill="#fff" fill-opacity=".35" stroke="#fff" stroke-width="3"/>`;
    s += `<clipPath id="tc${i}"><path d="M${x - w / 2 + 6} ${tTop} V${tBot - w / 2} a${w / 2 - 6} ${w / 2 - 6} 0 0 0 ${w - 12} 0 V${tTop}"/></clipPath>`;
    s += `<g clip-path="url(#tc${i})"><rect x="${x - w / 2}" y="${ly}" width="${w}" height="${h + 40}" fill="url(#t46)"/><ellipse cx="${x}" cy="${ly}" rx="${w / 2}" ry="6" fill="#fff" opacity=".45"/>`;
    const n = Math.floor((h - 24) / 13); for (let k = 0; k < n; k++) { const cy = tBot - 26 - k * 13, jx = x + [0, 2, -1, 1, -2][k % 5];
      s += `<rect x="${jx - 23}" y="${cy - 1}" width="46" height="9" fill="${P.deep}"/><ellipse cx="${jx}" cy="${cy + 8}" rx="23" ry="6" fill="${P.deep}"/><ellipse cx="${jx}" cy="${cy}" rx="23" ry="6" fill="#fff"/><ellipse cx="${jx}" cy="${cy}" rx="14" ry="3.4" fill="none" stroke="${P.sky}" stroke-width="2"/>`; }
    s += `</g>`;
    s += `<rect x="${x - w / 2 - 8}" y="${tTop - 8}" width="${w + 16}" height="16" rx="8" fill="#fff"/><rect x="${x - w / 2 + 12}" y="${tTop + 18}" width="8" height="${tBot - tTop - 80}" rx="4" fill="#fff" opacity=".55"/>`;
  });
  // rack
  s += `<rect x="340" y="262" width="520" height="22" rx="11" fill="url(#gB)" filter="url(#soft)"/><rect x="360" y="284" width="14" height="70" rx="7" fill="${P.deep}"/><rect x="826" y="284" width="14" height="70" rx="7" fill="${P.deep}"/>`;
  // rising trend through the levels
  s += `<path d="M${xs.map((x, i) => `${x} ${tBot - 270 * lv[i] - 18}`).join(' L')}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>`;
  s += `<g transform="translate(905 70)"><circle r="40" fill="#fff" filter="url(#soft)"/><path d="M-16 14 L16 -16 M-2 -16 H16 V2" fill="none" stroke="${P.teal}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  svg(s);
} };

// s47 Winding road: a career path climbing into the distance, flags with role icons along the way.
S.s47 = { title: 'Healthcare Virtual Assistant Career Path and Where the Role Can Lead', style: 'Winding road', draw({ svg, P }) {
  const pts = spline([[120, 720], [380, 470], [760, 380], [880, 300], [560, 230], [600, 150], [860, 105], [990, 70]], 40);
  const N = pts.length, W = i => 250 * Math.pow(1 - i / (N - 1), 1.6) + 12;
  let s = '';
  // distant hills
  s += `<path d="M115 210 C 300 150, 420 190, 560 160 S 860 120, 1085 150 L1085 360 L115 360Z" fill="#fff" opacity=".14"/>`;
  s += `<path d="M115 270 C 300 230, 480 270, 680 240 S 960 220, 1085 250 L1085 400 L115 400Z" fill="#fff" opacity=".12"/>`;
  let edge = '', road = '';
  for (let i = 1; i < N; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    edge += `<path d="M${x0} ${y0} L${x1} ${y1}" stroke="${P.sky}" stroke-width="${W(i) + 10}" stroke-linecap="round"/>`;
    road += `<path d="M${x0} ${y0} L${x1} ${y1}" stroke="#fff" stroke-width="${W(i)}" stroke-linecap="round"/>`; }
  s += `<g>${edge}</g><g>${road}</g>`;
  // centre dashes
  for (let i = 2; i < N - 1; i += 4) { const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]; s += `<path d="M${x0} ${y0} L${x1} ${y1}" stroke="${P.teal}" stroke-width="${Math.max(2, W(i) * .05)}" stroke-linecap="round"/>`; }
  // flags
  const flag = (i, n, top) => { const [x, y] = pts[i], ph = top ? 110 : 96;
    return `<g filter="url(#soft)"><path d="M${x} ${y} V${y - ph}" stroke="${P.deep}" stroke-width="5" stroke-linecap="round"/><path d="M${x} ${y - ph} h66 l-12 20 12 20 h-66z" fill="${top ? P.teal : '#fff'}"/></g>
      <circle cx="${x}" cy="${y - ph - 46}" r="30" fill="${top ? '#fff' : 'url(#gB)'}" filter="url(#soft)"/>${icon(n, x, y - ph - 46, 38, 5, top ? P.blue : '#fff', top ? P.teal : '#fff')}`; };
  const at = f => Math.round(f * (N - 1));
  s += flag(at(.27), 'headset') + flag(at(.47), 'clipboard') + flag(at(.68), 'people') + flag(N - 1, 'shield', true);
  svg(s);
} };

// s48 Resume sheet: a tilted resume with photo, text bars and skill bars, a highlighter and a pen.
S.s48 = { title: 'Healthcare Virtual Assistant Resume Guide (With Examples)', style: 'Resume sheet', draw({ add, svg, P }) {
  // back sheet
  add('solid', { left: 520, top: 30, width: 330, height: 420, borderRadius: 18, transform: 'rotate(7deg)', opacity: .55 });
  const card = add('solid', { left: 420, top: 18, width: 340, height: 440, borderRadius: 18, transform: 'rotate(-5deg)' });
  const L = (x, y, w, c, h = 10) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${c}"/>`;
  card.innerHTML = `<div style="position:absolute;left:28px;top:28px;width:96px;height:96px;border-radius:50%;overflow:hidden;box-shadow:0 0 0 5px ${P.sky}">${crop('virtual-medical-office-manager-interview-questions', [55, 25], 96, 96, 48, 46, 3.4)}</div>
    <svg width="340" height="440" style="position:absolute;left:0;top:0">
    ${L(146, 46, 150, P.deep, 14)}${L(146, 72, 110, P.blue)}${L(146, 94, 80, P.line)}
    <rect x="28" y="148" width="284" height="2" fill="${P.line}"/>
    ${L(28, 170, 90, P.blue)}${L(28, 192, 270, P.line)}${L(28, 212, 240, P.line)}${L(28, 232, 256, P.line)}
    ${L(28, 266, 90, P.blue)}
    ${[[.85, 290], [.65, 316], [.75, 342]].map(([f, y]) => `<circle cx="38" cy="${y + 5}" r="9" fill="none" stroke="${P.sky}" stroke-width="4"/>${L(60, y, 240, P.line)}${L(60, y, 240 * f, P.teal)}`).join('')}
    ${L(28, 384, 210, P.line)}${L(28, 404, 160, P.line)}
    </svg>`;
  // highlighter swipe (over the experience lines) + pen
  svg(`<g transform="rotate(-5 590 238)"><rect x="440" y="204" width="236" height="22" rx="5" fill="${P.aqua}" opacity=".45"/></g>
    <g transform="translate(830 60) rotate(32)" filter="url(#soft)"><rect x="-12" y="0" width="24" height="230" rx="12" fill="url(#gB)"/><rect x="-12" y="0" width="24" height="40" rx="12" fill="${P.deep}"/><rect x="10" y="12" width="6" height="58" rx="3" fill="${P.deep}"/><path d="M-12 222 L0 262 L12 222Z" fill="#fff"/><path d="M-4 248 L0 262 L4 248Z" fill="${P.ink}"/></g>
    <g transform="translate(330 120)"><circle r="44" fill="url(#gGlass)" stroke="#fff" stroke-width="1.5" filter="url(#soft)"/>${icon('check', 0, 0, 58, 6)}</g>`);
} };

// s49 Pinboard: a board of pinned job cards, one card magnified by a glass lens.
S.s49 = { title: 'Where to Find Healthcare Virtual Assistant Jobs', style: 'Pinboard', draw({ glass, svg, P }) {
  glass(160, 26, 700, 318, 26, { background: 'linear-gradient(160deg, rgba(255,255,255,.5), rgba(255,255,255,.2))' });
  let s = '';
  const card = (x, y, r, n, pin, sc = 1) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${sc})"><rect x="-62" y="-50" width="124" height="104" rx="16" fill="#fff" filter="url(#soft)"/>${icon(n, -24, -6, 50, 6)}
    <rect x="8" y="-20" width="38" height="8" rx="4" fill="${P.deep}" opacity=".85"/><rect x="8" y="-4" width="30" height="8" rx="4" fill="${P.line}"/><rect x="-42" y="30" width="84" height="8" rx="4" fill="${P.line}"/>
    <circle cx="0" cy="-52" r="10" fill="${pin}"/><circle cx="-3" cy="-55" r="3.5" fill="#fff" opacity=".7"/></g>`;
  const cards = [[250, 104, -5, 'headset', P.blue], [400, 96, 4, 'stethoscope', P.teal], [550, 108, -3, 'laptop', P.blue], [700, 98, 6, 'calendar', P.deep],
    [265, 250, 4, 'tooth', P.teal], [420, 258, -6, 'clipboard', P.blue], [570, 248, 3, 'heart', P.deep], [720, 256, -4, 'rx', P.teal]];
  cards.forEach(([x, y, r, n, pin], i) => { if (i !== 6) s += card(x, y, r, n, pin); });
  // magnified card under the lens
  s += `<circle cx="790" cy="215" r="132" fill="#fff" fill-opacity=".35" filter="url(#soft)"/>`;
  s += `<clipPath id="l49"><circle cx="790" cy="215" r="124"/></clipPath><g clip-path="url(#l49)"><circle cx="790" cy="215" r="124" fill="#f4f8ff"/>${card(790, 222, 2, 'heart', P.deep, 1.55)}</g>`;
  s += `<circle cx="790" cy="215" r="124" fill="none" stroke="url(#gB)" stroke-width="14"/><path d="M700 140 a120 120 0 0 1 60 -44" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>`;
  s += `<path d="M880 305 L955 380" stroke="${P.deep}" stroke-width="30" stroke-linecap="round"/><path d="M880 305 L900 325" stroke="${P.blue}" stroke-width="30" stroke-linecap="round"/>`;
  s += card(570, 248, 3, 'heart', P.deep).replace('<g ', '<g opacity="0" ');
  svg(s);
} };

// s50 Coin arc: coins flying from a company bank building to a remote worker's wallet.
S.s50 = { title: 'How Virtual Assistants Get Paid by US Companies', style: 'Coin arc', draw({ svg, P }) {
  let s = '';
  // ghost globe behind the arc
  s += `<g opacity=".35" fill="none" stroke="#fff" stroke-width="2"><circle cx="600" cy="230" r="150"/><ellipse cx="600" cy="230" rx="60" ry="150"/><ellipse cx="600" cy="230" rx="115" ry="150"/><path d="M450 230 h300 M470 160 h260 M470 300 h260"/></g>`;
  // bank (left)
  s += `<g filter="url(#soft)"><path d="M180 150 L295 92 L410 150Z" fill="#fff"/><rect x="180" y="150" width="230" height="14" fill="${P.sky}"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${200 + i * 56}" y="172" width="22" height="112" rx="4" fill="#fff"/>`).join('')}
    <rect x="170" y="288" width="250" height="18" rx="6" fill="#fff"/><rect x="160" y="306" width="270" height="16" rx="6" fill="${P.sky}"/>
    <circle cx="295" cy="126" r="11" fill="${P.blue}"/></g>`;
  // wallet (right)
  s += `<g filter="url(#soft)"><rect x="790" y="160" width="250" height="166" rx="26" fill="url(#gB)"/><path d="M806 160 l170 -50 a12 12 0 0 1 15 9 l10 41z" fill="${P.sky}"/>
    <rect x="790" y="160" width="250" height="40" rx="20" fill="${P.deep}" opacity=".35"/>
    <rect x="950" y="222" width="104" height="62" rx="20" fill="${P.deep}"/><circle cx="984" cy="253" r="12" fill="${P.teal}"/></g>`;
  // arc + coins
  const p0 = [300, 140], p1 = [600, -60], p2 = [905, 150];
  const B = t => [0, 1].map(k => (1 - t) * (1 - t) * p0[k] + 2 * (1 - t) * t * p1[k] + t * t * p2[k]);
  s += `<path d="M${p0[0]} ${p0[1]} Q${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="2 12" stroke-linecap="round"/>`;
  const ts = [.12, .25, .38, .51, .64, .77, .9];
  ts.forEach((t, i) => { const [x, y] = B(t), r = 22 + 14 * Math.sin(t * Math.PI), sq = [1, .55, .2, 1, .7, .35, .9][i];
    s += `<g transform="translate(${x} ${y}) rotate(${(t - .5) * 50})" filter="url(#soft)"><ellipse rx="${r * sq + 4}" ry="${r}" fill="${P.deep}" transform="translate(4 0)"/><ellipse rx="${r * sq + 2}" ry="${r}" fill="#fff"/>
      ${sq > .5 ? `<ellipse rx="${r * sq * .68}" ry="${r * .68}" fill="none" stroke="${P.blue}" stroke-width="4"/><ellipse rx="${r * sq * .26}" ry="${r * .26}" fill="${P.teal}"/>` : `<ellipse rx="${r * sq * .5 + 1}" ry="${r * .68}" fill="none" stroke="${P.sky}" stroke-width="3"/>`}</g>`; });
  svg(s);
} };

// s51 Bars from a map: a dot map of the Americas; pay-range bars rise from points across Latin America.
S.s51 = { title: 'Virtual Assistant Pay in Latin America, Country-by-Country Ranges', style: 'Bars from a map', draw({ svg, P }) {
  const k = 3.1, X = lon => 560 + (lon + 92) * k, Y = lat => 70 + (25 - lat) * k;
  const NA = [[-165, 66], [-160, 71], [-130, 71], [-100, 72], [-80, 70], [-62, 60], [-56, 51], [-66, 45], [-70, 42], [-76, 36], [-81, 31], [-80, 26], [-82, 25], [-85, 30], [-90, 30], [-97, 27], [-97, 22], [-94, 18], [-91, 19], [-88, 21], [-87, 16], [-83, 13], [-83, 9], [-78, 8], [-80, 7], [-85, 10], [-92, 15], [-105, 20], [-110, 24], [-112, 30], [-117, 33], [-124, 40], [-124, 48], [-135, 58], [-150, 60], [-165, 60]];
  const SA = [[-78, 9], [-72, 12], [-62, 11], [-52, 5], [-35, -5], [-38, -13], [-41, -22], [-48, -27], [-53, -34], [-58, -38], [-63, -41], [-65, -46], [-68, -52], [-70, -55], [-74, -50], [-73, -40], [-71, -30], [-70, -18], [-76, -14], [-81, -5], [-80, 0], [-78, 9]];
  const polys = [NA, SA].map(p => p.map(([lo, la]) => [X(lo), Y(la)]));
  let s = '';
  const g = 11;
  for (let y = 0; y < 460; y += g) for (let x = 115; x < 1085; x += g) {
    const yy = y + (Math.floor(x / g) % 2) * 0, inside = polys.some(p => inPoly(x, yy, p));
    if (inside) { const latin = yy > Y(30); s += `<circle cx="${x}" cy="${yy}" r="${latin ? 3.6 : 3}" fill="#fff" opacity="${latin ? .95 : .45}"/>`; } }
  // range bars
  const pts = [[-102, 22, 70, 120], [-74, 5, 60, 150], [-76, -11, 40, 95], [-50, -12, 80, 175], [-64, -33, 50, 130]];
  pts.forEach(([lo, la, lowOff, hiOff], i) => { const x = X(lo), y = Y(la);
    s += `<path d="M${x} ${y} V${y - lowOff}" stroke="#fff" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round"/>`;
    s += `<rect x="${x - 13}" y="${y - hiOff}" width="26" height="${hiOff - lowOff}" rx="13" fill="url(#gBC)" stroke="#fff" stroke-width="2.5" filter="url(#soft)"/>`;
    s += `<rect x="${x - 19}" y="${y - hiOff - 3}" width="38" height="6" rx="3" fill="#fff"/><rect x="${x - 19}" y="${y - lowOff - 3}" width="38" height="6" rx="3" fill="#fff"/>`;
    s += `<circle cx="${x}" cy="${y}" r="9" fill="${P.teal}" stroke="#fff" stroke-width="3"/>`; });
  svg(s);
} };

// s52 Islands: a dot-island archipelago on a glass sea; a coin stack on one island, a laptop on another.
S.s52 = { title: 'Virtual Assistant Salary in the Philippines', style: 'Islands', draw({ svg, P }) {
  let s = `<ellipse cx="600" cy="200" rx="420" ry="150" fill="url(#gGlass)" opacity=".45" filter="url(#soft)"/><ellipse cx="600" cy="200" rx="420" ry="150" fill="none" stroke="#fff" stroke-width="2" opacity=".8"/>`;
  [[340, 110], [270, 80]].forEach(([rx, ry]) => s += `<ellipse cx="600" cy="200" rx="${rx}" ry="${ry}" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="3 10" opacity=".6"/>`);
  // islands as dot blobs (stylised: north, centre cluster, south)
  const isl = [
    [[450, 40], [500, 46], [520, 90], [505, 140], [540, 175], [520, 196], [480, 170], [455, 130], [440, 90]],
    [[560, 190], [610, 182], [640, 205], [600, 222], [565, 214]],
    [[660, 160], [700, 156], [712, 178], [680, 190]],
    [[620, 240], [650, 236], [660, 258], [630, 262]],
    [[690, 228], [770, 222], [810, 252], [800, 310], [750, 330], [700, 300], [680, 262]],
    [[360, 210], [380, 205], [440, 240], [470, 270], [450, 276], [400, 245]]];
  const g = 10;
  isl.forEach(poly => { for (let y = 20; y < 350; y += g) for (let x = 330; x < 830; x += g) if (inPoly(x, y, poly)) s += `<circle cx="${x}" cy="${y}" r="3.6" fill="#fff"/>`;
    const cx = poly.reduce((a, p) => a + p[0], 0) / poly.length, cy = poly.reduce((a, p) => a + p[1], 0) / poly.length; });
  // ripples
  [[500, 120, 70, 90], [745, 275, 90, 70], [600, 205, 60, 30]].forEach(([x, y, rx, ry]) => s += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="#fff" stroke-width="1.5" opacity=".35"/>`);
  // coin stack on the southern island
  let cs = ''; for (let i = 0; i < 6; i++) { const y = 270 - i * 13; cs += `<ellipse cx="750" cy="${y + 7}" rx="34" ry="11" fill="${P.deep}"/><rect x="716" y="${y - 4}" width="68" height="11" fill="${P.blue}"/><ellipse cx="750" cy="${y - 4}" rx="34" ry="11" fill="#fff"/>`; }
  s += `<g filter="url(#soft)">${cs}<ellipse cx="750" cy="200" rx="20" ry="6" fill="none" stroke="${P.sky}" stroke-width="3"/></g>`;
  // laptop on the northern island (iso)
  s += `<g transform="translate(470 100)" filter="url(#soft)"><path d="M-46 22 L0 44 L60 14 L14 -8Z" fill="#fff"/><path d="M-46 22 L0 44 L0 50 L-46 28Z" fill="${P.sky}"/><path d="M0 44 L60 14 L60 20 L0 50Z" fill="${P.line}"/>
    <path d="M14 -8 L60 14 L60 -54 L14 -76Z" fill="url(#gB)"/><path d="M20 -10 L54 6 L54 -50 L20 -66Z" fill="#fff" opacity=".18"/><path d="M28 -40 l8 8 14 -18" fill="none" stroke="${P.teal}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  // palm on the small island
  s += `<g transform="translate(690 172)"><path d="M0 0 C 2 -18, 4 -30, 10 -44" fill="none" stroke="${P.deep}" stroke-width="5" stroke-linecap="round"/>
    <path d="M10 -44 c-14 -8 -28 -4 -34 6 c12 -4 22 -4 34 -6z M10 -44 c14 -10 30 -6 36 4 c-12 -4 -24 -2 -36 -4z M10 -44 c-4 -14 4 -24 16 -26 c-6 8 -10 16 -16 26z M10 -44 c-12 2 -20 12 -20 22 c6 -10 12 -16 20 -22z" fill="${P.teal}"/></g>`;
  svg(s);
} };

// s53 Photo in screen: a laptop showing an assistant on a video call, with status chips and gears around it.
S.s53 = { title: 'How Virtual Assistants Keep Telehealth Practices Running', style: 'Photo in screen', draw({ svg, photo, glass, P }) {
  svg(`<rect x="370" y="22" width="460" height="290" rx="22" fill="${P.ink}" filter="url(#soft)"/>
    <path d="M330 312 h540 l-24 30 a10 10 0 0 1 -8 4 h-476 a10 10 0 0 1 -8 -4z" fill="#fff"/><rect x="545" y="312" width="110" height="10" rx="5" fill="${P.line}"/>`);
  photo('virtual-medical-receptionist-skills', [75, 22], 386, 38, 428, 258, 214, 110, 2.6, 12);
  svg(`<rect x="386" y="38" width="428" height="258" rx="12" fill="none" stroke="#fff" stroke-opacity=".15"/>
    <g transform="translate(600 270)"><rect x="-80" y="-18" width="160" height="36" rx="18" fill="${P.ink}" opacity=".55"/><circle cx="-46" cy="0" r="11" fill="#fff"/><circle cx="0" cy="0" r="11" fill="#fff"/><circle cx="46" cy="0" r="11" fill="${CORAL}"/></g>
    <g transform="translate(754 70)"><rect x="-38" y="-16" width="76" height="32" rx="16" fill="${P.ink}" opacity=".5"/><circle cx="-18" cy="0" r="6" fill="${P.teal}"/><rect x="-6" y="-4" width="30" height="8" rx="4" fill="#fff" opacity=".85"/></g>`);
  // gears (left)
  const gear = (x, y, r, n, col, rot = 0) => { let d = ''; for (let i = 0; i < n; i++) { const a = rot + i / n * 360; d += `<rect x="${-r * .16}" y="${-r - r * .26}" width="${r * .32}" height="${r * .4}" rx="${r * .08}" transform="rotate(${a})"/>`; }
    return `<g transform="translate(${x} ${y})" fill="${col}">${d}<circle r="${r}"/><circle r="${r * .38}" fill="#fff"/></g>`; };
  svg(`<g filter="url(#soft)">${gear(250, 120, 52, 10, 'url(#gB)')}${gear(318, 206, 34, 8, P.teal, 12)}</g>`);
  // status chips (right)
  glass(880, 56, 170, 64, 32, {}, `<svg width="150" height="44">${icon('check', 24, 22, 38, 7)}<rect x="56" y="12" width="70" height="8" rx="4" fill="${P.blue}"/><rect x="56" y="26" width="48" height="8" rx="4" fill="${P.line}"/></svg>`);
  glass(912, 146, 170, 64, 32, {}, `<svg width="150" height="44">${icon('heart', 24, 22, 38, 7)}<rect x="56" y="12" width="64" height="8" rx="4" fill="${P.blue}"/><rect x="56" y="26" width="52" height="8" rx="4" fill="${P.line}"/></svg>`);
  glass(880, 236, 170, 64, 32, {}, `<svg width="150" height="44">${icon('calendar', 24, 22, 38, 7)}<rect x="56" y="12" width="72" height="8" rx="4" fill="${P.blue}"/><rect x="56" y="26" width="40" height="8" rx="4" fill="${P.line}"/></svg>`);
} };

// s54 Calm room: two soft armchairs facing each other, a plant, a floating brain + heart badge.
S.s54 = { title: 'How Virtual Assistants Support Therapy and Mental Health Practices', style: 'Calm room', draw({ svg, P }) {
  let s = `<defs><linearGradient id="ch54" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e59ff"/><stop offset="1" stop-color="#2345ff"/></linearGradient></defs>`;
  // rug
  s += `<ellipse cx="600" cy="318" rx="360" ry="40" fill="#fff" opacity=".4"/><ellipse cx="600" cy="318" rx="300" ry="30" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>`;
  const chair = (x, flip) => `<g transform="translate(${x} 0) scale(${flip ? -1 : 1} 1)" filter="url(#soft)">
    <rect x="-20" y="290" width="12" height="34" rx="6" fill="${P.deep}"/><rect x="140" y="290" width="12" height="34" rx="6" fill="${P.deep}"/>
    <rect x="-40" y="120" width="70" height="190" rx="35" fill="url(#ch54)"/>
    <rect x="-20" y="232" width="190" height="72" rx="30" fill="url(#ch54)"/>
    <rect x="6" y="206" width="160" height="46" rx="23" fill="#fff"/>
    <rect x="-14" y="136" width="40" height="120" rx="20" fill="#fff" opacity=".22"/></g>`;
  s += chair(240, false) + chair(960, true);
  // plant + side table in the middle
  s += `<g filter="url(#soft)"><path d="M568 262 h64 l-8 56 a8 8 0 0 1 -8 7 h-32 a8 8 0 0 1 -8 -7z" fill="#fff"/>
    <path d="M600 262 C 596 220, 570 200, 548 190 C 572 214, 586 236, 600 262Z" fill="${P.teal}"/><path d="M600 262 C 606 214, 630 196, 656 188 C 632 214, 616 236, 600 262Z" fill="${P.teal}" opacity=".8"/>
    <path d="M600 262 C 598 226, 600 196, 610 168 C 616 200, 612 232, 600 262Z" fill="${P.blue}"/><path d="M600 262 C 590 236, 574 228, 556 228 C 574 240, 588 250, 600 262Z" fill="${P.blue}" opacity=".7"/></g>`;
  // floating badge
  s += `<circle cx="600" cy="96" r="66" fill="url(#gGlass)" stroke="#fff" stroke-width="1.5" filter="url(#soft)"/>${icon('brain', 590, 94, 78, 6.5)}`;
  s += `<g transform="translate(646 136)"><circle r="22" fill="#fff" filter="url(#soft)"/><path d="M0 11 C-10 4 -14 -1 -14 -6 c0 -4 3 -7 7 -7 3 0 5 2 7 4 2 -2 4 -4 7 -4 4 0 7 3 7 7 0 5 -4 10 -14 17z" fill="${P.teal}"/></g>`;
  // soft halo rings
  s += `<circle cx="600" cy="96" r="92" fill="none" stroke="#fff" stroke-width="1.5" opacity=".45"/><circle cx="600" cy="96" r="120" fill="none" stroke="#fff" stroke-width="1.2" opacity=".25"/>`;
  // a hanging lamp arc at the left
  svg(s, 0, 0);
} };

})();
