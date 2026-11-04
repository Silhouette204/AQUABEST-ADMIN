'use client'

import { useEffect } from 'react'
import { logError } from '@/lib/errors/logger'

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    logError(error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-4 px-6">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <button
          type="button"
          className="border-border bg-background rounded border px-4 py-2 text-sm"
          onClick={() => {
            reset()
          }}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
