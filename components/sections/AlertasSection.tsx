'use client'

const NOTIFS = [
  {
    type: 'success', title: 'Pix aprovado',
    sub: 'R$ 4.250,00 recebido com sucesso',
    dur: '7s', delay: '0s',
    style: { top: 0, left: 0 },
  },
  {
    type: 'shield', title: 'Alerta bloqueado',
    sub: 'Sinal de risco neutralizado',
    dur: '7s', delay: '1.6s',
    style: { top: 0, right: 0 },
  },
  {
    type: 'success', title: 'Pix aprovado',
    sub: 'R$ 12.000,00 recebido',
    dur: '7s', delay: '3.2s',
    style: { top: '50%', left: '50%', marginTop: -36, marginLeft: -115 },
  },
  {
    type: 'monitor', title: 'Monitoramento ativo',
    sub: 'Nenhuma anomalia detectada',
    dur: '7s', delay: '4.8s',
    style: { bottom: 0, left: 18 },
  },
  {
    type: 'shield', title: 'Sistema protegido',
    sub: '9 sinais bloqueados hoje',
    dur: '7s', delay: '6.4s',
    style: { bottom: 0, right: 18 },
  },
]

const IconSuccess = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="rgba(31,217,126,0.18)"/>
    <polyline points="5,10 8.5,13.5 15,7" stroke="#1FD97E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L17 5.5V10C17 13.87 13.87 17.5 10 18C6.13 17.5 3 13.87 3 10V5.5L10 2Z"
      fill="rgba(22,106,253,0.18)" stroke="#166AFD" strokeWidth="1.2" strokeLinejoin="round"/>
    <polyline points="7,10 9,12 13,8" stroke="#166AFD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IconMonitor = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="rgba(22,106,253,0.12)"/>
    <circle cx="10" cy="10" r="3.5" stroke="#3D84FE" strokeWidth="1.4"/>
    <circle cx="10" cy="10" r="1.2" fill="#3D84FE"/>
    <line x1="10" y1="3" x2="10" y2="5.5" stroke="#3D84FE" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="10" y1="14.5" x2="10" y2="17" stroke="#3D84FE" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="5.5" y2="10" stroke="#3D84FE" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="14.5" y1="10" x2="17" y2="10" stroke="#3D84FE" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

