import Link from 'next/link'
import { siteConfig } from '@/config/site'

export function SiteHeader() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-foreground font-semibold">
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            Docs
          </a>
        </nav>
      </div>
    </header>
  )
}
