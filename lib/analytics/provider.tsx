'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect, useLayoutEffect } from 'react'
import { env } from '@/lib/env'
import { initPosthog, posthog } from '@/lib/analytics/posthog-client'
import { track } from '@/lib/analytics/track'

function PosthogPageview(): null {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!env.NEXT_PUBLIC_POSTHOG_KEY) {
      return
    }
    const search = searchParams.toString()
    const path = `${pathname}${search.length > 0 ? `?${search}` : ''}`
    posthog.capture('$pageview', {
      $current_url: `${window.location.origin}${path}`,
    })
    track('page_view', { path, search: search || undefined })
  }, [pathname, searchParams])

  return null
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  useLayoutEffect(() => {
    initPosthog()
  }, [])

  if (!env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>
  }

  return (
    <PostHogProvider client={posthog}>
      <PosthogPageview />
      {children}
    </PostHogProvider>
  )
}
