// Render v7 covers: node render.js [ids...]   (default: every scene) -> ../renders/<id>.png
const path = require('path'), fs = require('fs');
const { chromium } = require(process.env.PW_MODULE || 'playwright');
(async () => {
  const out = path.join(__dirname, '..', 'renders'); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  await p.goto('file://' + path.join(__dirname, 'cover.html')); await p.waitForLoadState('networkidle');
  let ids = process.argv.slice(2); if (!ids.length) ids = await p.evaluate(() => Object.keys(window.SCENES).sort());
  for (const id of ids) {
    errs.length = 0;
    await p.goto('file://' + path.join(__dirname, 'cover.html') + '?spec=' + encodeURIComponent(JSON.stringify({ id })));
    await p.waitForLoadState('networkidle'); await p.waitForTimeout(120);
    await p.screenshot({ path: path.join(out, id + '.png') });
    if (errs.length) console.log(id, 'ERRORS', errs.join(' | '));
  }
  await b.close(); console.log('rendered', ids.length);
})();
