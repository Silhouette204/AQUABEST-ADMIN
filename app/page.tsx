import { unstable_cache } from 'next/cache'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { buildPageMetadata } from '@/config/seo'
import { siteConfig } from '@/config/site'

const getCachedList = unstable_cache(
  async () => {
    await Promise.resolve()
    return Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Item ${String(i + 1)}`,
    }))
  },
  ['home-list-v1'],
  { revalidate: 3600 },
)

export const revalidate = 3600

export function generateMetadata() {
  return buildPageMetadata({
    title: 'Home',
    description: siteConfig.description,
    path: '/',
  })
}

export default async function Home() {
  const items = await getCachedList()

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-4">
          <h1 className="text-foreground text-4xl font-semibold tracking-tight">
            {siteConfig.name}
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">{siteConfig.description}</p>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.id} className="border-border bg-card rounded border px-4 py-3 text-sm">
              {item.title}
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  )
}
