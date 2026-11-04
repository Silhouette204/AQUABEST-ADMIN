'use client'

import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query/keys'
import { loadDemoData } from '@/lib/query/demo-data'

export function PrefetchDemoClient() {
  const { data, isPending } = useQuery({
    queryKey: queryKeys.demo(),
    queryFn: loadDemoData,
  })

  if (isPending) {
    return <p className="text-muted-foreground text-sm">Loading…</p>
  }

  return (
    <pre className="bg-muted overflow-x-auto rounded border p-4 text-xs">
      {JSON.stringify(data, null, 4)}
    </pre>
  )
}
