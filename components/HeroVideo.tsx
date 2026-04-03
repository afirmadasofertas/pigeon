'use client'

import CloudflareVideo from './CloudflareVideo'

const HERO_VIDEO_ID = 'b4306cc7773203eb400ae00c53af119f'

export default function HeroVideo({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <CloudflareVideo
      videoId={HERO_VIDEO_ID}
      className={className}
      style={style}
      objectFit="cover"
    />
  )
}
