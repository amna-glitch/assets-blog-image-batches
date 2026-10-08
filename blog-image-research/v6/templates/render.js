// Render v6 series covers: node render.js [jobs.json] [outDir]
const path = require('path'), fs = require('fs');
const { chromium } = require(process.env.PW_MODULE || 'playwright');
(async () => {
  const [jf = path.join(__dirname, 'jobs.json'), out = path.join(__dirname, '..', 'renders')] = process.argv.slice(2);
  const jobs = JSON.parse(fs.readFileSync(jf, 'utf8')); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  for (const j of jobs) {
    await p.goto('file://' + path.join(__dirname, 'cover.html') + '?spec=' + encodeURIComponent(JSON.stringify(j.spec)));
    await p.waitForLoadState('networkidle'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
    await p.screenshot({ path: path.join(out, j.out + '.png') });
  }
  await b.close(); console.log('rendered', jobs.length);
})();
