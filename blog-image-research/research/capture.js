// Blog cover capture for the reference sites in research/sites.json (plus honesttaskers.com).
// Run from blog-image-research/:  node research/capture.js [site ...]
// Output per site: research/<site>/index-1440.png, index-390.png, covers/NN.<ext>, covers.json
// Covers are found by rendered size, not URL patterns: every image (or CSS background) that is
// rendered at least 240x120 on the 1440px index page and sits inside a link counts as a card cover.
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PW_MODULE || 'playwright');

const ALL = JSON.parse(fs.readFileSync(path.join(__dirname, 'sites.json'), 'utf8'));
const pick = process.argv.slice(2);
const SITES = pick.length ? Object.fromEntries(pick.map(k => [k, ALL[k]])) : ALL;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36';
const MAX_COVERS = 16;
const MAX_SHOT_H = 7000;

async function dismiss(page) {
  // Close common cookie banners so they don't cover the grid.
  for (const t of ['Accept all', 'Accept All', 'Accept', 'I agree', 'Got it', 'Allow all', 'OK']) {
    const b = page.getByRole('button', { name: t, exact: true });
    if (await b.count().catch(() => 0)) { await b.first().click({ timeout: 1500 }).catch(() => {}); break; }
  }
}

async function scrollAll(page) {
  for (let i = 0; i < 30; i++) {
    const done = await page.evaluate(() => { window.scrollBy(0, window.innerHeight * 0.85); return window.scrollY + window.innerHeight >= (document.scrollingElement || document.documentElement).scrollHeight - 5; });
    await page.waitForTimeout(350);
    if (done) break;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
}

function findCovers() {
  const best = img => {
    const ss = img.getAttribute('srcset') || img.getAttribute('data-srcset');
    if (ss) {
      const c = ss.split(',').map(s => s.trim().split(/\s+/)).filter(x => x[0]);
      c.sort((a, b) => (parseInt(b[1]) || 0) - (parseInt(a[1]) || 0));
      if (c[0]) return c[0][0];
    }
    return img.currentSrc || img.src || img.getAttribute('data-src');
  };
  const out = [], seen = new Set();
  const consider = (el, src) => {
    if (!src || src.startsWith('data:') || seen.has(src)) return;
    const r = el.getBoundingClientRect();
    if (r.width < 240 || r.height < 120) return;
    const a = el.closest('a[href]');
    if (!a) return;
    seen.add(src);
    const card = a.closest('article, li, [class*="card" i], [class*="post" i]') || a;
    const title = (card.querySelector('h1,h2,h3,h4') || {}).innerText || a.innerText || el.alt || '';
    out.push({ src, href: a.href, alt: el.alt || '', title: title.trim().split('\n')[0].slice(0, 160),
      renderedW: Math.round(r.width), renderedH: Math.round(r.height), cardRatio: +(r.width / r.height).toFixed(3),
      y: Math.round(r.top + window.scrollY) });
  };
  document.querySelectorAll('img').forEach(img => consider(img, best(img)));
  document.querySelectorAll('a[href] *').forEach(el => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg.startsWith('url(')) consider(el, bg.slice(4, -1).replace(/["']/g, ''));
  });
  out.sort((a, b) => a.y - b.y);
  return out;
}

(async () => {
  const browser = await chromium.launch({ args: ['--disable-blink-features=AutomationControlled'], ...(process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY } } : {}) });
  const summary = {};
  for (const [site, url] of Object.entries(SITES)) {
    const dir = path.join(__dirname, site); fs.mkdirSync(path.join(dir, 'covers'), { recursive: true });
    try {
      let covers = [];
      for (const w of [1440, 390]) {
        const ctx = await browser.newContext({ userAgent: UA, viewport: { width: w, height: 900 }, deviceScaleFactor: 1, isMobile: w < 600, locale: 'en-US' });
        const page = await ctx.newPage();
        const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await page.waitForTimeout(1500);
        await dismiss(page);
        await scrollAll(page);
        const h = Math.min(MAX_SHOT_H, await page.evaluate(() => (document.scrollingElement || document.documentElement).scrollHeight));
        await page.screenshot({ path: path.join(dir, `index-${w}.png`), fullPage: true, clip: { x: 0, y: 0, width: w, height: h } });
        if (w === 1440) {
          summary[site] = { url, status: resp && resp.status(), finalUrl: page.url() };
          covers = (await page.evaluate(findCovers)).slice(0, MAX_COVERS);
          let n = 0;
          for (const c of covers) {
            try {
              const r = await ctx.request.get(new URL(c.src, page.url()).href, { timeout: 30000 });
              const type = (r.headers()['content-type'] || '').split(';')[0];
              const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif', 'image/gif': 'gif', 'image/svg+xml': 'svg' }[type] || 'img';
              c.file = `covers/${String(++n).padStart(2, '0')}.${ext}`;
              fs.writeFileSync(path.join(dir, c.file), await r.body());
            } catch (e) { c.downloadError = e.message.split('\n')[0]; }
          }
          fs.writeFileSync(path.join(dir, 'covers.json'), JSON.stringify(covers, null, 2));
          summary[site].covers = covers.filter(c => c.file).length;
        }
        await ctx.close();
      }
      console.log(site, JSON.stringify(summary[site]));
    } catch (e) {
      summary[site] = { url, error: e.message.split('\n')[0] };
      console.log(site, 'FAILED', summary[site].error);
    }
  }
  fs.writeFileSync(path.join(__dirname, 'capture-summary.json'), JSON.stringify(summary, null, 2));
  await browser.close();
})();
