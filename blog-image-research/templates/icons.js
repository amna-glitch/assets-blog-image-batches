// Honest Taskers editorial icon set: original monoline drawings on a 120x120 grid.
// Every icon is stroke-only. Elements with class "ac" take the teal accent.
// Stroke width is set by the template (default 6 units = 6px at 120px icon size,
// scaled proportionally) so all icons share one optical weight.
window.HT_ICONS = {
  tooth: `<path d="M30 32C30 19 42 14 50 18c5 2 15 2 20 0 8-4 20 1 20 14 0 15-6 21-8 35-2 17-4 35-12 35s-6-24-10-24-2 24-10 24-10-18-12-35c-2-14-8-20-8-35z"/><path class="ac" d="M40 38c0-7 4-11 10-11"/>`,
  paw: `<ellipse cx="26" cy="52" rx="7" ry="10"/><ellipse cx="46" cy="30" rx="7" ry="10"/><ellipse cx="74" cy="30" rx="7" ry="10"/><ellipse cx="94" cy="52" rx="7" ry="10"/><path class="ac" d="M60 58c15 0 29 18 27 30-2 11-14 9-27 9s-25 2-27-9c-2-12 12-30 27-30z"/>`,
  stethoscope: `<path d="M32 18h12M76 18h12M38 18v30a22 22 0 0 0 44 0V18"/><path d="M60 70v12a18 18 0 0 0 36 0v-8"/><circle class="ac" cx="96" cy="64" r="10"/>`,
  phone: `<path d="M38 22h12l7 18-9 8c5 12 13 20 24 24l8-9 18 7v12c0 8-6 14-14 14-29-2-58-31-60-60 0-8 6-14 14-14z"/><path class="ac" d="M72 22a26 26 0 0 1 26 26M72 36a12 12 0 0 1 12 12"/>`,
  headset: `<path d="M28 66v-8a32 32 0 0 1 64 0v8"/><rect x="22" y="60" width="16" height="28" rx="7"/><rect x="82" y="60" width="16" height="28" rx="7"/><path class="ac" d="M90 88c0 12-10 18-24 18h-4"/>`,
  calendar: `<rect x="22" y="28" width="76" height="70" rx="10"/><path d="M22 48h76M42 18v18M78 18v18"/><rect class="ac" x="64" y="64" width="16" height="16" rx="3"/>`,
  clipboard: `<rect x="28" y="24" width="64" height="82" rx="10"/><rect x="46" y="16" width="28" height="16" rx="6"/><path d="M44 58h32M44 72h32"/><path class="ac" d="M44 86h16"/>`,
  shield: `<path d="M60 14l34 12v30c0 24-14 40-34 50-20-10-34-26-34-50V26z"/><path class="ac" d="M44 60l12 12 22-24"/>`,
  lock: `<rect x="28" y="52" width="64" height="52" rx="10"/><path d="M42 52V40a18 18 0 0 1 36 0v12"/><path class="ac" d="M60 70v14"/>`,
  clinic: `<path d="M24 104V40a6 6 0 0 1 6-6h60a6 6 0 0 1 6 6v64M12 104h96M52 104V84h16v20"/><path class="ac" d="M60 46v16M52 54h16"/>`,
  laptop: `<rect x="28" y="28" width="64" height="48" rx="6"/><path d="M14 92h92"/><path class="ac" d="M50 52l8 8 14-14"/>`,
  document: `<path d="M34 14h36l18 18v74H34z"/><path d="M70 14v18h18M46 58h30M46 72h30"/><path class="ac" d="M46 86h18"/>`,
  magnifier: `<circle cx="52" cy="52" r="28"/><path d="M72 72l26 26"/><path class="ac" d="M40 52a12 12 0 0 1 12-12"/>`,
  rx: `<rect x="40" y="14" width="40" height="16" rx="4"/><rect x="34" y="30" width="52" height="76" rx="9"/><path class="ac" d="M60 56v24M48 68h24"/>`,
  heart: `<path d="M60 98C30 78 18 62 18 46c0-14 10-24 22-24 9 0 16 6 20 12 4-6 11-12 20-12 12 0 22 10 22 24 0 16-12 32-42 52z"/><path class="ac" d="M32 58h14l6-12 8 24 6-12h22"/>`,
  person: `<circle cx="60" cy="40" r="17"/><path d="M28 102c0-20 14-32 32-32s32 12 32 32"/>`,
  check: `<circle cx="60" cy="60" r="42"/><path class="ac" d="M42 60l13 13 25-25"/>`,
  globe: `<circle cx="60" cy="60" r="42"/><ellipse cx="60" cy="60" rx="18" ry="42"/><path class="ac" d="M18 60h84"/>`,
  coin: `<circle cx="60" cy="60" r="42"/><path class="ac" d="M73 46c-2-6-7-8-13-8-8 0-12 5-12 10 0 13 26 9 26 23 0 7-6 11-14 11s-12-3-14-9M60 30v8M60 82v8"/>`,
  wave: `<path d="M20 60h8M36 46v28M48 34v52M60 50v20M72 38v44M84 48v24M92 60h8"/><path class="ac" d="M60 50v20"/>`,
  ear: `<path d="M38 50a24 24 0 0 1 48 0c0 16-14 20-14 34 0 12-8 20-18 20-8 0-14-5-16-12"/><path class="ac" d="M50 52a12 12 0 0 1 22 2c0 8-8 10-8 18"/>`,
  eye: `<path d="M12 60c12-20 28-30 48-30s36 10 48 30c-12 20-28 30-48 30S24 80 12 60z"/><circle class="ac" cx="60" cy="60" r="14"/>`,
  spine: `<rect x="48" y="14" width="24" height="16" rx="6"/><rect x="46" y="38" width="28" height="16" rx="6"/><rect x="44" y="62" width="32" height="16" rx="6"/><rect class="ac" x="42" y="86" width="36" height="18" rx="7"/>`,
  brain: `<path d="M58 22c-8-6-22-2-24 8-10 2-14 12-10 20-6 6-4 18 4 22 0 10 10 16 18 14 4 8 12 10 16 6"/><path d="M62 22c8-6 22-2 24 8 10 2 14 12 10 20 6 6 4 18-4 22 0 10-10 16-18 14-4 8-12 10-16 6"/><path class="ac" d="M60 22v70"/>`,
  people: `<circle cx="44" cy="44" r="13"/><path d="M18 96c0-16 11-26 26-26s26 10 26 26"/><circle class="ac" cx="82" cy="48" r="11"/><path class="ac" d="M76 72c3-1 5-1 8-1 12 0 20 9 20 22"/>`,
};

// Shared helper: returns an <svg> string for an icon at a given pixel size.
window.htIcon = function (name, size, stroke, color, accent) {
  const body = window.HT_ICONS[name] || window.HT_ICONS.document;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${size}" height="${size}"
    fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"
    style="--ac:${accent}"><style>.ac{stroke:${accent}}</style>${body}</svg>`;
};

// Read the template spec from the URL (?spec=<urlencoded JSON>) or fall back to a default.
window.htSpec = function (defaults) {
  try {
    const raw = new URLSearchParams(location.search).get('spec');
    return Object.assign({}, defaults, raw ? JSON.parse(raw) : {});
  } catch (e) { return defaults; }
};

// Optional crop guides: 16:9, 4:3 and 1:1 centre crops of the 1200x630 canvas.
window.htGuides = function (canvas) {
  if (new URLSearchParams(location.search).get('guides') !== '1') return;
  canvas.classList.add('guides');
  ['r169', 'r43', 'r11'].forEach(c => { const d = document.createElement('div'); d.className = 'g ' + c; canvas.appendChild(d); });
};
