import { buildPageMetadata } from '@/config/seo'

export function generateMetadata() {
  return buildPageMetadata({
    title: 'Dashboard',
    description: 'Application workspace',
    path: '/dashboard',
  })
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground text-sm">Workspace overview.</p>
    </div>
  )
}
