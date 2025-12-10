# Backend - Auto-Generated Blog API

A RESTful API for the Auto-Generated Blog platform. Built with Node.js, Express, TypeScript, and Prisma ORM. Features automatic AI-powered article generation using Hugging Face.

## Overview

The backend provides a robust API for managing blog articles and authors. It includes an automated scheduling system that generates new articles daily using AI.

### Key Features

- 📚 CRUD operations for articles and authors
- 🤖 AI-powered article generation via Hugging Face
- ⏰ Automatic daily article generation (node-cron)
- 📖 Swagger API documentation
- ✅ Request validation with Zod
- 🛡️ Security with Helmet and CORS
- 🧪 Jest for unit testing

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.x | Runtime |
| Express | 4.x | Web framework |
| TypeScript | 5.x | Type safety |
| Prisma | 5.x | ORM & migrations |
| PostgreSQL | 16.x | Database |
| node-cron | 4.x | Job scheduling |
| Hugging Face | 4.x | AI text generation |
| Zod | 3.x | Validation |
| Jest | 29.x | Testing |
| Swagger | 6.x | API documentation |

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 16+
- Hugging Face API token

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

The API will be available at `http://localhost:3000`

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm run start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run typecheck
```

## Project Structure

```
src/
├── app.ts                  # Express app configuration
├── server.ts               # Server entry point
│
├── config/                 # Configuration files
│   └── swagger.ts          # Swagger/OpenAPI setup
│
├── modules/                # Feature modules
│   ├── article/            # Article module
│   │   ├── article.controller.ts
│   │   ├── article.service.ts
│   │   ├── article.generator.service.ts
│   │   ├── article.routes.ts
│   │   ├── article.swagger.ts
│   │   ├── dto/            # Data transfer objects
│   │   ├── types/          # TypeScript types
│   │   ├── validators/     # Zod schemas
│   │   └── __tests__/      # Unit tests
│   │
│   ├── authors/            # Author module
│   │   ├── author.controller.ts
│   │   ├── author.service.ts
│   │   ├── author.routes.ts
│   │   └── ...
│   │
│   ├── hugging-face/       # AI integration
│   │   └── hugging-face.client.ts
│   │
│   └── prisma/             # Prisma client singleton
│       └── prisma.client.ts
│
├── jobs/                   # Background jobs
│   ├── cron/               # Scheduled jobs
│   │   └── article-generator.cron.ts
│   └── seed/               # Database seeding
│
├── middleware/             # Express middleware
│   ├── error-handler.ts    # Global error handler
│   ├── validate-request.ts # Request validation
│   └── async-handler.ts    # Async error wrapper
│
├── routes/                 # Route definitions
│   └── index.ts            # Main router
│
└── utils/                  # Utility functions
```

## API Endpoints

### Base URL

```
http://localhost:3000/api
```

### Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/articles` | List all articles (paginated) |
| GET | `/articles/:id` | Get article by ID |
| POST | `/articles` | Create new article |
| PATCH | `/articles/:id` | Update article |
| DELETE | `/articles/:id` | Delete article |

#### Query Parameters (GET /articles)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 10 | Items per page |

#### Response Format

```json
{
  "success": true,
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

### Authors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/authors` | List all authors |
| GET | `/authors/:id` | Get author by ID |
| POST | `/authors` | Create new author |
| PATCH | `/authors/:id` | Update author |
| DELETE | `/authors/:id` | Delete author |

### Utility Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api-docs` | Swagger documentation |

## Database Schema

The application uses Prisma ORM with PostgreSQL.

### Models

```prisma
model Article {
  id          String    @id @default(cuid())
  title       String
  excerpt     String
  content     String
  htmlContent String?
  imageUrl    String?
  readingTime Int?
  publishedAt DateTime
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  author      Author    @relation(fields: [authorId], references: [id])
  authorId    String
  tags        String[]
}

model Author {
  id        String    @id @default(cuid())
  name      String
  avatar    String?
  bio       String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  articles  Article[]
}
```

### Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Create and apply migration
npm run db:migrate

# Push schema changes (development only)
npm run db:push

# Open Prisma Studio
npm run db:studio
```

## Environment Variables

Create a `.env` file in the backend directory:

```bash
# Environment
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blog_db?schema=public"

# HuggingFace API (https://huggingface.co/settings/tokens)
HUGGINGFACE_API_TOKEN=hf_xxxxx
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | No | Environment mode (`development` or `production`) |
| `PORT` | No | Server port (default: 3000) |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `HUGGINGFACE_API_TOKEN` | Yes | Hugging Face API token for AI generation |

## Scheduling & Auto-Generation

The backend includes an automated article generation system using `node-cron`.

### Schedule

| Cron Expression | Schedule | Action |
|-----------------|----------|--------|
| `0 0 * * *` | Daily at midnight | Generate 1 new article |

### How It Works

1. **Scheduler** (`article-generator.cron.ts`) triggers at midnight
2. **Generator Service** (`article.generator.service.ts`) is called
3. **Hugging Face API** generates:
   - Software engineering topic
   - Article title
   - Article excerpt
   - Full article content (Markdown)
   - Relevant tags (2-3)
4. **Article** is saved to PostgreSQL via Prisma

### Manual Trigger

The scheduler service exposes a `triggerNow()` method for testing:

```typescript
import { schedulerService } from './jobs/cron/article-generator.cron';

// Manually generate an article
await schedulerService.triggerNow();
```

## Building for Production

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

### Docker Build

```bash
# Build Docker image
docker build -t asymetric-backend .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e HUGGINGFACE_API_TOKEN="hf_xxx" \
  asymetric-backend
```

### Production Docker Image

Multi-stage build for optimized image size:

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --omit=dev
RUN npx prisma generate
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

## Testing

The backend uses Jest for unit testing.

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

### Test Structure

```
src/modules/article/__tests__/
└── article.service.test.ts   # Article service tests

src/modules/authors/__tests__/
└── author.service.test.ts    # Author service tests
```

## API Documentation

Swagger documentation is available at:

```
http://localhost:3000/api-docs
```

The documentation is auto-generated from JSDoc comments and Swagger definition files.

## Dependencies

### Production

```json
{
  "@huggingface/inference": "^4.13.4",
  "@prisma/client": "^5.22.0",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "express": "^4.21.1",
  "helmet": "^8.0.0",
  "node-cron": "^4.2.1",
  "swagger-jsdoc": "^6.2.8",
  "swagger-ui-express": "^5.0.1",
  "zod": "^3.23.8"
}
```

### Development

```json
{
  "@types/express": "^4.17.25",
  "@types/jest": "^29.5.14",
  "@types/node": "^22.9.0",
  "jest": "^29.7.0",
  "prisma": "^5.22.0",
  "ts-jest": "^29.2.5",
  "tsx": "^4.19.2",
  "typescript": "^5.6.3"
}
```

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Prisma Studio |
