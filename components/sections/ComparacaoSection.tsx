'use client'

import { useEffect, useRef } from 'react'

const BAD = [
  'Aprovação cada vez menor',
  'Grandes oscilações no sistema',
  'Taxas ocultas',
  'Reservas inesperadas',
  'Taxas cada vez maiores',
  'Desvio de vendas',
  'Med falso',
]

const GOOD = [
  'Alta aprovação',
  'Zero instabilidades',
  'Transparência total nas taxas',
  'Zero reserva',
  'Taxas justas',
]

// bg: #000D18 → #F0F6FF
const BG_A = [0, 13, 24]
const BG_B = [240, 246, 255]

// neutral text: white → #0d1a2e
const TX_A = [255, 255, 255]
const TX_B = [13, 26, 46]

// good text: #B7D6FF → #166AFD
const GD_A = [183, 214, 255]
const GD_B = [22, 106, 253]

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function ease3(t: number) { return 1 - Math.pow(1 - t, 3) }
function clamp(v: number) { return Math.min(Math.max(v, 0), 1) }
function band(p: number, s: number, e: number) { return clamp((p - s) / (e - s)) }

export default function ComparacaoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId = 0
    let running = true

    const tick = () => {
      if (!running) return
      rafId = requestAnimationFrame(tick)

      const section = sectionRef.current
      const sticky  = stickyRef.current
      if (!section || !sticky) return

      const rect  = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      const p     = clamp(-rect.top / total)

      // bg arc: dark → white (0–0.35) → hold (0.35–0.65) → white → dark (0.65–1)
      let rawBg: number
      if (p < 0.35)      rawBg = p / 0.35
      else if (p < 0.65) rawBg = 1
      else               rawBg = 1 - (p - 0.65) / 0.35
      const bgE = ease3(clamp(rawBg))

      /* ── background ── */
      const bgR = Math.round(lerp(BG_A[0], BG_B[0], bgE))
      const bgG = Math.round(lerp(BG_A[1], BG_B[1], bgE))
      const bgB = Math.round(lerp(BG_A[2], BG_B[2], bgE))
      sticky.style.backgroundColor = `rgb(${bgR},${bgG},${bgB})`

      /* ── neutral text color ── */
      const tR = Math.round(lerp(TX_A[0], TX_B[0], bgE))
      const tG = Math.round(lerp(TX_A[1], TX_B[1], bgE))
      const tB = Math.round(lerp(TX_A[2], TX_B[2], bgE))

      /* ── good text color ── */
      const gR = Math.round(lerp(GD_A[0], GD_B[0], bgE))
      const gG = Math.round(lerp(GD_A[1], GD_B[1], bgE))
      const gB = Math.round(lerp(GD_A[2], GD_B[2], bgE))

      /* ── labels ── */
      sticky.querySelectorAll<HTMLElement>('[data-label]').forEach(el => {
        el.style.color = `rgba(${tR},${tG},${tB},0.38)`
      })

      /* ── divider ── */
      const div = sticky.querySelector<HTMLElement>('[data-divider]')
      if (div) div.style.backgroundColor = `rgba(${tR},${tG},${tB},0.10)`

      /* ── bad items ── */
      const badEls = sticky.querySelectorAll<HTMLElement>('[data-bad]')
      badEls.forEach((el, i) => {
        const s  = 0.04 + i * 0.045
        const ip = ease3(band(p, s, s + 0.08))
        el.style.opacity   = ip.toFixed(3)
        el.style.transform = `translateY(${lerp(14, 0, ip).toFixed(1)}px)`
        el.style.color     = `rgba(${tR},${tG},${tB},${lerp(0.52, 0.62, bgE).toFixed(2)})`
      })

      /* ── good items ── */
      const goodEls = sticky.querySelectorAll<HTMLElement>('[data-good]')
      goodEls.forEach((el, i) => {
        const s  = 0.07 + i * 0.045
        const ip = ease3(band(p, s, s + 0.08))
        el.style.opacity   = ip.toFixed(3)
        el.style.transform = `translateY(${lerp(14, 0, ip).toFixed(1)}px)`
        el.style.color     = `rgb(${gR},${gG},${gB})`
      })
    }

    rafId = requestAnimationFrame(tick)
    return () => { running = false; cancelAnimationFrame(rafId) }
  }, [])

  return (
    <>
      <style>{`
        .pgn-cmp-section {
          position: relative;
          height: 340vh;
        }
        .pgn-cmp-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #000D18;
          will-change: background-color;
          overflow: hidden;
        }
        .pgn-cmp-inner {
          width: 100%;
          max-width: 860px;
          padding: 0 40px;
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 0 56px;
          align-items: start;
        }
        .pgn-cmp-col {
          display: flex;
          flex-direction: column;
        }
        .pgn-cmp-overline {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          margin-bottom: 20px;
          will-change: color;
        }
        .pgn-cmp-divider {
          width: 1px;
          align-self: stretch;
          margin-top: 30px;
          background: rgba(255,255,255,0.10);
          will-change: background-color;
        }
        .pgn-cmp-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 0;
          opacity: 0;
          transform: translateY(14px);
          will-change: opacity, transform, color;
          color: rgba(255,255,255,0.52);
          border-bottom: 1px solid rgba(128,160,220,0.07);
        }
        .pgn-cmp-item:last-child { border-bottom: none; }
        .pgn-cmp-text {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.45;
        }
        .pgn-cmp-icon-x {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          color: #FF4D6A;
          opacity: 0.8;
        }
        .pgn-cmp-icon-check {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          color: #166AFD;
        }

        @media (max-width: 700px) {
          .pgn-cmp-section  { height: 520vh; }
          .pgn-cmp-inner {
            grid-template-columns: 1fr;
            gap: 36px 0;
            padding: 0 24px;
          }
          .pgn-cmp-divider  { display: none; }
          .pgn-cmp-sticky   { align-items: flex-start; padding-top: 80px; overflow-y: auto; }
        }
      `}</style>

      <section ref={sectionRef} className="pgn-cmp-section" id="comparacao">
        <div ref={stickyRef} className="pgn-cmp-sticky">
          <div className="pgn-cmp-inner">

            {/* ── Left: concorrência ── */}
            <div className="pgn-cmp-col">
              <p className="pgn-cmp-overline" data-label>Na concorrência</p>
              {BAD.map((text, i) => (
                <div key={i} className="pgn-cmp-item" data-bad>
                  <svg className="pgn-cmp-icon-x" viewBox="0 0 16 16" fill="none">
                    <line x1="3.5" y1="3.5" x2="12.5" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="12.5" y1="3.5" x2="3.5" y2="12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="pgn-cmp-text">{text}</span>
                </div>
              ))}
            </div>

            {/* ── Divider ── */}
            <div className="pgn-cmp-divider" data-divider />

            {/* ── Right: PigeonPag ── */}
            <div className="pgn-cmp-col">
              <p className="pgn-cmp-overline" data-label>Na PigeonPag</p>
              {GOOD.map((text, i) => (
                <div key={i} className="pgn-cmp-item" data-good>
                  <svg className="pgn-cmp-icon-check" viewBox="0 0 16 16" fill="none">
                    <polyline points="2.5,8.5 6.5,12.5 13.5,4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="pgn-cmp-text">{text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
