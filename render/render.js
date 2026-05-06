// Render index.html?record=1 to MP4 via Playwright + ffmpeg.
//
// Env vars (all optional):
//   WIDTH    logical canvas width  (default 1920)
//   HEIGHT   logical canvas height (default 1080)
//   DSF      device scale factor   (default 1)   — set 2 for supersampled output
//   FPS      frames per second     (default 30)
//   PARAMS   extra URL query params (e.g. "orient=portrait")
//   OUT      output file path       (default ../netflix-asiacell-journey.mp4)
//   CRF      x264 quality           (default 20, lower=better)
//
// Examples:
//   node render.js                                              # 1080p landscape
//   WIDTH=1920 HEIGHT=1080 DSF=2 OUT=../out-4k.mp4 node render.js
//   WIDTH=1080 HEIGHT=1920 PARAMS=orient=portrait OUT=../out-portrait.mp4 node render.js

const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');

const WIDTH    = parseInt(process.env.WIDTH  || '1920', 10);
const HEIGHT   = parseInt(process.env.HEIGHT || '1080', 10);
const DSF      = parseFloat(process.env.DSF || '1');
const FPS      = parseInt(process.env.FPS    || '30', 10);
const PARAMS   = process.env.PARAMS || '';
const OUT      = path.resolve(process.env.OUT || path.join(ROOT, 'netflix-asiacell-journey.mp4'));
const CRF      = parseInt(process.env.CRF || '20', 10);
const HTML_FILE = process.env.HTML || 'index.html';
const DURATION_OVERRIDE = process.env.DURATION ? parseFloat(process.env.DURATION) : null;

const DURATION = DURATION_OVERRIDE || 39;
const TOTAL_FRAMES = Math.round(DURATION * FPS);
const OUT_W = Math.round(WIDTH * DSF);
const OUT_H = Math.round(HEIGHT * DSF);

const queryStr = '?record=1' + (PARAMS ? '&' + PARAMS : '');
const HTML_URL = 'file://' + path.join(ROOT, HTML_FILE) + queryStr;

(async () => {
  console.log(`▶ ${OUT_W}×${OUT_H} @ ${FPS}fps · ${TOTAL_FRAMES} frames · CRF ${CRF}`);
  console.log(`  url:   ${HTML_URL}`);
  console.log(`  out:   ${OUT}`);

  const ff = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'png',
    '-r', String(FPS),
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'medium',
    '-crf', String(CRF),
    '-movflags', '+faststart',
    OUT,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });
  ff.on('error', (e) => { console.error('ffmpeg error:', e); process.exit(1); });

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: DSF,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();

  await page.goto(HTML_URL, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__record && window.__record.ready, { timeout: 15000 });
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(250);

  const t0 = Date.now();
  for (let f = 0; f < TOTAL_FRAMES; f++) {
    const t = f / FPS;
    await page.evaluate((time) => window.__record.setTime(time), t);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
    const buf = await page.screenshot({ type: 'png', omitBackground: false, fullPage: false });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
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
  console.log(`✓ ${OUT} (${(sz / 1024 / 1024).toFixed(1)} MB) in ${((Date.now()-t0)/1000).toFixed(1)}s`);
})();
