// scenes-b.js  Scenes s19-s36. Each: SCENES[id] = { title, style, draw(ctx) }. No words on the image.
(() => { const S = window.SCENES;

// ---------- local helpers ----------
const CORAL = '#ff8a8a';
// I(): a brand icon as a nested <svg> for use inside svg() markup. Accent set inline (no global .ac CSS leak).
const I = (n, x, y, s, sw = 8, col = '#2345ff', acc = '#2dd0e8') => {
  const body = (window.HT_ICONS[n] || '').replace(/class="ac"/g, `stroke="${acc}"`);
  return `<svg x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 120 120" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
};
// seeded random
const rng = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
// iso projection: unit u px, origin (ox, oy). x goes down-right, y goes down-left, z up.
const isoP = (ox, oy, u) => (x, y, z = 0) => [ox + (x - y) * 0.866 * u, oy + (x + y) * 0.5 * u - z * u];
const pts = a => a.map(p => p.join(',')).join(' ');
// iso box: returns svg markup of a box at (x,y,z) size (w,d,h) with three face colours.
const isoBox = (pr, x, y, z, w, d, h, top, left, right, extra = '') => {
  const T = [pr(x, y, z + h), pr(x + w, y, z + h), pr(x + w, y + d, z + h), pr(x, y + d, z + h)];
  const L = [pr(x, y + d, z + h), pr(x + w, y + d, z + h), pr(x + w, y + d, z), pr(x, y + d, z)];
  const R = [pr(x + w, y, z + h), pr(x + w, y + d, z + h), pr(x + w, y + d, z), pr(x + w, y, z)];
  return `<polygon points="${pts(L)}" fill="${left}" ${extra}/><polygon points="${pts(R)}" fill="${right}" ${extra}/><polygon points="${pts(T)}" fill="${top}" ${extra}/>`;
};
// rough land mask (lon, lat ellipses) for dotted maps
const LAND = [[-100, 47, 27, 13], [-118, 58, 20, 10], [-95, 62, 18, 8], [-150, 64, 14, 7], [-78, 52, 10, 9], [-82, 38, 9, 8], [-101, 32, 14, 8], [-82, 28, 3, 5], [-103, 22, 8, 6], [-88, 15, 6, 5], [-42, 72, 12, 8],
  [-60, -12, 16, 20], [-68, 4, 10, 8], [-66, -38, 7, 14], [12, 50, 16, 9], [26, 60, 14, 8], [18, 6, 20, 22], [22, 25, 26, 9], [36, -20, 10, 12],
  [85, 52, 48, 16], [100, 32, 26, 12], [78, 20, 8, 10], [104, 14, 8, 8], [45, 28, 12, 9], [114, 0, 14, 4], [122, 12, 3, 5], [138, 37, 4, 7],
  [134, -25, 17, 10], [140, -6, 8, 3], [172, -42, 3, 5]];
const isLand = (lon, lat) => LAND.some(([x, y, rx, ry]) => { let dx = lon - x; if (dx > 180) dx -= 360; if (dx < -180) dx += 360; return (dx / rx) ** 2 + ((lat - y) / ry) ** 2 <= 1; });
// map pin (teardrop) with tip at (x, y)
const pin = (x, y, s, col, dot = '#fff') => `<g transform="translate(${x} ${y}) scale(${s / 60})" filter="url(#soft)"><path d="M0 0 C -6 -18, -26 -30, -26 -52 A 26 26 0 1 1 26 -52 C 26 -30, 6 -18, 0 0Z" fill="${col}"/><circle cy="-52" r="10" fill="${dot}"/></g>`;

// ---------- s19 Maze ----------
S.s19 = { title: 'How to Reduce Claim Denials in Your Medical Practice', style: 'Maze', draw({ svg, glass, P }) {
  const C = 11, R = 5, cs = 52, x0 = 314, y0 = 58, rnd = rng(9);
  const wallE = Array.from({ length: R }, () => Array(C).fill(true)); // wall east of (r,c)
  const wallS = Array.from({ length: R }, () => Array(C).fill(true)); // wall south of (r,c)
  const seen = Array.from({ length: R }, () => Array(C).fill(false));
  const st = [[2, 0]]; seen[2][0] = true;
  while (st.length) {
    const [r, c] = st[st.length - 1];
    const nb = [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].filter(([a, b]) => a >= 0 && b >= 0 && a < R && b < C && !seen[a][b]);
    if (!nb.length) { st.pop(); continue; }
    const [a, b] = nb[Math.floor(rnd() * nb.length)];
    if (a === r) wallE[r][Math.min(b, c)] = false; else wallS[Math.min(a, r)][c] = false;
    seen[a][b] = true; st.push([a, b]);
  }
  const open = (r, c) => { const o = []; if (c < C - 1 && !wallE[r][c]) o.push([r, c + 1]); if (c > 0 && !wallE[r][c - 1]) o.push([r, c - 1]);
    if (r < R - 1 && !wallS[r][c]) o.push([r + 1, c]); if (r > 0 && !wallS[r - 1][c]) o.push([r - 1, c]); return o; };
  // path from entrance (2,0) to exit (1,C-1)
  const prev = {}, q = [[2, 0]]; prev['2,0'] = null;
  while (q.length) { const [r, c] = q.shift(); for (const [a, b] of open(r, c)) if (!((a + ',' + b) in prev)) { prev[a + ',' + b] = [r, c]; q.push([a, b]); } }
  const path = []; let cur = [1, C - 1]; while (cur) { path.unshift(cur); cur = prev[cur.join(',')]; }
  const onPath = new Set(path.map(p => p.join(',')));
  const cx = c => x0 + c * cs + cs / 2, cy = r => y0 + r * cs + cs / 2;
  let walls = '';
  const seg = (a, b, c2, d) => { walls += `M${a} ${b}L${c2} ${d}`; };
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) {
    if (wallE[r][c] && c < C - 1) seg(x0 + (c + 1) * cs, y0 + r * cs, x0 + (c + 1) * cs, y0 + (r + 1) * cs);
    if (wallS[r][c] && r < R - 1) seg(x0 + c * cs, y0 + (r + 1) * cs, x0 + (c + 1) * cs, y0 + (r + 1) * cs);
  }
  // outer border with entrance (row 2 left) and exit (row 1 right)
  const W = C * cs, H = R * cs;
  walls += `M${x0} ${y0 + 2 * cs}V${y0}H${x0 + W}V${y0 + cs}M${x0 + W} ${y0 + 2 * cs}V${y0 + H}H${x0}V${y0 + 3 * cs}`;
  // dead ends off the path
  const dead = [];
  for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (!onPath.has(r + ',' + c) && open(r, c).length === 1) dead.push([r, c]);
  const pick = [];
  for (const d of dead.sort((a, b) => (a[1] - b[1]))) if (pick.every(p => Math.abs(p[1] - d[1]) + Math.abs(p[0] - d[0]) > 3)) pick.push(d);
  const marks = pick.slice(0, 4).map(([r, c]) => `<g transform="translate(${cx(c)} ${cy(r)})"><circle r="13" fill="${CORAL}" opacity=".95"/><path d="M-5 -5L5 5M5 -5L-5 5" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/></g>`).join('');
  const pd = 'M' + (x0 - 70) + ' ' + cy(2) + ' ' + path.map(([r, c]) => `L${cx(c)} ${cy(r)}`).join(' ') + ` L${x0 + W + 60} ${cy(1)}`;
  glass(x0 - 34, y0 - 34, W + 68, H + 68, 40);
  svg(`<path d="${walls}" stroke="${P.blue}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".9"/>
    <path d="${pd}" stroke="${P.teal}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-dasharray="2 14"/>
    ${marks}
    <g filter="url(#soft)" transform="translate(${x0 - 120} ${cy(2) - 46}) rotate(-8 34 46)"><rect width="68" height="88" rx="10" fill="#fff"/><path d="M14 22h40M14 36h40M14 50h26" stroke="${P.sky}" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="68" r="8" fill="${P.blue}"/></g>
    <g filter="url(#soft)"><circle cx="${x0 + W + 100}" cy="${cy(1)}" r="50" fill="${P.teal}"/><circle cx="${x0 + W + 100}" cy="${cy(1)}" r="50" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>
    <path d="M${x0 + W + 78} ${cy(1)}l15 15 28-30" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`);
} };

// ---------- s20 Funnel ----------
S.s20 = { title: 'Improving Patient Intake', style: 'Funnel', draw({ svg, P }) {
  const chip = (x, y, a, inner, w = 74, h = 74) => `<g transform="translate(${x} ${y}) rotate(${a})" filter="url(#soft)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="18" fill="#fff"/>${inner}</g>`;
  const chips = [
    chip(178, 92, -14, I('person', -26, -26, 52, 9)), chip(300, 64, 10, I('document', -26, -26, 52, 9)),
    chip(232, 196, 8, I('rx', -26, -26, 52, 9)), chip(150, 286, -8, I('calendar', -26, -26, 52, 9)),
    chip(330, 290, 14, I('phone', -24, -24, 48, 9)), chip(372, 168, -18, I('clipboard', -24, -24, 48, 9), 66, 66),
    chip(126, 186, 20, `<rect x="-20" y="-13" width="40" height="26" rx="5" fill="none" stroke="${P.blue}" stroke-width="5"/><circle cx="-8" cy="-2" r="5" fill="${P.teal}"/><path d="M2 -4h10M2 5h10" stroke="${P.blue}" stroke-width="4" stroke-linecap="round"/>`, 58, 46),
  ].join('');
  const sc = (x, y, r, o) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${o}"/>`;
  svg(`<defs><linearGradient id="fnl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity=".35"/></linearGradient></defs>
    ${sc(260, 130, 7, .8)}${sc(96, 240, 5, .7)}${sc(380, 250, 6, .7)}${sc(270, 330, 5, .6)}${sc(210, 40, 5, .6)}
    ${chips}
    <path d="M430 40 C 520 50, 600 140, 660 162 L 718 168 L 718 212 L 660 218 C 600 240, 520 330, 430 340 Z" fill="url(#fnl)" stroke="#fff" stroke-width="2" filter="url(#soft)"/>
    <ellipse cx="430" cy="190" rx="34" ry="150" fill="#fff" fill-opacity=".35" stroke="#fff" stroke-width="3"/>
    <path d="M470 80 C 540 100, 600 150, 650 168" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".8"/>
    <path d="M738 190 H 790" stroke="${P.teal}" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 13"/>
    <g filter="url(#soft)"><rect x="806" y="52" width="210" height="276" rx="24" fill="#fff"/>
      <circle cx="850" cy="102" r="24" fill="${P.sky}"/><circle cx="850" cy="96" r="9" fill="#fff"/><path d="M834 116 a16 13 0 0 1 32 0" fill="#fff"/>
      <rect x="886" y="88" width="100" height="10" rx="5" fill="${P.line}"/><rect x="886" y="106" width="66" height="10" rx="5" fill="${P.line}"/>
      ${[160, 204, 248].map((y, i) => `<rect x="832" y="${y - 14}" width="28" height="28" rx="8" fill="${P.teal}"/><path d="M839 ${y}l6 6 10-11" stroke="#fff" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="874" y="${y - 6}" width="${[112, 92, 104][i]}" height="12" rx="6" fill="${P.line}"/>`).join('')}
      <path d="M836 300 c 14 -16, 24 4, 38 -8 s 22 6, 36 -4" stroke="${P.blue}" stroke-width="4" fill="none" stroke-linecap="round"/>
    </g>`);
} };

// ---------- s21 Balance scale ----------
S.s21 = { title: 'In-House vs Virtual: Cost Comparison', style: 'Balance scale', draw({ svg, P }) {
  const px = 600, py = 96, a = -7 * Math.PI / 180, L = 290;
  const lx = px - L * Math.cos(a), ly = py - L * Math.sin(a), rx = px + L * Math.cos(a), ry = py + L * Math.sin(a);
  const hang = 165, lpy = ly + hang, rpy = ry + hang;
  const pan = (x, y) => `<path d="M${x - 120} ${y} H ${x + 120} C ${x + 110} ${y + 34}, ${x - 110} ${y + 34}, ${x - 120} ${y}Z" fill="url(#gGlass)" stroke="#fff" stroke-width="2" filter="url(#soft)"/>
    <path d="M${x} ${y - hang} L ${x - 112} ${y} M${x} ${y - hang} L ${x + 112} ${y}" stroke="#fff" stroke-width="3" opacity=".9"/>`;
  // clinic on the left (heavy) pan
  const cx0 = lx - 70, cb = lpy;
  const clinic = `<g filter="url(#soft)"><path d="M${cx0} ${cb} V ${cb - 96} L ${cx0 + 62} ${cb - 136} L ${cx0 + 124} ${cb - 96} V ${cb} Z" fill="#fff"/>
    <rect x="${cx0 + 50}" y="${cb - 108}" width="24" height="24" rx="4" fill="${P.teal}"/><path d="M${cx0 + 62} ${cb - 103}v14M${cx0 + 55} ${cb - 96}h14" stroke="#fff" stroke-width="4.5" stroke-linecap="round"/>
    ${[18, 82].map(dx => `<rect x="${cx0 + dx}" y="${cb - 70}" width="24" height="22" rx="4" fill="${P.sky}"/>`).join('')}
    <rect x="${cx0 + 46}" y="${cb - 44}" width="32" height="44" rx="5" fill="${P.blue}"/></g>`;
  const coins = [0, 1, 2, 3].map(i => `<ellipse cx="${lx + 86}" cy="${cb - 8 - i * 11}" rx="22" ry="8" fill="${i === 3 ? P.aqua : P.teal}" stroke="#fff" stroke-width="2"/>`).join('');
  // laptop + headset on the right (light) pan
  const lb = rpy;
  const laptop = `<g filter="url(#soft)"><rect x="${rx - 74}" y="${lb - 78}" width="108" height="70" rx="8" fill="#fff"/><rect x="${rx - 66}" y="${lb - 70}" width="92" height="54" rx="4" fill="${P.bright}"/>
    <circle cx="${rx - 20}" cy="${lb - 49}" r="9" fill="#fff"/><path d="M${rx - 34} ${lb - 22} a14 11 0 0 1 28 0" fill="#fff"/>
    <path d="M${rx - 90} ${lb - 6} H ${rx + 50} l -8 6 H ${rx - 82} Z" fill="#fff"/></g>
    ${I('headset', rx + 34, lb - 74, 72, 9, '#fff', P.teal)}`;
  svg(`<rect x="${px - 9}" y="${py}" width="18" height="236" rx="9" fill="url(#gB)"/>
    <path d="M${px - 110} 346 C ${px - 100} 320, ${px - 40} 326, ${px} 326 C ${px + 40} 326, ${px + 100} 320, ${px + 110} 346 Z" fill="#fff" filter="url(#soft)"/>
    ${pan(lx, lpy)}${pan(rx, rpy)}
    <line x1="${lx}" y1="${ly}" x2="${rx}" y2="${ry}" stroke="url(#gB)" stroke-width="16" stroke-linecap="round"/>
    <circle cx="${lx}" cy="${ly}" r="9" fill="#fff"/><circle cx="${rx}" cy="${ry}" r="9" fill="#fff"/>
    <circle cx="${px}" cy="${py}" r="22" fill="#fff" filter="url(#soft)"/><circle cx="${px}" cy="${py}" r="10" fill="${P.teal}"/>
    ${clinic}${coins}${laptop}`);
} };

// ---------- s22 Photo split ----------
S.s22 = { title: 'Virtual Medical Assistant vs In-Person Medical Assistant', style: 'Photo split', draw({ svg, photo, glass, add, P }) {
  const p = photo('can-a-virtual-assistant-be-hipaa-compliant-safeguards-training-and-baas', [40, 25], 250, 34, 320, 300, 160, 120, 2.3, 40,
    { boxShadow: '0 22px 50px rgba(19,68,253,.22)', border: '3px solid rgba(255,255,255,.9)' });
  p.querySelector('img').style.filter = 'saturate(.45) brightness(1.04)';
  add('abs', { inset: 0, background: 'linear-gradient(180deg, rgba(169,210,247,.18), rgba(35,69,255,.22))' }, '', p);
  glass(630, 34, 320, 300, 40);
  svg(`<defs><linearGradient id="scr22" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2e64fd"/><stop offset="1" stop-color="#02d0fd"/></linearGradient></defs>
    <rect x="654" y="58" width="272" height="196" rx="20" fill="url(#scr22)"/>
    <circle cx="790" cy="138" r="34" fill="#fff"/><path d="M736 254 C 736 200, 760 184, 790 184 C 820 184, 844 200, 844 254 Z" fill="#fff"/>
    <path d="M748 140 a42 42 0 0 1 84 0" stroke="${P.ink}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <rect x="740" y="132" width="14" height="26" rx="6" fill="${P.ink}"/><rect x="826" y="132" width="14" height="26" rx="6" fill="${P.ink}"/>
    <path d="M833 158 c 0 14, -14 20, -30 20" stroke="${P.teal}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="904" cy="80" r="8" fill="${P.teal}" stroke="#fff" stroke-width="3"/>
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${672 + i * 13}" y="${290 - [8, 18, 28, 14, 24, 10, 6][i] / 2}" width="7" height="${[8, 18, 28, 14, 24, 10, 6][i]}" rx="3.5" fill="${P.blue}"/>`).join('')}
    <rect x="780" y="278" width="122" height="12" rx="6" fill="${P.sky}"/><rect x="780" y="298" width="80" height="10" rx="5" fill="${P.line}"/>
    <path d="M600 40 V 328" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>
    <circle cx="600" cy="184" r="26" fill="#fff" filter="url(#soft)"/>
    <path d="M588 177 h22 l-6 -6 M612 191 h-22 l6 6" stroke="${P.blue}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`);
} };

