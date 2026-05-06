// Render key-visual.html in all 3 aspect ratios as PNG.
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'campaign', 'key-visual');
fs.mkdirSync(OUT_DIR, { recursive: true });

const ASPECTS = {
  '1x1':  { w: 1080, h: 1080 },
  '9x16': { w: 1080, h: 1920 },
  '16x9': { w: 1920, h: 1080 },
};

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const [name, { w, h }] of Object.entries(ASPECTS)) {
    const ctx = await browser.newContext({
      viewport: { width: w, height: h },
      deviceScaleFactor: 2,  // 2x supersample for crisp output
    });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => console.error('  ERROR:', e.message));
    const url = 'file://' + path.join(ROOT, 'key-visual.html') + '?aspect=' + name;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(async () => { await document.fonts.ready; });
    await page.waitForTimeout(400);
    const out = path.join(OUT_DIR, `kv-${name}.png`);
    await page.screenshot({ path: out, omitBackground: false, fullPage: false });
    const sz = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`✓ ${name}  ${w*2}×${h*2}  ${sz} KB  →  ${out}`);
    await ctx.close();
  }
  await browser.close();
})();
