'use client'

import { useEffect, useRef } from 'react'

const HLS_SRC = 'https://customer-siyy2ilzb5oakkgv.cloudflarestream.com/b4306cc7773203eb400ae00c53af119f/manifest/video.m3u8'
const VIDEOJS_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video-js.min.css'
const VIDEOJS_JS  = 'https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video.min.js'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    videojs: any
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const s = document.createElement('script')
    s.src = src
    s.onload = () => resolve()
    s.onerror = reject
    document.head.appendChild(s)
  })
}

function loadLink(href: string) {
  if (document.querySelector(`link[href="${href}"]`)) return
  const l = document.createElement('link')
  l.rel = 'stylesheet'
  l.href = href
  document.head.appendChild(l)
}

export default function HeroVideo({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null)

  useEffect(() => {
    let cancelled = false

    async function init() {
      loadLink(VIDEOJS_CSS)
      await loadScript(VIDEOJS_JS)
      if (cancelled || !videoRef.current) return

      const vjs = window.videojs
      if (!vjs) return

      playerRef.current = vjs(videoRef.current, {
        autoplay:  'muted',
        muted:     true,
        loop:      true,
        preload:   'auto',
        controls:  false,
        playsinline: true,
        fluid:     false,
        sources: [{ src: HLS_SRC, type: 'application/x-mpegURL' }],
      })
    }

    init()

    return () => {
      cancelled = true
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [])

  return (
    <div data-vjs-player className={className} style={style}>
      <video
        ref={videoRef}
        className="video-js"
        muted
        playsInline
        loop
        autoPlay
        style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
      />
    </div>
  )
}
