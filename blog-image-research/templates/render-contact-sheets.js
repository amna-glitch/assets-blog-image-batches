// Renders the before/after mock blog grids at desktop (1440) and mobile (390) widths.
const path = require('path');
const { chromium } = require(process.env.PW_MODULE || 'playwright');
(async () => {
  const b = await chromium.launch();
  for (const [set, w] of [['after', 1440], ['before', 1440], ['after', 390], ['before', 390]]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
    p.on("console", m => console.log(m.text()));
    await p.goto('file://' + path.join(__dirname, 'contact-sheet.html') + `?set=${set}&w=${w}`);
    await p.waitForLoadState('networkidle');
    const out = path.join(__dirname, '..', 'renders', `contact-sheet-${set}-${w}.png`);
    await p.screenshot({ path: out, fullPage: true }); console.log(out);
  }
  await b.close();
})();
