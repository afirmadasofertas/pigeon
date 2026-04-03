'use client'

/**
 * CloudflareVideo — Video.js + HLS player for Cloudflare Stream.
 * Forces maximum quality by:
 *   1. Setting a very high initial bandwidth hint so VHS picks the top rendition immediately.
 *   2. Locking all quality representations to the highest after metadata loads.
 */

import { useEffect, useRef } from 'react'

const CF_BASE     = 'https://customer-siyy2ilzb5oakkgv.cloudflarestream.com'
const VIDEOJS_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video-js.min.css'
const VIDEOJS_JS  = 'https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video.min.js'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window { videojs: any }
}

let vjsReady: Promise<void> | null = null

function ensureVjs(): Promise<void> {
  if (vjsReady) return vjsReady
  vjsReady = new Promise<void>((resolve, reject) => {
    if (!document.querySelector(`link[href="${VIDEOJS_CSS}"]`)) {
      const l = document.createElement('link')
      l.rel = 'stylesheet'; l.href = VIDEOJS_CSS
      document.head.appendChild(l)
    }
    if (document.querySelector(`script[src="${VIDEOJS_JS}"]`)) { resolve(); return }
    const s = document.createElement('script')
    s.src = VIDEOJS_JS
    s.onload  = () => resolve()
    s.onerror = reject
    document.head.appendChild(s)
  })
  return vjsReady
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lockMaxQuality(player: any) {
  try {
    const tech = player.tech({ IWillNotUseThisInPlugins: true })
    const reps = tech?.vhs?.representations?.() ?? []
    if (!reps.length) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sorted = [...reps].sort((a: any, b: any) =>
      (b.height || b.bandwidth || 0) - (a.height || a.bandwidth || 0)
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reps.forEach((r: any) => r.enabled(r === sorted[0]))
  } catch { /* tech not ready yet */ }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function forceSize(player: any, objectFit: string) {
  const el = player.el() as HTMLElement | null
  if (!el) return
  // Override video-js.min.css defaults (width:300px; height:150px)
  el.style.width    = '100%'
  el.style.height   = '100%'
  el.style.position = 'absolute'
  el.style.top      = '0'
  el.style.left     = '0'
  el.style.right    = '0'
  el.style.bottom   = '0'
  const vid = el.querySelector('video') as HTMLVideoElement | null
  if (vid) {
    vid.style.width         = '100%'
    vid.style.height        = '100%'
    vid.style.objectFit     = objectFit
    vid.style.pointerEvents = 'none'
  }
}

interface Props {
  videoId: string
  className?: string
  style?: React.CSSProperties
  objectFit?: 'cover' | 'contain'
}

export default function CloudflareVideo({ videoId, className, style, objectFit = 'cover' }: Props) {
  const videoRef  = useRef<HTMLVideoElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null)

  useEffect(() => {
    let cancelled = false

    async function init() {
      await ensureVjs()
      if (cancelled || !videoRef.current) return
      const vjs = window.videojs
      if (!vjs || playerRef.current) return

      const src = `${CF_BASE}/${videoId}/manifest/video.m3u8`

      playerRef.current = vjs(videoRef.current, {
        autoplay:    'muted',
        muted:       true,
        loop:        true,
        preload:     'auto',
        controls:    false,
        playsinline: true,
        fluid:       false,
        sources:     [{ src, type: 'application/x-mpegURL' }],
        html5: {
          vhs: {
            bandwidth:                99_999_999,
            enableLowInitialPlaylist: false,
          },
        },
      })

      forceSize(playerRef.current, objectFit)
      playerRef.current.on('ready',         () => forceSize(playerRef.current, objectFit))
      playerRef.current.on('loadedmetadata', () => { forceSize(playerRef.current, objectFit); lockMaxQuality(playerRef.current) })
      playerRef.current.on('play',          () => { forceSize(playerRef.current, objectFit); setTimeout(() => lockMaxQuality(playerRef.current), 500) })
    }

    init()

    return () => {
      cancelled = true
      if (playerRef.current) { playerRef.current.dispose(); playerRef.current = null }
    }
  }, [videoId, objectFit])

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top:      0,
        left:     0,
        right:    0,
        bottom:   0,
        overflow: 'hidden',
        ...style,
      }}
    >
      <video
        ref={videoRef}
        className="video-js"
        muted
        playsInline
        loop
        autoPlay
      />
    </div>
  )
}
