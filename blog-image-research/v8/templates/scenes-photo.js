// v8 photo scenes p01-p10: a real person in every cover, each with a different layout, on the shared v7 gradient + glass.
// Photos here are STAND-INS from the current covers; swap the file names when the new, diverse people are generated.
(() => {
const S = window.SCENES;
const F = {
  dental: ['what-skills-does-a-virtual-dental-assistant-need', [65, 22]],
  vet: ['7-best-virtual-medical-assistant-companies-for-specialty-veterinary-hospitals', [58, 20]],
  internal: ['how-to-hire-an-internal-medicine-virtual-medical-assistant', [43, 25]],
  afterhours: ['9-best-after-hours-medical-answering-service-companies', [30, 22]],
  vetbill: ['veterinary-billing-virtual-assistant-interview-questions', [52, 22]],
  answering: ['medical-answering-service-outsourcing-services', [43, 22]],
  multi: ['in-house-staff-vs-virtual-team-for-multi-specialty-medical-groups-key-differences-and-which-to-choose', [55, 25]],
  transcription: ['7-best-medical-transcription-outsourcing-companies', [73, 22]],
  ortho: ['how-much-does-an-orthopedics-vma-cost', [70, 25]],
  scribe: ['virtual-medical-scribe-vs-in-house-staff', [40, 28]],
};
const shadow = '0 26px 60px rgba(19,68,253,.28), 0 2px 8px rgba(19,68,253,.12)';

// p01 Arch window: the person framed in a tall arch, specialty tiles stepping down beside it.
S.p01 = { title: 'What Skills Does a Virtual Dental Assistant Need?', style: 'Arch window', draw({ photo, tile, svg }) {
  svg(`<path d="M600 430 V170 A170 170 0 0 1 940 170 V430Z" fill="url(#gGhost)" transform="translate(30,-20)"/>`);
  photo(F.dental[0], F.dental[1], 610, 24, 320, 400, 160, 120, 2.2, '160px 160px 28px 28px', { boxShadow: shadow, border: '6px solid rgba(255,255,255,.9)' });
  tile('tooth', 470, 90, 120); tile('calendar', 380, 220, 104); tile('phone', 510, 300, 88);
} };

// p02 Circle portrait on an orbit: the person at the centre, the day's work orbiting.
S.p02 = { title: '7 Best Virtual Medical Assistant Companies for Specialty Veterinary Hospitals', style: 'Orbit portrait', draw({ photo, tile, svg }) {
  svg(`<ellipse cx="600" cy="190" rx="300" ry="150" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="4 10" opacity=".8"/>
       <ellipse cx="600" cy="190" rx="230" ry="200" fill="none" stroke="#fff" stroke-width="1.5" opacity=".35"/>`);
  photo(F.vet[0], F.vet[1], 455, 45, 290, 290, 145, 115, 2.4, '50%', { boxShadow: shadow, border: '8px solid #fff' });
  tile('paw', 320, 120, 110); tile('calendar', 880, 110, 96); tile('heart', 860, 290, 84); tile('rx', 345, 300, 80);
} };

// p03 Your current look, kept: full-bleed person with see-through blue edges and frosted tiles (no checkmark).
S.p03 = { title: 'How to Hire an Internal Medicine Virtual Medical Assistant', style: 'Current look, refined', bg: { waves: false }, draw({ photo, add, tile }) {
  photo(F.internal[0], F.internal[1], 0, 0, 1200, 630, 520, 160, 1.55);
  add('abs', { inset: 0, background: 'linear-gradient(90deg, rgba(19,68,253,.55) 0%, rgba(46,100,253,.15) 30%, rgba(46,100,253,0) 55%, rgba(46,100,253,.35) 80%, rgba(19,68,253,.7) 100%)' });
  add('abs', { inset: 0, background: 'linear-gradient(0deg, rgba(85,224,250,.7) 0%, rgba(2,208,253,0) 35%)' });
  tile('stethoscope', 860, 90, 112); tile('heart', 980, 230, 92); tile('calendar', 240, 120, 100);
} };

// p04 Video call: the person inside a frosted call window, a moon tile for after hours.
S.p04 = { title: '9 Best After-Hours Medical Answering Service Companies', style: 'Call window', draw({ glass, photo, svg, ico, add }) {
  glass(330, 26, 560, 330, 30);
  photo(F.afterhours[0], F.afterhours[1], 348, 44, 524, 250, 262, 115, 1.9, 20);
  add('abs', { left: 760, top: 200, width: 96, height: 76, borderRadius: 14, background: 'linear-gradient(160deg,#2e64fd,#162da1)', border: '3px solid #fff', boxShadow: '0 10px 24px rgba(19,68,253,.3)' },
    `<div style="display:flex;align-items:center;justify-content:center;height:100%">${ico('person', 46, 9, '#fff', '#2dd0e8')}</div>`);
  svg(`${[0, 1, 2].map(i => `<circle cx="${560 + i * 50}" cy="322" r="15" fill="${i === 1 ? '#ff8a8a' : '#2345ff'}"/>`).join('')}`);
  glass(190, 70, 120, 120, 34, {}, `<svg width="64" height="64" viewBox="0 0 64 64"><path d="M40 8a26 26 0 1 0 16 40A22 22 0 0 1 40 8z" fill="#162da1"/><circle cx="50" cy="16" r="3" fill="#2dd0e8"/></svg>`);
} };

// p05 Polaroid: an instant photo pinned at an angle, with a billing note card under it.
S.p05 = { title: 'Veterinary Billing Virtual Assistant Interview Questions', style: 'Polaroid', draw({ add, photo, glass, ico, svg }) {
  const f = add('solid', { left: 400, top: 24, width: 320, height: 360, borderRadius: 10, transform: 'rotate(-5deg)', padding: 0 });
  photo(F.vetbill[0], F.vetbill[1], 18, 18, 284, 262, 142, 105, 2.3, 4, {}).remove();
  const p = document.createElement('div'); p.className = 'panel'; Object.assign(p.style, { left: '18px', top: '18px', width: '284px', height: '262px', borderRadius: '4px' }); f.appendChild(p);
  const k = Math.max(284 / 1200, 262 / 630) * 2.3, iw = 1200 * k, ih = 630 * k; let l = 142 - .52 * iw, t = 100 - .22 * ih; l = Math.min(0, Math.max(284 - iw, l)); t = Math.min(0, Math.max(262 - ih, t));
  p.innerHTML = `<img src="../photos/${F.vetbill[0]}.webp" style="position:absolute;width:${iw}px;height:${ih}px;left:${l}px;top:${t}px">`;
  add('abs', { left: 520, top: 8, width: 110, height: 32, background: 'rgba(169,210,247,.75)', transform: 'rotate(-8deg)', borderRadius: 4 });
  glass(740, 120, 230, 170, 26, { transform: 'rotate(4deg)' }, `<div>${ico('paw', 56, 9)}<div style="height:10px;width:130px;border-radius:5px;background:#2345ff;margin:14px 0 8px;opacity:.85"></div><div style="height:10px;width:90px;border-radius:5px;background:#2dd0e8"></div></div>`);
} };

// p06 Phone screen: the person answering on a phone, with ringing arcs.
S.p06 = { title: 'Medical Answering Service Outsourcing Services', style: 'Phone screen', draw({ add, photo, svg, tile }) {
  add('abs', { left: 485, top: 18, width: 230, height: 450, borderRadius: 40, background: '#0b1440', boxShadow: '0 30px 70px rgba(19,68,253,.35)' });
  photo(F.answering[0], F.answering[1], 497, 30, 206, 426, 103, 120, 2.6, 30);
  add('abs', { left: 565, top: 40, width: 70, height: 18, borderRadius: 9, background: '#0b1440' });
  svg(`${[60, 95, 130].map((r, i) => `<path d="M${730 + 10} ${170 - r} A ${r} ${r} 0 0 1 ${740} ${170 + r}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="${.85 - i * .25}" transform="translate(${r * .2},0)"/>`).join('')}
       ${[60, 95, 130].map((r, i) => `<path d="M${460} ${170 - r} A ${r} ${r} 0 0 0 ${460} ${170 + r}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="${.85 - i * .25}" transform="translate(${-r * .2},0)"/>`).join('')}`);
  tile('phone', 260, 130, 110); tile('headset', 950, 150, 110);
} };

// p07 Diagonal split: photo cut on a slant at left, capsule bars and two tiles on the right.
S.p07 = { title: 'In-House Staff vs. Virtual Team for Multi-Specialty Medical Groups: Key Differences and Which to Choose', style: 'Diagonal split', bg: { waves: true }, draw({ photo, capsules, tile }) {
  photo(F.multi[0], F.multi[1], 0, 0, 700, 630, 390, 170, 1.5, 0, { clipPath: 'polygon(0 0, 100% 0, 72% 100%, 0 100%)' });
  capsules(720, 70, 6, 40, 240, 16, [.45, .7, .55, .9, .75, 1]);
  tile('clinic', 820, 120, 100); tile('people', 980, 250, 100);
} };

// p08 Organic blob mask: the person in a soft blob, a frosted transcript turning sound into lines.
S.p08 = { title: '7 Best Medical Transcription Outsourcing Companies', style: 'Blob portrait', draw({ photo, glass, svg }) {
  photo(F.transcription[0], F.transcription[1], 620, 10, 420, 380, 210, 140, 2, 0,
    { clipPath: 'path("M210 8 C 320 0, 410 70, 414 170 C 418 270, 350 372, 220 376 C 100 380, 10 310, 6 200 C 2 90, 100 16, 210 8 Z")' });
  glass(210, 60, 380, 250, 28);
  svg(`${Array.from({ length: 22 }, (_, i) => { const h = 14 + 56 * Math.abs(Math.sin(i * .7)); return `<rect x="${240 + i * 9}" y="${120 - h / 2}" width="5" height="${h}" rx="2.5" fill="#2345ff" opacity=".85"/>`; }).join('')}
       <path d="M450 120 h40 M480 108 l12 12 -12 12" stroke="#2dd0e8" stroke-width="5" fill="none" stroke-linecap="round"/>
       ${[0, 1, 2, 3].map(i => `<rect x="${240}" y="${190 + i * 26}" width="${[300, 260, 280, 180][i]}" height="10" rx="5" fill="${i === 3 ? '#2dd0e8' : '#0b1440'}" opacity="${i === 3 ? 1 : .75}"/>`).join('')}`);
} };

// p09 Blue duotone: the whole photo toned into brand blue, one solid white tile on top.
S.p09 = { title: 'How Much Does an Orthopedics VMA Cost?', style: 'Duotone', bg: { waves: false }, draw({ photo, add, solid, ico, svg }) {
  photo(F.ortho[0], F.ortho[1], 0, 0, 1200, 630, 760, 160, 1.6, 0, { filter: 'grayscale(1) contrast(1.1) brightness(1.05)' });
  add('abs', { inset: 0, background: 'linear-gradient(115deg, rgba(19,68,253,.92) 0%, rgba(46,100,253,.7) 45%, rgba(2,208,253,.35) 100%)', mixBlendMode: 'multiply' });
  add('abs', { inset: 0, background: 'linear-gradient(0deg, rgba(85,224,250,.55) 0%, rgba(2,208,253,0) 30%)' });
  solid(220, 90, 190, 190, 48, {}, ico('spine', 110, 8));
  solid(420, 210, 110, 110, 32, {}, ico('coin', 62, 9));
} };

// p10 Side-by-side cards: the virtual scribe (in colour) next to an empty in-house desk (muted), swap badge between.
S.p10 = { title: 'Virtual Medical Scribe vs In-House Staff', style: 'Side-by-side cards', draw({ photo, glass, add, ico, svg }) {
  glass(210, 40, 360, 300, 28, { filter: 'saturate(.3)' }, `<div style="text-align:center;opacity:.6">${ico('clinic', 120, 7, '#7a819f', '#9aa3c4')}<div style="margin:16px auto 0;height:10px;width:160px;border-radius:5px;background:#c3c9de"></div></div>`);
  photo(F.scribe[0], F.scribe[1], 630, 40, 360, 300, 180, 110, 2.1, 28, { boxShadow: shadow, border: '5px solid #fff' });
  add('abs', { left: 568, top: 158, width: 64, height: 64, borderRadius: '50%', background: '#2dd0e8', border: '6px solid #fff', boxShadow: shadow },
    `<svg width="52" height="52" viewBox="0 0 52 52"><path d="M14 20 h22 l-6 -6 M38 32 h-22 l6 6" stroke="#0b1440" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
} };
})();
