import { unstable_cache } from 'next/cache'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { buildPageMetadata } from '@/config/seo'
import { PrefetchDemoClient } from '@/components/features/demo/prefetch-demo-client'
import { loadDemoData } from '@/lib/query/demo-data'
import { makeQueryClient } from '@/lib/query/query-client'
import { queryKeys } from '@/lib/query/keys'

const getCachedDemo = unstable_cache(async () => loadDemoData(), ['prefetch-demo-v1'], {
  revalidate: 3600,
})

export function generateMetadata() {
  return buildPageMetadata({
    title: 'Prefetch demo',
    description: 'TanStack Query with server prefetch and hydration',
    path: '/prefetch-demo',
  })
}

export default async function PrefetchDemoPage() {
  const queryClient = makeQueryClient()
  await queryClient.prefetchQuery({
    queryKey: queryKeys.demo(),
    queryFn: () => getCachedDemo(),
  })

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16">
      <h1 className="text-2xl font-semibold">Prefetch + hydration</h1>
      <p className="text-muted-foreground text-sm">
        Data is prefetched on the server with Next.js cache and hydrated into TanStack Query.
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PrefetchDemoClient />
      </HydrationBoundary>
    </div>
  )
}
