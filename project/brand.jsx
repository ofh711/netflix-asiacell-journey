// Asiacell × Netflix brand tokens & logos

const BRAND = {
  // Asiacell — brand red (from official logo)
  asiacellRed: '#E30613',
  asiacellRedDeep: '#B5050F',
  asiacellRedLight: '#FF2D3A',
  asiacellGray: '#9D9FA2',
  asiacellInk: '#1A1A1A',
  asiacellLight: '#FFF5F5',
  // Aliases (some files still reference orange-named tokens)
  asiacellOrange: '#E30613',
  asiacellOrangeDeep: '#B5050F',
  asiacellOrangeLight: '#FF2D3A',
  // Netflix
  netflixRed: '#E50914',
  netflixRedDeep: '#B0060F',
  netflixBlack: '#000000',
  netflixDark: '#141414',
  // Neutrals
  white: '#FFFFFF',
  off: '#F8F4EE',
  ink: '#0A0A0A',
  // Logo asset
  asiacellLogoSrc: 'assets/asiacell-logo.png',
};

// Real Asiacell logo image
function AsiacellLogoImg({ height = 80, white = false }) {
  return (
    <img
      src={BRAND.asiacellLogoSrc}
      alt="Asiacell"
      style={{
        height,
        width: 'auto',
        display: 'block',
        // For dark backgrounds, invert + reduce to look white-ish; better:
        // we'll use a CSS filter only when white=true
        filter: white ? 'brightness(0) invert(1)' : 'none',
      }}
    />
  );
}

// Asiacell logo — stylized "asiacell" wordmark with the signature orange swoosh
function AsiacellLogo({ height = 80, color = BRAND.asiacellOrange, mono = false }) {
  const c = mono ? color : BRAND.asiacellOrange;
  // Iconic swoosh + arabic + latin wordmark
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: height * 0.18,
      height,
      lineHeight: 1,
    }}>
      {/* Swoosh mark — stylized "a" with curve */}
      <svg width={height * 1.05} height={height} viewBox="0 0 105 100" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="ac-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={BRAND.asiacellOrangeLight} />
            <stop offset="100%" stopColor={BRAND.asiacellOrangeDeep} />
          </linearGradient>
        </defs>
        {/* outer swoosh */}
        <path
          d="M 50 8 C 25 8, 8 28, 8 50 C 8 72, 25 92, 50 92 C 65 92, 78 84, 86 72"
          fill="none"
          stroke={mono ? c : 'url(#ac-grad)'}
          strokeWidth="13"
          strokeLinecap="round"
        />
        {/* inner dot */}
        <circle cx="74" cy="50" r="9" fill={mono ? c : BRAND.asiacellOrangeDeep} />
      </svg>
      <div style={{
        fontFamily: '"Sora", "Inter", system-ui, sans-serif',
        fontSize: height * 0.46,
        fontWeight: 700,
        color: mono ? c : BRAND.asiacellInk,
        letterSpacing: '-0.02em',
      }}>
        asiacell
      </div>
    </div>
  );
}

// Asiacell mark only (the swoosh)
function AsiacellMark({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 105 100" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`ac-mark-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BRAND.asiacellOrangeLight} />
          <stop offset="100%" stopColor={BRAND.asiacellOrangeDeep} />
        </linearGradient>
      </defs>
      <path
        d="M 50 8 C 25 8, 8 28, 8 50 C 8 72, 25 92, 50 92 C 65 92, 78 84, 86 72"
        fill="none"
        stroke={`url(#ac-mark-${size})`}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <circle cx="74" cy="50" r="9" fill={BRAND.asiacellOrangeDeep} />
    </svg>
  );
}

// Netflix wordmark — recognizable curved-perspective N
function NetflixLogo({ height = 80, color = BRAND.netflixRed }) {
  return (
    <div style={{
      fontFamily: '"Bebas Neue", "Oswald", "Impact", sans-serif',
      fontSize: height,
      lineHeight: 0.85,
      letterSpacing: '0.02em',
      color,
      fontWeight: 900,
      textShadow: `0 ${height*0.04}px ${height*0.08}px rgba(229,9,20,0.35)`,
      transform: 'scaleY(1.15)',
      transformOrigin: 'center',
      display: 'inline-block',
    }}>
      NETFLIX
    </div>
  );
}

// Netflix N icon
function NetflixN({ size = 80 }) {
  return (
    <svg width={size * 0.72} height={size} viewBox="0 0 72 100" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`nf-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={BRAND.netflixRed} />
          <stop offset="100%" stopColor={BRAND.netflixRedDeep} />
        </linearGradient>
      </defs>
      <path d="M 8 4 L 8 96 L 24 96 L 24 38 L 48 96 L 64 96 L 64 4 L 48 4 L 48 56 L 26 4 Z"
        fill={`url(#nf-${size})`} />
    </svg>
  );
}

Object.assign(window, { BRAND, AsiacellLogo, AsiacellMark, AsiacellLogoImg, NetflixLogo, NetflixN });
