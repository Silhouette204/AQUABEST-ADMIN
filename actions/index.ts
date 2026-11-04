'use server'

import { z } from 'zod'

const exampleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export type ActionResult<T> = { data: T; error: null } | { data: null; error: string }

export function exampleAction(
  _prev: ActionResult<{ ok: true }> | null,
  formData: FormData,
): Promise<ActionResult<{ ok: true }>> {
  const raw = formData.get('name')
  const parsed = exampleSchema.safeParse({
    name: typeof raw === 'string' ? raw : '',
  })
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    return Promise.resolve({ data: null, error: first?.message ?? 'Invalid input' })
  }
  return Promise.resolve({ data: { ok: true }, error: null })
}
