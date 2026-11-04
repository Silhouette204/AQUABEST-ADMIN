'use client'

import type { EventName, EventProps } from '@/types/analytics'
import { posthog } from '@/lib/analytics/posthog-client'

export function track<K extends EventName>(event: K, props?: EventProps[K]): void {
  if (typeof window === 'undefined') {
    return
  }
  const payload = props as Record<string, string | number | boolean | undefined> | undefined
  posthog.capture(event, payload)
}

export function identify(userId: string, traits?: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined') {
    return
  }
  posthog.identify(userId, traits)
}

export function resetAnalytics(): void {
  if (typeof window === 'undefined') {
    return
  }
  posthog.reset()
}
