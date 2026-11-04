# z0-web-app-fe

Web-only Next.js template for marketing sites or full web apps. It mirrors the structure and conventions of `z0-native-app-fe` where it makes sense: environment-driven config, optional better-auth against `z0-native-app-be`, RBAC via `NEXT_PUBLIC_APP_ROLE`, TanStack Query, PostHog analytics, and strict TypeScript plus ESLint.

## Quick start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Description             |
| ------------------- | ----------------------- |
| `pnpm dev`          | Next.js dev server      |
| `pnpm build`        | Production build        |
| `pnpm start`        | Start production server |
| `pnpm lint`         | ESLint                  |
| `pnpm lint:fix`     | ESLint with fix         |
| `pnpm typecheck`    | TypeScript without emit |
| `pnpm format`       | Prettier write          |
| `pnpm format:check` | Prettier check          |

## Environment variables

| Variable                   | Description                                                |
| -------------------------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`      | better-auth API base (for example `http://localhost:3001`) |
| `NEXT_PUBLIC_APP_URL`      | Canonical site URL for metadata and sitemaps               |
| `NEXT_PUBLIC_APP_ROLE`     | Role this web shell expects when using `AuthGuard`         |
| `NEXT_PUBLIC_POSTHOG_KEY`  | PostHog project key (omit to disable analytics)            |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog API host (default US cloud)                        |
| `NEXT_PUBLIC_SITE_NAME`    | Short site name for titles and OG                          |

Defaults are applied in `lib/env.ts` so local builds work without a `.env` file.

## Folder map

| Path                   | Purpose                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| `app/`                 | Routes, layouts, `generateMetadata`, loading and error UI          |
| `actions/`             | Server Actions with Zod and `{ data, error }` responses            |
| `components/ui/`       | shadcn primitives                                                  |
| `components/layout/`   | `SiteHeader`, `SiteFooter`, and similar                            |
| `components/features/` | Domain UI (for example `auth/`, `demo/`)                           |
| `components/seo/`      | JSON-LD helpers                                                    |
| `config/`              | `site.ts`, `seo.ts` defaults                                       |
| `hooks/`               | Client hooks (`useSession`, `useAnalytics`, `useIsMobile`)         |
| `lib/`                 | `env`, `api-client`, `analytics`, `auth`, `errors`, `query`, `seo` |
| `types/`               | Shared types and `env.d.ts`                                        |

## SEO

- Global metadata lives in `config/seo.ts` and `config/site.ts`. Per-page metadata should use `buildPageMetadata` from `config/seo` or `@/lib/seo/metadata`.
- `app/robots.ts`, `app/sitemap.ts`, and `app/manifest.ts` power `robots.txt`, `sitemap.xml`, and the web manifest. Extend `getDynamicRoutes` in `app/sitemap.ts` for CMS or database URLs.
- JSON-LD builders live in `lib/seo/json-ld.ts`. The root layout injects Organization and WebSite schemas.
- Generated routes: `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx` (using `next/og`). You can replace these with static assets under `public/` for full brand control.

### Asset dimensions (when using static files)

| Asset            | Suggested size             | Notes                                                  |
| ---------------- | -------------------------- | ------------------------------------------------------ |
| Open Graph       | 1200x1200 or 1200x630      | Social cards; align with `config/seo` image references |
| Twitter card     | 1200x630                   | Large summary when using static images                 |
| Apple touch icon | 180x180                    | Home screen                                            |
| Favicon          | 32x32 or multi-size `.ico` | Can coexist with `app/icon.tsx`                        |
| PWA icons        | 512x512                    | Referenced from `app/manifest.ts`                      |

## Analytics (PostHog)

1. Create a PostHog project and set `NEXT_PUBLIC_POSTHOG_KEY` and optionally `NEXT_PUBLIC_POSTHOG_HOST`.
2. `AnalyticsProvider` enables autocapture and manual route pageviews. Custom events go through `track` from `@/lib/analytics/track`.
3. Add new event names and payloads in `types/analytics.ts` before calling `track`.

### Advanced (optional)

Session recording, feature flags, and group analytics are not wired by default. Enable them in PostHog project settings and extend `lib/analytics/posthog-client.ts` with the options you need, then document any new env vars in this README and `.env.example`.

## Auth and RBAC (optional)

1. Run [z0-native-app-be](https://github.com/zerosyslab/z0-native-app-be) (or your API) and set `NEXT_PUBLIC_API_URL` to its public origin.
2. `lib/auth/auth-client.ts` uses better-auth with the `adminClient` plugin. Session shape matches the backend user model.
3. `hooks/use-session.ts` exposes `role`. `AuthGuard` in `components/features/auth/auth-guard.tsx` compares `user.role` to `NEXT_PUBLIC_APP_ROLE`.
4. Scaffold routes: `/login`, `/register`, `/forgot-password`, `/reset-password` under `app/(auth)/`. Wire forms to `signIn`, `signUp`, `requestPasswordReset`, and `resetPassword` when you enable flows.
5. To protect app routes, wrap `app/(app)/layout.tsx` with `AuthGuard` (see README in this repo for the pattern once you enable auth).

## State management (TanStack Query)

- Client defaults live in `lib/query/query-client.ts` and `lib/query/provider.tsx`.
- Centralize keys in `lib/query/keys.ts`.
- See `app/prefetch-demo/page.tsx` for server prefetch with `unstable_cache`, `prefetchQuery`, and `HydrationBoundary`.

## Error handling

- Use `AppError`, `tryCatch`, and `logError` from `lib/errors/`.
- `app/error.tsx` and `app/global-error.tsx` log through `logError` and send to PostHog when a key is configured.

## Performance

- Home and demo routes use `revalidate` and `unstable_cache` for read-heavy lists.
- Prefer Server Components; add `'use client'` only where required.
- Tune `next.config.ts` (`optimizePackageImports`, `images.remotePatterns`) for your dependencies and image hosts.

## Cursor rules

| Rule                      | Scope                 |
| ------------------------- | --------------------- |
| `update-docs.mdc`         | Docs and skills index |
| `seo.mdc`                 | SEO-related files     |
| `analytics.mdc`           | Analytics and events  |
| `project-conventions.mdc` | Global conventions    |
| `performance.mdc`         | `app/` performance    |

## License

See [LICENSE](./LICENSE).
