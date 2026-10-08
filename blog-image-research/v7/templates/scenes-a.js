// Scenes s01-s18. Each: SCENES[id] = { title, style, draw(ctx) }. No words on the image.
(() => {
const S = window.SCENES;

// s01 Glass pair: two frosted tiles joined by a liquid bridge (the VA plugged into the EHR).
S.s01 = { title: 'Virtual Medical Assistant in Epic', style: 'Glass pair', draw({ svg, glass, ico, P }) {
  svg(`<path d="M520 150 C 560 120, 640 120, 680 150 L680 230 C 640 260, 560 260, 520 230Z" fill="url(#gGlass)" stroke="#fff" stroke-width="1.5" opacity=".9"/>`);
  glass(330, 60, 250, 250, 76, {}, ico('headset', 130, 8));
  glass(620, 60, 250, 250, 76, {}, ico('laptop', 130, 8));
} };

// s02 Capsule equaliser: see-through capsules as call volume behind one glass headset tile.
S.s02 = { title: 'Healthcare Call Center Outsourcing: Services, Costs, and Providers', style: 'Capsule equaliser', draw({ capsules, tile, glass, ico }) {
  capsules(150, 60, 14, 52, 290, 16, [.35, .5, .7, .55, .85, 1, .8, .6, .9, .7, .5, .65, .4, .3]);
  tile('headset', 600, 190, 190);
  glass(760, 70, 96, 96, 48, {}, ico('phone', 50, 9));
  glass(350, 230, 86, 86, 43, {}, ico('phone', 44, 9));
} };
})();
