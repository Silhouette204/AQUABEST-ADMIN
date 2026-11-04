import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { buildPageMetadata } from '@/config/seo'

export function generateMetadata() {
  return buildPageMetadata({
    title: 'Reset password',
    description: 'Set a new password',
    path: '/reset-password',
  })
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset password</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm">
            Wire resetPassword with the token from the email link when you enable this template. See
            README for steps.
          </p>
          <Link href="/login" className="text-primary text-sm underline">
            Back to login
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
