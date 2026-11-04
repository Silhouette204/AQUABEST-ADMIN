'use client'

import { useSession as useBetterAuthSession } from '@/lib/auth/auth-client'

export function useAppSession() {
  const { data, isPending, error } = useBetterAuthSession()

  const user = data?.user ?? null

  return {
    user,
    session: data?.session ?? null,
    role: user ? ((user.role as string | undefined) ?? null) : null,
    isLoading: isPending,
    isAuthenticated: Boolean(data?.session),
    error,
  }
}
