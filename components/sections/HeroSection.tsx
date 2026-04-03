'use client'

import HeroVideo from '../HeroVideo'
import { type CSSProperties, useState, useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────
   INJECTED STYLES
───────────────────────────────────────────────────────────── */
const INJECTED_STYLES = `
  @keyframes pgn-fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pgn-bounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(6px); }
  }

  @keyframes pgn-shine {
    0%        { transform: translateX(-130%) skewX(-20deg); opacity: 1; }
    35%       { transform: translateX(250%)  skewX(-20deg); opacity: 1; }
    35.001%   { transform: translateX(250%)  skewX(-20deg); opacity: 0; }
    100%      { transform: translateX(250%)  skewX(-20deg); opacity: 0; }
  }

  @keyframes pgn-glow {
    0%, 100% { box-shadow:
      0 0 0   2px rgba(22,106,253,0.0),
      0 6px 28px rgba(22,106,253,0.50),
      0 2px  8px rgba(22,106,253,0.30),
      inset 0 1px 0 rgba(255,255,255,0.18); }
    50%       { box-shadow:
      0 0 0   3px rgba(22,106,253,0.20),
      0 8px 44px rgba(22,106,253,0.75),
      0 2px 12px rgba(22,106,253,0.45),
      inset 0 1px 0 rgba(255,255,255,0.22); }
  }

  .pgn-cta {
    animation: pgn-glow 2.8s ease-in-out infinite;
    transition: filter 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .pgn-cta:hover {
    filter: brightness(1.08);
    transform: translateY(-3px);
  }

  /* ── Arrow: diagonal → straight on hover ── */
  .pgn-arrow {
    transition: transform var(--ds-t-fast);
    transform: rotate(0deg);
  }
  .pgn-cta:hover .pgn-arrow {
    transform: rotate(45deg);
  }

  .pgn-shine {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      105deg,
      transparent 25%,
      rgba(255,255,255,0.38) 50%,
      transparent 75%
    );
    animation: pgn-shine 3.2s ease-in-out 0.8s infinite;
    pointer-events: none;
  }

  .pgn-nav-link {
    transition: color 0.3s ease, opacity 0.3s ease;
  }
  .pgn-nav-link:hover {
    color: #ffffff !important;
    opacity: 1 !important;
  }

  /* ── Nav toggle — hidden on desktop ── */
  .pgn-nav-toggle { display: none; }

  .pgn-hero-top-fade { display: none; }

  /* ── Mobile overlay ── */
  @media (max-width: 600px) {
    .pgn-hero-overlay { opacity: 0.4 !important; }
  }

  /* ── Mobile ── */
  @media (max-width: 600px) {
    .pgn-hero-section { max-height: 600px !important; }
    .pgn-hero-content { padding-bottom: 72px !important; }

    .pgn-hero-video-inner {
      width: 210% !important;
      height: 86vw !important;
      min-width: unset !important;
      top: auto !important;
      bottom: 260px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
    }

    /* toggle button */
    .pgn-nav-toggle {
      display: flex !important;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      width: 26px;
      height: 26px;
      margin-left: 10px;
      padding: 0;
      background: rgba(255,255,255,0.10);
      border: 1px solid rgba(255,255,255,0.16);
      border-radius: 50%;
      color: rgba(255,255,255,0.85);
      cursor: pointer;
      transition: background 0.2s ease, border-color 0.2s ease;
    }
    .pgn-nav-toggle:hover {
      background: rgba(255,255,255,0.18);
      border-color: rgba(255,255,255,0.28);
    }

    /* ── CLOSED ── */
    .pgn-nav {
      position: relative !important;
      padding-inline: 20px !important;
      gap: 0 !important;
      flex-direction: row !important;
      align-items: center !important;
    }
    .pgn-nav:not(.pgn-nav-open) .pgn-nav-link:not(.pgn-nav-link-active) {
      display: none !important;
    }

    /* ── OPEN ── */
    .pgn-nav.pgn-nav-open {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 0 !important;
      padding: 14px 20px 12px !important;
      padding-right: 52px !important;
      border-radius: 20px !important;
      min-width: 172px;
    }
    .pgn-nav.pgn-nav-open .pgn-nav-link {
      display: block !important;
      width: 100%;
      padding: 9px 0;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .pgn-nav.pgn-nav-open a.pgn-nav-link:last-of-type {
      border-bottom: none;
    }
    /* toggle floats top-right when open */
    .pgn-nav.pgn-nav-open .pgn-nav-toggle {
      position: absolute;
      top: 13px;
      right: 14px;
      margin-left: 0;
    }
  }
`

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Início',        href: '#hero',          id: 'hero'         },
  { label: 'Diferenciais',  href: '#diferenciais',  id: 'diferenciais' },
  { label: 'Performance',   href: '#taxas',         id: 'taxas'        },
  { label: 'Proteção',      href: '#alertas',       id: 'alertas'      },
  { label: 'FAQ',           href: '#faq',           id: 'faq'          },
] as const

