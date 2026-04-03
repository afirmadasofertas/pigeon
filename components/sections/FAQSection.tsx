'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'O que é a PigeonPag?',
    a: 'A PigeonPag é uma intermediadora de pagamentos com sistema próprio, desenvolvido para solucionar os principais problemas enfrentados por gateways e qualquer outro tipo de negócio que dependa do Pix como forma de pagamento ou depósito.',
  },
  {
    q: 'Para quem é a PigeonPag?',
    a: 'A Pigeon é a solução Pix ideal para todo tipo de negócio. Atendemos gateway, Bet, plataforma de rifa, doação, Saas, Ecommerce e qualquer operação que utilize Pix para receber pagamentos ou depósitos.',
  },
  {
    q: 'Por que devo integrar na PigeonPag?',
    a: 'Diferente das processadoras concorrentes, não utilizamos white label. Desenvolvemos tecnologia própria para gerar a maior taxa de aprovação, sem instabilidades e com agilidade nas transações.',
  },
  {
    q: 'Quais taxas são cobradas?',
    a: 'São cobradas uma taxa fixa e % por cada transação — não cobramos reserva. Os valores das taxas podem variar de acordo com o seu volume mensal processado e o tipo de negócio. Não há mensalidade e nem plano de adesão.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <style>{`
        @property --pgn-faq-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        @keyframes pgn-faq-spin {
          to { --pgn-faq-angle: 360deg; }
        }

        @keyframes pgn-faq-glow {
          0%, 100% { box-shadow: 0 0 0 2px rgba(22,106,253,0), 0 6px 28px rgba(22,106,253,0.50), 0 2px 8px rgba(22,106,253,0.30), inset 0 1px 0 rgba(255,255,255,0.18); }
          50%       { box-shadow: 0 0 0 3px rgba(22,106,253,0.20), 0 8px 44px rgba(22,106,253,0.75), 0 2px 12px rgba(22,106,253,0.45), inset 0 1px 0 rgba(255,255,255,0.22); }
        }
        @keyframes pgn-faq-shine-btn {
          0%      { transform: translateX(-130%) skewX(-20deg); opacity: 1; }
          35%     { transform: translateX(250%)  skewX(-20deg); opacity: 1; }
          35.001% { transform: translateX(250%)  skewX(-20deg); opacity: 0; }
          100%    { transform: translateX(250%)  skewX(-20deg); opacity: 0; }
        }

        .pgn-faq-section {
          position: relative;
          background: var(--ds-color-bg-base);
          padding: 120px 40px 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pgn-faq-section::before {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(ellipse at bottom, rgba(22,106,253,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .pgn-faq-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .pgn-faq-overline {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(183,214,255,0.45);
          margin-bottom: 16px;
        }
        .pgn-faq-title {
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: #fff;
          margin: 0;
        }
        .pgn-faq-title em {
          font-family: var(--ds-font-display);
          font-style: italic;
          font-weight: 400;
          color: var(--ds-color-blue-200);
        }

        .pgn-faq-list {
          width: 100%;
          max-width: 680px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* shine border item */
        .pgn-faq-item {
          border-radius: 14px;
          background:
            linear-gradient(var(--ds-color-bg-base), var(--ds-color-bg-base)) padding-box,
            conic-gradient(
              from var(--pgn-faq-angle),
              rgba(183,214,255,0.03) 0deg,
              rgba(183,214,255,0.22) 80deg,
              rgba(22,106,253,0.18) 120deg,
              rgba(183,214,255,0.03) 200deg,
              rgba(183,214,255,0.03) 360deg
            ) border-box;
          border: 1px solid transparent;
          animation: pgn-faq-spin 6s linear infinite;
          overflow: hidden;
          transition: background 0.3s ease;
        }
        .pgn-faq-item:nth-child(1) { animation-delay: 0s; }
        .pgn-faq-item:nth-child(2) { animation-delay: -1.5s; }
        .pgn-faq-item:nth-child(3) { animation-delay: -3s; }
        .pgn-faq-item:nth-child(4) { animation-delay: -4.5s; }

        .pgn-faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 22px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }
        .pgn-faq-q {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          line-height: 1.4;
        }
        .pgn-faq-icon {
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1px solid rgba(183,214,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s ease;
          color: rgba(183,214,255,0.6);
        }
        .pgn-faq-icon.open {
          transform: rotate(45deg);
          border-color: rgba(22,106,253,0.5);
          color: #166AFD;
        }

        .pgn-faq-body {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .pgn-faq-body.open {
          max-height: 300px;
        }
        .pgn-faq-answer {
          padding: 0 22px 20px;
          font-size: 14.5px;
          line-height: 1.7;
          color: rgba(202,215,250,0.62);
          border-top: 1px solid rgba(183,214,255,0.07);
          padding-top: 16px;
        }

        .pgn-faq-cta-wrap {
          margin-top: 56px;
        }
        .pgn-faq-btn {
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
          animation: pgn-faq-glow 2.8s ease-in-out infinite;
          transition: filter 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .pgn-faq-btn:hover { filter: brightness(1.08); transform: translateY(-3px); }
        .pgn-faq-btn-shine {
          position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.38) 50%, transparent 75%);
          animation: pgn-faq-shine-btn 3.2s ease-in-out 0.8s infinite;
          pointer-events: none;
        }
        .pgn-faq-btn-arrow { transition: transform 0.2s ease; }
        .pgn-faq-btn:hover .pgn-faq-btn-arrow { transform: rotate(45deg); }

        @media (max-width: 640px) {
          .pgn-faq-section { padding: 80px 20px 100px; }
          .pgn-faq-header  { margin-bottom: 40px; }
        }
      `}</style>

      <section className="pgn-faq-section" id="faq">

        <header className="pgn-faq-header">
          <span className="pgn-faq-overline">Suporte</span>
          <h2 className="pgn-faq-title">
            Dúvidas sobre a <em>PigeonPag</em>
          </h2>
        </header>

        <ul className="pgn-faq-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {FAQS.map((item, i) => (
            <li key={i} className="pgn-faq-item">
              <button
                className="pgn-faq-trigger"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="pgn-faq-q">{item.q}</span>
                <span className={`pgn-faq-icon${open === i ? ' open' : ''}`}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              <div className={`pgn-faq-body${open === i ? ' open' : ''}`}>
                <p className="pgn-faq-answer">{item.a}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="pgn-faq-cta-wrap">
          <a href="https://app.pigeonpag.com/login" className="pgn-faq-btn">
            <span className="pgn-faq-btn-shine" aria-hidden="true" />
            Integrar agora
            <svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden="true"
              className="pgn-faq-btn-arrow" style={{ flexShrink: 0 }}>
              <path d="M6.50087 0.555176C6.50087 0.248492 6.25226 -0.000123739 5.94557 -0.000123739L0.947879 -0.000123739C0.641195 -0.000123739 0.392579 0.248492 0.392579 0.555176C0.392579 0.861859 0.641195 1.11048 0.947879 1.11048L5.39028 1.11048V5.55287C5.39028 5.85955 5.63889 6.10817 5.94557 6.10817C6.25226 6.10817 6.50087 5.85955 6.50087 5.55287V0.555176ZM0.392578 6.10817L0.785234 6.50083L6.33823 0.947832L5.94557 0.555176L5.55292 0.16252L-7.79331e-05 5.71552L0.392578 6.10817Z" fill="white"/>
            </svg>
          </a>
        </div>

      </section>
    </>
  )
}
