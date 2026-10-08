// v8 photo scenes p01-p10: a real person in every cover, each with a different layout, on the shared v7 gradient + glass.
// People: young women and men of different races, generated in ChatGPT from PEOPLE-PROMPTS.md (cut from one collage).
// Each person is placed in the layout that suits their photo's size and shape (wide shots full-bleed, tall shots in arch/phone).
(() => {
const S = window.SCENES;
// [file, face focal [x%, y%], width, height]
const F = {
  ortho: ['p09-ortho', [56, 27], 264, 350],
  internal: ['p03-internal', [41, 36], 507, 335],
  vet: ['p02-vet', [55, 35], 762, 330],
  afterhours: ['p04-afterhours', [47, 40], 520, 335],
  vetbill: ['p05-vetbilling', [51, 29], 500, 335],
  answering: ['p06-answering', [49, 33], 338, 350],
  multi: ['p07-multi', [47, 27], 297, 350],
  transcription: ['p08-transcription', [55, 27], 317, 350],
  dental: ['p01-dental', [51, 39], 768, 330],
  scribe: ['p10-scribe', [48, 29], 288, 350],
};
window.PHOTO_AR = Object.fromEntries(Object.values(F).map(([f, , w, h]) => [f, w / h]));
const shadow = '0 26px 60px rgba(19,68,253,.28), 0 2px 8px rgba(19,68,253,.12)';

// p01 Arch window: the person framed in a tall arch, specialty tiles stepping down beside it.
S.p01 = { title: 'How Much Does an Orthopedics VMA Cost?', style: 'Arch window', draw({ photo, tile, svg }) {
  svg(`<path d="M600 430 V170 A170 170 0 0 1 940 170 V430Z" fill="url(#gGhost)" transform="translate(30,-20)"/>`);
  photo(F.ortho[0], F.ortho[1], 610, 24, 320, 400, 160, 120, 1.05, '160px 160px 28px 28px', { boxShadow: shadow, border: '6px solid rgba(255,255,255,.9)' });
  tile('spine', 470, 90, 120); tile('calendar', 380, 220, 104); tile('coin', 510, 300, 88);
} };

// p02 Circle portrait on an orbit: the person at the centre, the work orbiting.
S.p02 = { title: 'How to Hire an Internal Medicine Virtual Medical Assistant', style: 'Orbit portrait', draw({ photo, tile, svg }) {
  svg(`<ellipse cx="600" cy="190" rx="300" ry="150" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 10" opacity=".8"/>
       <ellipse cx="600" cy="190" rx="230" ry="200" fill="none" stroke="#fff" stroke-width="1.5" opacity=".35"/>`);
  photo(F.internal[0], F.internal[1], 455, 45, 290, 290, 145, 130, 1.6, '50%', { boxShadow: shadow, border: '8px solid #fff' });
  tile('stethoscope', 320, 120, 110); tile('calendar', 880, 110, 96); tile('heart', 860, 290, 84); tile('rx', 345, 300, 80);
} };

// p03 Your current look, kept: full-bleed person with see-through blue edges and frosted tiles (no checkmark).
S.p03 = { title: '7 Best Virtual Medical Assistant Companies for Specialty Veterinary Hospitals', style: 'Current look, refined', bg: { waves: false }, draw({ photo, add, tile }) {
  photo(F.vet[0], F.vet[1], 0, 0, 1200, 630, 700, 175, 1.15);
  add('abs', { inset: 0, background: 'linear-gradient(90deg, rgba(19,68,253,.6) 0%, rgba(46,100,253,.2) 22%, rgba(46,100,253,0) 45%, rgba(46,100,253,0) 75%, rgba(19,68,253,.55) 100%)' });
  add('abs', { inset: 0, background: 'linear-gradient(0deg, rgba(85,224,250,.75) 0%, rgba(2,208,253,0) 38%)' });
  tile('paw', 220, 110, 108); tile('calendar', 1000, 100, 96); tile('heart', 980, 250, 84);
} };

// p04 Video call: the person inside a frosted call window, a moon tile for after hours.
S.p04 = { title: '9 Best After-Hours Medical Answering Service Companies', style: 'Call window', draw({ glass, photo, svg, ico, add }) {
  glass(330, 26, 560, 330, 30);
  photo(F.afterhours[0], F.afterhours[1], 348, 44, 524, 250, 262, 110, 1.15, 20);
  add('abs', { left: 760, top: 200, width: 96, height: 76, borderRadius: 14, background: 'linear-gradient(160deg,#2e64fd,#162da1)', border: '3px solid #fff', boxShadow: '0 10px 24px rgba(19,68,253,.3)' },
    `<div style="display:flex;align-items:center;justify-content:center;height:100%">${ico('person', 46, 9, '#fff', '#2dd0e8')}</div>`);
  svg(`${[0, 1, 2].map(i => `<circle cx="${560 + i * 50}" cy="322" r="15" fill="${i === 1 ? '#ff8a8a' : '#2345ff'}"/>`).join('')}`);
  glass(190, 70, 120, 120, 34, {}, `<svg width="64" height="64" viewBox="0 0 64 64"><path d="M40 8a26 26 0 1 0 16 40A22 22 0 0 1 40 8z" fill="#162da1"/><circle cx="50" cy="16" r="3" fill="#2dd0e8"/></svg>`);
} };

// p05 Polaroid: an instant photo pinned at an angle, with a billing note card beside it.
S.p05 = { title: 'Veterinary Billing Virtual Assistant Interview Questions', style: 'Polaroid', draw({ add, glass, ico }) {
  const f = add('solid', { left: 400, top: 24, width: 320, height: 360, borderRadius: 10, transform: 'rotate(-5deg)' });
  const [src, fc, w0, h0] = F.vetbill, w = 284, h = 262, k = Math.max(w / w0, h / h0) * 1.1, iw = w0 * k, ih = h0 * k;
  let l = w / 2 - fc[0] / 100 * iw, t = 100 - fc[1] / 100 * ih; l = Math.min(0, Math.max(w - iw, l)); t = Math.min(0, Math.max(h - ih, t));
  add('panel', { left: 18, top: 18, width: w, height: h, borderRadius: 4 }, `<img src="../photos/${src}.webp" style="position:absolute;width:${iw}px;height:${ih}px;left:${l}px;top:${t}px">`, f);
  add('abs', { left: 520, top: 8, width: 110, height: 32, background: 'rgba(169,210,247,.75)', transform: 'rotate(-8deg)', borderRadius: 4 });
  glass(740, 120, 230, 170, 26, { transform: 'rotate(4deg)' }, `<div>${ico('paw', 56, 9)}<div style="height:10px;width:130px;border-radius:5px;background:#2345ff;margin:14px 0 8px;opacity:.85"></div><div style="height:10px;width:90px;border-radius:5px;background:#2dd0e8"></div></div>`);
} };

// p06 Phone screen: the person answering on a phone, with ringing arcs.
S.p06 = { title: 'Medical Answering Service Outsourcing Services', style: 'Phone screen', draw({ add, photo, svg, tile }) {
  add('abs', { left: 485, top: 18, width: 230, height: 450, borderRadius: 40, background: '#0b1440', boxShadow: '0 30px 70px rgba(19,68,253,.35)' });
  photo(F.answering[0], F.answering[1], 497, 30, 206, 426, 103, 150, 1.0, 30);
  add('abs', { left: 565, top: 40, width: 70, height: 18, borderRadius: 9, background: '#0b1440' });
  svg(`${[60, 95, 130].map((r, i) => `<path d="M740 ${170 - r} A ${r} ${r} 0 0 1 740 ${170 + r}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="${.85 - i * .25}" transform="translate(${r * .2},0)"/>`).join('')}
       ${[60, 95, 130].map((r, i) => `<path d="M460 ${170 - r} A ${r} ${r} 0 0 0 460 ${170 + r}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="${.85 - i * .25}" transform="translate(${-r * .2},0)"/>`).join('')}`);
  tile('phone', 260, 130, 110); tile('headset', 950, 150, 110);
} };

// p07 Slanted panel: the person in a tilted frame on the left, capsule bars and two tiles on the right.
S.p07 = { title: 'In-House Staff vs. Virtual Team for Multi-Specialty Medical Groups: Key Differences and Which to Choose', style: 'Slanted panel', draw({ photo, capsules, tile }) {
  photo(F.multi[0], F.multi[1], 250, 20, 400, 380, 200, 120, 1.0, 26, { clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0 100%)', boxShadow: shadow });
  capsules(650, 70, 6, 40, 240, 16, [.45, .7, .55, .9, .75, 1]);
  tile('clinic', 760, 120, 100); tile('people', 930, 250, 100);
} };

// p08 Organic blob mask: the person in a soft blob, a frosted transcript turning sound into lines.
S.p08 = { title: '7 Best Medical Transcription Outsourcing Companies', style: 'Blob portrait', draw({ photo, glass, svg }) {
  photo(F.transcription[0], F.transcription[1], 640, 10, 400, 380, 200, 140, 1.0, 0,
    { clipPath: 'path("M200 8 C 305 0, 392 70, 396 170 C 400 270, 335 372, 210 376 C 95 380, 10 310, 6 200 C 2 90, 95 16, 200 8 Z")' });
  glass(210, 60, 380, 250, 28);
  svg(`${Array.from({ length: 22 }, (_, i) => { const h = 14 + 56 * Math.abs(Math.sin(i * .7)); return `<rect x="${240 + i * 9}" y="${120 - h / 2}" width="5" height="${h}" rx="2.5" fill="#2345ff" opacity=".85"/>`; }).join('')}
       <path d="M450 120 h40 M480 108 l12 12 -12 12" stroke="#2dd0e8" stroke-width="5" fill="none" stroke-linecap="round"/>
       ${[0, 1, 2, 3].map(i => `<rect x="240" y="${190 + i * 26}" width="${[300, 260, 280, 180][i]}" height="10" rx="5" fill="${i === 3 ? '#2dd0e8' : '#0b1440'}" opacity="${i === 3 ? 1 : .75}"/>`).join('')}`);
} };

// p09 Blue duotone: the whole photo toned into brand blue, solid white tiles on top.
S.p09 = { title: 'What Skills Does a Virtual Dental Assistant Need?', style: 'Duotone', bg: { waves: false }, draw({ photo, add, solid, ico }) {
  photo(F.dental[0], F.dental[1], 0, 0, 1200, 630, 760, 200, 1.0, 0, { filter: 'grayscale(1) contrast(1.1) brightness(1.08)' });
  add('abs', { inset: 0, background: 'linear-gradient(115deg, rgba(19,68,253,.92) 0%, rgba(46,100,253,.7) 45%, rgba(2,208,253,.35) 100%)', mixBlendMode: 'multiply' });
  add('abs', { inset: 0, background: 'linear-gradient(0deg, rgba(85,224,250,.55) 0%, rgba(2,208,253,0) 30%)' });
  solid(200, 80, 190, 190, 48, {}, ico('tooth', 110, 8));
  solid(400, 200, 110, 110, 32, {}, ico('calendar', 62, 9));
} };

// p10 Side-by-side cards: the virtual scribe (in colour) next to an empty in-house desk (muted), swap badge between.
S.p10 = { title: 'Virtual Medical Scribe vs In-House Staff', style: 'Side-by-side cards', draw({ photo, glass, add, ico }) {
  glass(210, 40, 360, 300, 28, { filter: 'saturate(.3)' }, `<div style="text-align:center;opacity:.6">${ico('clinic', 120, 7, '#7a819f', '#9aa3c4')}<div style="margin:16px auto 0;height:10px;width:160px;border-radius:5px;background:#c3c9de"></div></div>`);
  photo(F.scribe[0], F.scribe[1], 630, 40, 360, 300, 180, 110, 1.0, 28, { boxShadow: shadow, border: '5px solid #fff' });
  add('abs', { left: 568, top: 158, width: 64, height: 64, borderRadius: '50%', background: '#2dd0e8', border: '6px solid #fff', boxShadow: shadow },
    `<svg width="52" height="52" viewBox="0 0 52 52"><path d="M14 20 h22 l-6 -6 M38 32 h-22 l6 6" stroke="#0b1440" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
} };
})();
