// Helpers: phone frame, Arabic caption bar, step badge

// Simple phone frame (lighter than full IOSDevice — for showing screens during animation)
function PhoneFrame({ children, width = 360, height = 740, dark = true }) {
  return (
    <div style={{
      width, height,
      borderRadius: width * 0.13,
      background: '#0a0a0a',
      padding: 8,
      boxShadow: '0 40px 100px rgba(0,0,0,0.55), 0 0 0 1.5px #2a2a2a, inset 0 0 0 2px #1a1a1a',
      position: 'relative',
    }}>
      <div style={{
        width: '100%', height: '100%',
        borderRadius: width * 0.11,
        overflow: 'hidden',
        background: dark ? '#000' : '#fff',
        position: 'relative',
      }}>
        {/* Dynamic island */}
        <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: width * 0.32, height: width * 0.085,
          borderRadius: width * 0.05, background: '#000', zIndex: 50,
        }} />
        {children}
        {/* Home indicator */}
        <div style={{
          position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
          width: width * 0.34, height: 4, borderRadius: 2,
          background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.3)', zIndex: 50,
        }} />
      </div>
    </div>
  );
}

// Arabic caption — bold typography, RTL
function CaptionAR({
  text,
  subtext,
  y = 880,
  color = '#fff',
  size = 72,
  align = 'center',
  width: w = 1600,
  x,
}) {
  const { localTime, duration } = useSprite();
  const entry = 0.5;
  const exit = 0.4;
  const exitStart = duration - exit;

  let opacity = 1;
  let ty = 0;
  let blur = 0;
  if (localTime < entry) {
    const t = Easing.easeOutCubic(clamp(localTime / entry, 0, 1));
    opacity = t;
    ty = (1 - t) * 30;
    blur = (1 - t) * 8;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exit, 0, 1));
    opacity = 1 - t;
    ty = -t * 16;
    blur = t * 6;
  }

  const left = x !== undefined ? x : (1920 - w) / 2;

  return (
    <div style={{
      position: 'absolute',
      left, top: y, width: w,
      textAlign: align,
      direction: 'rtl',
      fontFamily: '"Tajawal", "Cairo", "Noto Kufi Arabic", system-ui, sans-serif',
      opacity,
      transform: `translateY(${ty}px)`,
      filter: `blur(${blur}px)`,
      willChange: 'transform, opacity, filter',
    }}>
      <div style={{
        fontSize: size,
        fontWeight: 800,
        color,
        lineHeight: 1.15,
        letterSpacing: '-0.01em',
        textShadow: '0 4px 30px rgba(0,0,0,0.4)',
      }}>
        {text}
      </div>
      {subtext && (
        <div style={{
          marginTop: 18,
          fontSize: size * 0.42,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.3,
        }}>
          {subtext}
        </div>
      )}
    </div>
  );
}

// Step badge — orange circular badge with step number
function StepBadge({ n, x, y, total = 7 }) {
  const { localTime } = useSprite();
  const t = Easing.easeOutBack(clamp(localTime / 0.5, 0, 1));
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width: 140, height: 140,
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${BRAND.asiacellOrangeLight}, ${BRAND.asiacellOrangeDeep})`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      color: '#fff',
      boxShadow: '0 20px 60px rgba(227,6,19,0.5), 0 0 0 8px rgba(227,6,19,0.15)',
      transform: `scale(${0.4 + 0.6 * t})`,
      transformOrigin: 'center',
      fontFamily: '"Sora", system-ui, sans-serif',
    }}>
      <div style={{ fontSize: 18, fontWeight: 600, opacity: 0.85, letterSpacing: '0.1em' }}>STEP</div>
      <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1, marginTop: -4 }}>{n}</div>
      <div style={{ fontSize: 14, opacity: 0.75, marginTop: 4, letterSpacing: '0.05em' }}>OF {total}</div>
    </div>
  );
}

// Animated cursor / tap pulse
function TapPulse({ x, y, delay = 0 }) {
  const { localTime } = useSprite();
  const t = clamp((localTime - delay) / 0.8, 0, 1);
  if (t <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', left: -40, top: -40,
        width: 80, height: 80, borderRadius: '50%',
        border: `3px solid ${BRAND.asiacellOrange}`,
        opacity: (1 - t) * 0.9,
        transform: `scale(${0.4 + t * 1.6})`,
      }} />
      <div style={{
        position: 'absolute', left: -16, top: -16,
        width: 32, height: 32, borderRadius: '50%',
        background: BRAND.asiacellOrange,
        boxShadow: `0 0 20px ${BRAND.asiacellOrange}`,
        opacity: 1 - t * 0.3,
        transform: `scale(${1 - t * 0.2})`,
      }} />
    </div>
  );
}

// Progress dots showing journey progress (1..7)
function ProgressDots({ active, total = 7, x = 960, y = 1000 }) {
  const dots = [];
  const gap = 28;
  const w = total * gap;
  for (let i = 0; i < total; i++) {
    const isActive = i + 1 === active;
    const isDone = i + 1 < active;
    dots.push(
      <div key={i} style={{
        width: isActive ? 36 : 10, height: 10,
        borderRadius: 5,
        background: isActive ? BRAND.asiacellOrange : (isDone ? BRAND.asiacellOrangeDeep : 'rgba(255,255,255,0.25)'),
        transition: 'all 300ms',
      }} />
    );
  }
  return (
    <div style={{
      position: 'absolute', left: x - w/2, top: y, width: w,
      display: 'flex', gap: 18, alignItems: 'center', justifyContent: 'center',
    }}>
      {dots}
    </div>
  );
}

Object.assign(window, { PhoneFrame, CaptionAR, StepBadge, TapPulse, ProgressDots });
