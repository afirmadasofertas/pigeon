'use client'

import { useRef } from 'react'
import CloudflareVideo from '../CloudflareVideo'

const CARDS = [
  {
    videoId:  '71c702c74f0333d8bc3368bbebbb1015',
    title:    '100% de transparência',
    body:     'Na PigeonPag você tem a confiança de que 100% das transações pix são repassadas corretamente, sem desvio de vendas, sem Med falso e sem reservas inesperadas.',
    featured: false,
  },
  {
    videoId:  '17fd27ed09f9913458cfd1f0e732b1eb',
    title:    'Sistema próprio',
    body:     'Diferente da concorrência, não utilizamos white label. Desenvolvemos uma tecnologia própria para otimizar o processamento de pix, resultando em mais rapidez nas transações e zero instabilidades.',
    featured: true,
  },
  {
    videoId:  'aa7362d0d1162839689562b9aa6f6dfb',
    title:    'Para seu negócio',
    body:     'Ideal para Gateways, Bets, Plataforma de Rifa, Plataforma de doação, E-commerce e Saas. Adaptável ao seu fluxo.',
    featured: false,
  },
]

const STYLES = `
  .pgn-diff-card {
    background:           rgba(10, 20, 60, 0.55);
    border:               1px solid rgba(99,179,237,0.13);
    backdrop-filter:      blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius:        24px;
    overflow:             hidden;
    display:              flex;
    flex-direction:       column;
    transition:           box-shadow 0.3s ease;
  }
  .pgn-diff-card:hover {
    box-shadow: 0 0 40px rgba(99,179,237,0.08);
  }

  @keyframes pgn-diff-shine {
    0%      { transform: translateX(-130%) skewX(-20deg); opacity: 1; }
    35%     { transform: translateX(250%)  skewX(-20deg); opacity: 1; }
    35.001% { transform: translateX(250%)  skewX(-20deg); opacity: 0; }
    100%    { transform: translateX(250%)  skewX(-20deg); opacity: 0; }
  }
  @keyframes pgn-diff-glow {
    0%, 100% { box-shadow: 0 0 0 2px rgba(22,106,253,0.0), 0 6px 28px rgba(22,106,253,0.50), 0 2px 8px rgba(22,106,253,0.30), inset 0 1px 0 rgba(255,255,255,0.22); }
    50%      { box-shadow: 0 0 0 3px rgba(22,106,253,0.15), 0 8px 36px rgba(22,106,253,0.65), 0 2px 12px rgba(22,106,253,0.45), inset 0 1px 0 rgba(255,255,255,0.22); }
  }

  .pgn-diff-cta {
    position:        relative;
    overflow:        hidden;
    display:         inline-flex;
    align-items:     center;
    gap:             8px;
    background:      linear-gradient(160deg, #3a87ff 0%, #166AFD 45%, #0d52e0 100%);
    color:           #fff;
    font-size:       15px;
    font-weight:     600;
    padding:         14px 28px;
    border-radius:   9999px;
    border-top:      1px solid rgba(255,255,255,0.25);
    text-decoration: none;
    animation:       pgn-diff-glow 2.8s ease-in-out infinite;
    transition:      filter 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
    white-space:     nowrap;
  }
  .pgn-diff-cta:hover {
    filter:    brightness(1.08);
    transform: translateY(-3px);
  }
  .pgn-diff-shine {
    position:   absolute;
    inset:      0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.28) 50%, transparent 60%);
    animation:  pgn-diff-shine 3.5s ease-in-out infinite;
  }
  .pgn-diff-arrow {
    flex-shrink: 0;
    transition:  transform 0.2s ease;
  }
  .pgn-diff-cta:hover .pgn-diff-arrow {
    transform: rotate(45deg);
  }

  @keyframes pgn-card-in {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pgn-diff-card-wrap {
    animation: pgn-card-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: var(--card-delay, 0s);
  }

  @media (max-width: 768px) {
    .pgn-diff-grid {
      grid-template-columns: 1fr !important;
    }
    .pgn-diff-col-featured {
      order: -1;
    }
    /* hide button inside middle col on mobile */
    .pgn-diff-cta-mid { display: none !important; }
    /* show standalone bottom button */
    .pgn-diff-cta-bottom { display: flex !important; }
  }
`

