// v8 library scenes l01-l16: the 16 most varied young people found in the current cover library,
// each re-framed tight on the person (so the old baked-in tiles and checkmark fall outside the frame) in its own layout.
(() => {
const S = window.SCENES;
const shadow = '0 26px 60px rgba(19,68,253,.28), 0 2px 8px rgba(19,68,253,.12)';
const P = (n, f) => [`lib-${n}`, f];

// 1 Arch window, tiles stepping down on the left.
S.l01 = { title: 'How to Hire a Virtual Medical Coder', style: 'Arch window', draw({ photo, tile, svg }) {
  svg(`<path d="M600 430 V170 A170 170 0 0 1 940 170 V430Z" fill="url(#gGhost)" transform="translate(30,-20)"/>`);
  photo(...P('01', [32, 30]), 610, 24, 320, 400, 160, 130, 2.3, '160px 160px 28px 28px', { boxShadow: shadow, border: '6px solid rgba(255,255,255,.9)' });
  tile('document', 470, 90, 120); tile('magnifier', 380, 220, 104); tile('clipboard', 510, 300, 88);
} };

// 2 Staff ID badge on a lanyard (new).
S.l02 = { title: 'What to Know Before Hiring a Virtual Healthcare Assistant', style: 'Staff ID badge', draw({ add, photo, svg, ico, tile }) {
  svg(`<path d="M560 -10 L600 40 M640 -10 L600 40" stroke="#2dd0e8" stroke-width="10" stroke-linecap="round"/>`);
  add('solid', { left: 470, top: 40, width: 260, height: 340, borderRadius: 24 });
  add('abs', { left: 575, top: 54, width: 50, height: 10, borderRadius: 5, background: '#dfe5f7' });
  photo(...P('02', [62, 32]), 515, 80, 170, 170, 85, 80, 2.6, '50%', { border: '5px solid #eef1ff' });
  add('abs', { left: 520, top: 268, width: 160, height: 12, borderRadius: 6, background: '#0b1440', opacity: .8 });
  add('abs', { left: 545, top: 292, width: 110, height: 10, borderRadius: 5, background: '#c9d2f5' });
  add('abs', { left: 495, top: 318, width: 210, height: 40, borderRadius: 12, background: 'linear-gradient(90deg,#2345ff,#2dd0e8)' });
  tile('shield', 360, 150, 104); tile('people', 850, 120, 100); tile('clipboard', 830, 270, 84);
} };

// 3 Side-by-side: in-house desk muted vs the VA in colour.
S.l03 = { title: 'OB-GYN VMA vs. In-House Staff: Cost, Pros, and Which to Choose', style: 'Side-by-side cards', draw({ photo, glass, add, ico }) {
  glass(210, 40, 360, 300, 28, { filter: 'saturate(.3)' }, `<div style="text-align:center;opacity:.6">${ico('clinic', 120, 7, '#7a819f', '#9aa3c4')}<div style="margin:16px auto 0;height:10px;width:160px;border-radius:5px;background:#c3c9de"></div></div>`);
  photo(...P('03', [42, 30]), 630, 40, 360, 300, 205, 140, 3.0, 28, { boxShadow: shadow, border: '5px solid #fff' });
  add('abs', { left: 568, top: 158, width: 64, height: 64, borderRadius: '50%', background: '#2dd0e8', border: '6px solid #fff', boxShadow: shadow },
    `<svg width="52" height="52" viewBox="0 0 52 52"><path d="M14 20 h22 l-6 -6 M38 32 h-22 l6 6" stroke="#0b1440" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
} };

// 4 Globe + circle portrait with a dashed flight arc (new: country hiring).
S.l04 = { title: '3 Best Companies to Hire a Virtual Medical Receptionist from Pakistan', style: 'Globe link', draw({ photo, svg, tile }) {
  svg(`<circle cx="360" cy="190" r="140" fill="url(#gGlass)" stroke="#fff" stroke-width="2"/>
    ${Array.from({ length: 9 }, (_, i) => `<ellipse cx="360" cy="190" rx="${140 * Math.abs(Math.cos(i * Math.PI / 9))}" ry="140" fill="none" stroke="#2345ff" stroke-width="1.5" opacity=".25"/>`).join('')}
    ${[-90, -45, 0, 45, 90].map(d => `<line x1="${360 - 140 * Math.cos(d * Math.PI / 180)}" y1="${190 + 140 * Math.sin(d * Math.PI / 180)}" x2="${360 + 140 * Math.cos(d * Math.PI / 180)}" y2="${190 + 140 * Math.sin(d * Math.PI / 180)}" stroke="#2345ff" stroke-width="1.5" opacity=".25"/>`).join('')}
    <path d="M400 120 C 520 20, 680 30, 760 110" stroke="#fff" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round" fill="none"/>
    <circle cx="400" cy="120" r="12" fill="#2dd0e8" stroke="#fff" stroke-width="4"/>`);
  photo(...P('04', [24, 28]), 680, 70, 260, 260, 130, 110, 2.6, '50%', { boxShadow: shadow, border: '8px solid #fff' });
  tile('phone', 990, 140, 90); tile('headset', 960, 290, 80);
} };

// 5 Hexagon frame (new).
S.l05 = { title: 'China Dental Outsourcing: Services, Costs, and Providers', style: 'Hexagon frame', draw({ photo, svg, tile }) {
  svg(`<polygon points="600,0 760,92 760,276 600,368 440,276 440,92" fill="url(#gGhost)" transform="translate(40,20)"/>`);
  photo(...P('05', [34, 30]), 440, 10, 320, 368, 160, 140, 2.3, 0, { clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)' });
  tile('tooth', 300, 110, 110); tile('globe', 880, 120, 104); tile('coin', 860, 280, 84);
} };

// 6 Corner window with a magnifier lens over a chart (new).
S.l06 = { title: 'What Are the Benefits of a Virtual Clinical Chart Auditor?', style: 'Lens and chart', draw({ photo, glass, svg }) {
  photo(...P('06', [32, 30]), 200, 30, 380, 320, 225, 150, 3.0, 30, { boxShadow: shadow, border: '5px solid #fff' });
  glass(620, 50, 380, 280, 28);
  svg(`${[0, 1, 2, 3, 4].map(i => `<rect x="650" y="${80 + i * 44}" width="${[300, 240, 280, 200, 260][i]}" height="12" rx="6" fill="${i === 2 ? '#ff8a8a' : '#0b1440'}" opacity="${i === 2 ? .9 : .7}"/>`).join('')}
    <circle cx="890" cy="200" r="70" fill="rgba(255,255,255,.35)" stroke="#2345ff" stroke-width="12"/>
    <path d="M940 250 L1000 310" stroke="#2345ff" stroke-width="18" stroke-linecap="round"/>`);
} };

// 7 Certificate + polaroid portrait.
S.l07 = { title: 'Virtual Insurance Verification Specialist Training and Certification', style: 'Polaroid + certificate', draw({ add, photo, glass, svg }) {
  glass(620, 70, 380, 250, 22, { transform: 'rotate(3deg)' });
  svg(`<rect x="660" y="110" width="200" height="12" rx="6" fill="#0b1440" opacity=".8"/><rect x="660" y="140" width="150" height="10" rx="5" fill="#c9d2f5"/>
    <rect x="660" y="165" width="170" height="10" rx="5" fill="#c9d2f5"/>
    <g transform="translate(910,220)"><path d="M-20 20 L-30 70 L-10 58 L0 72 L4 26Z M20 20 L30 70 L10 58 L0 72 L-4 26Z" fill="#2dd0e8"/><circle r="36" fill="#2345ff"/><path d="M-14 0 L-4 10 L16 -12" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/></g>`);
  const f = add('solid', { left: 260, top: 30, width: 300, height: 340, borderRadius: 10, transform: 'rotate(-5deg)' });
  f.appendChild(photo(...P('07', [55, 32]), 16, 16, 268, 250, 134, 110, 2.2, 4));
} };

// 8 Phone screen with ring arcs.
S.l08 = { title: 'How Much Does a Dermatology VMA Cost?', style: 'Phone screen', draw({ add, photo, tile }) {
  add('abs', { left: 485, top: 18, width: 230, height: 450, borderRadius: 40, background: '#0b1440', boxShadow: '0 30px 70px rgba(19,68,253,.35)' });
  photo(...P('08', [62, 30]), 497, 30, 206, 426, 103, 140, 1.6, 30);
  add('abs', { left: 565, top: 40, width: 70, height: 18, borderRadius: 9, background: '#0b1440' });
  tile('coin', 330, 110, 110); tile('calendar', 870, 120, 100); tile('heart', 860, 280, 84);
} };

// 9 Slanted panel + capsules.
S.l09 = { title: 'Denials and Appeals Specialist vs. In-House Staff: Cost, Pros, and Which to Choose', style: 'Slanted panel', draw({ photo, capsules, tile }) {
  photo(...P('09', [50, 32]), 250, 20, 400, 380, 200, 130, 2.0, 26, { clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0 100%)', boxShadow: shadow });
  capsules(650, 70, 6, 40, 240, 16, [.45, .7, .55, .9, .75, 1]);
  tile('document', 760, 120, 100); tile('shield', 930, 250, 100);
} };

// 10 Blob portrait + sound wave card.
S.l10 = { title: 'Speech Therapy VMA vs. In-House Staff: Cost, Pros, and Which to Choose', style: 'Blob portrait', draw({ photo, glass, svg, tile }) {
  photo(...P('10', [53, 29]), 640, 10, 400, 380, 200, 140, 2.0, 0,
    { clipPath: 'path("M200 8 C 305 0, 392 70, 396 170 C 400 270, 335 372, 210 376 C 95 380, 10 310, 6 200 C 2 90, 95 16, 200 8 Z")' });
  glass(210, 80, 380, 200, 28);
  svg(`${Array.from({ length: 30 }, (_, i) => { const h = 14 + 80 * Math.abs(Math.sin(i * .5)) * (1 - Math.abs(i - 15) / 18); return `<rect x="${240 + i * 11}" y="${180 - h / 2}" width="6" height="${h}" rx="3" fill="${i % 5 === 0 ? '#2dd0e8' : '#2345ff'}"/>`; }).join('')}`);
  tile('ear', 210, 80, 90);
} };

// 11 Stacked cards: photo card in front of two offset glass cards (new).
S.l11 = { title: '7 Best Anesthesiology Virtual Medical Assistant Companies (2026)', style: 'Stacked cards', draw({ glass, photo, tile }) {
  glass(470, 70, 360, 280, 28, { transform: 'rotate(8deg)', opacity: .7 });
  glass(440, 50, 360, 280, 28, { transform: 'rotate(4deg)' });
  photo(...P('11', [65, 31]), 410, 30, 360, 280, 170, 130, 2.7, 28, { boxShadow: shadow, border: '5px solid #fff' });
  tile('heart', 290, 120, 104); tile('stethoscope', 930, 130, 100); tile('calendar', 900, 290, 82);
} };

// 12 Wide band: a cinematic strip across the frame with tiles above and below (new).
S.l12 = { title: '7 Best Companies to Hire a Virtual Medical Receptionist from the Philippines', style: 'Wide band', draw({ photo, tile, stripes }) {
  stripes(130, 40, 360, 4, 16, .55);
  photo(...P('12', [36, 31]), 180, 100, 620, 220, 430, 110, 2.4, 30, { boxShadow: shadow, border: '5px solid #fff' });
  tile('globe', 930, 130, 110); tile('phone', 1000, 280, 90);
} };

// 13 Orbit portrait.
S.l13 = { title: 'What Is a Virtual Dental Administrative Assistant?', style: 'Orbit portrait', draw({ photo, tile, svg }) {
  svg(`<ellipse cx="600" cy="190" rx="300" ry="150" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 10" opacity=".8"/>`);
  photo(...P('13', [44, 27]), 455, 45, 290, 290, 145, 120, 2.6, '50%', { boxShadow: shadow, border: '8px solid #fff' });
  tile('tooth', 320, 120, 110); tile('calendar', 880, 110, 96); tile('document', 860, 290, 84);
} };

// 14 Capsule frame: the person in a tall pill shape among see-through capsules (new).
S.l14 = { title: 'What Does a Pediatrics VMA Do?', style: 'Capsule frame', draw({ photo, capsules, tile }) {
  capsules(250, 60, 10, 60, 280, 20, [.5, .7, .9, .6, 0, 0, .8, .55, .75, .45]);
  photo(...P('14', [58, 30]), 530, 20, 160, 360, 80, 120, 2.2, 80, { boxShadow: shadow, border: '5px solid #fff' });
  tile('heart', 380, 150, 96); tile('calendar', 860, 120, 96);
} };

// 15 Video call window.
S.l15 = { title: 'How to Hire a Virtual Patient Follow-Up Coordinator', style: 'Call window', draw({ glass, photo, svg, ico, add }) {
  glass(330, 26, 560, 330, 30);
  photo(...P('15', [31, 30]), 348, 44, 524, 250, 262, 120, 2.4, 20);
  svg(`${[0, 1, 2].map(i => `<circle cx="${560 + i * 50}" cy="322" r="15" fill="${i === 1 ? '#ff8a8a' : '#2345ff'}"/>`).join('')}`);
  glass(190, 70, 120, 120, 34, {}, ico('calendar', 64, 9));
  glass(930, 200, 104, 104, 30, {}, ico('phone', 56, 9));
} };

// 16 Building window: the person framed as one lit window of a care facility (new).
S.l16 = { title: 'Benefits of a Virtual Assistant for Skilled Nursing Facilities', style: 'Facility window', draw({ add, photo, ico }) {
  add('solid', { left: 300, top: 30, width: 600, height: 420, borderRadius: 24 });
  add('abs', { left: 560, top: 6, width: 80, height: 50, borderRadius: 14, background: '#2345ff', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    `<svg width="30" height="30"><path d="M15 4 V26 M4 15 H26" stroke="#fff" stroke-width="7" stroke-linecap="round"/></svg>`);
  [[330, 70], [330, 200], [770, 70], [770, 200]].forEach(([x, y], i) =>
    add('abs', { left: x, top: y, width: 100, height: 100, borderRadius: 16, background: '#eef1ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }, ico(['heart', 'calendar', 'clinic', 'heart'][i], 50, 9)));
  photo(...P('16', [50, 32]), 455, 70, 290, 230, 145, 100, 2.1, 16, { border: '5px solid #2dd0e8' });
} };
})();
