import type { ApiErrorBody } from '@/types/api'
import { env } from '@/lib/env'
import { logError } from '@/lib/errors/logger'

type ApiFetchOptions = RequestInit & {
  next?: { revalidate?: number | false; tags?: string[] }
}

export async function apiFetch<T>(path: string, init?: ApiFetchOptions): Promise<T> {
  const base = env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const url = `${base}${normalizedPath}`

  const headers = new Headers(init?.headers)
  headers.set('Content-Type', 'application/json')

  const res = await fetch(url, {
    ...init,
    headers,
    credentials: 'include',
    next: init?.next ?? { revalidate: 60 },
  })

  if (!res.ok) {
    let body: ApiErrorBody | null = null
    try {
      body = (await res.json()) as ApiErrorBody
    } catch {
      body = null
    }
    const message = body?.message ?? body?.error ?? `Request failed: ${String(res.status)}`
    const err = new Error(message)
    logError(err, { status: res.status, path: normalizedPath })
    throw err
  }

  return (await res.json()) as T
}
