// Scenes s01-s18. Each: SCENES[id] = { title, style, draw(ctx) }. No words on the image.
(() => {
const S = window.SCENES;

// s01 Glass pair: two frosted tiles joined by a liquid bridge (the VA plugged into the EHR).
S.s01 = { title: 'Virtual Medical Assistant in Epic', style: 'Glass pair', draw({ svg, glass, ico, P }) {
  // Two big frosted tiles fused by a liquid glass bridge, with data dots flowing across it (the VA working inside the EHR).
  svg(`<path d="M520 120 C 565 150, 635 150, 680 120 L680 270 C 635 240, 565 240, 520 270Z" fill="url(#gGlass)" stroke="#fff" stroke-width="2"/>
    ${[0, 1, 2, 3, 4].map(i => `<circle cx="${548 + i * 26}" cy="195" r="${i === 2 ? 9 : 6}" fill="${i % 2 ? P.teal : P.blue}" opacity="${.5 + i * .1}"/>`).join('')}`);
  glass(250, 40, 290, 290, 86, {}, ico('headset', 150, 8));
  glass(660, 40, 290, 290, 86, {}, `<svg width="170" height="150" viewBox="0 0 170 150"><rect x="8" y="8" width="154" height="104" rx="14" fill="#fff" stroke="${P.blue}" stroke-width="8"/>
    <rect x="24" y="26" width="34" height="70" rx="6" fill="${P.blue}" opacity=".9"/><rect x="70" y="28" width="76" height="10" rx="5" fill="${P.ink}" opacity=".8"/>
    <rect x="70" y="50" width="60" height="10" rx="5" fill="#cfd8f5"/><rect x="70" y="72" width="70" height="10" rx="5" fill="${P.teal}"/><path d="M60 136 H110 M85 112 V136" stroke="${P.blue}" stroke-width="8" stroke-linecap="round"/></svg>`);
} };

// s02 Capsule equaliser: see-through capsules as call volume behind one glass headset tile.
S.s02 = { title: 'Healthcare Call Center Outsourcing: Services, Costs, and Providers', style: 'Capsule equaliser', draw({ capsules, tile, glass, ico }) {
  capsules(150, 60, 14, 52, 290, 16, [.35, .5, .7, .55, .85, 1, .8, .6, .9, .7, .5, .65, .4, .3]);
  tile('headset', 600, 190, 190);
  glass(760, 70, 96, 96, 48, {}, ico('phone', 50, 9));
  glass(350, 230, 86, 86, 43, {}, ico('phone', 44, 9));
} };

// ---- shared helpers for s03-s18 ----
const BL = '#2345ff', DEEP = '#162da1', TEAL = '#2dd0e8', CY = '#02d0fd', EL = '#1344fd', SKY = '#a9d2f7', LINE = '#dfe5f7', CORAL = '#ff8a8a';
// I(): brand icon as an inline <svg> positioned at (x, y) inside another svg; accent is set per icon (no global <style>).
const I = (n, x, y, s, sw = 8, col = BL, acc = TEAL) => window.htIcon(n, s, sw, col, acc)
  .replace('<svg ', `<svg x="${x}" y="${y}" `).replace(/<style>[^<]*<\/style>/, '').replace(/class="ac"/g, `stroke="${acc}"`);
// Isometric projection and box helper.
const isoP = (ox, oy, k = 1) => (x, y, z) => [ox + (x - y) * 0.866 * k, oy + (x + y) * 0.5 * k - z * k];
const pts = a => a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
const poly = (a, attrs) => `<polygon points="${pts(a)}" ${attrs}/>`;
const box = (Q, x, y, z, w, d, h, top, left, right, ex = '') =>
  poly([Q(x, y, z + h), Q(x + w, y, z + h), Q(x + w, y + d, z + h), Q(x, y + d, z + h)], `fill="${top}" ${ex}`) +
  poly([Q(x, y + d, z), Q(x + w, y + d, z), Q(x + w, y + d, z + h), Q(x, y + d, z + h)], `fill="${left}" ${ex}`) +
  poly([Q(x + w, y, z), Q(x + w, y + d, z), Q(x + w, y + d, z + h), Q(x + w, y, z + h)], `fill="${right}" ${ex}`);
const TOOTH = 'M30 32C30 19 42 14 50 18c5 2 15 2 20 0 8-4 20 1 20 14 0 15-6 21-8 35-2 17-4 35-12 35s-6-24-10-24-2 24-10 24-10-18-12-35c-2-14-8-20-8-35z';
const SH = `<filter id="sh" x="-60%" y="-60%" width="220%" height="260%"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#1344fd" flood-opacity=".22"/></filter>`;
const glassFill = 'fill="url(#gGlass)" stroke="#fff" stroke-width="2"';

// s03 Aurora blobs + one object: big blurred colour blobs, a nearly empty glass battery and a tall leaning paper stack.
S.s03 = { title: 'Physician Burnout and Admin Workload', style: 'Aurora blobs + one object', draw({ svg, glass, solid, ico }) {
  svg(`<filter id="aur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="55"/></filter>
    <g filter="url(#aur)"><circle cx="300" cy="170" r="170" fill="${CY}" opacity=".55"/><circle cx="930" cy="120" r="190" fill="${EL}" opacity=".5"/>
    <circle cx="620" cy="300" r="150" fill="#fff" opacity=".7"/><circle cx="560" cy="60" r="110" fill="#7fb2ff" opacity=".5"/></g>`);
  // battery
  glass(210, 105, 400, 190, 46);
  glass(618, 160, 34, 80, 14);
  svg(`<rect x="234" y="129" width="62" height="142" rx="24" fill="${CORAL}"/>
    <rect x="234" y="129" width="62" height="40" rx="20" fill="#fff" opacity=".35"/>
    ${[0, 1, 2].map(i => `<rect x="${310 + i * 88}" y="129" width="72" height="142" rx="22" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="8 10" opacity=".85"/>`).join('')}`);
  solid(150, 230, 104, 104, 52, {}, ico('stethoscope', 62, 9));
  // paper stack, leaning right
  let sheets = '';
  for (let i = 0; i < 19; i++) { const y = 318 - i * 15, x = 740 + Math.sin(i * 1.7) * 7 + i * 2.6;
    sheets += `<rect x="${x}" y="${y}" width="220" height="13" rx="3" fill="#fff" stroke="${LINE}" stroke-width="1.5" transform="rotate(${Math.sin(i * 2.3) * 1.6} ${x + 110} ${y})"/>`; }
  const tx = 740 + 19 * 2.6, ty = 318 - 19 * 15;
  sheets += `<path d="M${tx - 6} ${ty + 12} L${tx + 214} ${ty + 12} L${tx + 236} ${ty - 20} L${tx + 16} ${ty - 20}Z" fill="#fff" stroke="${LINE}" stroke-width="1.5"/>
    <path d="M${tx + 30} ${ty - 9}h120M${tx + 24} ${ty + 1}h150" stroke="${SKY}" stroke-width="4" stroke-linecap="round"/>`;
  svg(`<g filter="url(#soft)" transform="rotate(4 850 330)">${sheets}</g>`);
} };

// s04 Layered depth stack: three frosted cards in perspective (claim lines, payment, ledger).
S.s04 = { title: 'Medical Billing Virtual Assistant Guide', style: 'Layered depth stack', draw({ svg, solid, ico }) {
  const M = (ty) => `matrix(0.84 0.3 -0.58 0.39 625 ${ty})`;
  const card = (ty, inner) => `<g transform="${M(ty + 10)}"><rect width="330" height="230" rx="26" fill="${SKY}" opacity=".55"/></g>
    <g transform="${M(ty)}"><rect width="330" height="230" rx="26" fill="#fff" fill-opacity=".72" stroke="#fff" stroke-width="2.5"/>${inner}</g>`;
  const ledger = Array.from({ length: 5 }, (_, i) => `<rect x="${40 + i * 54}" y="${190 - [60, 95, 75, 125, 110][i]}" width="30" height="${[60, 95, 75, 125, 110][i]}" rx="8" fill="${i === 3 ? TEAL : BL}" opacity="${i === 3 ? 1 : .75}"/>`).join('')
    + `<path d="M30 200h270" stroke="${BL}" stroke-width="5" stroke-linecap="round" opacity=".5"/>`;
  const pay = `<circle cx="240" cy="140" r="56" fill="url(#gB)"/><circle cx="240" cy="140" r="38" fill="none" stroke="#fff" stroke-width="7" opacity=".85"/>
    <path d="M224 140l11 11 21-22" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="40" y="120" width="110" height="18" rx="9" fill="${BL}" opacity=".8"/><rect x="40" y="156" width="80" height="18" rx="9" fill="${SKY}"/><rect x="40" y="192" width="96" height="18" rx="9" fill="${TEAL}"/>`;
  const claim = `<rect x="30" y="28" width="120" height="20" rx="10" fill="${BL}"/><rect x="250" y="24" width="50" height="28" rx="10" fill="${TEAL}"/>`
    + [0, 1, 2, 3].map(i => `<rect x="30" y="${76 + i * 36}" width="40" height="16" rx="8" fill="${SKY}"/><rect x="84" y="${76 + i * 36}" width="${[150, 120, 165, 100][i]}" height="16" rx="8" fill="${BL}" opacity=".7"/>
      <circle cx="288" cy="${84 + i * 36}" r="10" fill="${i < 3 ? TEAL : SKY}"/>`).join('');
  svg(`<g filter="url(#soft)">${card(205, ledger)}${card(110, pay)}${card(15, claim)}</g>`);
  solid(235, 125, 132, 132, 66, {}, ico('headset', 76, 8));
  svg(`<path d="M372 191 C 420 191, 430 170, 470 170" fill="none" stroke="#fff" stroke-width="5" stroke-dasharray="2 12" stroke-linecap="round"/>`);
} };

// s05 Ghosted giant shape: a huge see-through tooth filling the right half, a solid headset badge inside it, a dental chair silhouette.
S.s05 = { title: 'How to Hire a Virtual Dental Receptionist', style: 'Ghosted giant shape', draw({ ghost, solid, svg, ico }) {
  ghost(`<g transform="translate(570 -40) scale(4.3)"><path d="${TOOTH}" fill="url(#gGhost)" stroke="#fff" stroke-width="1" stroke-opacity=".9"/>
    <path d="M40 38c0-7 4-11 10-11" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/></g>`);
  solid(744, 110, 150, 150, 75, {}, ico('headset', 92, 8));
  // dental chair silhouette (solid white)
  svg(`<g fill="#fff" filter="url(#soft)">
    <rect x="300" y="312" width="150" height="20" rx="10"/><rect x="360" y="252" width="30" height="66" rx="8"/>
    <rect x="310" y="226" width="140" height="34" rx="17"/>
    <rect x="186" y="226" width="140" height="32" rx="16" transform="rotate(32 326 243)"/>
    <rect x="160" y="143" width="60" height="30" rx="15" transform="rotate(32 190 158)"/>
    <rect x="440" y="226" width="110" height="30" rx="15" transform="rotate(26 450 241)"/>
</g>
    <g fill="#fff" opacity=".95"><rect x="424" y="50" width="14" height="180" rx="7"/></g>
    <path d="M431 58 C 380 30, 300 40, 262 74" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/>
    <ellipse cx="254" cy="84" rx="38" ry="17" fill="#fff" transform="rotate(-12 254 84)"/>
    <ellipse cx="252" cy="92" rx="24" ry="6" fill="${TEAL}" transform="rotate(-12 252 92)"/>`);
} };

// s06 Light streaks + window: horizontal light streaks run into a glass video-call window, doctor and patient side by side.
S.s06 = { title: 'Telehealth Explained for Practices', style: 'Light streaks + window', draw({ svg, glass, stripes }) {
  stripes(120, 120, 380, 8, 22, .75);
  glass(460, 40, 580, 300, 30);
  const av = (x, fill, doc) => `<rect x="${x}" y="88" width="256" height="182" rx="18" fill="${fill}"/>
    <circle cx="${x + 128}" cy="160" r="34" fill="#fff"/>
    <path d="M${x + 58} 270 C ${x + 58} 222, ${x + 88} 204, ${x + 128} 204 S ${x + 198} 222, ${x + 198} 270Z" fill="#fff"/>
    ${doc ? `<path d="M${x + 112} 206 L${x + 128} 236 L${x + 144} 206" fill="none" stroke="${SKY}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M${x + 98} 210 C ${x + 92} 246, ${x + 106} 256, ${x + 118} 250" fill="none" stroke="${TEAL}" stroke-width="5" stroke-linecap="round"/><circle cx="${x + 120}" cy="249" r="7" fill="${TEAL}"/>` : ''}`;
  svg(`<circle cx="492" cy="66" r="7" fill="${SKY}"/><circle cx="514" cy="66" r="7" fill="${SKY}"/><circle cx="536" cy="66" r="7" fill="${SKY}"/>
    ${av(482, 'url(#gB)', true)}${av(762, 'url(#gBC)', false)}
    <g transform="translate(750 304)"><circle r="20" fill="${BL}"/><circle cx="-54" r="20" fill="#fff" stroke="${LINE}" stroke-width="2"/><circle cx="54" r="20" fill="#fff" stroke="${LINE}" stroke-width="2"/>
    <rect x="-59" y="-9" width="10" height="16" rx="5" fill="none" stroke="${BL}" stroke-width="3.5"/><path d="M-64 2a10 10 0 0 0 20 0" fill="none" stroke="${BL}" stroke-width="3"/>
    <rect x="44" y="-7" width="14" height="14" rx="3" fill="none" stroke="${BL}" stroke-width="3.5"/><path d="M58 -2l7-4v12l-7-4" fill="${BL}"/>
    <path d="M-10 2c6-6 14-6 20 0" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/></g>`);
} };

// s07 Lens over pattern: a field of soft code blocks; a big glass lens makes one area crisp, with one flagged block.
S.s07 = { title: 'Medical Coding Audits', style: 'Lens over pattern', draw({ svg }) {
  const cx = 610, cy = 180, r = 138, Z = 1.65;
  let field = '', crisp = '';
  for (let row = 0; row < 8; row++) for (let col = 0; col < 13; col++) {
    const x = 118 + col * 76 + (row % 2) * 30, y = 14 + row * 44, w = 58 + ((row * 7 + col * 3) % 3) * 6;
    field += `<rect x="${x}" y="${y}" width="${w}" height="28" rx="9" fill="#fff" opacity=".38"/>`;
    const k = (row * 5 + col * 3) % 7;
    const fill = k === 0 ? TEAL : '#fff';
    crisp += `<rect x="${x}" y="${y}" width="${w}" height="28" rx="9" fill="${fill}" stroke="${LINE}" stroke-width="1"/>
      <rect x="${x + 9}" y="${y + 11}" width="${w * .45}" height="6" rx="3" fill="${k === 0 ? '#fff' : BL}" opacity=".8"/><circle cx="${x + w - 12}" cy="${y + 14}" r="5" fill="${k === 0 ? '#fff' : SKY}"/>`;
  }
  // flagged block inside lens
  const fx = cx + 12, fy = cy - 4;
  svg(`<filter id="bl3"><feGaussianBlur stdDeviation="2.2"/></filter><g filter="url(#bl3)">${field}</g>
    <clipPath id="lensClip"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#eef4ff"/>
    <g clip-path="url(#lensClip)"><g transform="translate(${cx} ${cy}) scale(${Z}) translate(${-cx} ${-cy})">${crisp}</g>
      <rect x="${fx - 66}" y="${fy - 26}" width="132" height="52" rx="16" fill="#fff" stroke="${CORAL}" stroke-width="5"/>
      <rect x="${fx - 48}" y="${fy - 6}" width="60" height="12" rx="6" fill="${CORAL}"/><circle cx="${fx + 40}" cy="${fy}" r="10" fill="${CORAL}"/></g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff" stroke-width="20" filter="url(#soft)"/>
    <circle cx="${cx}" cy="${cy}" r="${r + 10}" fill="none" stroke="${SKY}" stroke-width="2" opacity=".8"/>
    <path d="M${cx - 92} ${cy - 70} A 116 116 0 0 1 ${cx - 30} ${cy - 112}" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".8"/>
    <path d="M${cx + 112} ${cy + 112} L${cx + 210} ${cy + 210}" stroke="url(#gB)" stroke-width="40" stroke-linecap="round"/>
    <path d="M${cx + 104} ${cy + 104} L${cx + 124} ${cy + 124}" stroke="#fff" stroke-width="30" stroke-linecap="round"/>`);
} };

// s08 Bubble stack: two overlapping big speech bubbles (voice wave vs dot rhythm) and a globe badge.
S.s08 = { title: 'Bilingual Virtual Medical Receptionist: The Complete Guide', style: 'Bubble stack', draw({ svg, solid, ico }) {
  const bubble = (x, y, w, h, tailLeft) => tailLeft
    ? `M${x + 60} ${y}h${w - 120}a60 60 0 0 1 60 60v${h - 120}a60 60 0 0 1 -60 60H${x + 120}l-70 46 12 -46h-2a60 60 0 0 1 -60 -60V${y + 60}a60 60 0 0 1 60 -60z`
    : `M${x + 60} ${y}h${w - 120}a60 60 0 0 1 60 60v${h - 120}a60 60 0 0 1 -60 60h-2l12 46 -70 -46H${x + 60}a60 60 0 0 1 -60 -60V${y + 60}a60 60 0 0 1 60 -60z`;
  const bars = [40, 70, 110, 80, 130, 90, 60, 100, 50, 30].map((h, i) => `<rect x="${262 + i * 30}" y="${158 - h / 2}" width="14" height="${h}" rx="7" fill="${i % 3 === 1 ? TEAL : BL}"/>`).join('');
  const dots = [26, 26, 64, 26, 44, 26];
  let dx = 642, dotsSvg = '';
  dots.forEach((w, i) => { dotsSvg += `<rect x="${dx}" y="${222}" width="${w}" height="26" rx="13" fill="#fff" opacity="${i === 2 ? 1 : .85}"/>`; dx += w + 16; });
  svg(`<g filter="url(#soft)"><path d="${bubble(220, 48, 440, 220, true)}" ${glassFill}/></g>${bars}
    <g filter="url(#soft)"><path d="${bubble(590, 140, 400, 170, false)}" fill="url(#gB)" opacity=".86" stroke="#fff" stroke-width="2"/></g>${dotsSvg}`);
  solid(880, 40, 120, 120, 60, {}, ico('globe', 72, 8));
} };

// s09 Translucent venn: two overlapping translucent circles, an ID badge in one, a clinic in the other, a check in the overlap.
S.s09 = { title: 'Credentialing vs Enrollment', style: 'Translucent venn', draw({ svg }) {
  svg(`<g style="isolation:isolate">
    <circle cx="490" cy="182" r="168" fill="${EL}" opacity=".55" style="mix-blend-mode:multiply"/>
    <circle cx="720" cy="182" r="168" fill="${CY}" opacity=".55" style="mix-blend-mode:multiply"/></g>
    <circle cx="490" cy="182" r="168" fill="none" stroke="#fff" stroke-width="3" opacity=".9"/>
    <circle cx="720" cy="182" r="168" fill="none" stroke="#fff" stroke-width="3" opacity=".9"/>
    <g transform="translate(360 112)" filter="url(#soft)"><rect width="104" height="138" rx="16" fill="#fff"/><rect x="38" y="-14" width="28" height="22" rx="6" fill="${SKY}"/>
      <circle cx="52" cy="52" r="20" fill="${BL}"/><path d="M24 104c2-16 14-24 28-24s26 8 28 24z" fill="${BL}"/><rect x="24" y="114" width="56" height="9" rx="4.5" fill="${TEAL}"/></g>
    ${I('clinic', 728, 118, 130, 7, '#fff', '#fff')}
    <circle cx="605" cy="182" r="34" fill="#fff"/><path d="M590 182l10 10 20-20" fill="none" stroke="${TEAL}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`);
} };

// s10 Toggle switches: four big glass toggles, three on (teal), one off, an icon beside each.
S.s10 = { title: 'Signs Your Practice Needs a Virtual Assistant (and When to Wait)', style: 'Toggle switches', draw({ svg }) {
  const icons = ['phone', 'calendar', 'clipboard', 'heart'];
  let s = SH;
  icons.forEach((n, i) => { const y = 22 + i * 82, on = i < 3, x = 400;
    s += `<circle cx="${x - 78}" cy="${y + 34}" r="34" fill="#fff" filter="url(#sh)"/>${I(n, x - 102, y + 10, 48, 9, on ? BL : '#8a93b8', on ? TEAL : SKY)}
      <rect x="${x}" y="${y}" width="176" height="68" rx="34" ${on ? 'fill="url(#gBC)"' : 'fill="#fff" fill-opacity=".4"'} stroke="#fff" stroke-width="2.5" filter="url(#sh)"/>
      <circle cx="${on ? x + 142 : x + 34}" cy="${y + 34}" r="27" fill="#fff"/>
      ${on ? `<path d="M${x + 130} ${y + 34}l8 8 14-15" fill="none" stroke="${TEAL}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>`
           : `<rect x="${x + 26}" y="${y + 26}" width="16" height="16" rx="4" fill="none" stroke="${SKY}" stroke-width="4"/>`}
      <rect x="${x + 206}" y="${y + 26}" width="${[150, 110, 180, 90][i]}" height="16" rx="8" fill="#fff" opacity="${on ? .75 : .35}"/>`; });
  s += `<circle cx="930" cy="180" r="128" fill="url(#gGhost)" stroke="#fff" stroke-width="2" opacity=".9"/>${I('headset', 850, 98, 160, 6, '#fff', '#fff')}`;
  svg(s);
} };

// s11 Connected buildings: three glass clinics at different depths, joined by dotted routes to one central headset node.
S.s11 = { title: 'How to Hire a VA for Multi-Location Group Practices', style: 'Connected buildings', draw({ svg, solid, ico }) {
  const bld = (x, y, k, op) => `<g transform="translate(${x} ${y}) scale(${k})" opacity="${op}" filter="url(#sh)">
    <rect x="0" y="40" width="160" height="130" rx="10" ${glassFill}/>
    <path d="M-10 46 L80 0 L170 46Z" fill="#fff" fill-opacity=".85" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="80" cy="30" r="0"/>
    <rect x="62" y="56" width="36" height="36" rx="8" fill="url(#gB)"/><path d="M80 63v22M69 74h22" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
    ${[22, 112].map(wx => `<rect x="${wx}" y="62" width="26" height="24" rx="5" fill="${SKY}"/><rect x="${wx}" y="102" width="26" height="24" rx="5" fill="${SKY}"/>`).join('')}
    <rect x="64" y="118" width="32" height="52" rx="6" fill="${BL}" opacity=".85"/></g>`;
  const route = d => `<path d="${d}" fill="none" stroke="#fff" stroke-width="6" stroke-dasharray="1 16" stroke-linecap="round"/>`;
  svg(SH + route('M300 220 C 400 250, 470 210, 560 200') + route('M905 150 C 830 120, 720 140, 660 175') + route('M820 290 C 760 290, 700 260, 665 228')
    + bld(170, 90, 1.15, 1) + bld(860, 40, .72, .8) + bld(800, 215, .82, .9)
    + `<circle cx="300" cy="220" r="0"/>`);
  solid(545, 130, 130, 130, 65, {}, ico('headset', 80, 8));
  svg(`<circle cx="610" cy="195" r="92" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/><circle cx="610" cy="195" r="122" fill="none" stroke="#fff" stroke-width="1.5" opacity=".4"/>`);
} };

// s12 Isometric desk: a home-office desk with laptop, second monitor, headset, plant and lamp, flat iso shading in blues.
S.s12 = { title: 'Home Office Setup and Equipment Every Healthcare Virtual Assistant Needs', style: 'Isometric desk', draw({ svg }) {
  const Q = isoP(545, 225, .95);
  const T = '#ffffff', L = '#cfe0fb', R = '#9dbcf5';
  let g = '';
  // floor shadow
  g += poly([Q(-30, -30, 0), Q(360, -30, 0), Q(360, 220, 0), Q(-30, 220, 0)], 'fill="#fff" opacity=".22"');
  // legs + desk top
  g += box(Q, 6, 6, 0, 12, 12, 100, T, L, R) + box(Q, 302, 6, 0, 12, 12, 100, T, L, R) + box(Q, 6, 162, 0, 12, 12, 100, T, L, R) + box(Q, 302, 162, 0, 12, 12, 100, T, L, R);
  g += box(Q, 0, 0, 100, 320, 180, 12, T, L, R);
  const Z = 112;
  // lamp (back-left)
  g += box(Q, 18, 18, Z, 34, 34, 6, T, L, R);
  { const b = Q(35, 35, Z + 6), m = Q(35, 35, Z + 120), e = Q(95, 70, Z + 150);
    g += `<path d="M${b[0]} ${b[1]} L${m[0]} ${m[1]} L${e[0]} ${e[1]}" fill="none" stroke="#7fa0ff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${m[0]}" cy="${m[1]}" r="7" fill="${BL}"/>
      <path d="M${e[0] - 24} ${e[1] + 22} L${e[0] - 8} ${e[1] - 6} L${e[0] + 16} ${e[1] - 2} L${e[0] + 26} ${e[1] + 28}Z" fill="${BL}"/>
      <ellipse cx="${e[0] + 1}" cy="${e[1] + 26}" rx="25" ry="7" fill="${CY}"/>`; }
  // monitor (back-right)
  g += box(Q, 190, 20, Z, 50, 30, 5, T, L, R) + box(Q, 210, 26, Z + 5, 10, 8, 40, T, L, R);
  g += box(Q, 120, 22, Z + 45, 190, 10, 120, '#e8f0ff', DEEP, '#2a3fb8');
  { const sc = [Q(130, 32, Z + 55), Q(300, 32, Z + 55), Q(300, 32, Z + 155), Q(130, 32, Z + 155)];
    g += poly(sc, 'fill="url(#gBC)"');
    const bar = (x0, x1, z, c) => { const a = Q(x0, 32, z), b = Q(x1, 32, z); return `<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" stroke="${c}" stroke-width="9" stroke-linecap="round"/>`; };
    g += bar(148, 230, Z + 132, '#fff') + bar(148, 270, Z + 110, 'rgba(255,255,255,.6)') + bar(148, 210, Z + 88, 'rgba(255,255,255,.6)');
    const ck = Q(268, 32, Z + 78); g += `<circle cx="${ck[0]}" cy="${ck[1]}" r="16" fill="#fff"/><path d="M${ck[0] - 7} ${ck[1] + 1}l5 5 10-10" fill="none" stroke="${TEAL}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`; }
  // laptop (front-left)
  g += box(Q, 30, 54, Z, 110, 72, 6, T, L, R);
  g += box(Q, 30, 50, Z + 6, 110, 5, 78, '#e8f0ff', '#1344fd', '#2a3fb8');
  { const sc = [Q(38, 55, Z + 14), Q(132, 55, Z + 14), Q(132, 55, Z + 76), Q(38, 55, Z + 76)]; g += poly(sc, 'fill="url(#gB)"');
    const h = Q(85, 55, Z + 45); g += I('heart', h[0] - 24, h[1] - 26, 48, 9, '#fff', TEAL);
    g += poly([Q(50, 66, Z + 6), Q(120, 66, Z + 6), Q(120, 109, Z + 6), Q(50, 109, Z + 6)], `fill="${LINE}"`); }
  // plant (front-right)
  g += box(Q, 274, 124, Z, 32, 32, 32, T, L, R);
  { const c = Q(290, 140, Z + 32);
    g += `<g fill="${TEAL}"><ellipse cx="${c[0] - 18}" cy="${c[1] - 30}" rx="13" ry="32" transform="rotate(-24 ${c[0] - 18} ${c[1] - 30})"/>
      <ellipse cx="${c[0] + 18}" cy="${c[1] - 28}" rx="13" ry="30" transform="rotate(26 ${c[0] + 18} ${c[1] - 28})" fill="${CY}"/>
      <ellipse cx="${c[0]}" cy="${c[1] - 44}" rx="13" ry="38" fill="#2bb6e0"/></g>`; }
  // headset (lying on desk, front-middle)
  { const c = Q(170, 150, Z);
    g += `<g transform="translate(${c[0]} ${c[1] - 26})"><path d="M-34 18 v-6 a34 30 0 0 1 68 0 v6" fill="none" stroke="${BL}" stroke-width="8" stroke-linecap="round"/>
      <rect x="-44" y="8" width="20" height="30" rx="9" fill="${BL}"/><rect x="24" y="8" width="20" height="30" rx="9" fill="${BL}"/>
      <path d="M34 36 c0 12 -10 16 -24 16" fill="none" stroke="${TEAL}" stroke-width="6" stroke-linecap="round"/></g>`; }
  svg(`<g filter="url(#soft)">${g}</g>`);
} };

// s13 Isometric room: a small dental operatory (chair, light, cabinet, tooth picture) with a floating remote screen linked by a beam.
S.s13 = { title: 'How Do Dental Practices Use Virtual Assistants? A Full Walkthrough', style: 'Isometric room', draw({ svg }) {
  const k = .72, Q = isoP(390, 168, k);
  const T = '#ffffff', L = '#cfe0fb', R = '#9dbcf5';
  let g = '';
  // floor slab + two walls
  g += box(Q, 0, 0, -14, 300, 300, 14, '#f4f8ff', L, R);
  g += box(Q, -12, 0, 0, 12, 300, 200, '#fff', '#e3edff', '#eef4ff');
  g += box(Q, -12, -12, 0, 312, 12, 200, '#fff', '#e3edff', '#d6e5ff');
  // tooth picture on left wall (x = 0 plane)
  { const o = Q(0, 110, 175); const m = `matrix(${-.866 * k} ${.5 * k} 0 ${k} ${o[0]} ${o[1]})`;
    g += `<g transform="${m}" ><rect x="0" y="0" width="80" height="80" rx="10" fill="url(#gB)" transform="scale(-1 1) translate(-80 0)"/>
      <path d="${TOOTH}" transform="translate(12 10) scale(.5)" fill="#fff"/></g>`; }
  // cabinet on back wall (y = 0)
  g += box(Q, 170, 0, 0, 110, 40, 72, T, L, R);
  g += poly([Q(190, 8, 72), Q(230, 8, 72), Q(230, 30, 72), Q(190, 30, 72)], `fill="${SKY}"`);
  // light pole + arm + lamp head
  { const b = Q(70, 40, 0), t = Q(70, 40, 230), h = Q(140, 160, 210);
    g += box(Q, 58, 28, 0, 24, 24, 8, T, L, R);
    g += `<path d="M${b[0]} ${b[1]} L${t[0]} ${t[1]} Q ${t[0] + 70} ${t[1] - 6} ${h[0]} ${h[1]}" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>`; }
  // chair: base, seat, back, headrest, leg rest (along x)
  const slab = (a, b, w0, w1, th) => { // slab from point a(x,z) to b(x,z), across y w0..w1, thickness th
    const [ax, az] = a, [bx, bz] = b;
    const top = [Q(ax, w0, az + th), Q(bx, w0, bz + th), Q(bx, w1, bz + th), Q(ax, w1, az + th)];
    const side = [Q(ax, w1, az), Q(bx, w1, bz), Q(bx, w1, bz + th), Q(ax, w1, az + th)];
    return poly(top, 'fill="#3e59ff"') + poly(side, `fill="${DEEP}"`); };
  g += box(Q, 135, 150, 0, 60, 50, 8, T, L, R) + box(Q, 155, 165, 8, 22, 22, 50, T, L, R);
  g += slab([70, 120], [100, 64], 140, 200, 16);   // back
  g += slab([118, 58], [210, 58], 140, 200, 16);   // seat (drawn after back)
  g += slab([210, 58], [280, 34], 145, 195, 14);   // leg rest
  g += slab([52, 150], [74, 122], 155, 185, 14);   // headrest
  { const h = Q(140, 160, 210);
    g += `<ellipse cx="${h[0]}" cy="${h[1]}" rx="34" ry="15" fill="#fff"/><ellipse cx="${h[0]}" cy="${h[1] + 6}" rx="22" ry="6" fill="${TEAL}"/>`; }
  // beam to floating screen
  const sx = 760, sy = 70;
  { const h = Q(110, 170, 90);
    g = `<polygon points="${h[0]},${h[1]} ${sx},${sy + 40} ${sx},${sy + 200}" fill="url(#beam)"/>` + g; }
  svg(`<linearGradient id="beam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".7"/></linearGradient>
    <g filter="url(#soft)">${g}</g>`);
  svg(`<g filter="url(#soft)"><rect x="${sx}" y="${sy}" width="270" height="240" rx="28" ${glassFill}/></g>
    <rect x="${sx + 22}" y="${sy + 22}" width="226" height="140" rx="16" fill="url(#gB)"/>
    <circle cx="${sx + 135}" cy="${sy + 76}" r="26" fill="#fff"/><path d="M${sx + 85} ${sy + 162} C ${sx + 85} ${sy + 124}, ${sx + 108} ${sy + 110}, ${sx + 135} ${sy + 110} S ${sx + 185} ${sy + 124}, ${sx + 185} ${sy + 162}Z" fill="#fff"/>
    <path d="M${sx + 103} ${sy + 80} v-8 a32 32 0 0 1 64 0 v8" fill="none" stroke="${TEAL}" stroke-width="6" stroke-linecap="round"/>
    <rect x="${sx + 97}" y="${sy + 72}" width="12" height="20" rx="6" fill="${TEAL}"/><rect x="${sx + 161}" y="${sy + 72}" width="12" height="20" rx="6" fill="${TEAL}"/>
    <rect x="${sx + 22}" y="${sy + 180}" width="120" height="14" rx="7" fill="${BL}" opacity=".7"/><rect x="${sx + 22}" y="${sy + 206}" width="80" height="14" rx="7" fill="${SKY}"/>
    <circle cx="${sx + 226}" cy="${sy + 200}" r="18" fill="${TEAL}"/><path d="M${sx + 218} ${sy + 200}l6 6 11-12" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`);
} };

// s14 Hero + constellation: a big solid white tooth with 25 small glass chips in an arc around it, a few holding task icons.
S.s14 = { title: 'What Tasks Can a Dental Virtual Assistant Take Over? 25 Examples', style: 'Hero + constellation', draw({ svg }) {
  const cx = 600, cy = 222, rx = 370, ry = 160;
  const P25 = Array.from({ length: 25 }, (_, i) => { const t = (-12 + i * (204 / 24)) * Math.PI / 180; return [cx + rx * Math.cos(t), cy - ry * Math.sin(t)]; });
  const iconAt = { 2: 'calendar', 7: 'phone', 12: 'headset', 17: 'document', 22: 'shield' };
  let lines = '', dots = '';
  P25.forEach((p, i) => { if (i) lines += `L${p[0].toFixed(1)} ${p[1].toFixed(1)}`; else lines += `M${p[0].toFixed(1)} ${p[1].toFixed(1)}`; });
  P25.forEach((p, i) => { const n = iconAt[i];
    if (n) dots += `<circle cx="${p[0]}" cy="${p[1]}" r="34" fill="#fff" fill-opacity=".85" stroke="#fff" stroke-width="2" filter="url(#sh)"/>${I(n, p[0] - 22, p[1] - 22, 44, 9)}`;
    else { const r = [9, 12, 7, 14, 10][i % 5]; dots += `<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${i % 4 === 1 ? TEAL : '#fff'}" fill-opacity="${i % 4 === 1 ? 1 : .8}" stroke="#fff" stroke-width="1.5"/>`; } });
  svg(SH + `<path d="${lines}" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="3 8" opacity=".8"/>
    <ellipse cx="${cx}" cy="${cy + 112}" rx="90" ry="12" fill="${EL}" opacity=".10"/>
    <g filter="url(#sh)"><g transform="translate(${cx - 60 * 2.7} ${cy - 66 * 2.7}) scale(2.7)"><path d="${TOOTH}" fill="#fff"/>
      <path d="M40 38c0-7 4-11 10-11" fill="none" stroke="${TEAL}" stroke-width="3.2" stroke-linecap="round"/></g></g>` + dots);
} };

// s15 Paper-cut layers: layered paper hills in blues, a row of people silhouettes with gaps shown as empty dashed outlines.
S.s15 = { title: 'Healthcare Staffing Shortages', style: 'Paper-cut layers', draw({ svg }) {
  svg(SH);
  const person = (x, y, filled) => filled
    ? `<g filter="url(#sh)"><circle cx="${x}" cy="${y}" r="21" fill="#fff"/><path d="M${x - 38} ${y + 92} C ${x - 38} ${y + 48}, ${x - 20} ${y + 30}, ${x} ${y + 30} S ${x + 38} ${y + 48}, ${x + 38} ${y + 92}Z" fill="#fff"/></g>`
    : `<g fill="#fff" fill-opacity=".12" stroke="#fff" stroke-width="3.5" stroke-dasharray="7 8" stroke-linecap="round"><circle cx="${x}" cy="${y}" r="21"/><path d="M${x - 38} ${y + 92} C ${x - 38} ${y + 48}, ${x - 20} ${y + 30}, ${x} ${y + 30} S ${x + 38} ${y + 48}, ${x + 38} ${y + 92}Z"/></g>`;
  const pattern = [1, 1, 0, 1, 0, 0, 1, 1, 0];
  let people = ''; pattern.forEach((f, i) => { people += person(226 + i * 94, 140, f); });
  svg(`    <path d="M0 250 C 180 190, 330 230, 520 205 S 900 170, 1200 230 V630 H0Z" fill="${SKY}" opacity=".75" filter="url(#soft)"/>
    ${people}
    <path d="M0 330 C 220 260, 420 300, 640 268 S 1000 250, 1200 300 V630 H0Z" fill="#7fb2ff" opacity=".7" filter="url(#soft)"/>
    <path d="M0 395 C 260 330, 520 380, 760 340 S 1050 330, 1200 370 V630 H0Z" fill="${BL}" opacity=".45" filter="url(#soft)"/>
    <path d="M0 470 C 300 420, 600 470, 900 430 S 1120 420, 1200 440 V630 H0Z" fill="${DEEP}" opacity=".3" filter="url(#soft)"/>`);
} };

// s16 Continuous line: one white line draws a nurse cap that flows into a headset and then a laptop.
S.s16 = { title: 'How Nurses Can Become Virtual Assistants', style: 'Continuous line', draw({ svg }) {
  const d = `M118 300 C 160 300, 180 262, 214 236
    L 226 150 Q 290 110 354 150 L 366 236 Q 290 222 214 236
    C 200 262, 236 282, 300 280 C 400 276, 460 300, 512 268
    L 512 218 Q 512 202 528 202 Q 544 202 544 218 L 544 262 Q 544 272 528 272 Q 512 272 512 262
    L 512 218 Q 512 202 528 202 A 72 72 0 0 1 672 202 Q 688 202 688 218 L 688 262 Q 688 272 672 272 Q 656 272 656 262 L 656 218 Q 656 202 672 202
    M 672 272 C 672 300, 640 306, 612 306
    M 612 306 C 700 306, 720 270, 760 270 L 770 270 L 770 132 Q 770 120 782 120 L 958 120 Q 970 120 970 132 L 970 270 L 990 290 L 744 290 L 770 270`;
  // note: drawn as one stroked path (one subpath restart where the mic meets the line keeps the stroke continuous visually)
  svg(`<filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="8"/></filter>
    <path d="${d}" fill="none" stroke="${CY}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" opacity=".45" filter="url(#glow)"/>
    <path d="${d}" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M290 158v34M273 175h34" stroke="${TEAL}" stroke-width="9" stroke-linecap="round"/>
    <circle cx="612" cy="306" r="9" fill="${TEAL}"/>
    <g transform="translate(870 195)">${I('heart', -40, -42, 80, 8, '#fff', TEAL).replace(/stroke="#fff"/, 'stroke="#fff"')}</g>`);
} };

// s17 Blueprint flow: a deep-blue glass panel with a blueprint grid; practice -> matching -> VA nodes with technical connectors.
S.s17 = { title: 'How Healthcare VA Staffing Works?', style: 'Blueprint flow', draw({ svg }) {
  const x0 = 150, y0 = 34, w = 900, h = 296;
  const node = (cx, cy, inner, ring) => `<rect x="${cx - 64}" y="${cy - 64}" width="128" height="128" rx="${ring ? 64 : 22}" fill="${DEEP}" fill-opacity=".55" stroke="#fff" stroke-width="3"/>
    <rect x="${cx - 80}" y="${cy - 80}" width="160" height="160" rx="${ring ? 80 : 30}" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 6" opacity=".6"/>${inner}`;
  const conn = (xa, xb, cy) => `<path d="M${xa} ${cy} H${xb}" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${xa}" cy="${cy}" r="7" fill="${DEEP}" stroke="#fff" stroke-width="3"/><path d="M${xb - 14} ${cy - 10} L${xb} ${cy} L${xb - 14} ${cy + 10}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M${xa} ${cy + 96} H${xb} M${xa} ${cy + 88} v16 M${xb} ${cy + 88} v16" stroke="#fff" stroke-width="1.5" opacity=".55"/>`;
  const cy = 182;
  svg(`<pattern id="bp" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#fff" stroke-width="1" opacity=".22"/></pattern>
    <pattern id="bp2" width="96" height="96" patternUnits="userSpaceOnUse"><path d="M96 0H0V96" fill="none" stroke="#fff" stroke-width="1.5" opacity=".35"/></pattern>
    <g filter="url(#soft)"><rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="28" fill="${EL}" fill-opacity=".62" stroke="#fff" stroke-width="2"/></g>
    <rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="28" fill="url(#bp)"/><rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="28" fill="url(#bp2)"/>
    <path d="M${x0 + 24} ${y0 + 24} h40 M${x0 + 24} ${y0 + 24} v40 M${x0 + w - 24} ${y0 + h - 24} h-40 M${x0 + w - 24} ${y0 + h - 24} v-40" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    ${conn(394, 516, cy)}${conn(684, 806, cy)}
    ${node(310, cy, I('clinic', 272, cy - 38, 76, 7, '#fff', TEAL))}
    ${node(600, cy, I('people', 562, cy - 38, 76, 7, '#fff', TEAL), true)}
    ${node(890, cy, I('headset', 852, cy - 38, 76, 7, '#fff', TEAL))}
    <circle cx="600" cy="${cy - 80}" r="0"/>`);
} };

// s18 Conveyor: documents ride a conveyor belt into a claim envelope, with motion lines behind them.
S.s18 = { title: 'Charge Entry Explained', style: 'Conveyor', draw({ svg }) {
  const doc = (x, y, rot) => `<g transform="rotate(${rot} ${x + 50} ${y + 65})" filter="url(#sh)"><path d="M${x} ${y}h72l28 28v102h-100z" fill="#fff"/>
    <path d="M${x + 72} ${y}v28h28" fill="${LINE}"/><rect x="${x + 16}" y="${y + 46}" width="56" height="9" rx="4.5" fill="${BL}" opacity=".75"/>
    <rect x="${x + 16}" y="${y + 66}" width="68" height="9" rx="4.5" fill="${SKY}"/><rect x="${x + 16}" y="${y + 86}" width="44" height="9" rx="4.5" fill="${SKY}"/>
    <rect x="${x + 16}" y="${y + 106}" width="34" height="14" rx="5" fill="${TEAL}"/></g>`;
  const motion = (x, y) => `<path d="M${x - 70} ${y} h50 M${x - 90} ${y + 26} h70 M${x - 60} ${y + 52} h40" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".7"/>`;
  let rollers = ''; for (let i = 0; i < 12; i++) rollers += `<circle cx="${166 + i * 52}" cy="282" r="9" fill="${SKY}"/>`;
  svg(SH + `<g filter="url(#soft)"><rect x="130" y="262" width="650" height="40" rx="20" fill="#fff"/></g>${rollers}
    <rect x="130" y="262" width="650" height="8" rx="4" fill="${BL}" opacity=".25"/>
    <rect x="200" y="302" width="18" height="70" rx="6" fill="#fff" opacity=".8"/><rect x="690" y="302" width="18" height="70" rx="6" fill="#fff" opacity=".8"/>
    ${motion(200, 160)}${doc(200, 132, -4)}${motion(390, 160)}${doc(390, 132, 3)}${motion(580, 160)}${doc(580, 132, -2)}
    <g filter="url(#soft)"><rect x="800" y="110" width="250" height="190" rx="22" fill="url(#gB)"/></g>
    <path d="M808 122 L925 210 L1042 122" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round" opacity=".6"/>
    <path d="M800 110 L925 30 L1050 110Z" fill="#3e59ff" opacity=".9"/>
    ${doc(875, 60, 0)}
    <rect x="800" y="168" width="250" height="132" rx="22" fill="url(#gBC)" opacity=".95"/>
    <path d="M800 190 L925 260 L1050 190" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round" opacity=".7"/>
    <circle cx="1030" cy="300" r="30" fill="#fff" filter="url(#sh)"/><path d="M1017 300l9 9 17-18" fill="none" stroke="${TEAL}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`);
} };
})();
