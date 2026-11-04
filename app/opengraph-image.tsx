import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

export const runtime = 'edge'

export const alt = siteConfig.name

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 64,
        background: '#fafafa',
        color: '#0a0a0a',
      }}
    >
      <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.name}</div>
      <div style={{ marginTop: 16, fontSize: 24, color: '#525252', maxWidth: 900 }}>
        {siteConfig.description}
      </div>
    </div>,
    {
      ...size,
    },
  )
}
