export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message);
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string): ApiError {
    return new ApiError(400, message);
  }

  static notFound(message: string): ApiError {
    return new ApiError(404, message);
  }

  static internal(message: string): ApiError {
    return new ApiError(500, message);
  }
}
