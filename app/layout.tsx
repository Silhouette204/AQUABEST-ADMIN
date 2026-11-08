import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, JetBrains_Mono, Poppins } from 'next/font/google'
import { TailwindIndicator } from '@/components/ui/tailwind-indicator'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from 'sonner'
import { JsonLdScript } from '@/components/seo/json-ld-script'
import { Providers } from '@/components/providers'
import { defaultMetadata } from '@/config/seo'
import { organizationSchema, websiteSchema } from '@/lib/seo/json-ld'
import { cn } from '@/lib/utils'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export function generateMetadata(): Metadata {
  return defaultMetadata
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        poppins.variable,
        geistSans.variable,
        geistMono.variable,
        jetbrainsMono.variable,
        'font-sans',
      )}
    >
      <body
        className="bg-background text-foreground flex min-h-full flex-col"
        suppressHydrationWarning
      >
        <JsonLdScript data={organizationSchema()} />
        <JsonLdScript data={websiteSchema()} />
        <Providers>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}