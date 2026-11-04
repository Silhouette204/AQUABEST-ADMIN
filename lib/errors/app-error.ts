export class AppError extends Error {
  readonly code: string
  override readonly cause?: unknown
  readonly context?: Record<string, string | number | boolean>

  constructor(
    message: string,
    code: string,
    options?: {
      cause?: unknown
      context?: Record<string, string | number | boolean>
    },
  ) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.cause = options?.cause
    this.context = options?.context
  }

  static from(error: unknown, context?: Record<string, string | number | boolean>): AppError {
    if (error instanceof AppError) {
      return error
    }
    if (error instanceof Error) {
      return new AppError(error.message, 'UNKNOWN', { cause: error, context })
    }
    return new AppError(String(error), 'UNKNOWN', { context })
  }
}
