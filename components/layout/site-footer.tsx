import { siteConfig } from '@/config/site'

export function SiteFooter() {
  return (
    <footer className="border-border text-muted-foreground mt-auto border-t py-8 text-sm">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p>{siteConfig.name}</p>
        <p className="text-xs">Built with Next.js</p>
      </div>
    </footer>
  )
}