// ---------- s23 Stairs ----------
S.s23 = { title: 'The Highest-Paying Healthcare Virtual Assistant Roles', style: 'Stairs', draw({ svg, P }) {
  const w = 168, dx = 46, dy = -30, base = 376, x0 = 238, tops = [290, 230, 170, 110], icons = ['calendar', 'stethoscope', 'document', 'shield'];
  let s = '';
  tops.forEach((t, i) => {
    const x = x0 + i * w, last = i === tops.length - 1;
    s += `<polygon points="${x},${t} ${x + dx},${t + dy} ${x + w + dx},${t + dy} ${x + w},${t}" fill="${last ? P.teal : '#eaf1ff'}"/>`;
    if (last) s += `<polygon points="${x + w},${t} ${x + w + dx},${t + dy} ${x + w + dx},${base + dy} ${x + w},${base}" fill="url(#gB)"/>`;
    s += `<rect x="${x}" y="${t}" width="${w}" height="${base - t}" fill="${last ? 'url(#gB)' : '#fff'}"/><rect x="${x}" y="${t}" width="${w}" height="${base - t}" fill="none" stroke="${P.line}" stroke-width="1.5"/>`;
    s += I(icons[i], x + w / 2 - 32, t + 12, 64, 9, last ? '#fff' : P.blue, last ? P.aqua : P.teal);
  });
  const tx = x0 + 3 * w + w / 2 + dx / 2, ty = tops[3] + dy / 2;
  svg(`<defs><radialGradient id="glow23"><stop offset="0" stop-color="#55e0fa" stop-opacity=".9"/><stop offset="1" stop-color="#55e0fa" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="${tx}" cy="${ty - 30}" rx="150" ry="90" fill="url(#glow23)"/>
    <g filter="url(#soft)">${s}</g>
    <g filter="url(#soft)"><circle cx="${tx}" cy="${ty - 52}" r="34" fill="#fff"/>${I('coin', tx - 28, ty - 80, 56, 9, P.blue, P.teal)}</g>
    ${[[tx - 72, ty - 60, 9], [tx + 70, ty - 66, 7], [tx + 92, ty - 24, 5]].map(([x, y, r]) => `<path d="M${x} ${y - r * 2}Q${x} ${y} ${x + r * 2} ${y}Q${x} ${y} ${x} ${y + r * 2}Q${x} ${y} ${x - r * 2} ${y}Q${x} ${y} ${x} ${y - r * 2}Z" fill="#fff"/>`).join('')}`);
} };

