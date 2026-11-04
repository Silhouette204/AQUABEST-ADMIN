'use client'

import { ThemeProvider } from 'next-themes'
import { AnalyticsProvider } from '@/lib/analytics/provider'
import { QueryProvider } from '@/lib/query/provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}
