// Renders sample v7 covers in the honesttaskers.com listing-card replica (desktop 1000 CSS px @2x; mobile 390 @2x).
const path = require('path');
const { chromium } = require(process.env.PW_MODULE || 'playwright');
(async () => {
  const b = await chromium.launch();
  for (const w of [1000, 390]) {
    const p = await b.newPage({ viewport: { width: w + 40, height: 800 }, deviceScaleFactor: 2 });
    await p.goto('file://' + path.join(__dirname, 'ht-listing-mock.html') + `?set=after&w=${w}`);
    await p.waitForLoadState('networkidle');
    const out = path.join(__dirname, '..', 'renders', 'listing', `ht-listing-${w}.png`);
    await p.screenshot({ path: out, fullPage: true }); console.log(out);
  }
  await b.close();
})();
