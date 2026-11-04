declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL?: string
    NEXT_PUBLIC_APP_URL?: string
    NEXT_PUBLIC_APP_ROLE?: string
    NEXT_PUBLIC_POSTHOG_KEY?: string
    NEXT_PUBLIC_POSTHOG_HOST?: string
    NEXT_PUBLIC_SITE_NAME?: string
  }
}
