'use client'

import { useEffect, useRef } from 'react'

export default function TaxasSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLHeadingElement>(null)
  const bodyRef    = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    let rafId = 0
    let running = true

    const tick = () => {
      if (!running) return
      rafId = requestAnimationFrame(tick)

      const section = sectionRef.current
      const title   = titleRef.current
      const body    = bodyRef.current
      if (!section || !title || !body) return

      const { top } = section.getBoundingClientRect()
      const vh = window.innerHeight

      // progress 0→1 as section scrolls from bottom of viewport to center
      const start = vh * 0.85
      const end   = vh * 0.3
      const raw   = (start - top) / (start - end)
      const p     = Math.min(Math.max(raw, 0), 1)

      // eased
      const eased = 1 - Math.pow(1 - p, 3)

      // title: white 18% opacity → #B7D6FF full (same as "A solução Pix")
      const r = Math.round(255 + (183 - 255) * eased)
      const g = Math.round(255 + (214 - 255) * eased)
      const b = Math.round(255 + (255 - 255) * eased)
      const titleA = 0.18 + 0.82 * eased
      title.style.color = `rgba(${r},${g},${b},${titleA.toFixed(3)})`

      // body: rgba(255,255,255,0.18) → rgba(255,255,255,0.72)
      const bodyA = 0.18 + 0.54 * eased
      body.style.color = `rgba(255,255,255,${bodyA.toFixed(3)})`
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <style>{`
        .pgn-taxas-section {
          position: relative;
          width: 100%;
          padding: 120px 24px 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .pgn-taxas-inner {
          max-width: 720px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          text-align: center;
        }

        .pgn-taxas-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.18);
          margin: 0;
          will-change: color;
        }

        .pgn-taxas-title em {
          font-family: var(--ds-font-display);
          font-style: italic;
          font-weight: 400;
          color: inherit;
        }

        .pgn-taxas-body {
          font-size: clamp(1rem, 1.8vw, 1.2rem);
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.18);
          margin: 0;
          max-width: 560px;
          will-change: color;
        }

        @media (max-width: 640px) {
          .pgn-taxas-section {
            padding: 80px 20px 100px;
          }
          .pgn-taxas-inner {
            gap: 18px;
          }
        }
      `}</style>

      <section ref={sectionRef} className="pgn-taxas-section" id="taxas">
        <div className="pgn-taxas-inner">
          <h2 ref={titleRef} className="pgn-taxas-title">
            Menos taxas e <em>mais performance</em>
          </h2>
          <p ref={bodyRef} className="pgn-taxas-body">
            Aqui as taxas são realmente justas! Sem taxas abusivas ou ocultas.
            Nosso foco é em entregar o melhor sistema para maximizar o número
            de transações aprovadas.
          </p>
        </div>
      </section>
    </>
  )
}
