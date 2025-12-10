import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { routes } from './routes';
import { errorHandler } from './middleware/error-handler';
import { swaggerSpec } from './config/swagger';

export function createApp(): Express {
  const app = express();

  // Security middleware
  app.use(helmet());
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
