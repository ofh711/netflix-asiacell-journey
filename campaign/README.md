# Asiacell × Netflix — ATL Campaign Assets

**Tagline:** آسياسيل × نتفلكس · مشاهدة بلا حدود
**Launch:** May 10, 2026
**CTA:** netflix.com/iq

This folder contains all Above-The-Line (ATL) assets. The Below-The-Line (BTL) "how-to" video lives at the repo root (`netflix-asiacell-journey.mp4` and its variants).

## Contents

```
campaign/
├── key-visual/
│   ├── kv-1x1.png         (2160×2160 — Instagram feed, Facebook post)
│   ├── kv-9x16.png        (2160×3840 — Stories, Reels, TikTok)
│   └── kv-16x9.png        (3840×2160 — billboard, banner, web hero)
├── video/
│   ├── atl-1x1.mp4        (1080×1080, 20s — Instagram/Facebook feed)
│   ├── atl-9x16.mp4       (1080×1920, 20s — Stories, Reels, TikTok)
│   └── atl-16x9.mp4       (1920×1080, 20s — pre-roll, YouTube, OOH digital)
├── social-captions.md     (Facebook · Instagram · LinkedIn — 3 variants each)
├── press-release-ar.md    (Arabic press release)
├── press-release-ku.md    (Sorani Kurdish press release)
├── press-release-en.md    (English press release)
└── README.md              (this file)
```

## Sources

- **Key Visual** — generated from `../key-visual.html` (CSS-only, supports `?aspect=1x1|9x16|16x9`)
- **ATL Spot** — generated from `../atl-spot.html` (React + Babel, 20s timeline, supports `?aspect=...`)
- Both rendered to PNG/MP4 via `../render/render.js` and `../render/render-kv.js` using Playwright + ffmpeg.

## Re-rendering

```bash
cd render

# Key visuals (all 3 aspects, ~30s)
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node render-kv.js

# ATL videos (sequential, ~10 min total)
HTML=atl-spot.html DURATION=20 WIDTH=1920 HEIGHT=1080 PARAMS=aspect=16x9 OUT=../campaign/video/atl-16x9.mp4 node render.js
HTML=atl-spot.html DURATION=20 WIDTH=1080 HEIGHT=1920 PARAMS=aspect=9x16 OUT=../campaign/video/atl-9x16.mp4 node render.js
HTML=atl-spot.html DURATION=20 WIDTH=1080 HEIGHT=1080 PARAMS=aspect=1x1  OUT=../campaign/video/atl-1x1.mp4  node render.js
```
