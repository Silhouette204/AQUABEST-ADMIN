import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildPageMetadata } from '@/config/seo'

export function generateMetadata() {
  return buildPageMetadata({
    title: 'Login',
    description: 'Sign in to your account',
    path: '/login',
  })
}

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm">
            Wire forms to better-auth when you enable this template. See README for steps.
          </p>
          <Link href="/" className="text-primary text-sm underline">
            Back home
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
