import Link from 'next/link'
import { buildPageMetadata } from '@/config/seo'

export function generateMetadata() {
  return buildPageMetadata({
    title: 'Not found',
    description: 'The page you requested does not exist.',
    path: '/404',
    noIndex: true,
  })
}

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-1 flex-col items-center justify-center gap-4 px-6">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground text-sm">The page you requested does not exist.</p>
      <Link href="/" className="text-primary text-sm underline">
        Back home
      </Link>
    </div>
  )
}
