'use client'

import { useEffect, useRef } from 'react'

const IMG = 'https://imagedelivery.net/jmgC06hj1Xh1brKwMMi-2Q/5f0dc1c1-b3e0-42ab-4f65-a79bbe525a00/public'

export default function ImageRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const imgRef     = useRef<HTMLImageElement>(null)
  const rafRef     = useRef<number>(0)

  useEffect(() => {
    let running = true

    const tick = () => {
      if (!running) return
      rafRef.current = requestAnimationFrame(tick)

      const section = sectionRef.current
      const img     = imgRef.current
      if (!section || !img) return
      const wrap = img.parentElement as HTMLElement | null
      if (!wrap) return

      const rect     = section.getBoundingClientRect()
      const total    = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.min(Math.max(scrolled / (total * 0.65), 0), 1)
      const eased    = 1 - Math.pow(1 - progress, 3)

      const rotateX      = 18 * (1 - eased)
      const scale        = 0.82 + 0.18 * eased
      const borderRadius = 20 * (1 - eased)

      wrap.style.transform    = `rotateX(${rotateX}deg) scale(${scale})`
      wrap.style.borderRadius = `${borderRadius}px`
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="pgn-reveal-section"
      style={{ position: 'relative', height: '220vh' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 600px) {
          .pgn-reveal-section { height: auto !important; }
          .pgn-reveal-sticky  {
            position: relative !important;
            height: auto !important;
            margin-top: 0 !important;
            padding-block: 32px !important;
          }
        }
      `}} />
      <div
        className="pgn-reveal-sticky"
        style={{
          position:       'sticky',
          top:            0,
          height:         '100vh',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          paddingInline:  '24px',
          marginTop:      '-160px',
        }}
      >
        <div style={{ perspective: '1200px', maxWidth: '1200px', width: '100%' }}>
          <div
            ref={wrapRef}
            style={{ borderRadius: '20px', overflow: 'hidden', lineHeight: 0 }}
          >
            <img
              ref={imgRef}
              src={IMG}
              alt="PigeonPag product"
              fetchPriority="high"
              decoding="async"
              style={{
                width:      '100%',
                height:     'auto',
                maxHeight:  '75vh',
                objectFit:  'cover',
                willChange: 'transform',
                display:    'block',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
