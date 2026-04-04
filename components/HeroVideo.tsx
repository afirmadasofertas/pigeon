'use client'

import CloudflareVideo from './CloudflareVideo'

const DESKTOP_ID = 'b4306cc7773203eb400ae00c53af119f'
const MOBILE_ID  = '787d36927777394ee77a2d595b37aa4b'

const STYLES = `
  .pgn-hero-vid-desktop { display: block; }
  .pgn-hero-vid-mobile  { display: none;  }

  @media (max-width: 600px) {
    .pgn-hero-vid-desktop { display: none;  }
    .pgn-hero-vid-mobile  { display: block; }
  }
`

export default function HeroVideo({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Desktop video — positioned by HeroSection via className/style */}
      <CloudflareVideo
        videoId={DESKTOP_ID}
        className={`pgn-hero-vid-desktop ${className ?? ''}`.trim()}
        style={style}
        objectFit="cover"
      />

      {/* Mobile video — fills the entire hero section 100% */}
      <CloudflareVideo
        videoId={MOBILE_ID}
        className="pgn-hero-vid-mobile"
        style={{
          position: 'absolute',
          top:      0,
          left:     0,
          right:    0,
          bottom:   0,
        }}
        objectFit="cover"
      />
    </>
  )
}
