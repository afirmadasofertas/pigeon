'use client'

/**
 * CloudflareVideo — Video.js + HLS player for Cloudflare Stream.
 * Forces maximum quality by:
 *   1. Setting a very high initial bandwidth hint so VHS picks the top rendition immediately.
 *   2. Locking all quality representations to the highest after metadata loads.
 */

import { useEffect, useRef } from 'react'

const CF_BASE      = 'https://customer-siyy2ilzb5oakkgv.cloudflarestream.com'
const VIDEOJS_CSS  = 'https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video-js.min.css'
const VIDEOJS_JS   = 'https://cdnjs.cloudflare.com/ajax/libs/video.js/7.10.2/video.min.js'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    videojs: any
  }
}

let vjsReady: Promise<void> | null = null

function ensureVjs(): Promise<void> {
  if (vjsReady) return vjsReady
  vjsReady = new Promise<void>((resolve, reject) => {
    // CSS
    if (!document.querySelector(`link[href="${VIDEOJS_CSS}"]`)) {
      const l = document.createElement('link')
      l.rel = 'stylesheet'; l.href = VIDEOJS_CSS
      document.head.appendChild(l)
    }
    // JS
    if (document.querySelector(`script[src="${VIDEOJS_JS}"]`)) { resolve(); return }
    const s = document.createElement('script')
    s.src = VIDEOJS_JS
    s.onload = () => resolve()
    s.onerror = reject
    document.head.appendChild(s)
  })
  return vjsReady
}

function lockMaxQuality(player: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  try {
    const tech = player.tech({ IWillNotUseThisInPlugins: true })
    const reps = tech?.vhs?.representations?.() ?? []
    if (!reps.length) return
    // find highest by height, fallback to bandwidth
    const sorted = [...reps].sort(
      (a: any, b: any) => ((b.height || b.bandwidth || 0) - (a.height || a.bandwidth || 0)) // eslint-disable-line @typescript-eslint/no-explicit-any
    )
    reps.forEach((r: any) => r.enabled(r === sorted[0])) // eslint-disable-line @typescript-eslint/no-explicit-any
  } catch { /* tech not ready yet — will retry on next event */ }
}

interface Props {
  videoId: string
  className?: string
  style?: React.CSSProperties
  objectFit?: 'cover' | 'contain'
}

export default function CloudflareVideo({ videoId, className, style, objectFit = 'cover' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
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
            // Advertise a very high bandwidth so VHS selects the top quality tier immediately
            bandwidth:               99_999_999,
            enableLowInitialPlaylist: false,
          },
        },
      })

      // Lock to max quality once the manifest is parsed
      playerRef.current.on('loadedmetadata', () => lockMaxQuality(playerRef.current))
      // Retry after a short delay (some edge cases)
      playerRef.current.on('play', () => setTimeout(() => lockMaxQuality(playerRef.current), 500))
    }

    init()

    return () => {
      cancelled = true
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [videoId])

  return (
    <div data-vjs-player className={className} style={style}>
      <video
        ref={videoRef}
        className="video-js"
        muted
        playsInline
        loop
        autoPlay
        style={{
          width:        '100%',
          height:       '100%',
          objectFit,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
