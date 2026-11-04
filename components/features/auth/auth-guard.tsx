'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { env } from '@/lib/env'
import { signOut } from '@/lib/auth/auth-client'
import { useAppSession } from '@/hooks/use-session'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, role } = useAppSession()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] flex-1 items-center justify-center">
        <div className="text-muted-foreground text-sm">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const expectedRole = env.NEXT_PUBLIC_APP_ROLE
  const userRole = role ?? 'user'

  if (userRole !== expectedRole) {
    return (
      <div className="flex min-h-[40vh] flex-1 items-center justify-center px-6">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground text-center text-base">
              This app is for <span className="text-foreground font-semibold">{expectedRole}</span>{' '}
              users. You are signed in as{' '}
              <span className="text-foreground font-semibold">{userRole}</span>.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              void signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.replace('/login')
                  },
                },
              })
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
