// v8 more-people scenes m01-m10: 10 more young people (Figma AI), each in another new layout.
(() => {
const S = window.SCENES;
const AR = 1264 / 848;
const M = { sched: ['m01-scheduling', [53, 25]], coder: ['m02-coder', [54, 20]], recep: ['m03-receptionist', [55, 27]], spa: ['m04-medspa', [50, 25]],
  intake: ['m05-intake', [43, 28]], care: ['m06-care', [49, 28]], scribe: ['m07-scribe', [69, 20]], nurse: ['m08-nurse', [70, 28]],
  auth: ['m09-priorauth', [59, 22]], cred: ['m10-credentialing', [40, 17]] };
window.PHOTO_AR = Object.assign(window.PHOTO_AR || {}, Object.fromEntries(Object.values(M).map(([f]) => [f, AR])));
const shadow = '0 26px 60px rgba(19,68,253,.28), 0 2px 8px rgba(19,68,253,.12)';

// m01 Calendar page: the photo is the top of a calendar page, a date grid fills the rest.
S.m01 = { title: 'How to Outsource Medical Scheduling', style: 'Calendar page', draw({ add, photo, svg }) {
  add('solid', { left: 420, top: 30, width: 360, height: 420, borderRadius: 24 });
  photo(...M.sched, 436, 46, 328, 200, 164, 90, 2.0, 14);
  svg(`${[480, 560, 640, 720].map(x => `<rect x="${x - 6}" y="14" width="12" height="38" rx="6" fill="#162da1"/>`).join('')}
    ${Array.from({ length: 21 }, (_, i) => { const x = 452 + (i % 7) * 44, y = 266 + Math.floor(i / 7) * 40, on = [3, 9, 12, 16].includes(i);
      return `<rect x="${x}" y="${y}" width="32" height="28" rx="8" fill="${on ? (i === 9 ? '#2dd0e8' : '#2345ff') : '#eef1ff'}"/>`; }).join('')}`);
} };

// m02 Code chips: the coder's photo with numeric code chips floating around it.
S.m02 = { title: 'Virtual Medical Coder Guide', style: 'Code chips', draw({ photo, add }) {
  photo(...M.coder, 400, 30, 400, 310, 200, 100, 2.4, 28, { boxShadow: shadow, border: '5px solid #fff' });
  [['99213', 230, 70, -6, '#fff', '#2345ff'], ['93000', 250, 230, 4, '#2345ff', '#fff'], ['J45.909', 840, 60, 5, '#fff', '#162da1'], ['E11.9', 860, 200, -4, '#2dd0e8', '#0b1440'], ['80053', 820, 300, 3, '#fff', '#2345ff']]
    .forEach(([t, x, y, r, bg, fg]) => add('abs', { left: x, top: y, padding: '12px 20px', borderRadius: 14, background: bg, color: fg, transform: `rotate(${r}deg)`,
      font: "700 24px 'IBM Plex Mono', ui-monospace, monospace", boxShadow: '0 12px 28px rgba(19,68,253,.22)' }, t));
} };

// m03 Headset arc: a giant headset outline wraps around the receptionist's circular portrait.
S.m03 = { title: 'How to Hire a Virtual Medical Receptionist', style: 'Headset arc', draw({ photo, svg }) {
  svg(`<path d="M420 300 V220 A180 180 0 0 1 780 220 V300" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round" filter="url(#soft)"/>
    <rect x="388" y="230" width="64" height="120" rx="26" fill="#2345ff"/><rect x="748" y="230" width="64" height="120" rx="26" fill="#2345ff"/>
    <path d="M780 340 C 780 380, 740 400, 690 400" fill="none" stroke="#2dd0e8" stroke-width="12" stroke-linecap="round"/><circle cx="684" cy="400" r="14" fill="#2dd0e8"/>`);
  photo(...M.recep, 470, 90, 260, 260, 130, 110, 2.6, '50%', { border: '8px solid #fff', boxShadow: shadow });
} };

// m04 Droplet: the person inside a serum droplet, soft leaves behind.
S.m04 = { title: 'How to Hire a Med Spa Virtual Medical Assistant', style: 'Droplet frame', draw({ photo, svg, tile }) {
  svg(`<path d="M300 300 C 260 200, 360 150, 430 120 C 400 200, 380 260, 300 300Z" fill="#2dd0e8" opacity=".35"/>
    <path d="M900 300 C 940 200, 840 150, 770 120 C 800 200, 820 260, 900 300Z" fill="#2345ff" opacity=".25"/>`);
  photo(...M.spa, 450, 0, 300, 400, 150, 230, 2.0, 0,
    { clipPath: 'path("M150 6 C 150 6, 290 170, 290 260 C 290 340, 228 396, 150 396 C 72 396, 10 340, 10 260 C 10 170, 150 6, 150 6Z")' });
  tile('heart', 920, 120, 96); tile('calendar', 270, 120, 96);
} };

// m05 Clipboard: the photo clipped to a clipboard over intake checkboxes.
S.m05 = { title: 'Improving Patient Intake', style: 'Clipboard', draw({ add, photo, svg }) {
  add('abs', { left: 420, top: 26, width: 360, height: 430, borderRadius: 26, background: 'linear-gradient(160deg,#2e64fd,#162da1)', boxShadow: shadow });
  add('solid', { left: 440, top: 60, width: 320, height: 380, borderRadius: 14 });
  add('abs', { left: 540, top: 10, width: 120, height: 50, borderRadius: 14, background: '#dfe5f7', border: '5px solid #fff' });
  photo(...M.intake, 460, 80, 280, 170, 140, 80, 2.4, 10);
  svg(`${[0, 1, 2].map(i => `<rect x="462" y="${270 + i * 34}" width="22" height="22" rx="6" fill="${i < 2 ? '#2dd0e8' : '#fff'}" stroke="${i < 2 ? '#2dd0e8' : '#c9d0e8'}" stroke-width="3"/>
    ${i < 2 ? `<path d="M466 ${281 + i * 34} l5 5 9 -10" stroke="#0b1440" stroke-width="3" fill="none" stroke-linecap="round"/>` : ''}
    <rect x="498" y="${276 + i * 34}" width="${[200, 170, 210][i]}" height="10" rx="5" fill="#0b1440" opacity=".6"/>`).join('')}`);
} };

// m06 Puzzle piece: the care coordinator inside a jigsaw piece that completes a set of three.
S.m06 = { title: 'How to Hire a Virtual Care Coordinator', style: 'Puzzle piece', draw({ photo, svg, ico, add }) {
  const piece = 'M0 40 H90 C 90 0, 150 0, 150 40 H240 V130 C 280 130, 280 190, 240 190 V280 H0Z';
  svg(`<path d="${piece}" fill="url(#gGlass)" stroke="#fff" stroke-width="2" transform="translate(210,70) scale(.8)"/>
       <path d="${piece}" fill="#2345ff" opacity=".85" transform="translate(830,90) scale(.7)"/>`);
  add('abs', { left: 270, top: 160, width: 80, height: 80 }, ico('heart', 80, 9));
  add('abs', { left: 880, top: 175, width: 70, height: 70 }, ico('calendar', 70, 9, '#fff', '#2dd0e8'));
  photo(...M.care, 470, 20, 270, 330, 135, 120, 2.0, 0, { clipPath: 'path("M0 44 H100 C 100 0, 170 0, 170 44 H270 V330 H0Z")', filter: 'drop-shadow(0 20px 30px rgba(19,68,253,.3))' });
} };

// m07 Open notebook: the scribe's photo on the left page, notes on the right page.
S.m07 = { title: 'How to Hire a Virtual Medical Scribe', style: 'Open notebook', draw({ add, photo, svg }) {
  add('solid', { left: 270, top: 40, width: 660, height: 330, borderRadius: 18 });
  svg(`<rect x="596" y="40" width="8" height="330" fill="#dfe5f7"/>
    ${Array.from({ length: 7 }, (_, i) => `<rect x="640" y="${80 + i * 38}" width="${[250, 220, 240, 190, 250, 160, 210][i]}" height="9" rx="4.5" fill="${i === 6 ? '#2dd0e8' : '#0b1440'}" opacity="${i === 6 ? 1 : .55}"/>`).join('')}
    <path d="M880 330 L930 280" stroke="#2345ff" stroke-width="10" stroke-linecap="round"/>`);
  photo(...M.scribe, 290, 60, 290, 290, 160, 110, 2.0, 10);
} };

// m08 Medical cross: the nurse seen through a rounded plus sign.
S.m08 = { title: 'How to Hire a Virtual Nurse Assistant', style: 'Medical cross', draw({ photo, tile }) {
  photo(...M.nurse, 450, 10, 300, 360, 150, 160, 1.35, 0, { clipPath: 'path("M100 0 H200 Q 220 0 220 20 V110 H280 Q 300 110 300 130 V230 Q 300 250 280 250 H220 V340 Q 220 360 200 360 H100 Q 80 360 80 340 V250 H20 Q 0 250 0 230 V130 Q 0 110 20 110 H80 V20 Q 80 0 100 0Z")', filter: 'drop-shadow(0 20px 30px rgba(19,68,253,.3))' });
  tile('stethoscope', 320, 130, 106); tile('heart', 880, 130, 100); tile('phone', 860, 290, 84);
} };

// m09 Approval stamp: a square photo with a big round approval stamp overlapping its corner.
S.m09 = { title: 'Virtual Prior Authorization Specialist Skills', style: 'Approval stamp', draw({ photo, svg, tile }) {
  photo(...M.auth, 380, 30, 340, 320, 170, 110, 2.3, 24, { boxShadow: shadow, border: '5px solid #fff' });
  svg(`<g transform="translate(730,270) rotate(-12)" filter="url(#soft)"><circle r="88" fill="#fff"/><circle r="74" fill="none" stroke="#2345ff" stroke-width="6" stroke-dasharray="4 8"/>
    <circle r="58" fill="#2345ff"/><path d="M-24 0 L-6 18 L28 -20" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`);
  tile('document', 270, 140, 104); tile('shield', 900, 110, 96);
} };

// m10 License card: a horizontal credential card with photo, lines, chip and seal.
S.m10 = { title: 'How to Hire a Virtual Credentialing Specialist', style: 'License card', draw({ add, photo, svg }) {
  add('abs', { left: 300, top: 50, width: 600, height: 300, borderRadius: 26, background: 'linear-gradient(135deg,#ffffff 0%,#eef4ff 100%)', boxShadow: shadow });
  add('abs', { left: 300, top: 50, width: 600, height: 56, borderRadius: '26px 26px 0 0', background: 'linear-gradient(90deg,#2345ff,#2dd0e8)' });
  photo(...M.cred, 330, 130, 190, 190, 95, 75, 1.9, 18, { border: '4px solid #fff', boxShadow: '0 8px 20px rgba(19,68,253,.18)' });
  svg(`<rect x="550" y="140" width="220" height="14" rx="7" fill="#0b1440" opacity=".8"/><rect x="550" y="172" width="170" height="10" rx="5" fill="#c9d2f5"/>
    <rect x="550" y="198" width="190" height="10" rx="5" fill="#c9d2f5"/><rect x="550" y="250" width="70" height="50" rx="10" fill="#f2c94c" opacity=".85"/>
    <path d="M560 265 H610 M560 285 H610 M585 255 V295" stroke="#b8901d" stroke-width="2"/>
    <g transform="translate(830,265)"><circle r="44" fill="#2345ff"/><circle r="34" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="3 5"/><path d="M-16 0 L-4 12 L18 -12" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/></g>`);
} };
})();
