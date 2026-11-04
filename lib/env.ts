import { z } from 'zod'

const defaults = {
  NEXT_PUBLIC_API_URL: 'http://localhost:3001',
  NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  NEXT_PUBLIC_APP_ROLE: 'user',
  NEXT_PUBLIC_SITE_NAME: 'Z0 Web App',
  NEXT_PUBLIC_POSTHOG_HOST: 'https://us.i.posthog.com',
} as const

const publicEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_PUBLIC_APP_URL: z.url(),
  NEXT_PUBLIC_APP_ROLE: z.string().min(1),
  NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.url(),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1),
})

type PublicEnv = z.infer<typeof publicEnvSchema>

function readPublicEnv(): PublicEnv {
  const posthogKeyRaw = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogKey =
    posthogKeyRaw !== undefined && posthogKeyRaw.trim().length > 0
      ? posthogKeyRaw.trim()
      : undefined

  const raw = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? defaults.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? defaults.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_ROLE: process.env.NEXT_PUBLIC_APP_ROLE ?? defaults.NEXT_PUBLIC_APP_ROLE,
    NEXT_PUBLIC_POSTHOG_KEY: posthogKey,
    NEXT_PUBLIC_POSTHOG_HOST:
      process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || defaults.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME ?? defaults.NEXT_PUBLIC_SITE_NAME,
  }

  const parsed = publicEnvSchema.safeParse(raw)
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')
    throw new Error(`Invalid public environment: ${message}`)
  }
  return parsed.data
}

export const env = readPublicEnv()
