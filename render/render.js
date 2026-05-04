// Renders index.html?record=1 frame-by-frame and pipes PNGs to ffmpeg → MP4.
//
//   PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node render.js
//
// Defaults: 1920x1080, 30fps, 39s = 1170 frames, output: ../netflix-asiacell-journey.mp4

const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const HTML_URL = 'file://' + path.join(ROOT, 'index.html') + '?record=1';

const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 30;
const DURATION = 39;
const TOTAL_FRAMES = DURATION * FPS;
const OUT = path.join(ROOT, 'netflix-asiacell-journey.mp4');

(async () => {
  console.log(`▶ rendering ${TOTAL_FRAMES} frames @ ${FPS}fps → ${OUT}`);

  const ff = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'png',
    '-r', String(FPS),
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'medium',
    '-crf', '20',
    '-movflags', '+faststart',
    OUT,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });

  ff.on('error', (e) => { console.error('ffmpeg error:', e); process.exit(1); });

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();

  await page.goto(HTML_URL, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__record && window.__record.ready, { timeout: 15000 });

  // Give fonts + the radial-gradient backgrounds a moment to settle on first paint.
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(250);

  const t0 = Date.now();
  for (let f = 0; f < TOTAL_FRAMES; f++) {
    const t = f / FPS;
    await page.evaluate((time) => window.__record.setTime(time), t);
    // Two rAFs so React commit + browser paint both flush before screenshot.
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

    const buf = await page.screenshot({ type: 'png', omitBackground: false, fullPage: false });
    if (!ff.stdin.write(buf)) {
      await new Promise((r) => ff.stdin.once('drain', r));
    }

    if (f % 30 === 0 || f === TOTAL_FRAMES - 1) {
      const elapsed = (Date.now() - t0) / 1000;
      const rate = (f + 1) / elapsed;
      const eta = (TOTAL_FRAMES - f - 1) / rate;
      process.stdout.write(`\r  frame ${f + 1}/${TOTAL_FRAMES}  (${rate.toFixed(1)} fps, eta ${eta.toFixed(0)}s)   `);
    }
  }
  console.log();

  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await browser.close();

  const sz = fs.statSync(OUT).size;
  console.log(`✓ wrote ${OUT} (${(sz / 1024 / 1024).toFixed(1)} MB) in ${((Date.now()-t0)/1000).toFixed(1)}s`);
})();
