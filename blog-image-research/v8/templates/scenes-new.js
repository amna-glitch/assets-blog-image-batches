// v8 new-people scenes n01-n10: 10 more young people (generated with Figma AI), each in a layout not used before.
(() => {
const S = window.SCENES;
const AR = 1264 / 848;
const N = { legal: ['n01-legal', [57, 32]], tele: ['n02-telehealth', [57, 22]], therapy: ['n03-therapy', [58, 38]], dental: ['n04-dental', [55, 33]],
  billing: ['n05-billing', [59, 22]], home: ['n06-homeoffice', [50, 30]], vet: ['n07-vet', [52, 33]], rpm: ['n08-rpm', [65, 33]],
  peds: ['n09-pediatrics', [55, 37]], bilingual: ['n10-bilingual', [51, 30]] };
window.PHOTO_AR = Object.assign(window.PHOTO_AR || {}, Object.fromEntries(Object.values(N).map(([f]) => [f, AR])));
const shadow = '0 26px 60px rgba(19,68,253,.28), 0 2px 8px rgba(19,68,253,.12)';

// n01 Shield badge: the person in a circle, a large shield with scales of justice overlapping it.
S.n01 = { title: 'Is It Legal to Hire an Overseas Healthcare VA?', style: 'Shield badge', draw({ photo, svg, tile }) {
  photo(...N.legal, 300, 30, 320, 320, 160, 125, 2.6, '50%', { boxShadow: shadow, border: '8px solid #fff' });
  svg(`<g transform="translate(600,70)" filter="url(#soft)"><path d="M120 0 L230 40 V140 C230 220 175 270 120 290 C65 270 10 220 10 140 V40Z" fill="#fff"/>
    <path d="M120 60 V220 M80 220 H160 M60 100 H180" stroke="#2345ff" stroke-width="10" stroke-linecap="round"/>
    <path d="M60 100 L35 160 H85Z M180 100 L155 160 H205Z" fill="none" stroke="#2dd0e8" stroke-width="8" stroke-linejoin="round"/></g>`);
  tile('globe', 930, 140, 104);
} };

// n02 Laptop screen: a laptop whose screen is the video call, small doctor self-view in the corner.
S.n02 = { title: 'Telehealth Explained for Practices', style: 'Laptop call', draw({ add, photo, ico }) {
  add('abs', { left: 340, top: 30, width: 520, height: 330, borderRadius: 22, background: '#0b1440', boxShadow: '0 30px 70px rgba(19,68,253,.35)' });
  photo(...N.tele, 354, 44, 492, 302, 246, 110, 1.9, 12);
  add('abs', { left: 290, top: 358, width: 620, height: 24, borderRadius: '0 0 24px 24px', background: 'linear-gradient(180deg,#dfe5f7,#b9c4ea)' });
  add('abs', { left: 720, top: 230, width: 110, height: 96, borderRadius: 14, background: 'linear-gradient(160deg,#2e64fd,#162da1)', border: '3px solid #fff' },
    `<div style="display:flex;align-items:center;justify-content:center;height:100%">${ico('stethoscope', 56, 9, '#fff', '#2dd0e8')}</div>`);
} };

// n03 Calm circle: a large soft portrait ring with a glass speech bubble holding a heart.
S.n03 = { title: 'How Virtual Assistants Support Therapy and Mental Health Practices', style: 'Calm ring', draw({ photo, svg, glass, ico }) {
  svg(`<circle cx="700" cy="190" r="200" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/><circle cx="700" cy="190" r="235" fill="none" stroke="#fff" stroke-width="1.5" opacity=".3"/>`);
  photo(...N.therapy, 535, 25, 330, 330, 165, 140, 2.0, '50%', { boxShadow: shadow, border: '8px solid #fff' });
  glass(250, 90, 220, 150, 40, { borderBottomRightRadius: '8px' }, `<div style="display:flex;gap:14px;align-items:center">${ico('heart', 60, 9)}${ico('brain', 60, 9)}</div>`);
} };

// n04 Tooth-shaped frame: the receptionist seen through a tooth silhouette.
S.n04 = { title: 'How to Hire a Virtual Dental Receptionist', style: 'Tooth frame', draw({ photo, tile, svg }) {
  svg(`<path d="M600 40 C 560 10, 470 20, 460 100 C 450 180, 490 230, 500 330 C 506 390, 540 400, 556 350 C 570 300, 580 270, 600 270 C 620 270, 630 300, 644 350 C 660 400, 694 390, 700 330 C 710 230, 750 180, 740 100 C 730 20, 640 10, 600 40Z" fill="#fff" transform="translate(-6,-6) scale(1.01)" filter="url(#soft)"/>`);
  photo(...N.dental, 450, 20, 300, 390, 150, 120, 1.9, 0,
    { clipPath: 'path("M150 26 C 110 -4, 20 6, 10 86 C 0 166, 40 216, 50 316 C 56 376, 90 386, 106 336 C 120 286, 130 256, 150 256 C 170 256, 180 286, 194 336 C 210 386, 244 376, 250 316 C 260 216, 300 166, 290 86 C 280 6, 190 -4, 150 26Z")' });
  tile('phone', 330, 130, 104); tile('calendar', 880, 120, 100); tile('headset', 860, 280, 84);
} };

// n05 Invoice stack: the biller's photo pinned on top of fanned glass invoices.
S.n05 = { title: 'Medical Billing Virtual Assistant Guide', style: 'Invoice stack', draw({ glass, photo, svg, tile }) {
  [[640, 70, 10], [610, 60, 4]].forEach(([x, y, r]) => glass(x, y, 320, 280, 20, { transform: `rotate(${r}deg)` }));
  svg(`${[0, 1, 2, 3].map(i => `<rect x="${660}" y="${100 + i * 34}" width="${[220, 180, 240, 140][i]}" height="12" rx="6" fill="#0b1440" opacity=".55" transform="rotate(4 760 200)"/>`).join('')}`);
  photo(...N.billing, 300, 40, 340, 300, 170, 100, 2.2, 24, { boxShadow: shadow, border: '5px solid #fff', transform: 'rotate(-3deg)' });
  tile('coin', 960, 290, 96); tile('document', 230, 300, 84);
} };

// n06 Full-width, your current look refined: the whole home-office setup, blue edges, three frosted tiles.
S.n06 = { title: 'Home Office Setup and Equipment Every Healthcare Virtual Assistant Needs', style: 'Current look, refined', bg: { waves: false }, draw({ photo, add, tile }) {
  photo(...N.home, 0, 0, 1200, 630, 560, 180, 1.05);
  add('abs', { inset: 0, background: 'linear-gradient(90deg, rgba(19,68,253,.55) 0%, rgba(46,100,253,.12) 25%, rgba(46,100,253,0) 50%, rgba(46,100,253,.1) 75%, rgba(19,68,253,.5) 100%)' });
  add('abs', { inset: 0, background: 'linear-gradient(0deg, rgba(85,224,250,.75) 0%, rgba(2,208,253,0) 38%)' });
  tile('headset', 230, 110, 104); tile('laptop', 1000, 110, 100); tile('shield', 990, 260, 84);
} };

// n07 Paw trail into a rounded photo card.
S.n07 = { title: 'How Virtual Assistants Support Veterinary Practices', style: 'Paw trail card', draw({ photo, svg, tile }) {
  const paw = (x, y, r, o) => `<g transform="translate(${x},${y}) rotate(${r})" opacity="${o}"><ellipse cx="0" cy="8" rx="14" ry="12" fill="#2345ff"/><circle cx="-14" cy="-10" r="6" fill="#2345ff"/><circle cx="-4" cy="-18" r="6" fill="#2345ff"/><circle cx="8" cy="-18" r="6" fill="#2345ff"/><circle cx="17" cy="-9" r="6" fill="#2345ff"/></g>`;
  svg([[170, 300, 60, .25], [230, 250, 70, .35], [290, 280, 60, .45], [350, 220, 75, .6], [410, 250, 65, .75]].map(a => paw(...a)).join(''));
  photo(...N.vet, 470, 30, 420, 320, 210, 120, 1.8, 30, { boxShadow: shadow, border: '5px solid #fff' });
  tile('paw', 950, 140, 100); tile('calendar', 930, 290, 82);
} };

// n08 Vital line: the photo in a wide card, an ECG line running across it on a glass strip.
S.n08 = { title: 'Remote Patient Monitoring Assistant Guide', style: 'Vital line', draw({ photo, svg, glass, tile }) {
  photo(...N.rpm, 380, 30, 440, 300, 230, 120, 1.7, 28, { boxShadow: shadow, border: '5px solid #fff' });
  glass(140, 240, 920, 76, 38);
  svg(`<path d="M170 278 H420 L440 250 L460 300 L480 236 L500 290 L515 278 H700 L720 256 L740 300 L755 278 H1030" stroke="#2345ff" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="1030" cy="278" r="10" fill="#2dd0e8" stroke="#fff" stroke-width="4"/>`);
  tile('heart', 250, 120, 100); tile('stethoscope', 940, 120, 96);
} };

// n09 Toy blocks: a stack of soft toy blocks beside a rounded photo.
S.n09 = { title: 'How to Hire a Pediatrics VMA', style: 'Toy blocks', draw({ photo, svg }) {
  const b = (x, y, c, sym) => `<g transform="translate(${x},${y})" filter="url(#soft)"><rect width="96" height="96" rx="18" fill="${c}"/>${sym}</g>`;
  svg(b(250, 210, '#2345ff', '<path d="M48 26 L54 42 L72 42 L58 52 L63 70 L48 59 L33 70 L38 52 L24 42 L42 42Z" fill="#fff"/>') +
      b(354, 210, '#2dd0e8', '<path d="M48 30 V66 M30 48 H66" stroke="#fff" stroke-width="12" stroke-linecap="round"/>') +
      b(302, 110, '#fff', '<path d="M48 70 C 20 50, 26 26, 48 38 C 70 26, 76 50, 48 70Z" fill="#2345ff"/>'));
  photo(...N.peds, 510, 30, 440, 320, 220, 125, 1.7, 30, { boxShadow: shadow, border: '5px solid #fff' });
} };

// n10 Two languages: the person in a circle with two overlapping glass speech bubbles in different rhythms.
S.n10 = { title: 'Bilingual Virtual Medical Receptionist: The Complete Guide', style: 'Two bubbles', draw({ photo, glass, svg, tile }) {
  photo(...N.bilingual, 640, 40, 300, 300, 150, 115, 2.4, '50%', { boxShadow: shadow, border: '8px solid #fff' });
  glass(240, 60, 300, 120, 40, { borderBottomLeftRadius: '8px' });
  glass(330, 200, 280, 110, 40, { borderBottomRightRadius: '8px', background: 'linear-gradient(160deg, rgba(35,69,255,.9), rgba(19,68,253,.7))' });
  svg(`${Array.from({ length: 14 }, (_, i) => { const h = 12 + 40 * Math.abs(Math.sin(i * .8)); return `<rect x="${280 + i * 16}" y="${120 - h / 2}" width="7" height="${h}" rx="3.5" fill="#2345ff"/>`; }).join('')}
       ${[0, 1, 2, 3, 4].map(i => `<rect x="${370 + i * 42}" y="249" width="${i % 2 ? 30 : 14}" height="14" rx="7" fill="#fff"/>`).join('')}`);
  tile('globe', 990, 280, 90);
} };
})();
