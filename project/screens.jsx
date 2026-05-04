// Mock screens shown inside phone frames during the journey

// Common phone-screen wrapper with status bar
function ScreenChrome({ children, dark = true, time = '9:41' }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{ width: '100%', height: '100%', background: dark ? '#000' : '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Status bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 44,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', paddingTop: 14, zIndex: 30,
        fontFamily: '-apple-system, system-ui', fontSize: 15, fontWeight: 600, color: c,
      }}>
        <span>{time}</span>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <svg width="18" height="11" viewBox="0 0 18 11"><rect x="0" y="6" width="3" height="5" rx="0.6" fill={c}/><rect x="5" y="4" width="3" height="7" rx="0.6" fill={c}/><rect x="10" y="2" width="3" height="9" rx="0.6" fill={c}/><rect x="15" y="0" width="3" height="11" rx="0.6" fill={c}/></svg>
          <svg width="24" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke={c} strokeOpacity="0.5" fill="none"/><rect x="2" y="2" width="17" height="7" rx="1" fill={c}/></svg>
        </span>
      </div>
      <div style={{ paddingTop: 44, height: '100%', boxSizing: 'border-box' }}>
        {children}
      </div>
    </div>
  );
}

// Step 1: Browser opening Netflix Iraq URL
function Screen1_URL({ progress = 0 }) {
  // typing animation: progress 0..1 reveals more of URL
  const fullURL = 'netflix.com/iq';
  const shown = fullURL.slice(0, Math.ceil(fullURL.length * clamp(progress, 0, 1)));
  return (
    <ScreenChrome dark={false}>
      {/* Browser chrome */}
      <div style={{ background: '#F2F2F7', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 5, background: '#FF5F57' }} />
          <div style={{ width: 10, height: 10, borderRadius: 5, background: '#FEBC2E' }} />
          <div style={{ width: 10, height: 10, borderRadius: 5, background: '#28C840' }} />
        </div>
        <div style={{
          flex: 1, height: 36, background: '#fff', borderRadius: 10,
          display: 'flex', alignItems: 'center', padding: '0 14px',
          fontFamily: 'system-ui', fontSize: 15, color: '#1a1a1a',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" style={{ marginRight: 8, opacity: 0.5 }}>
            <path d="M10 6V4a3 3 0 10-6 0v2H3v6h8V6h-1z" stroke="#666" strokeWidth="1.2" fill="none"/>
          </svg>
          <span>https://www.{shown}<span style={{ opacity: progress < 1 ? 0.6 : 0, animation: 'blink 1s infinite' }}>|</span></span>
        </div>
      </div>
      {/* Page content — Netflix Iraq landing */}
      <div style={{
        flex: 1, height: 'calc(100% - 60px)',
        background: 'linear-gradient(180deg, #000 0%, #1a0508 50%, #000 100%)',
        position: 'relative',
        opacity: progress > 0.6 ? (progress - 0.6) / 0.4 : 0,
      }}>
        {/* Netflix logo */}
        <div style={{
          padding: '60px 24px 30px',
          fontFamily: '"Bebas Neue", "Oswald", Impact, sans-serif',
          fontSize: 56, fontWeight: 900, color: '#E50914',
          letterSpacing: '0.02em', transform: 'scaleY(1.15)', transformOrigin: 'left center',
          textShadow: '0 4px 20px rgba(229,9,20,0.5)',
        }}>NETFLIX</div>
        <div style={{ padding: '40px 28px', color: '#fff', textAlign: 'center', direction: 'rtl', fontFamily: '"Tajawal", "Cairo", system-ui' }}>
          <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, marginBottom: 18 }}>
            أفلام ومسلسلات بلا حدود
          </div>
          <div style={{ fontSize: 18, opacity: 0.85, marginBottom: 32 }}>
            شاهد على أي مكان. ألغِ في أي وقت.
          </div>
          <div style={{
            background: '#E50914', color: '#fff',
            padding: '16px 32px', borderRadius: 6,
            fontSize: 18, fontWeight: 700, display: 'inline-block',
            boxShadow: '0 8px 30px rgba(229,9,20,0.6)',
          }}>
            ابدأ الآن
          </div>
        </div>
      </div>
    </ScreenChrome>
  );
}