// maps section DOM id → the nav link id that should light up
const SECTION_NAV_MAP: Record<string, string> = {
  hero:         'hero',
  diferenciais: 'diferenciais',
  taxas:        'taxas',
  comparacao:   'taxas',   // comparação highlights Performance
  alertas:      'alertas',
  faq:          'faq',
}

const SECTION_IDS = ['hero', 'diferenciais', 'taxas', 'comparacao', 'alertas', 'faq'] as const

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const [activeId, setActiveId] = useState<string>('hero')
  const [navOpen, setNavOpen]   = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // close on outside click
  useEffect(() => {
    if (!navOpen) return
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setNavOpen(false)
      }
    }
    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [navOpen])

  useEffect(() => {
    let rafId = 0
    const tick = () => {
      const mid = window.innerHeight * 0.45
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (!el) continue
        const { top, bottom } = el.getBoundingClientRect()
        if (top <= mid && bottom > mid) { setActiveId(SECTION_NAV_MAP[id] ?? id); break }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const fadeUp = (delay: number): CSSProperties => ({
    animation: `pgn-fadeUp 0.6s ease-out ${delay}s both`,
  })

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* ─── Hero Section — flex column ──────────────────────── */}
      <section
        id="hero"
        aria-label="Hero"
        className="pgn-hero-section"
        style={{
          position:      'relative',
          display:       'flex',
          flexDirection: 'column',
          height:        '100svh',
          maxHeight:     '791px',
          overflow:      'hidden',
          background:    'var(--ds-color-bg-base)',
        }}
      >

        {/* z-0 ── Video background (full section) ─────────── */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
        >
          <HeroVideo
            className="pgn-hero-video-inner"
            style={{
              position:  'absolute',
              top:       '50%',
              left:      '50%',
              transform: 'translate(-50%, -50%)',
              height:    '100svh',
              width:     'calc(100svh / 0.412037037037037)',
              minWidth:  '100%',
            }}
          />
        </div>

        {/* z-10 ── Dark gradient overlay ───────────────────── */}
        <div
          aria-hidden="true"
          className="pgn-hero-overlay"
          style={{
            position:      'absolute',
            inset:         0,
            zIndex:        10,
            background:    'linear-gradient(to bottom, rgba(2,8,30,0.45) 0%, rgba(2,8,30,0.72) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* z-11 ── Bottom fade to background ───────────────── */}
        <div
          aria-hidden="true"
          style={{
            position:      'absolute',
            bottom:        0,
            left:          0,
            right:         0,
            height:        '180px',
            zIndex:        11,
            background:    'linear-gradient(to bottom, transparent 0%, var(--ds-color-bg-base) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* ─── Nav — fixed, follows scroll ─────────────────── */}
        <header
          role="banner"
          style={{
            position:       'fixed',
            top:            '20px',
            left:           0,
            right:          0,
            zIndex:         1000,
            display:        'flex',
            justifyContent: 'center',
            paddingInline:  '24px',
            pointerEvents:  'none',
          }}
        >
          <nav
            ref={navRef}
            aria-label="Navegação principal"
            className={`pgn-nav${navOpen ? ' pgn-nav-open' : ''}`}
            style={{
              display:              'flex',
              alignItems:           'center',
              gap:                  '32px',
              background:           'rgba(255, 255, 255, 0.07)',
              backdropFilter:       'blur(6px) saturate(180%)',
              WebkitBackdropFilter: 'blur(6px) saturate(180%)',
              border:               '1px solid rgba(255,255,255,0.10)',
              borderRadius:         '9999px',
              paddingInline:        '40px',
              paddingBlock:         '14px',
              pointerEvents:        'auto',
            }}
          >
            {NAV_LINKS.map(({ label, href, id }) => {
              const isActive = activeId === id
              return (
              <a
                key={label}
                href={href}
                className={`pgn-nav-link${isActive ? ' pgn-nav-link-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setNavOpen(false)}
                style={{
                  color:          isActive ? '#ffffff' : 'rgba(255,255,255,0.52)',
                  fontWeight:     isActive
                    ? 'var(--ds-font-weight-semibold)'
                    : 'var(--ds-font-weight-regular)',
                  fontSize:       'var(--ds-font-size-body-sm)',
                  textDecoration: 'none',
                  whiteSpace:     'nowrap',
                  transition:     'color 0.3s ease, opacity 0.3s ease',
                }}
              >
                {label}
              </a>
            )})}

            {/* Mobile toggle — hidden on desktop via CSS */}
            <button
              className="pgn-nav-toggle"
              onClick={() => setNavOpen(v => !v)}
              aria-label={navOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={navOpen}
            >
              {navOpen ? (
                /* X */
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              ) : (
                /* hamburger — 3 linhas */
                <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                  <line x1="1" y1="1"   x2="11" y2="1"   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="1" y1="4.5" x2="11" y2="4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="1" y1="8"   x2="11" y2="8"   stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </nav>
        </header>

        {/* ─── Content area — fills remaining space ────────── */}
        <div
          className="pgn-hero-content"
          style={{
            position:       'relative',
            zIndex:         20,
            flex:           1,
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'flex-end',
            paddingInline:  '24px',
            paddingBottom:  '120px',
            textAlign:      'center',
          }}
        >

          {/* 1 ── Eyebrow */}
          <p
            style={{
              ...fadeUp(0.2),
              fontSize:      'var(--ds-font-size-overline)',
              fontWeight:    'var(--ds-font-weight-semibold)',
              letterSpacing: 'var(--ds-tracking-overline)',
              textTransform: 'uppercase',
              color:         'rgba(255,255,255,0.5)',
              marginBottom:  'var(--ds-sp-5)',
            }}
          >
            PIGEONPAG
          </p>

          {/* 2 ── Headline */}
          <h1
            style={{
              ...fadeUp(0.35),
              fontSize:      'var(--ds-font-size-display)',
              fontWeight:    'var(--ds-font-weight-medium)',
              lineHeight:    'var(--ds-line-height-tight)',
              letterSpacing: 'var(--ds-tracking-display)',
              color:         '#ffffff',
              maxWidth:      '680px',
              marginBottom:  'var(--ds-sp-5)',
            }}
          >
            <span
              style={{
                fontFamily:   'var(--ds-font-display)',
                fontStyle:    'italic',
                fontWeight:   'var(--ds-font-weight-regular)',
                color:        'var(--ds-color-blue-200)',
                mixBlendMode: 'plus-lighter',
              }}
            >
              A solução Pix
            </span>
            {' '}<span style={{ whiteSpace: 'nowrap' }}>que está</span>
            <br />
            em todos os lugares
          </h1>

          {/* 3 ── Subheadline */}
          <p
            style={{
              ...fadeUp(0.5),
              fontSize:     'var(--ds-font-size-body-md)',
              fontWeight:   'var(--ds-font-weight-regular)',
              color:        'rgba(255,255,255,0.6)',
              maxWidth:     '420px',
              lineHeight:   1.6,
              marginBottom: 'var(--ds-sp-10)',
            }}
          >
            Mais aprovação e menos taxas, a uma integração de distância
          </p>

          {/* 4 ── CTA Button */}
          <div style={fadeUp(0.65)}>
            <a
              href="https://app.pigeonpag.com/login"
              className="pgn-cta"
              style={{
                position:       'relative',
                overflow:       'hidden',
                display:        'inline-flex',
                alignItems:     'center',
                gap:            'var(--ds-sp-2)',
                background:     'linear-gradient(160deg, #3a87ff 0%, #166AFD 45%, #0d52e0 100%)',
                borderRadius:   'var(--ds-r-full)',
                padding:        '14px 28px',
                color:          '#ffffff',
                fontSize:       'var(--ds-font-size-body-sm)',
                fontWeight:     'var(--ds-font-weight-semibold)',
                textDecoration: 'none',
                cursor:         'pointer',
                borderTop:      '1px solid rgba(255,255,255,0.25)',
                boxShadow:      '0 6px 28px rgba(22,106,253,0.50)',
              }}
            >
              <span className="pgn-shine" aria-hidden="true" />
              Criar conta agora
              <svg
                width="7" height="7" viewBox="0 0 7 7"
                fill="none" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="pgn-arrow"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M6.50087 0.555176C6.50087 0.248492 6.25226 -0.000123739 5.94557 -0.000123739L0.947879 -0.000123739C0.641195 -0.000123739 0.392579 0.248492 0.392579 0.555176C0.392579 0.861859 0.641195 1.11048 0.947879 1.11048L5.39028 1.11048V5.55287C5.39028 5.85955 5.63889 6.10817 5.94557 6.10817C6.25226 6.10817 6.50087 5.85955 6.50087 5.55287V0.555176ZM0.392578 6.10817L0.785234 6.50083L6.33823 0.947832L5.94557 0.555176L5.55292 0.16252L-7.79331e-05 5.71552L0.392578 6.10817Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>

        </div>

        {/* ─── Scroll indicator — absolute bottom, centered ── */}
        {/*
          Uses left:0/right:0 + margin:auto instead of
          left:50%/translateX(-50%) to avoid transform conflict
          with the pgn-bounce animation.
        */}
        <div
          aria-hidden="true"
          style={{
            position:    'absolute',
            bottom:      '32px',
            left:        0,
            right:       0,
            zIndex:      20,
            display:     'flex',
            justifyContent: 'center',
            animation:   'pgn-fadeUp 0.6s ease-out 1s both',
          }}
        >
          <div
            style={{
              color:     'rgba(255,255,255,0.35)',
              animation: 'pgn-bounce 1.6s ease-in-out 1.6s infinite',
            }}
          >
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1L7 7L13 1"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

      </section>
    </>
  )
}
