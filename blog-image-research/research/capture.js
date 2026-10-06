// Step 1 capture for the reference blogs and honesttaskers.com/articles.
// Blocked so far by the session network policy (proxy 403); needs outbound access to these domains.
// Once the domains are allowed, run:  node research/capture.js [site ...]   (from blog-image-research/)
// Output per site: research/<site>/index-1440.png, index-390.png, images/*, images.json
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PW_MODULE || 'playwright');

// Site list: research/sites.json (name -> blog index URL). Pass names as args to capture a subset.
const ALL = JSON.parse(fs.readFileSync(path.join(__dirname, 'sites.json'), 'utf8'));
const pick = process.argv.slice(2);
const SITES = pick.length ? Object.fromEntries(pick.map(k => [k, ALL[k]])) : ALL;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36';
const MIN_ARTICLES = 12;

async function scrollAll(page) {
  let last = 0;
  for (let i = 0; i < 40; i++) {
    const h = await page.evaluate(() => { window.scrollBy(0, window.innerHeight * 0.8); return document.body.scrollHeight; });
    await page.waitForTimeout(400);
    const y = await page.evaluate(() => window.scrollY + window.innerHeight);
    if (y >= h && h === last) break;
    last = h;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

// Article links plus any card image found via <img>, srcset or CSS background-image.
function collectCards() {
  const pick = img => {
    if (!img) return null;
    const ss = img.getAttribute('srcset') || img.getAttribute('data-srcset');
    if (ss) { const c = ss.split(',').map(s => s.trim().split(/\s+/)); c.sort((a, b) => parseInt(b[1]) - parseInt(a[1])); return c[0][0]; }
    return img.currentSrc || img.src || img.getAttribute('data-src');
  };
  const out = new Map();
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.href;
    if (!/\/(blog|articles?)\//.test(href) || href.endsWith('/blog') || href.endsWith('/articles')) return;
    const card = a.closest('article, li, [class*="card" i], [class*="post" i]') || a;
    let src = pick(card.querySelector('img'));
    if (!src) {
      const bg = [card, ...card.querySelectorAll('*')].map(e => getComputedStyle(e).backgroundImage).find(b => b && b.startsWith('url('));
      if (bg) src = bg.slice(4, -1).replace(/["']/g, '');
    }
    if (!out.has(href) || (!out.get(href).src && src)) out.set(href, { href, src: src || null, title: (card.innerText || '').trim().split('\n')[0].slice(0, 160) });
  });
  return [...out.values()];
}

(async () => {
  const browser = await chromium.launch(process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY } } : {});
  for (const [site, url] of Object.entries(SITES)) {
    const dir = path.join(__dirname, site); fs.mkdirSync(path.join(dir, 'images'), { recursive: true });
    try {
      for (const w of [1440, 390]) {
        const ctx = await browser.newContext({ userAgent: UA, viewport: { width: w, height: 900 }, deviceScaleFactor: 1, isMobile: w < 600 });
        const page = await ctx.newPage();
        await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(2000);
        await scrollAll(page);
        await page.screenshot({ path: path.join(dir, `index-${w}.png`), fullPage: true });
        if (w === 1440) {
          let cards = await page.evaluate(collectCards);
          // Fill gaps from each article's og:image.
          for (const c of cards.slice(0, Math.max(MIN_ARTICLES, 16))) {
            try {
              const p2 = await ctx.newPage();
              await p2.goto(c.href, { waitUntil: 'domcontentloaded', timeout: 45000 });
              c.og = await p2.evaluate(() => (document.querySelector('meta[property="og:image"]') || {}).content || null);
              await p2.close();
            } catch (e) { c.ogError = e.message.split('\n')[0]; }
          }
          cards = cards.filter(c => c.src || c.og);
          let n = 0;
          for (const c of cards) {
            for (const [kind, u] of [['card', c.src], ['og', c.og]]) {
              if (!u) continue;
              try {
                const r = await ctx.request.get(new URL(u, url).href);
                const ext = ((r.headers()['content-type'] || '').split('/')[1] || 'img').split(';')[0].replace('jpeg', 'jpg').replace('svg+xml', 'svg');
                const file = `${String(++n).padStart(2, '0')}-${kind}.${ext}`;
                fs.writeFileSync(path.join(dir, 'images', file), await r.body());
                const dims = await page.evaluate(async src => new Promise(res => { const i = new Image(); i.onload = () => res([i.naturalWidth, i.naturalHeight]); i.onerror = () => res([0, 0]); i.src = src; }), new URL(u, url).href);
                (c.files = c.files || []).push({ kind, file, url: u, width: dims[0], height: dims[1], ratio: dims[1] ? +(dims[0] / dims[1]).toFixed(3) : null });
              } catch (e) { c.downloadError = e.message.split('\n')[0]; }
            }
          }
          fs.writeFileSync(path.join(dir, 'images.json'), JSON.stringify(cards, null, 2));
          console.log(site, 'articles with images:', cards.length);
        }
        await ctx.close();
      }
    } catch (e) { console.log(site, 'BLOCKED/FAILED:', e.message.split('\n')[0]); }
  }
  await browser.close();
})();
