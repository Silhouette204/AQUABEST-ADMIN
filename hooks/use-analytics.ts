'use client'

import { useCallback } from 'react'
import type { EventName, EventProps } from '@/types/analytics'
import { track } from '@/lib/analytics/track'

export function useAnalytics() {
  const capture = useCallback(<K extends EventName>(event: K, props?: EventProps[K]) => {
    track(event, props)
  }, [])

  return { track: capture }
}