function Card({ card }: { card: (typeof CARDS)[number] }) {
  return (
    <div className="pgn-diff-card" style={{ paddingBottom: '28px', position: 'relative' }}>
      {/* Video — square */}
      <div style={{ position: 'relative', paddingTop: '100%', flexShrink: 0 }}>
        <CloudflareVideo
          videoId={card.videoId}
          objectFit="cover"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
        {/* bottom fade — transparent so text bleeds in seamlessly */}
        <div style={{
          position:      'absolute',
          bottom:        0,
          left:          0,
          right:         0,
          height:        '70%',
          background:    'linear-gradient(to bottom, transparent 0%, rgba(8,16,52,1) 100%)',
          pointerEvents: 'none',
          zIndex:        1,
        }} />
      </div>

      {/* Text — pulled up over the fade with negative margin */}
      <div style={{ padding: '0 28px 0', marginTop: '-72px', position: 'relative', zIndex: 2 }}>
        <h3 style={{ fontSize: 'clamp(18px,2.2vw,22px)', fontWeight: 500, color: '#fff', marginBottom: '12px', lineHeight: 1.25 }}>
          {card.title}
        </h3>
        <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: 'rgba(255,255,255,0.52)' }}>
          {card.body}
        </p>
      </div>
    </div>
  )
}

export default function DiferenciaisSection() {
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <section id="diferenciais" style={{ background: 'var(--ds-color-bg-base)', paddingBlock: '20px 80px', paddingInline: 'clamp(16px, 4vw, 24px)' }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: '72px' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>
          DIFERENCIAIS
        </p>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 500, color: '#fff', lineHeight: 1.15 }}>
          Por que a{' '}
          <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif', color: 'var(--ds-color-blue-200, #93c5fd)' }}>
            Pigeonpag?
          </em>
        </h2>
      </div>

      {/* ── Cards grid ──
          Middle column: card + button stacked → card naturally sits higher
          Side columns:  card + spacer matching button height so all bottoms align
      ── */}
      <div className="pgn-diff-grid" style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap:                 '20px',
        maxWidth:            '1100px',
        margin:              '0 auto',
        alignItems:          'end',
      }}>

        {/* Col 1 */}
        <div className="pgn-diff-card-wrap" style={{'--card-delay': '0s'} as React.CSSProperties}><Card card={CARDS[0]} /></div>

        {/* Col 2 — featured: card + button (hidden on mobile) */}
        <div className="pgn-diff-card-wrap pgn-diff-col-featured" style={{'--card-delay': '0.12s', display: 'flex', flexDirection: 'column', gap: '20px'} as React.CSSProperties}>
          <Card card={CARDS[1]} />
          <div className="pgn-diff-cta-mid" style={{ display: 'flex' }}>
            <a href="https://app.pigeonpag.com/login" className="pgn-diff-cta" style={{ width: '100%', justifyContent: 'center' }}>
              <span className="pgn-diff-shine" aria-hidden="true" />
              Criar conta agora
              <svg className="pgn-diff-arrow" width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden="true">
                <path d="M6.50087 0.555176C6.50087 0.248492 6.25226 -0.000123739 5.94557 -0.000123739L0.947879 -0.000123739C0.641195 -0.000123739 0.392579 0.248492 0.392579 0.555176C0.392579 0.861859 0.641195 1.11048 0.947879 1.11048L5.39028 1.11048V5.55287C5.39028 5.85955 5.63889 6.10817 5.94557 6.10817C6.25226 6.10817 6.50087 5.85955 6.50087 5.55287V0.555176ZM0.392578 6.10817L0.785234 6.50083L6.33823 0.947832L5.94557 0.555176L5.55292 0.16252L-7.79331e-05 5.71552L0.392578 6.10817Z" fill="white"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 3 */}
        <div className="pgn-diff-card-wrap" style={{'--card-delay': '0.24s'} as React.CSSProperties}><Card card={CARDS[2]} /></div>
      </div>

      {/* Mobile-only button — below all cards */}
      <div className="pgn-diff-cta-bottom" style={{ display: 'none', maxWidth: '1100px', margin: '20px auto 0', paddingInline: 'clamp(16px,4vw,24px)' }}>
        <a href="https://app.pigeonpag.com/login" className="pgn-diff-cta" style={{ width: '100%', justifyContent: 'center' }}>
          <span className="pgn-diff-shine" aria-hidden="true" />
          Criar conta agora
          <svg className="pgn-diff-arrow" width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden="true">
            <path d="M6.50087 0.555176C6.50087 0.248492 6.25226 -0.000123739 5.94557 -0.000123739L0.947879 -0.000123739C0.641195 -0.000123739 0.392579 0.248492 0.392579 0.555176C0.392579 0.861859 0.641195 1.11048 0.947879 1.11048L5.39028 1.11048V5.55287C5.39028 5.85955 5.63889 6.10817 5.94557 6.10817C6.25226 6.10817 6.50087 5.85955 6.50087 5.55287V0.555176ZM0.392578 6.10817L0.785234 6.50083L6.33823 0.947832L5.94557 0.555176L5.55292 0.16252L-7.79331e-05 5.71552L0.392578 6.10817Z" fill="white"/>
          </svg>
        </a>
      </div>
    </section>
  )
}
