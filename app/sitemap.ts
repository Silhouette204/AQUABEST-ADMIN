import type { MetadataRoute } from 'next'
import { env } from '@/lib/env'

export function getDynamicRoutes(): Promise<MetadataRoute.Sitemap> {
  return Promise.resolve([])
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')
  const now = new Date()
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/login`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${base}/register`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${base}/forgot-password`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${base}/reset-password`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${base}/dashboard`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${base}/prefetch-demo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
  const dynamic = await getDynamicRoutes()
  return [...staticRoutes, ...dynamic]
}