// ---------- s24 Podium ----------
S.s24 = { title: 'Best Medical Billing Companies', style: 'Podium', draw({ svg, P }) {
  const base = 364, d = 22, blocks = [[352, 246, '2'], [518, 194, '1'], [684, 274, '3']], w = 166;
  let s = '';
  for (const [x, t, n] of blocks) {
    s += `<polygon points="${x},${t} ${x + 14},${t - d} ${x + w + 14},${t - d} ${x + w},${t}" fill="${n === '1' ? P.aqua : '#e6efff'}"/>
      <rect x="${x}" y="${t}" width="${w}" height="${base - t}" fill="#fff"/>
      <text x="${x + w / 2}" y="${t + 74}" text-anchor="middle" font-family="Inter, Arial" font-weight="800" font-size="56" fill="${n === '1' ? P.blue : P.sky}">${n}</text>`;
  }
  const cup = (cx, bot, k, main) => `<g transform="translate(${cx} ${bot}) scale(${k})" filter="url(#soft)">
    <path d="M-34 -132 h68 v28 c0 30 -16 46 -34 46 s-34 -16 -34 -46 Z" fill="${main ? 'url(#gBC)' : 'url(#gGlass)'}" stroke="#fff" stroke-width="3"/>
    <path d="M-34 -122 c-26 0 -26 34 4 38 M34 -122 c26 0 26 34 -4 38" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>
    <rect x="-7" y="-58" width="14" height="30" fill="#fff"/><rect x="-28" y="-30" width="56" height="18" rx="6" fill="#fff"/>
    ${main ? `<path d="M0 -122 l6 12 13 2 -9 9 2 13 -12 -6 -12 6 2 -13 -9 -9 13 -2Z" fill="#fff"/>` : `<circle cy="-108" r="9" fill="${P.blue}" opacity=".5"/>`}</g>`;
  const rays = Array.from({ length: 9 }, (_, i) => { const a = (-160 + i * 17.5) * Math.PI / 180;
    return `<path d="M601 120 L ${601 + 520 * Math.cos(a - .04)} ${120 + 520 * Math.sin(a - .04)} L ${601 + 520 * Math.cos(a + .04)} ${120 + 520 * Math.sin(a + .04)} Z" fill="url(#gGhost)" opacity=".55"/>`; }).join('');
  svg(`${rays}<g filter="url(#soft)">${s}</g>${cup(601, 174, 1.12, true)}${cup(435, 224, .82)}${cup(767, 252, .74)}
    ${[[470, 70, 7], [740, 60, 9], [860, 150, 6], [330, 150, 6]].map(([x, y, r]) => `<path d="M${x} ${y - r * 2}Q${x} ${y} ${x + r * 2} ${y}Q${x} ${y} ${x} ${y + r * 2}Q${x} ${y} ${x - r * 2} ${y}Q${x} ${y} ${x} ${y - r * 2}Z" fill="#fff"/>`).join('')}
    <g filter="url(#soft)"><rect x="160" y="96" width="112" height="140" rx="16" fill="#fff" transform="rotate(-8 216 166)"/>
    <g transform="rotate(-8 216 166)"><path d="M182 128h68M182 150h68M182 172h40" stroke="${P.sky}" stroke-width="8" stroke-linecap="round"/><circle cx="240" cy="206" r="16" fill="${P.teal}"/><path d="M233 206l5 5 10-10" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></g></g>
    <g filter="url(#soft)"><circle cx="985" cy="150" r="58" fill="#fff"/>${I('coin', 949, 114, 72, 9)}</g>`);
} };