// Step 2: Email signin
function Screen2_Email({ progress = 0 }) {
  const fullEmail = 'ahmed.iraq@gmail.com';
  const shown = fullEmail.slice(0, Math.ceil(fullEmail.length * clamp(progress * 1.4, 0, 1)));
  return (
    <ScreenChrome dark>
      <div style={{ background: '#000', height: 'calc(100% - 44px)', padding: '32px 28px', color: '#fff', direction: 'rtl', fontFamily: '"Tajawal", "Cairo", system-ui' }}>
        <div style={{
          fontFamily: '"Bebas Neue", "Oswald", Impact, sans-serif',
          fontSize: 40, color: '#E50914', letterSpacing: '0.02em',
          transform: 'scaleY(1.15)', transformOrigin: 'right center',
          marginBottom: 56,
        }}>NETFLIX</div>
        <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>تسجيل الدخول</div>
        <div style={{ fontSize: 16, opacity: 0.7, marginBottom: 36 }}>أدخل بريدك الإلكتروني للمتابعة</div>

        <div style={{
          background: '#1a1a1a',
          border: `2px solid ${progress > 0.05 ? '#E50914' : '#333'}`,
          borderRadius: 6, padding: '18px 18px',
          fontSize: 17, minHeight: 32,
          marginBottom: 16, direction: 'ltr',
        }}>
          {shown}
          {progress < 0.7 && <span style={{ animation: 'blink 1s infinite', marginLeft: 2 }}>|</span>}
        </div>
        <div style={{
          background: '#1a1a1a', border: '2px solid #333',
          borderRadius: 6, padding: '18px',
          fontSize: 17, color: 'rgba(255,255,255,0.4)',
          marginBottom: 28, direction: 'ltr',
        }}>
          ••••••••
        </div>

        <div style={{
          background: progress > 0.85 ? '#E50914' : '#7a0a10',
          color: '#fff', borderRadius: 6,
          padding: '18px', textAlign: 'center',
          fontSize: 18, fontWeight: 700,
          transition: 'background 200ms',
          boxShadow: progress > 0.85 ? '0 8px 30px rgba(229,9,20,0.5)' : 'none',
        }}>
          التالي
        </div>
      </div>
    </ScreenChrome>
  );
}

