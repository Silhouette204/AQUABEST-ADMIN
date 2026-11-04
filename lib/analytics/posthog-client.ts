'use client'

import posthog from 'posthog-js'
import { env } from '@/lib/env'

let initialized = false

export function initPosthog(): void {
  if (typeof window === 'undefined' || initialized) {
    return
  }
  const key = env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) {
    return
  }
  posthog.init(key, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    autocapture: true,
    capture_pageview: false,
    persistence: 'localStorage',
  })
  initialized = true
}

export { posthog }