// ---------- s25 Globe + shield ----------
S.s25 = { title: 'Is It Legal to Hire an Overseas Healthcare VA?', style: 'Globe + shield', draw({ svg, P }) {
  const gx = 770, gy = 180, R = 166, lon0 = -170 * Math.PI / 180, lat0 = 50 * Math.PI / 180;
  const proj = (lon, lat) => { const l = lon * Math.PI / 180 - lon0, p = lat * Math.PI / 180;
    const x = Math.cos(p) * Math.sin(l), y = Math.cos(lat0) * Math.sin(p) - Math.sin(lat0) * Math.cos(p) * Math.cos(l);
    const z = Math.sin(lat0) * Math.sin(p) + Math.cos(lat0) * Math.cos(p) * Math.cos(l); return [gx + R * x, gy - R * y, z]; };
  let dots = '';
  for (let lat = -84; lat <= 84; lat += 5) { const n = Math.max(1, Math.round(72 * Math.cos(lat * Math.PI / 180)));
    for (let i = 0; i < n; i++) { const lon = -180 + i * 360 / n, [x, y, z] = proj(lon, lat); if (z < 0.05) continue;
      const land = isLand(lon, lat); dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(land ? 3.4 : 2) * (0.55 + 0.45 * z)}" fill="#fff" opacity="${land ? 0.95 : 0.28}"/>`; } }
  const [ax, ay] = proj(-97, 38), [bx, by] = proj(122, 13);
  svg(`<defs><radialGradient id="glb" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#3e59ff" stop-opacity=".55"/><stop offset="1" stop-color="#162da1" stop-opacity=".85"/></radialGradient></defs>
    <circle cx="${gx}" cy="${gy}" r="${R + 26}" fill="none" stroke="#fff" stroke-width="2" opacity=".35"/>
    <circle cx="${gx}" cy="${gy}" r="${R}" fill="url(#glb)" filter="url(#soft)"/>${dots}
    <circle cx="${gx}" cy="${gy}" r="${R}" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>
    <path d="M${ax} ${ay - 10} Q ${(ax + bx) / 2} ${Math.min(ay, by) - 190} ${bx} ${by - 10}" stroke="#fff" stroke-width="4" stroke-dasharray="3 11" stroke-linecap="round" fill="none"/>
    ${pin(ax, ay, 46, P.teal)}${pin(bx, by, 46, '#fff', P.blue)}
    <g filter="url(#soft)" transform="translate(318 66) scale(.98)"><path d="M100 0 L190 30 V 112 C 190 176, 150 214, 100 238 C 50 214, 10 176, 10 112 V 30 Z" fill="#fff"/>
      <path d="M100 50 V 176 M 62 176 H 138 M 46 80 H 154" stroke="${P.blue}" stroke-width="9" stroke-linecap="round"/>
      <circle cx="100" cy="64" r="9" fill="${P.blue}"/>
      <path d="M46 80 L 28 128 M46 80 L 64 128 M154 80 L 136 128 M154 80 L 172 128" stroke="${P.blue}" stroke-width="5" stroke-linecap="round"/>
      <path d="M24 128 a22 14 0 0 0 44 0 Z M132 128 a22 14 0 0 0 44 0 Z" fill="${P.teal}"/></g>`);
} };

// ---------- s26 Flight arc ----------
S.s26 = { title: 'US-Based vs. Offshore Virtual Medical Biller: Cost, Quality, and Compliance', style: 'Flight arc', draw({ svg, glass, P }) {
  const X = lon => 120 + (lon + 170) / 345 * 960, Y = lat => 92 + (72 - lat) / 120 * 236;
  let dots = '';
  for (let lat = 70; lat >= -48; lat -= 5.2) for (let lon = -168; lon <= 172; lon += 4.1) {
    if (!isLand(lon, lat)) continue; const x = X(lon);
    const edge = Math.min(1, (x - 100) / 140, (1100 - x) / 140); if (edge <= 0) continue;
    dots += `<circle cx="${x.toFixed(1)}" cy="${Y(lat).toFixed(1)}" r="3.6" fill="#fff" opacity="${(0.95 * edge).toFixed(2)}"/>`; }
  const ax = X(-97), ay = Y(39), bx = X(122), by = Y(13);
  svg(`<defs><linearGradient id="band26" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1344fd" stop-opacity="0"/><stop offset=".2" stop-color="#1344fd" stop-opacity=".16"/><stop offset=".8" stop-color="#1344fd" stop-opacity=".16"/><stop offset="1" stop-color="#1344fd" stop-opacity="0"/></linearGradient></defs>
    <rect x="80" y="76" width="1040" height="270" rx="60" fill="url(#band26)"/>${dots}
    <path d="M${ax + 14} ${ay - 70} C ${ax + 140} ${-10}, ${bx - 140} ${-10}, ${bx - 10} ${by - 72}" stroke="#fff" stroke-width="4.5" stroke-dasharray="3 12" stroke-linecap="round" fill="none"/>
    <g transform="translate(${(ax + bx) / 2} 38) rotate(0)" filter="url(#soft)"><path d="M-26 0 L 26 0 M 6 0 L -8 -20 M 6 0 L -8 20 M -22 0 L -28 -9 M -22 0 L -28 9" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>
    ${pin(ax, ay, 62, P.teal)}${pin(bx, by, 62, '#fff', P.blue)}`);
  const card = (x, y, lens, hi) => { glass(x, y, 196, 116, 22);
    return [['coin', 0], ['check', 1], ['shield', 2]].map(([n, i]) => I(n, x + 16, y + 12 + i * 32, 28, 11) +
      `<rect x="${x + 56}" y="${y + 21 + i * 32}" width="120" height="10" rx="5" fill="${P.line}"/><rect x="${x + 56}" y="${y + 21 + i * 32}" width="${lens[i]}" height="10" rx="5" fill="${hi ? P.teal : P.blue}"/>`).join(''); };
  const c1 = card(ax - 98, ay + 26, [110, 96, 112], false), c2 = card(bx - 98, by + 26, [52, 92, 104], true);
  svg(c1 + c2);
} };

// ---------- s27 Night clock ----------
S.s27 = { title: 'How a Physician Answering Service Works?', style: 'Night clock', draw({ svg, glass, ico, P }) {
  const cx = 520, cy = 186, r = 156;
  const nums = [3, 6, 9, 12].map(n => { const a = (n * 30 - 90) * Math.PI / 180;
    return `<text x="${cx + (r - 36) * Math.cos(a) + (n === 3 ? 4 : n === 9 ? -4 : 0)}" y="${cy + (r - 36) * Math.sin(a) + 10}" text-anchor="middle" font-family="Inter, Arial" font-weight="800" font-size="30" fill="${n === 9 ? '#fff' : P.blue}">${n}</text>`; }).join('');
  const hand = (deg, len, w, col) => { const a = (deg - 90) * Math.PI / 180; return `<line x1="${cx}" y1="${cy}" x2="${cx + len * Math.cos(a)}" y2="${cy + len * Math.sin(a)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`; };
  const star = (x, y, k) => `<path d="M${x} ${y - k * 2}Q${x} ${y} ${x + k * 2} ${y}Q${x} ${y} ${x} ${y + k * 2}Q${x} ${y} ${x - k * 2} ${y}Q${x} ${y} ${x} ${y - k * 2}Z" fill="#fff"/>`;
  svg(`<defs><linearGradient id="nt27" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1344fd"/><stop offset="1" stop-color="#162da1"/></linearGradient></defs>
    <circle cx="${cx}" cy="${cy}" r="${r + 16}" fill="#fff" fill-opacity=".35" stroke="#fff" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" filter="url(#soft)"/>
    <path d="M${cx} ${cy - r + 8} A ${r - 8} ${r - 8} 0 0 0 ${cx} ${cy + r - 8} Z" fill="url(#nt27)"/>
    <path d="M${cx - 66} ${cy - 92} a34 34 0 1 0 36 46 a27 27 0 1 1 -36 -46Z" fill="#fff"/>
    ${star(cx - 96, cy - 30, 4)}${star(cx - 70, cy + 70, 6)}${star(cx - 30, cy + 110, 4)}${star(cx - 106, cy + 52, 3)}
    ${Array.from({ length: 60 }, (_, i) => { const a = i * 6 * Math.PI / 180, big = i % 5 === 0; if (big) return ''; const night = i > 15 && i < 45;
      return `<circle cx="${cx + (r - 14) * Math.cos(a)}" cy="${cy + (r - 14) * Math.sin(a)}" r="2.4" fill="${night ? '#fff' : P.sky}" opacity="${night ? .55 : 1}"/>`; }).join('')}
    ${Array.from({ length: 12 }, (_, i) => { if (i % 3 === 0) return ''; const a = i * 30 * Math.PI / 180, night = i > 3 && i < 9;
      return `<line x1="${cx + (r - 22) * Math.cos(a)}" y1="${cy + (r - 22) * Math.sin(a)}" x2="${cx + (r - 36) * Math.cos(a)}" y2="${cy + (r - 36) * Math.sin(a)}" stroke="${night ? '#fff' : P.sky}" stroke-width="5" stroke-linecap="round" opacity="${night ? .7 : 1}"/>`; }).join('')}
    ${nums}
    ${hand(305, 82, 12, P.ink)}${hand(60, 118, 7, P.teal)}
    <circle cx="${cx}" cy="${cy}" r="13" fill="${P.teal}" stroke="#fff" stroke-width="4"/>
    ${star(880, 60, 6)}${star(960, 120, 4)}${star(300, 60, 5)}`);
  glass(780, 116, 150, 150, 42, {}, ico('phone', 84, 9));
  svg(`<g stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none"><path d="M952 150 a 46 46 0 0 1 0 82"/><path d="M972 130 a 72 72 0 0 1 0 122" opacity=".6"/>
    <path d="M758 150 a 46 46 0 0 0 0 82"/></g>`);
} };

// ---------- s28 Giant calendar ----------
S.s28 = { title: 'How to Outsource Medical Scheduling', style: 'Giant calendar', draw({ add, svg, P, c }) {
  const wrap = add('abs', { left: 300, top: 18, width: 560, height: 330, transform: 'perspective(1300px) rotateX(24deg) rotateY(-14deg) rotateZ(4deg)', transformOrigin: '50% 60%' });
  const page = add('solid', { left: 0, top: 0, width: 560, height: 330, borderRadius: 28, overflow: 'hidden' }, '', wrap);
  add('abs', { left: 0, top: 0, width: 560, height: 56, background: 'linear-gradient(90deg,#2e64fd,#1344fd)' }, '', page);
  for (const x of [120, 440]) add('abs', { left: x - 9, top: -20, width: 18, height: 44, borderRadius: 9, background: '#fff', boxShadow: '0 4px 10px rgba(19,68,253,.3)' }, '', wrap);
  const booked = { 1: P.blue, 2: P.teal, 4: P.mid, 5: P.blue, 7: P.sky, 8: P.teal, 9: P.blue, 11: P.mid, 12: P.teal, 13: P.blue, 15: P.blue, 16: P.sky, 17: P.teal, 18: P.blue, 20: P.mid, 22: P.teal, 23: P.blue, 25: P.mid, 26: P.teal, 27: P.blue };
  const cw = 72, ch = 62, gx = 28, gy = 72; let target;
  for (let i = 0; i < 28; i++) { const x = gx + (i % 7) * cw, y = gy + Math.floor(i / 7) * ch, d = i + 1;
    const cell = add('abs', { left: x, top: y, width: cw - 8, height: ch - 8, borderRadius: 12, background: '#f3f6ff' }, `<div style="position:absolute;left:8px;top:5px;font:600 12px Inter,Arial;color:${P.mute}">${d}</div>`, page);
    if (booked[d]) add('abs', { left: 8, top: 26, width: cw - 24, height: 16, borderRadius: 8, background: booked[d] }, '', cell);
    if (d === 10) { cell.style.background = 'rgba(45,208,232,.12)'; cell.style.outline = '2.5px dashed ' + P.teal; cell.style.outlineOffset = '-3px'; target = cell; } }
  const r = target.getBoundingClientRect(), cr = c.getBoundingClientRect();
  const tx = r.left - cr.left + r.width / 2, ty = r.top - cr.top + r.height / 2;
  const fx = tx + 150, fy = 74;
  svg(`<path d="M${fx - 20} ${fy + 30} C ${fx - 40} ${fy + 90}, ${tx + 40} ${ty - 70}, ${tx + 8} ${ty - 22}" stroke="#fff" stroke-width="4" stroke-dasharray="3 10" stroke-linecap="round" fill="none"/>
    <g filter="url(#soft)" transform="rotate(-8 ${fx} ${fy})"><rect x="${fx - 70}" y="${fy - 24}" width="140" height="48" rx="24" fill="url(#gGlass)" stroke="#fff" stroke-width="2"/>
    <rect x="${fx - 54}" y="${fy - 8}" width="108" height="16" rx="8" fill="${P.teal}"/></g>
    <g filter="url(#soft)" transform="translate(${fx + 34} ${fy + 8})"><path d="M0 0 L0 44 L12 33 L21 52 L30 48 L21 30 L37 29 Z" fill="#fff" stroke="${P.blue}" stroke-width="4" stroke-linejoin="round"/></g>`);
} };

// ---------- s29 Keycaps ----------
S.s29 = { title: 'Virtual Medical Records Specialist Skills', style: 'Keycaps', draw({ svg, P }) {
  const folder = (x, y, s) => `<svg x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 120 120" fill="none" stroke="${P.blue}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 34a8 8 0 0 1 8-8h22l10 12h40a8 8 0 0 1 8 8v46a8 8 0 0 1-8 8H24a8 8 0 0 1-8-8z"/><path d="M16 54h88" stroke="${P.teal}"/></svg>`;
  const key = (x, y, s, inner, pressed) => { const dep = pressed ? 10 : 24;
    return `<g filter="url(#soft)"><rect x="${x}" y="${y + dep - 4}" width="${s}" height="${s}" rx="${s * .2}" fill="${pressed ? '#1fb6d8' : '#b9caf8'}"/>
      <rect x="${x}" y="${y + (pressed ? 14 : 0)}" width="${s}" height="${s}" rx="${s * .2}" fill="${pressed ? P.teal : '#fff'}"/>
      <rect x="${x + s * .09}" y="${y + (pressed ? 14 : 0) + s * .07}" width="${s * .82}" height="${s * .78}" rx="${s * .16}" fill="${pressed ? '#5fe0f0' : '#f2f6ff'}"/>
      ${inner(x + s * .2, y + (pressed ? 14 : 0) + s * .16, s * .6)}</g>`; };
  const ghostKeys = []; for (let r = 0; r < 4; r++) for (let i = 0; i < 12; i++) ghostKeys.push(`<rect x="${92 + i * 86 + (r % 2) * 40}" y="${-30 + r * 96}" width="70" height="70" rx="16" fill="#fff" opacity="${.08 + .06 * ((i + r) % 3)}"/>`);
  svg(`${ghostKeys.join('')}
    ${key(196, 120, 176, (x, y, s) => folder(x, y, s))}
    ${key(404, 64, 176, (x, y, s) => I('lock', x, y, s, 8))}
    ${key(612, 124, 176, (x, y, s) => I('magnifier', x, y, s, 8, '#fff', '#fff'), true)}
    ${key(820, 70, 176, (x, y, s) => I('document', x, y, s, 8))}`);
} };

// ---------- s30 Puzzle ----------
S.s30 = { title: 'How to Hire a Virtual Care Coordinator', style: 'Puzzle', draw({ svg, P }) {
  const Sz = 148;
  // edge in local coords: from (0,0) to (1,0); bump towards -y when sign = 1
  const bump = [[0.36, 0], ['C', 0.40, -0.02, 0.30, -0.22, 0.5, -0.22], ['C', 0.70, -0.22, 0.60, -0.02, 0.64, 0], [1, 0]];
  const edge = (ax, ay, bx, by, ox, oy, sign) => { if (!sign) return `L${bx} ${by}`;
    const T = (t, n) => [ax + (bx - ax) * t + ox * (-n) * Sz * sign, ay + (by - ay) * t + oy * (-n) * Sz * sign];
    return bump.map(p => p[0] === 'C' ? 'C' + [T(p[1], p[2]), T(p[3], p[4]), T(p[5], p[6])].map(q => q.join(' ')).join(', ') : 'L' + T(p[0], p[1]).join(' ')).join(' '); };
  const piece = (x, y, t, r, b, l) => `M${x} ${y} ${edge(x, y, x + Sz, y, 0, -1, t)} ${edge(x + Sz, y, x + Sz, y + Sz, 1, 0, r)} ${edge(x + Sz, y + Sz, x, y + Sz, 0, 1, b)} ${edge(x, y + Sz, x, y, -1, 0, l)} Z`;
  const ox = 444, oy = 44;
  const A = piece(ox, oy, 0, 1, -1, 0), B = piece(ox + Sz, oy, 0, 0, 1, -1), Cp = piece(ox, oy + Sz, 1, -1, 0, 0), D = piece(ox + Sz, oy + Sz, -1, 0, 0, 1);
  const icon = (n, x, y) => I(n, x - 40, y - 40, 80, 9);
  svg(`<path d="${B}" fill="#fff" fill-opacity=".18" stroke="#fff" stroke-width="3" stroke-dasharray="4 10" stroke-linecap="round"/>
    <g filter="url(#soft)"><path d="${A}" fill="#fff"/><path d="${Cp}" fill="url(#gGlass)" stroke="#fff" stroke-width="2"/><path d="${D}" fill="#fff"/></g>
    <path d="${Cp}" fill="none" stroke="#fff" stroke-width="2"/>
    ${icon('heart', ox + Sz / 2, oy + Sz / 2)}${icon('person', ox + Sz / 2, oy + Sz * 1.5)}${icon('phone', ox + Sz * 1.5, oy + Sz * 1.5)}
    <g transform="translate(138 -34) rotate(12 ${ox + Sz * 1.5} ${oy + Sz / 2})" filter="url(#soft)">
      <path d="${B}" fill="url(#gB)"/>${I('calendar', ox + Sz * 1.5 - 40, oy + Sz / 2 - 40, 80, 9, '#fff', P.aqua)}</g>
    <path d="M 860 130 C 840 170, 800 190, 770 190" stroke="#fff" stroke-width="4" stroke-dasharray="3 10" stroke-linecap="round" fill="none"/>
    <path d="M776 180 L 766 190 L 778 200" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`);
} };

// ---------- s31 Folder fan ----------
S.s31 = { title: 'Virtual Medical Records Specialist Guide', style: 'Folder fan', draw({ svg, P }) {
  const px = 560, py = 560, w = 236, h = 168, dist = 330;
  const tabs = [P.deep, P.mid, P.teal, P.cyan, P.blue];
  const folder = (ang, tab, i, lift = 0, doc = false) => {
    const x = px - w / 2, y = py - dist - h / 2 - lift, tx = x + 18 + (i % 3) * 52;
    return `<g transform="rotate(${ang} ${px} ${py})" filter="url(#soft)">
      <path d="M${x} ${y + 10} a10 10 0 0 1 10 -10 H ${tx} l 8 -18 h 58 l 8 18 H ${x + w - 10} a10 10 0 0 1 10 10 V ${y + h} H ${x} Z" fill="${tab}"/>
      <rect x="${x + 14}" y="${y + (doc ? -46 : 8)}" width="${w - 28}" height="${h}" rx="8" fill="#fff"/>
      ${doc ? `<path d="M${x + 36} ${y - 18}h110M${x + 36} ${y + 2}h150M${x + 36} ${y + 22}h80" stroke="${P.sky}" stroke-width="9" stroke-linecap="round"/>` : ''}
      <path d="M${x} ${y + 34} a10 10 0 0 1 10 -10 H ${x + w - 10} a10 10 0 0 1 10 10 V ${y + h - 10} a10 10 0 0 1 -10 10 H ${x + 10} a10 10 0 0 1 -10 -10 Z" fill="${doc ? 'url(#gB)' : '#eaf1ff'}" ${doc ? '' : 'fill-opacity=".92"'}/>
      ${doc ? '' : `<rect x="${x + 20}" y="${y + 130}" width="60" height="10" rx="5" fill="${tab}" opacity=".5"/>`}</g>`; };
  const lx = 770, ly = 150;
  svg(`${folder(-34, tabs[0], 0)}${folder(34, tabs[4], 2)}${folder(-17, tabs[1], 1)}${folder(17, tabs[3], 1)}${folder(0, tabs[2], 0, 66, true)}
    <g filter="url(#soft)"><circle cx="${lx}" cy="${ly}" r="72" fill="#fff" fill-opacity=".45" stroke="#fff" stroke-width="10"/>
    <path d="M${lx + 52} ${ly + 52} L ${lx + 108} ${ly + 108}" stroke="#fff" stroke-width="22" stroke-linecap="round"/>
    <path d="M${lx + 56} ${ly + 56} L ${lx + 104} ${ly + 104}" stroke="${P.blue}" stroke-width="12" stroke-linecap="round"/>
    <path d="M${lx - 38} ${ly - 30} a 48 48 0 0 1 36 -20" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none"/></g>`);
} };

// ---------- s32 Paper vs screen ----------
S.s32 = { title: 'EOB vs ERA', style: 'Paper vs screen', draw({ svg, glass, P }) {
  const rows = (x, y, col, acc) => [0, 1, 2, 3, 4].map(i => `<rect x="${x}" y="${y + i * 36}" width="${[110, 90, 120, 80, 100][i]}" height="11" rx="5.5" fill="${col}"/><rect x="${x + 150}" y="${y + i * 36}" width="${[40, 52, 36, 48, 44][i]}" height="11" rx="5.5" fill="${acc}"/>`).join('');
  let zz = ''; for (let i = 0; i < 12; i++) zz += ` l -11.5 14 l -11.5 -14`;
  svg(`<g transform="rotate(-6 330 190)" filter="url(#soft)">
      <path d="M190 52 Q 190 30 212 30 H 466 V 314 ${zz} Z" fill="#fff"/>
      <path d="M190 52 Q 190 30 212 30 H 230 Q 200 40 210 74 Z" fill="${P.line}"/>
      <rect x="222" y="58" width="56" height="56" rx="12" fill="${P.line}"/>${I('document', 228, 64, 44, 10, P.mute, P.mute)}
      <rect x="296" y="66" width="120" height="12" rx="6" fill="${P.line}"/><rect x="296" y="90" width="80" height="10" rx="5" fill="${P.line}"/>
      ${rows(222, 140, '#d5ddf3', '#c2cdec')}
    </g>
    <path d="M500 190 H 616" stroke="${P.teal}" stroke-width="10" stroke-linecap="round"/><path d="M596 166 L 624 190 L 596 214" stroke="${P.teal}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="520" cy="190" r="5" fill="#fff"/><circle cx="548" cy="190" r="5" fill="#fff" opacity=".6"/>`);
  glass(668, 36, 340, 246, 30);
  svg(`<defs><linearGradient id="scr32" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2e64fd"/><stop offset="1" stop-color="#02d0fd"/></linearGradient>
    <radialGradient id="gl32"><stop offset="0" stop-color="#55e0fa" stop-opacity=".7"/><stop offset="1" stop-color="#55e0fa" stop-opacity="0"/></radialGradient></defs>
    <ellipse cx="838" cy="160" rx="250" ry="170" fill="url(#gl32)" opacity=".6"/>
    <rect x="686" y="54" width="304" height="210" rx="18" fill="url(#scr32)"/>
    <rect x="708" y="76" width="44" height="44" rx="12" fill="#fff" fill-opacity=".25"/><path d="M718 98 l8 8 16 -16" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="768" y="84" width="120" height="11" rx="5.5" fill="#fff"/><rect x="768" y="104" width="80" height="9" rx="4.5" fill="#fff" opacity=".6"/>
    ${[0, 1, 2, 3].map(i => `<rect x="708" y="${140 + i * 30}" width="${[110, 90, 120, 80][i]}" height="10" rx="5" fill="#fff" opacity=".85"/><rect x="900" y="${140 + i * 30}" width="${[40, 52, 36, 48][i]}" height="10" rx="5" fill="${P.aqua}"/>`).join('')}
    <path d="M818 282 h40 l8 44 h-56 Z" fill="#fff" fill-opacity=".7"/><rect x="782" y="320" width="112" height="12" rx="6" fill="#fff"/>`);
} };

// ---------- s33 Code mosaic ----------
S.s33 = { title: 'CPT Codes Explained', style: 'Code mosaic', draw({ svg, P }) {
  const codes = ['99213', '99214', '36415', '80053', '85025', '93000', '71046', '90471', '97110', '99395', '20610', '11721', '96372', '87880', '81002', '99283', '90686', '99203', '73030', '76700'];
  const w = 150, h = 54, gx = 14, gy = 16, rnd = rng(5); let s = '', k = 0;
  for (let r = 0; r < 7; r++) for (let i = -1; i < 9; i++) {
    const x = -30 + i * (w + gx) + (r % 2) * (w + gx) / 2, y = 4 + r * (h + gy), cx = x + w / 2, cy = y + h / 2;
    const d = Math.hypot((cx - 600) / 1.6, cy - 190), fade = Math.max(0.15, Math.min(1, 1.15 - d / 520));
    if (Math.abs(cx - 600) < 150 && Math.abs(cy - 190) < 60) { s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="4 8" opacity=".9"/>`; continue; }
    const filled = rnd() < .18, code = codes[k++ % codes.length];
    s += `<g opacity="${fade.toFixed(2)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${filled ? P.blue : '#fff'}" fill-opacity="${filled ? .85 : .55}" stroke="#fff" stroke-width="1.5"/>
      <text x="${cx}" y="${cy + 8}" text-anchor="middle" font-family="Inter, Arial" font-weight="600" font-size="22" letter-spacing="2" fill="${filled ? '#fff' : P.blue}" fill-opacity="${filled ? 1 : .7}">${code}</text></g>`; }
  svg(`${s}<g filter="url(#soft)" transform="rotate(-6 600 170)"><rect x="456" y="118" width="288" height="96" rx="48" fill="#fff"/>
    <circle cx="510" cy="166" r="26" fill="${P.teal}"/><path d="M499 166l8 8 15-16" stroke="#fff" stroke-width="5.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="640" y="186" text-anchor="middle" font-family="Inter, Arial" font-weight="800" font-size="54" letter-spacing="4" fill="${P.blue}">99213</text></g>`);
} };

// ---------- s34 Tree ----------
S.s34 = { title: 'ICD-10 Codes Explained', style: 'Tree', draw({ svg, P }) {
  const root = [214, 190], L1 = [62, 146, 234, 318].map(y => [440, y]), L2 = [];
  L1.forEach(([x, y], i) => [-22, 22].forEach(d => L2.push([670, y + d, i])));
  const hp = 2, hl = 5; // highlighted chapter and leaf
  const link = (a, b, hi) => `<path d="M${a[0]} ${a[1]} C ${(a[0] + b[0]) / 2} ${a[1]}, ${(a[0] + b[0]) / 2} ${b[1]}, ${b[0]} ${b[1]}" stroke="${hi ? P.teal : '#fff'}" stroke-width="${hi ? 7 : 3.5}" fill="none" stroke-linecap="round" opacity="${hi ? 1 : .75}"/>`;
  let s = '';
  L1.forEach((p, i) => s += link(root, p, i === hp));
  L2.forEach((p, i) => s += link(L1[p[2]], p, i === hl));
  const leaf = L2[hl], fin = [860, leaf[1]];
  s += link(leaf, fin, true);
  let n = `<g filter="url(#soft)"><circle cx="${root[0]}" cy="${root[1]}" r="62" fill="url(#gB)"/></g>${I('stethoscope', root[0] - 38, root[1] - 38, 76, 9, '#fff', P.aqua)}`;
  L1.forEach(([x, y], i) => n += `<circle cx="${x}" cy="${y}" r="24" fill="${i === hp ? P.teal : '#fff'}" ${i === hp ? '' : 'fill-opacity=".85"'} stroke="#fff" stroke-width="3" filter="url(#soft)"/>`);
  L2.forEach(([x, y], i) => n += `<rect x="${x - 2}" y="${y - 13}" width="74" height="26" rx="13" fill="${i === hl ? P.teal : '#fff'}" fill-opacity="${i === hl ? 1 : .7}"/><rect x="${x + 12}" y="${y - 3}" width="${i === hl ? 46 : 36}" height="6" rx="3" fill="${i === hl ? '#fff' : P.sky}"/>`);
  n += `<g filter="url(#soft)"><rect x="${fin[0]}" y="${fin[1] - 50}" width="200" height="100" rx="26" fill="#fff"/>
    <circle cx="${fin[0] + 48}" cy="${fin[1]}" r="26" fill="${P.teal}"/><path d="M${fin[0] + 37} ${fin[1]}l8 8 15-16" stroke="#fff" stroke-width="5.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="${fin[0] + 90}" y="${fin[1] - 18}" width="86" height="12" rx="6" fill="${P.blue}"/><rect x="${fin[0] + 90}" y="${fin[1] + 6}" width="58" height="12" rx="6" fill="${P.sky}"/></g>`;
  svg(s + n);
} };

// ---------- s35 Snap-on blocks ----------
S.s35 = { title: 'Medical Billing Modifiers Explained', style: 'Snap-on blocks', draw({ svg, P }) {
  const u = 50, pr = isoP(560, 150, u);
  const stud = (x, y, z, col, dark) => { const [a, b] = pr(x, y, z), [c2, d] = pr(x, y, z + .28);
    return `<path d="M${a - 17} ${b} V ${d} A 17 9.5 0 0 0 ${c2 + 17} ${d} V ${b} A 17 9.5 0 0 1 ${a - 17} ${b} Z" fill="${dark}"/><ellipse cx="${c2}" cy="${d}" rx="17" ry="9.5" fill="${col}"/>`; };
  // face mapping for an icon on the left (y+d) face: u along x, v down along -z
  const onLeft = (x, y, z, sz, inner) => { const [ox, oy] = pr(x, y, z); const ex = pr(x + 1, y, z), ez = pr(x, y, z - 1);
    return `<g transform="matrix(${(ex[0] - ox) / 120 * sz} ${(ex[1] - oy) / 120 * sz} ${(ez[0] - ox) / 120 * sz} ${(ez[1] - oy) / 120 * sz} ${ox} ${oy})">${inner}</g>`; };
  const BW = 4, BD = 2, BH = 1.3;
  let s = isoBox(pr, 0, 0, 0, BW, BD, BH, '#ffffff', '#e4ecff', '#c6d5fb');
  // icon on base front-left face
  s += onLeft(0.35, BD, BH - .15, 1, `<g fill="none" stroke="${P.blue}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">${window.HT_ICONS.document.replace(/class="ac"/g, `stroke="${P.teal}"`)}</g>`);
  s += onLeft(1.55, BD, BH - .35, 2.2, `<rect x="0" y="0" width="120" height="14" rx="7" fill="${P.line}"/><rect x="0" y="28" width="80" height="14" rx="7" fill="${P.line}"/>`);
  // studs on base where no block
  const tags = [[0, 0, P.blue, '#0f2fd0', '#1f3fe6'], [1, 1, P.teal, '#1aa6bd', '#22bdd6'], [2, 0, P.cyan, '#04a6cc', '#03bce6']];
  const occupied = new Set(tags.map(t => t[0] + ',' + t[1]).concat(['3,1']));
  for (let x = 0; x < BW; x++) for (let y = 0; y < BD; y++) if (!occupied.has(x + ',' + y)) s += stud(x + .5, y + .5, BH, '#fff', '#c6d5fb');
  const sym = [`<circle cx="60" cy="60" r="22" fill="#fff"/>`, `<path d="M60 34 L 86 80 H 34 Z" fill="#fff"/>`, `<path d="M60 34 V86 M34 60 H86" stroke="#fff" stroke-width="16" stroke-linecap="round"/>`, `<circle cx="60" cy="60" r="20" fill="none" stroke="#fff" stroke-width="11"/>`];
  const onTop = (x, y, z, inner) => { const [ox, oy] = pr(x, y, z), ex = pr(x + 1, y, z), ey = pr(x, y + 1, z);
    return `<g transform="matrix(${(ex[0] - ox) / 120} ${(ex[1] - oy) / 120} ${(ey[0] - ox) / 120} ${(ey[1] - oy) / 120} ${ox} ${oy})">${inner}</g>`; };
  // draw blocks back to front
  const blocks = tags.map(([x, y, top, l, r], i) => [x, y, BH, top, l, r, sym[i]]);
  blocks.push([3, 1, BH + 1.9, P.mid, '#2a44e6', '#3550f2', sym[3]]); // hovering block
  blocks.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));
  for (const [x, y, z, top, l, r, sy] of blocks) {
    if (z > BH) { const [a, b] = pr(x + .5, y + .5, BH + .3), [, d] = pr(x + .5, y + .5, z - .1);
      s += stud(x + .5, y + .5, BH, '#fff', '#c6d5fb') + `<path d="M${a} ${d + 10} V ${b - 4}" stroke="#fff" stroke-width="4" stroke-dasharray="3 9" stroke-linecap="round"/><path d="M${a - 10} ${b - 16} L ${a} ${b - 4} L ${a + 10} ${b - 16}" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; }
    s += isoBox(pr, x + .04, y + .04, z, .92, .92, .8, top, l, r) + onTop(x + .04, y + .04, z + .8, sy);
  }
  svg(`<g filter="url(#soft)">${s}</g>`);
} };

// ---------- s36 Pins on iso map ----------
S.s36 = { title: 'Place of Service Codes', style: 'Pins on iso map', draw({ svg, P }) {
  const u = 46, pr = isoP(600, 96, u), N = 6;
  let s = isoBox(pr, 0, 0, -0.5, N, N, 0.5, 'rgba(255,255,255,.62)', 'rgba(62,89,255,.55)', 'rgba(19,68,253,.65)', 'stroke="#fff" stroke-width="1.5" stroke-linejoin="round"');
  // roads
  const road = (x0, y0, x1, y1) => { const a = pr(x0, y0, 0), b = pr(x1, y1, 0); return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#fff" stroke-width="16" stroke-linecap="round" opacity=".9"/>`; };
  s += road(3, 0.3, 3, 5.7) + road(0.3, 3, 5.7, 3);
  const dash = (x0, y0, x1, y1) => { const a = pr(x0, y0, 0), b = pr(x1, y1, 0); return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${P.sky}" stroke-width="2.5" stroke-dasharray="6 8"/>`; };
  s += dash(3, 0.5, 3, 5.5) + dash(0.5, 3, 5.5, 3);
  // home (left quadrant: low x, high y)
  const W = '#fff', Lc = '#e1eaff', Rc = '#c4d4fb';
  const home = () => { let h = isoBox(pr, 0.8, 3.8, 0, 1.4, 1.3, 0.9, W, Lc, Rc);
    const a = pr(0.8, 3.8 + 0.65, 1.6), b = pr(2.2, 3.8 + 0.65, 1.6), c1 = pr(2.2, 3.8, 0.9), d1 = pr(0.8, 3.8, 0.9), e = pr(2.2, 5.1, 0.9), f = pr(0.8, 5.1, 0.9);
    h += `<polygon points="${pts([a, b, c1, d1])}" fill="${P.sky}"/><polygon points="${pts([a, b, e, f])}" fill="${P.bright}"/><polygon points="${pts([b, c1, e])}" fill="#dfe7ff"/>`;
    const dr = [pr(1.3, 5.1, 0), pr(1.65, 5.1, 0), pr(1.65, 5.1, .55), pr(1.3, 5.1, .55)]; h += `<polygon points="${pts(dr)}" fill="${P.blue}"/>`; return h; };
  // clinic (back quadrant: low x, low y)
  const clinic = () => { let h = isoBox(pr, 0.7, 0.7, 0, 1.6, 1.6, 1.2, W, Lc, Rc);
    const c0 = pr(1.5, 1.5, 1.2); h += `<g transform="translate(${c0[0]} ${c0[1]}) scale(1 .58) rotate(45)"><rect x="-8" y="-24" width="16" height="48" rx="3" fill="${P.teal}"/><rect x="-24" y="-8" width="48" height="16" rx="3" fill="${P.teal}"/></g>`;
    for (const t of [0.95, 1.65]) { const w = [pr(t, 2.3, .45), pr(t + .4, 2.3, .45), pr(t + .4, 2.3, .85), pr(t, 2.3, .85)]; h += `<polygon points="${pts(w)}" fill="${P.sky}"/>`; } return h; };
  // hospital (right quadrant: high x, low y), taller
  const hosp = () => { let h = isoBox(pr, 3.7, 0.6, 0, 1.7, 1.7, 2.3, W, Lc, Rc);
    for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) { const x = 3.9 + k * .5, z = .4 + r * .6, w = [pr(x, 2.3, z), pr(x + .3, 2.3, z), pr(x + .3, 2.3, z + .35), pr(x, 2.3, z + .35)]; h += `<polygon points="${pts(w)}" fill="${r === 2 && k === 1 ? P.teal : P.sky}"/>`; }
    const c0 = pr(4.55, 1.45, 2.3); h += `<g transform="translate(${c0[0]} ${c0[1]}) scale(1 .58) rotate(45)"><rect x="-8" y="-26" width="16" height="52" rx="3" fill="${CORAL === '' ? '' : P.blue}"/><rect x="-26" y="-8" width="52" height="16" rx="3" fill="${P.blue}"/></g>`; return h; };
  // laptop (front quadrant: high x, high y)
  const laptop = () => { let h = isoBox(pr, 3.7, 3.9, 0, 1.6, 1.2, 0.12, '#fff', Lc, Rc);
    const a = pr(3.7, 3.9, .12), b = pr(5.3, 3.9, .12), c1 = pr(5.3, 3.75, 1.25), d1 = pr(3.7, 3.75, 1.25);
    h += `<polygon points="${pts([a, b, c1, d1])}" fill="#fff"/>`;
    const i = (t, v) => { const p = pr(3.7 + .12 + t * 1.36, 3.9 - .03 - v * .13, .2 + v * .95); return p; };
    h += `<polygon points="${pts([i(0, 0), i(1, 0), i(1, 1), i(0, 1)])}" fill="${P.bright}"/>`;
    const fc = i(.5, .6), bc = i(.5, .12); h += `<circle cx="${fc[0]}" cy="${fc[1]}" r="9" fill="#fff"/><path d="M${bc[0] - 16} ${bc[1]} a 16 13 0 0 1 32 0 Z" fill="#fff"/>`; return h; };
  s += clinic() + hosp() + home() + laptop();
  const pinAt = (x, y, z, col, dot) => { const [a, b] = pr(x, y, z); return pin(a, b, 54, col, dot); };
  s += pinAt(1.5, 1.5, 1.95, P.blue) + pinAt(4.55, 1.45, 3.05, P.teal) + pinAt(1.5, 4.45, 2.2, P.blue) + pinAt(4.5, 4.4, 1.85, P.teal);
  svg(`<g filter="url(#soft)">${s}</g>`);
} };

})();