// Step 3: Choose plan
function Screen3_Plan({ selected = 1 }) {
  const plans = [
    { name: 'Mobile', price: '4,000', features: ['HD', 'هاتف فقط'], badge: null },
    { name: 'Standard', price: '9,000', features: ['Full HD', 'جهازان'], badge: 'الأكثر شيوعاً' },
    { name: 'Premium', price: '14,000', features: ['4K + HDR', '4 أجهزة'], badge: null },
  ];
  return (
    <ScreenChrome dark>
      <div style={{ background: '#000', height: 'calc(100% - 44px)', padding: '24px 20px', color: '#fff', direction: 'rtl', fontFamily: '"Tajawal", "Cairo", system-ui', overflow: 'hidden' }}>
        <div style={{ fontSize: 13, color: '#E50914', fontWeight: 700, marginBottom: 8 }}>الخطوة ٣ من ٣</div>
        <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 6, lineHeight: 1.2 }}>اختر الخطة المناسبة لك</div>
        <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 20 }}>ألغِ الاشتراك في أي وقت</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {plans.map((p, i) => {
            const isSelected = i === selected;
            return (
              <div key={i} style={{
                background: isSelected ? 'linear-gradient(135deg, #1a0508, #2a0810)' : '#0f0f0f',
                border: `2px solid ${isSelected ? '#E50914' : '#222'}`,
                borderRadius: 12, padding: '14px 16px',
                position: 'relative',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 250ms',
                boxShadow: isSelected ? '0 12px 30px rgba(229,9,20,0.3)' : 'none',
              }}>
                {p.badge && (
                  <div style={{
                    position: 'absolute', top: -10, right: 16,
                    background: '#E50914', padding: '4px 10px',
                    borderRadius: 4, fontSize: 11, fontWeight: 700,
                  }}>{p.badge}</div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontSize: 12, opacity: 0.65, marginTop: 4 }}>
                      {p.features.join(' · ')}
                    </div>
                  </div>
                  <div style={{ textAlign: 'left', direction: 'ltr' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: isSelected ? '#E50914' : '#fff' }}>
                      {p.price}
                    </div>
                    <div style={{ fontSize: 11, opacity: 0.65 }}>IQD/شهر</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScreenChrome>
  );
}

// Step 4: Choose payment method — Asiacell highlighted
function Screen4_Payment({ highlight = false }) {
  const methods = [
    { name: 'بطاقة ائتمان', sub: 'Visa, Mastercard', icon: 'card', isAsia: false },
    { name: 'آسياسيل', sub: 'الدفع من رصيد الهاتف', icon: 'asia', isAsia: true },
    { name: 'PayPal', sub: 'الدفع الإلكتروني', icon: 'pp', isAsia: false },
  ];
  return (
    <ScreenChrome dark>
      <div style={{ background: '#000', height: 'calc(100% - 44px)', padding: '24px 20px', color: '#fff', direction: 'rtl', fontFamily: '"Tajawal", "Cairo", system-ui' }}>
        <div style={{ fontSize: 13, color: '#E50914', fontWeight: 700, marginBottom: 8 }}>الدفع</div>
        <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>اختر طريقة الدفع</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {methods.map((m, i) => {
            const sel = highlight && m.isAsia;
            return (
              <div key={i} style={{
                background: sel ? `linear-gradient(135deg, ${BRAND.asiacellOrangeLight}22, ${BRAND.asiacellOrangeDeep}33)` : '#0f0f0f',
                border: `2px solid ${sel ? BRAND.asiacellOrange : '#222'}`,
                borderRadius: 12, padding: '16px',
                display: 'flex', alignItems: 'center', gap: 14,
                transform: sel ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 300ms',
                boxShadow: sel ? `0 12px 40px ${BRAND.asiacellOrange}55` : 'none',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 10,
                  background: m.isAsia ? `linear-gradient(135deg, ${BRAND.asiacellRedLight}, ${BRAND.asiacellRedDeep})` : '#1a1a1a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {m.icon === 'asia' && (
                    <img src={BRAND.asiacellLogoSrc} alt="" style={{ height: 28, width: 'auto', filter: 'brightness(0) invert(1)' }} />
                  )}
                  {m.icon === 'card' && (
                    <svg width="26" height="20" viewBox="0 0 26 20"><rect x="1" y="1" width="24" height="18" rx="3" stroke="#888" strokeWidth="1.5" fill="none"/><rect x="1" y="6" width="24" height="3" fill="#888"/></svg>
                  )}
                  {m.icon === 'pp' && (
                    <div style={{ fontFamily: 'serif', fontWeight: 800, fontSize: 18, color: '#0070BA', fontStyle: 'italic' }}>P</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 700 }}>{m.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.6, marginTop: 3 }}>{m.sub}</div>
                </div>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  border: `2px solid ${sel ? BRAND.asiacellOrange : '#444'}`,
                  background: sel ? BRAND.asiacellOrange : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {sel && <svg width="12" height="9" viewBox="0 0 12 9"><path d="M1 4l4 4 6-7" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScreenChrome>
  );
}

// Step 5: Phone number entry
function Screen5_Phone({ progress = 0 }) {
  const fullPhone = '7701234567';
  const shown = fullPhone.slice(0, Math.ceil(fullPhone.length * clamp(progress * 1.3, 0, 1)));
  return (
    <ScreenChrome dark>
      <div style={{ background: '#000', height: 'calc(100% - 44px)', padding: '32px 24px', color: '#fff', direction: 'rtl', fontFamily: '"Tajawal", "Cairo", system-ui' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <img src={BRAND.asiacellLogoSrc} alt="Asiacell" style={{ height: 44, width: 'auto' }} />
        </div>

        <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 10, lineHeight: 1.2 }}>أدخل رقم هاتفك</div>
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 32 }}>سنرسل رمز التحقق إلى رقمك</div>

        <div style={{
          display: 'flex', gap: 10, marginBottom: 20, direction: 'ltr',
        }}>
          <div style={{
            background: '#1a1a1a', border: '2px solid #333',
            borderRadius: 10, padding: '18px 14px',
            fontSize: 18, fontWeight: 600,
          }}>+964</div>
          <div style={{
            flex: 1,
            background: '#1a1a1a',
            border: `2px solid ${progress > 0.05 ? BRAND.asiacellOrange : '#333'}`,
            borderRadius: 10, padding: '18px 16px',
            fontSize: 19, fontFamily: 'JetBrains Mono, ui-monospace',
            letterSpacing: '0.05em',
          }}>
            {shown}
            {progress < 0.85 && <span style={{ animation: 'blink 1s infinite' }}>|</span>}
          </div>
        </div>

        <div style={{
          background: progress > 0.9 ? `linear-gradient(135deg, ${BRAND.asiacellOrangeLight}, ${BRAND.asiacellOrangeDeep})` : '#3a1f0a',
          color: '#fff', borderRadius: 10,
          padding: '18px', textAlign: 'center',
          fontSize: 18, fontWeight: 700,
          boxShadow: progress > 0.9 ? `0 10px 30px ${BRAND.asiacellOrange}60` : 'none',
          transition: 'all 200ms',
        }}>
          إرسال الرمز
        </div>
      </div>
    </ScreenChrome>
  );
}

// Step 6: OTP entry
function Screen6_OTP({ filled = 0 }) {
  const code = '482913';
  return (
    <ScreenChrome dark>
      <div style={{ background: '#000', height: 'calc(100% - 44px)', padding: '32px 24px', color: '#fff', direction: 'rtl', fontFamily: '"Tajawal", "Cairo", system-ui' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <img src={BRAND.asiacellLogoSrc} alt="Asiacell" style={{ height: 44, width: 'auto' }} />
        </div>

        <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 10, lineHeight: 1.2 }}>رمز التحقق</div>
        <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 36, lineHeight: 1.5 }}>
          أدخل الرمز المرسل إلى<br/>
          <span style={{ direction: 'ltr', display: 'inline-block', fontWeight: 700, color: '#fff' }}>+964 770 123 4567</span>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 36, direction: 'ltr' }}>
          {code.split('').map((d, i) => {
            const active = i < filled;
            const current = i === filled;
            return (
              <div key={i} style={{
                width: 46, height: 60,
                background: active ? '#1a1a1a' : '#0a0a0a',
                border: `2px solid ${current ? BRAND.asiacellOrange : (active ? '#444' : '#222')}`,
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 700,
                color: active ? BRAND.asiacellOrange : '#444',
                boxShadow: current ? `0 0 0 4px ${BRAND.asiacellOrange}33` : 'none',
                transition: 'all 200ms',
              }}>
                {active ? d : ''}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', fontSize: 14, opacity: 0.7 }}>
          لم تستلم الرمز؟ <span style={{ color: BRAND.asiacellOrange, fontWeight: 700 }}>إعادة الإرسال</span>
        </div>

        <div style={{
          marginTop: 28,
          background: filled >= 6 ? `linear-gradient(135deg, ${BRAND.asiacellOrangeLight}, ${BRAND.asiacellOrangeDeep})` : '#3a1f0a',
          color: '#fff', borderRadius: 10,
          padding: '18px', textAlign: 'center',
          fontSize: 18, fontWeight: 700,
          boxShadow: filled >= 6 ? `0 10px 30px ${BRAND.asiacellOrange}60` : 'none',
        }}>
          تأكيد الدفع
        </div>
      </div>
    </ScreenChrome>
  );
}

// Step 7: SMS confirmation
function Screen7_SMS({ progress = 0 }) {
  return (
    <ScreenChrome dark>
      <div style={{ background: '#000', height: 'calc(100% - 44px)', padding: '24px 16px', color: '#fff', fontFamily: '"Tajawal", "Cairo", system-ui' }}>
        {/* Messages app header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 16px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ color: '#0a84ff', fontSize: 16 }}>‹ Messages</div>
          <div style={{ fontSize: 12, opacity: 0.5 }}>now</div>
        </div>

        <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid #1a1a1a', marginBottom: 20 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: `linear-gradient(135deg, ${BRAND.asiacellRedLight}, ${BRAND.asiacellRedDeep})`,
            margin: '0 auto 10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src={BRAND.asiacellLogoSrc} alt="" style={{ height: 36, width: 'auto', filter: 'brightness(0) invert(1)' }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Asiacell</div>
        </div>

        {/* SMS bubble */}
        <div style={{
          opacity: progress,
          transform: `translateY(${(1 - progress) * 30}px) scale(${0.95 + 0.05 * progress})`,
          transition: 'all 400ms cubic-bezier(.2,.9,.3,1.3)',
        }}>
          <div style={{
            background: '#262628', borderRadius: 18,
            borderTopLeftRadius: 6,
            padding: '14px 16px', maxWidth: '88%',
            fontSize: 15, lineHeight: 1.5,
            direction: 'rtl',
          }}>
            <div style={{ fontWeight: 700, marginBottom: 8, color: BRAND.asiacellOrangeLight }}>✓ تم الدفع بنجاح</div>
            <div>تم خصم <span style={{ fontWeight: 700, color: '#fff' }}>9,000 د.ع</span> من رصيدكم لاشتراك Netflix الشهري.</div>
            <div style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
              ينتهي الاشتراك في ٤ يونيو ٢٠٢٦
            </div>
            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.6, direction: 'ltr', textAlign: 'left' }}>
              Asiacell · 9:41 ص
            </div>
          </div>
        </div>

        {/* Notification toast */}
        {progress > 0.5 && (
          <div style={{
            marginTop: 24,
            background: 'rgba(40,200,80,0.12)',
            border: '1px solid rgba(40,200,80,0.4)',
            borderRadius: 12, padding: '14px',
            display: 'flex', alignItems: 'center', gap: 12,
            direction: 'rtl',
            opacity: clamp((progress - 0.5) * 2, 0, 1),
            transform: `translateY(${(1 - clamp((progress - 0.5) * 2, 0, 1)) * 16}px)`,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: '#28C840',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="12" viewBox="0 0 16 12"><path d="M1 6l4 4 10-9" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>الاشتراك مفعّل</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>استمتع بالمشاهدة الآن</div>
            </div>
          </div>
        )}
      </div>
    </ScreenChrome>
  );
}

Object.assign(window, {
  ScreenChrome,
  Screen1_URL, Screen2_Email, Screen3_Plan, Screen4_Payment,
  Screen5_Phone, Screen6_OTP, Screen7_SMS,
});
