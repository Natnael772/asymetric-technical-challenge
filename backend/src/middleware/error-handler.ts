import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error.js';
import { errorResponse } from '../utils/api-response.js';
import { config } from '../config/index.js';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(errorResponse(err.message));
    return;
  }

  console.error('Unhandled error:', err);

  res.status(500).json(errorResponse(config.isProduction ? 'Internal server error' : err.message));
}
