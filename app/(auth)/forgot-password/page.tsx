import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildPageMetadata } from '@/config/seo'

export function generateMetadata() {
  return buildPageMetadata({
    title: 'Forgot password',
    description: 'Request a password reset',
    path: '/forgot-password',
  })
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Forgot password</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm">
            Wire requestPasswordReset when you enable this template. See README for steps.
          </p>
          <Link href="/login" className="text-primary text-sm underline">
            Back to login
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
