'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { logError } from '@/lib/errors/logger'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    const digest = error.digest
    logError(error, digest ? { digest } : undefined)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-1 flex-col items-center justify-center gap-4 px-6">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground text-center text-sm">{error.message}</p>
      <Button
        type="button"
        onClick={() => {
          reset()
        }}
      >
        Try again
      </Button>
    </div>
  )
}
