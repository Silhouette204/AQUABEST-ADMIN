import { env } from '@/lib/env'

export const siteConfig = {
  name: env.NEXT_PUBLIC_SITE_NAME,
  description:
    'A production-ready Next.js template for landing pages and web apps with SEO, analytics, and optional auth.',
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/opengraph-image`,
  twitter: {
    creator: '@z0webapp',
    site: '@z0webapp',
  },
  locale: 'en_US',
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'SEO', 'PostHog', 'TanStack Query'],
} as const
