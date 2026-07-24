export class AppError extends Error {
  code: string;
  originalError?: unknown;

  constructor(code: string, message: string, originalError?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.originalError = originalError;
  }
}

export function createAppError(code: string, message: string, originalError?: unknown): AppError {
  return new AppError(code, message, originalError);
}
