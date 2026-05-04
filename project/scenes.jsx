// Scenes — composed shots for each step of the journey
// IMPORTANT: <Sprite> uses GLOBAL timeline time. Inside child scenes we
// must NOT nest <Sprite> — instead compute sub-timings from the parent's
// useSprite() localTime/progress.

// ───────── Scene 0: Asiacell brand intro ─────────
function SceneIntro() {
  const { progress } = useSprite();
  const bgScale = interpolate([0, 0.5, 1], [1, 1.05, 1.15])(progress);
  const markScale = interpolate([0, 0.4, 0.7, 1], [0.3, 1.1, 1, 0.95], Easing.easeOutBack)(progress);
  const markOpacity = interpolate([0, 0.2, 0.85, 1], [0, 1, 1, 0])(progress);
  const wordOpacity = interpolate([0.35, 0.55, 0.85, 1], [0, 1, 1, 0])(progress);
  const wordX = interpolate([0.35, 0.6], [40, 0], Easing.easeOutCubic)(progress);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(circle at 50% 50%, ${BRAND.asiacellOrange} 0%, ${BRAND.asiacellOrangeDeep} 60%, #8B2A05 100%)`,
      transform: `scale(${bgScale})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {[1, 2, 3, 4].map(i => (
        <div key={i} style={{
          position: 'absolute',
          width: 400 + i * 350, height: 400 + i * 350,
          borderRadius: '50%',
          border: `2px solid rgba(255,255,255,${0.06 + (1 - i/5) * 0.04})`,
          opacity: clamp(progress * 2 - i * 0.05, 0, 1),
        }} />
      ))}

      <div style={{
        opacity: markOpacity,
        transform: `scale(${markScale})`,
      }}>
        <img src={BRAND.asiacellLogoSrc} alt="Asiacell"
          style={{ height: 360, width: 'auto', filter: 'brightness(0) invert(1)' }} />
      </div>
    </div>
  );
}

// ───────── Scene 1: Hero title ─────────
function SceneHero() {
  const { progress, localTime } = useSprite();

  // Logos in 0..3s of local time, fade out 3..4s
  // local entry: 0..0.5 of progress -> in, 0.85..1 -> out
  const lockupIn = Easing.easeOutCubic(clamp(progress / 0.25, 0, 1));
  const lockupOut = clamp((progress - 0.85) / 0.15, 0, 1);
  const lockupOp = (1 - lockupOut) * lockupIn;
  const lockupTy = (1 - lockupIn) * 30 - lockupOut * 20;
  const xMultScale = 0.6 + Easing.easeOutBack(clamp((progress - 0.18) / 0.18, 0, 1)) * 0.4;

  // Caption in 0.25..1 of progress
  const capProgress = clamp((progress - 0.18) / 0.7, 0, 1);
  const capIn = Easing.easeOutCubic(clamp(capProgress / 0.2, 0, 1));
  const capOut = clamp((progress - 0.85) / 0.15, 0, 1);
  const capOp = (1 - capOut) * capIn;
  const capTy = (1 - capIn) * 30 - capOut * 16;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(135deg, ${BRAND.netflixBlack} 0%, #1a0508 50%, #2a0a0a 100%)`,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        left: `${-30 + progress * 100}%`, top: '-30%',
        width: '60%', height: '160%',
        background: `radial-gradient(ellipse, ${BRAND.asiacellOrange}33 0%, transparent 60%)`,
        filter: 'blur(40px)',
      }} />

      {/* Lockup */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 240,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 60,
        opacity: lockupOp,
        transform: `translateY(${lockupTy}px)`,
      }}>
        <img src={BRAND.asiacellLogoSrc} alt="Asiacell"
          style={{ height: 180, width: 'auto' }} />

        <div style={{
          fontSize: 80, fontWeight: 200, color: 'rgba(255,255,255,0.5)',
          fontFamily: 'system-ui',
          transform: `scale(${xMultScale})`,
        }}>×</div>

        <div style={{
          fontFamily: '"Bebas Neue", "Oswald", Impact, sans-serif',
          fontSize: 120, fontWeight: 900, color: '#E50914',
          letterSpacing: '0.02em',
          transform: 'scaleY(1.15)',
          textShadow: '0 8px 40px rgba(229,9,20,0.6)',
          lineHeight: 0.85,
        }}>NETFLIX</div>
      </div>

      {/* Caption */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0, top: 540,
        textAlign: 'center',
        direction: 'rtl',
        fontFamily: '"Tajawal", "Cairo", system-ui',
        opacity: capOp,
        transform: `translateY(${capTy}px)`,
      }}>
        <div style={{
          fontSize: 88, fontWeight: 800, color: '#fff', lineHeight: 1.15,
          letterSpacing: '-0.01em',
          textShadow: '0 4px 30px rgba(0,0,0,0.4)',
        }}>
          اشترك في نتفلكس برصيد آسياسيل
        </div>
        <div style={{
          marginTop: 18,
          fontSize: 36, fontWeight: 500,
          color: 'rgba(255,255,255,0.75)', lineHeight: 1.3,
        }}>
          بثلاث خطوات سهلة، من هاتفك مباشرةً
        </div>
      </div>
    </div>
  );
}

