'use client'

export default function HeroVideo({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={style}>
      <iframe
        src="https://customer-siyy2ilzb5oakkgv.cloudflarestream.com/b4306cc7773203eb400ae00c53af119f/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-siyy2ilzb5oakkgv.cloudflarestream.com%2Fb4306cc7773203eb400ae00c53af119f%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&controls=false"
        style={{ border: 'none', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', pointerEvents: 'none' }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
      />
    </div>
  )
}
