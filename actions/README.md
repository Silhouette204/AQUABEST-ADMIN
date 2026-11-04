# Server actions

- Place files here with the `'use server'` directive at the top of the file or per function.
- Validate input with Zod in every action. Return a discriminated union such as `{ data, error }` instead of throwing for expected validation failures.
- Keep actions thin: call helpers in `lib/` for business logic and data access.
- Use `apiFetch` or `fetch` with `next: { revalidate, tags }` for server-side caching.
- Prefer `tryCatch` / `logError` from `lib/errors` when unexpected failures must be recorded.
