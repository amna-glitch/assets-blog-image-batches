// Render every job in jobs.json to PNG (1200x630) with headless Chromium.
// Usage: node render.js [jobs.json] [outDir] [--guides]
// Needs the `playwright` npm package; set PW_MODULE to its path if it is not resolvable.
const path = require('path');
const fs = require('fs');
const { chromium } = require(process.env.PW_MODULE || 'playwright');

(async () => {
  const args = process.argv.slice(2);
  const guides = args.includes('--guides');
  const [jobsFile = path.join(__dirname, 'jobs.json'), outDir = path.join(__dirname, '..', 'renders')] = args.filter(a => !a.startsWith('--'));
  const jobs = JSON.parse(fs.readFileSync(jobsFile, 'utf8'));
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const j of jobs) {
    const url = 'file://' + path.join(__dirname, j.tpl) + '?spec=' + encodeURIComponent(JSON.stringify(j.spec)) + (guides ? '&guides=1' : '');
    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(100);
    const out = path.join(outDir, j.out + (guides ? '.guides' : '') + '.png');
    await page.screenshot({ path: out });
    console.log('rendered', out);
  }
  await browser.close();
})();
