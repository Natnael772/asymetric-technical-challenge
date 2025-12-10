import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { routes } from './routes';
import { errorHandler } from './middleware/error-handler';
import { swaggerSpec } from './config/swagger';

export function createApp(): Express {
  const app = express();

  // Security middleware with relaxed settings for HTTP production
  app.use(
    helmet({
      // Disable policies that require HTTPS
      crossOriginOpenerPolicy: false,
      crossOriginEmbedderPolicy: false,
      // Relax CSP for Swagger UI
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
    })
  );
  app.use(cors());

  // Body parsing
  app.use(express.json());

  // Swagger documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // API routes
  app.use('/api', routes);

  // Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Non existing route
  app.use((_req, res) => {
    res.status(404).json({ message: 'Route Not Found' });
  });

  // Error handling
  app.use(errorHandler);

  return app;
}