// ───────── Generic step scene ─────────
function StepScene({ stepNum, captionAr, subAr, ScreenComp }) {
  const { progress } = useSprite();

  // phone in/out
  const phoneIn = Easing.easeOutCubic(clamp(progress / 0.18, 0, 1));
  const phoneOut = clamp((progress - 0.88) / 0.12, 0, 1);
  const phoneOpacity = phoneIn * (1 - phoneOut);
  const phoneTy = (1 - phoneIn) * 100 - phoneOut * 60;
  const phoneScale = 0.94 + phoneIn * 0.06 - phoneOut * 0.04;

  // step badge — pop in early
  const badgeIn = Easing.easeOutBack(clamp(progress / 0.15, 0, 1));
  const badgeOut = clamp((progress - 0.92) / 0.08, 0, 1);
  const badgeOp = badgeIn * (1 - badgeOut);
  const badgeScale = 0.4 + badgeIn * 0.6;

  // caption
  const capIn = Easing.easeOutCubic(clamp((progress - 0.12) / 0.2, 0, 1));
  const capOut = clamp((progress - 0.88) / 0.12, 0, 1);
  const capOp = capIn * (1 - capOut);
  const capTy = (1 - capIn) * 30 - capOut * 16;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(circle at 30% 50%, #1a0a05 0%, #000 70%)`,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', left: '12%', top: '15%',
        width: 800, height: 1000, borderRadius: '50%',
        background: `radial-gradient(ellipse, ${BRAND.asiacellOrange}3a 0%, transparent 60%)`,
        filter: 'blur(80px)',
      }} />

      {/* Step badge top-left */}
      <div style={{
        position: 'absolute', left: 80, top: 70,
        width: 160, height: 160,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${BRAND.asiacellOrangeLight}, ${BRAND.asiacellOrangeDeep})`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        color: '#fff',
        boxShadow: '0 20px 60px rgba(227,6,19,0.5), 0 0 0 8px rgba(227,6,19,0.15)',
        transform: `scale(${badgeScale})`,
        opacity: badgeOp,
        fontFamily: '"Sora", system-ui',
      }}>
        <div style={{ fontSize: 18, fontWeight: 600, opacity: 0.85, letterSpacing: '0.1em' }}>STEP</div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1, marginTop: -4 }}>{stepNum}</div>
        <div style={{ fontSize: 14, opacity: 0.75, marginTop: 4, letterSpacing: '0.05em' }}>OF 7</div>
      </div>

      {/* Asiacell mark watermark top-right */}
      <div style={{
        position: 'absolute', top: 90, right: 100,
        opacity: 0.95,
      }}>
        <img src={BRAND.asiacellLogoSrc} alt="Asiacell"
          style={{ height: 100, width: 'auto', filter: 'brightness(0) invert(1)' }} />
      </div>

      {/* Phone — left-of-center, bigger */}
      <div style={{
        position: 'absolute',
        left: 220, top: 85,
        opacity: phoneOpacity,
        transform: `translateY(${phoneTy}px) scale(${phoneScale})`,
        transformOrigin: 'center top',
        willChange: 'transform, opacity',
      }}>
        <PhoneFrame width={460} height={950}>
          <ScreenComp />
        </PhoneFrame>
      </div>

      {/* Caption — right side */}
      <div style={{
        position: 'absolute',
        right: 100, top: 320, width: 880,
        direction: 'rtl',
        fontFamily: '"Tajawal", "Cairo", system-ui',
        opacity: capOp,
        transform: `translateY(${capTy}px)`,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          background: 'rgba(227,6,19,0.15)',
          border: `2px solid ${BRAND.asiacellOrange}`,
          borderRadius: 100,
          padding: '10px 28px',
          fontSize: 24, fontWeight: 700,
          color: BRAND.asiacellOrange,
          marginBottom: 32,
          direction: 'rtl',
        }}>
          <span>الخطوة {['','١','٢','٣','٤','٥','٦','٧'][stepNum]}</span>
        </div>
        <div style={{
          fontSize: 104,
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1.1,
          letterSpacing: '-0.01em',
          marginBottom: 28,
          textShadow: '0 4px 30px rgba(0,0,0,0.5)',
        }}>
          {captionAr}
        </div>
        {subAr && (
          <div style={{
            fontSize: 34,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.4,
          }}>
            {subAr}
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 90,
        display: 'flex', gap: 18, alignItems: 'center', justifyContent: 'center',
      }}>
        {[1,2,3,4,5,6,7].map(i => {
          const isActive = i === stepNum;
          const isDone = i < stepNum;
          return (
            <div key={i} style={{
              width: isActive ? 48 : 12, height: 12,
              borderRadius: 6,
              background: isActive ? BRAND.asiacellOrange : (isDone ? BRAND.asiacellOrangeDeep : 'rgba(255,255,255,0.25)'),
              transition: 'all 300ms',
            }} />
          );
        })}
      </div>
    </div>
  );
}

// ───────── End card ─────────
function SceneEnd() {
  const { progress } = useSprite();
  const t = Easing.easeOutCubic(clamp(progress * 1.5, 0, 1));
  const exit = clamp((progress - 0.85) / 0.15, 0, 1);

  // Tagline timing — starts at 0.15 progress
  const tagP = clamp((progress - 0.15) / 0.7, 0, 1);
  const tagIn = Easing.easeOutCubic(clamp(tagP / 0.2, 0, 1));
  const tagOut = clamp((progress - 0.88) / 0.12, 0, 1);
  const tagOp = tagIn * (1 - tagOut);
  const tagTy = (1 - tagIn) * 30 - tagOut * 16;

  const urlOp = clamp((progress - 0.3) * 3, 0, 1) * (1 - tagOut);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(135deg, #000 0%, #1a0508 40%, ${BRAND.asiacellOrangeDeep} 100%)`,
      overflow: 'hidden',
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: t * 0.25 }}>
        {[...Array(16)].map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const len = 1200;
          return (
            <line key={i}
              x1="960" y1="540"
              x2={960 + Math.cos(angle) * len * t}
              y2={540 + Math.sin(angle) * len * t}
              stroke={BRAND.asiacellOrange} strokeWidth="2" opacity="0.3"
            />
          );
        })}
      </svg>

      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        width: 1200, height: 1200, borderRadius: '50%',
        background: `radial-gradient(circle, ${BRAND.asiacellOrange}66 0%, transparent 60%)`,
        transform: `translate(-50%, -50%) scale(${0.5 + t * 0.8})`,
        filter: 'blur(60px)',
        opacity: 1 - exit,
      }} />

      {/* Logo lockup */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 320,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 80,
        opacity: (1 - exit) * t,
        transform: `scale(${0.85 + t * 0.15})`,
      }}>
        <img src={BRAND.asiacellLogoSrc} alt="Asiacell"
          style={{ height: 220, width: 'auto', filter: 'brightness(0) invert(1)' }} />

        <div style={{
          fontSize: 100, fontWeight: 200, color: 'rgba(255,255,255,0.6)',
          fontFamily: 'system-ui',
        }}>×</div>

        <div style={{
          fontFamily: '"Bebas Neue", "Oswald", Impact, sans-serif',
          fontSize: 160, fontWeight: 900, color: '#fff',
          letterSpacing: '0.02em',
          transform: 'scaleY(1.15)',
          textShadow: '0 8px 40px rgba(0,0,0,0.5)',
          lineHeight: 0.85,
        }}>NETFLIX</div>
      </div>

      {/* Tagline */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 680,
        textAlign: 'center', direction: 'rtl',
        fontFamily: '"Tajawal", "Cairo", system-ui',
        opacity: tagOp,
        transform: `translateY(${tagTy}px)`,
      }}>
        <div style={{
          fontSize: 104, fontWeight: 800, color: '#fff', lineHeight: 1.15,
          textShadow: '0 4px 30px rgba(0,0,0,0.4)',
        }}>
          استمتع بالمشاهدة
        </div>
        <div style={{
          marginTop: 18,
          fontSize: 38, fontWeight: 500,
          color: 'rgba(255,255,255,0.78)',
        }}>
          ادفع من رصيد آسياسيل · بدون بطاقة ائتمان
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 80, left: 0, right: 0,
        textAlign: 'center',
        opacity: urlOp,
        color: 'rgba(255,255,255,0.7)',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 26, letterSpacing: '0.05em',
      }}>
        netflix.com/iq
      </div>
    </div>
  );
}

Object.assign(window, { SceneIntro, SceneHero, StepScene, SceneEnd });
