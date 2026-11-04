import { AppError } from '@/lib/errors/app-error'
import { env } from '@/lib/env'

export function logError(
  error: unknown,
  context?: Record<string, string | number | boolean>,
): AppError {
  const normalized = AppError.from(error, context)

  if (typeof window === 'undefined') {
    console.error('[server]', normalized.message, normalized.cause ?? normalized)
    return normalized
  }

  if (!env.NEXT_PUBLIC_POSTHOG_KEY) {
    console.error(normalized.message, normalized.cause ?? normalized)
    return normalized
  }

  void import('posthog-js')
    .then((ph) => {
      ph.default.capture('$exception', {
        $exception_message: normalized.message,
        $exception_type: normalized.code,
        ...context,
      })
    })
    .catch(() => {
      console.error(normalized.message, normalized.cause)
    })

  return normalized
}
