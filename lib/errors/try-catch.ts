import { AppError } from '@/lib/errors/app-error'

export async function tryCatch<T>(fn: () => Promise<T>): Promise<[T, null] | [null, AppError]> {
  try {
    const data = await fn()
    return [data, null]
  } catch (error) {
    return [null, AppError.from(error)]
  }
}