export default function AlertasSection() {
  return (
    <>
      <style>{`
        @keyframes pgn-notif-float {
          0%   { opacity: 0; transform: translateY(18px) scale(0.93); }
          12%  { opacity: 1; transform: translateY(0)    scale(1); }
          68%  { opacity: 1; transform: translateY(0)    scale(1); }
          100% { opacity: 0; transform: translateY(-10px) scale(0.97); }
        }
        @keyframes pgn-dot-pulse {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes pgn-alt-glow {
          0%, 100% { box-shadow: 0 0 0 2px rgba(22,106,253,0), 0 6px 28px rgba(22,106,253,0.50), 0 2px 8px rgba(22,106,253,0.30), inset 0 1px 0 rgba(255,255,255,0.18); }
          50%       { box-shadow: 0 0 0 3px rgba(22,106,253,0.20), 0 8px 44px rgba(22,106,253,0.75), 0 2px 12px rgba(22,106,253,0.45), inset 0 1px 0 rgba(255,255,255,0.22); }
        }
        @keyframes pgn-alt-shine {
          0%      { transform: translateX(-130%) skewX(-20deg); opacity: 1; }
          35%     { transform: translateX(250%)  skewX(-20deg); opacity: 1; }
          35.001% { transform: translateX(250%)  skewX(-20deg); opacity: 0; }
          100%    { transform: translateX(250%)  skewX(-20deg); opacity: 0; }
        }

        .pgn-alt-section {
          position: relative;
          width: 100%;
          background: var(--ds-color-bg-base);
          padding: 120px 40px 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
        }
        .pgn-alt-section::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 30%;
          transform: translate(-50%, -50%);
          width: 640px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(22,106,253,0.10) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Notification cluster ── */
        .pgn-alt-notif-area {
          position: relative;
          width: 100%;
          max-width: 700px;
          height: 290px;
          margin-bottom: 72px;
          flex-shrink: 0;
        }
        .pgn-alt-notif {
          position: absolute;
          width: 230px;
          display: flex;
          align-items: center;
          gap: 11px;
          background: rgba(6,24,41,0.75);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(183,214,255,0.11);
          border-radius: 16px;
          padding: 12px 14px;
          box-shadow: 0 10px 36px rgba(0,0,0,0.38), 0 0 0 1px rgba(183,214,255,0.05), inset 0 1px 0 rgba(255,255,255,0.05);
          opacity: 0;
          animation: pgn-notif-float var(--dur) ease-in-out var(--delay) infinite;
          will-change: opacity, transform;
        }
        .pgn-alt-notif-icon {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pgn-alt-notif-body { flex: 1; min-width: 0; }
        .pgn-alt-notif-title {
          font-size: 12.5px;
          font-weight: 600;
          color: #fff;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pgn-alt-notif-sub {
          font-size: 11px;
          color: rgba(183,214,255,0.52);
          line-height: 1.4;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pgn-alt-notif-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
          animation: pgn-dot-pulse 2s ease-in-out infinite;
        }

        /* ── Centered content ── */
        .pgn-alt-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 22px;
          max-width: 600px;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .pgn-alt-overline {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(183,214,255,0.45);
        }
        .pgn-alt-heading {
          margin: 0;
          font-size: clamp(2rem, 3.8vw, 3rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: #fff;
        }
        .pgn-alt-heading em {
          display: block;
          font-family: var(--ds-font-display);
          font-style: italic;
          font-weight: 400;
          color: var(--ds-color-blue-200);
          margin-bottom: 4px;
        }
        .pgn-alt-body {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(202,215,250,0.62);
        }
        .pgn-alt-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(160deg, #3a87ff 0%, #166AFD 45%, #0d52e0 100%);
          border-radius: 999px;
          padding: 14px 28px;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          border-top: 1px solid rgba(255,255,255,0.25);
          cursor: pointer;
          animation: pgn-alt-glow 2.8s ease-in-out infinite;
          transition: filter 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .pgn-alt-btn:hover { filter: brightness(1.08); transform: translateY(-3px); }
        .pgn-alt-btn-shine {
          position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.38) 50%, transparent 75%);
          animation: pgn-alt-shine 3.2s ease-in-out 0.8s infinite;
          pointer-events: none;
        }
        .pgn-alt-btn-arrow { transition: transform 0.2s ease; }
        .pgn-alt-btn:hover .pgn-alt-btn-arrow { transform: rotate(45deg); }

        @media (max-width: 720px) {
          .pgn-alt-section    { padding: 80px 20px 100px; }
          .pgn-alt-notif-area { height: 180px; overflow: hidden; }
          /* cards scale to fit: max 44% of container so two side-by-side don't overflow */
          .pgn-alt-notif      { width: min(200px, 44vw); }
          /* hide 4th and 5th notif on mobile */
          .pgn-alt-notif:nth-child(4),
          .pgn-alt-notif:nth-child(5) { display: none; }
        }
      `}</style>

      <section className="pgn-alt-section" id="alertas">

        {/* ── Notification cluster ── */}
        <div className="pgn-alt-notif-area">
          {NOTIFS.map((n, i) => (
            <div
              key={i}
              className="pgn-alt-notif"
              style={{
                ...n.style,
                ['--dur' as string]: n.dur,
                ['--delay' as string]: n.delay,
              } as React.CSSProperties}
            >
              <div className="pgn-alt-notif-icon">
                {n.type === 'success' && <IconSuccess />}
                {n.type === 'shield'  && <IconShield />}
                {n.type === 'monitor' && <IconMonitor />}
              </div>
              <div className="pgn-alt-notif-body">
                <div className="pgn-alt-notif-title">{n.title}</div>
                <div className="pgn-alt-notif-sub">{n.sub}</div>
              </div>
              <div
                className="pgn-alt-notif-dot"
                style={{
                  backgroundColor: n.type === 'success' ? '#1FD97E' : '#166AFD',
                  animationDelay: n.delay,
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Centered content ── */}
        <div className="pgn-alt-content">
          <span className="pgn-alt-overline">Proteção inteligente</span>
          <h2 className="pgn-alt-heading">
            <em>Sem alertas de golpe</em>
            diminuindo a conversão
          </h2>
          <p className="pgn-alt-body">
            Nosso sistema monitora constantemente sinais de risco que possam
            levar os bancos a emitirem alertas de golpe nas transações,
            garantindo uma maior conversão.
          </p>
          <a href="#integrar" className="pgn-alt-btn">
            <span className="pgn-alt-btn-shine" aria-hidden="true" />
            Integrar agora
            <svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden="true"
              className="pgn-alt-btn-arrow" style={{ flexShrink: 0 }}>
              <path d="M6.50087 0.555176C6.50087 0.248492 6.25226 -0.000123739 5.94557 -0.000123739L0.947879 -0.000123739C0.641195 -0.000123739 0.392579 0.248492 0.392579 0.555176C0.392579 0.861859 0.641195 1.11048 0.947879 1.11048L5.39028 1.11048V5.55287C5.39028 5.85955 5.63889 6.10817 5.94557 6.10817C6.25226 6.10817 6.50087 5.85955 6.50087 5.55287V0.555176ZM0.392578 6.10817L0.785234 6.50083L6.33823 0.947832L5.94557 0.555176L5.55292 0.16252L-7.79331e-05 5.71552L0.392578 6.10817Z" fill="white"/>
            </svg>
          </a>
        </div>

      </section>
    </>
  )
}
