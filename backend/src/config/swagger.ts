import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'A RESTful API for a blog platform',
    },
    servers: [
      {
        url: '/api',
        description: 'API server',
      },
    ],
    components: {
      schemas: {
        Article: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            excerpt: { type: 'string' },
            content: { type: 'string' },
            htmlContent: { type: 'string', nullable: true },
            imageUrl: { type: 'string', nullable: true },
            readingTime: { type: 'integer', nullable: true },
            publishedAt: { type: 'string', format: 'date-time' },
            authorId: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Author: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            avatar: { type: 'string', nullable: true },
            bio: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/api/**/*.routes.ts', './src/api/**/*.swagger.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
