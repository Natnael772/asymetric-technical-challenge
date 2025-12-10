# Architecture Documentation

This document provides an overview of the project architecture, including component descriptions, data flow, and deployment workflow.

## System Overview

The platform is a full-stack blog application that automatically generates articles using AI. It consists of three main components: a React frontend, a Node.js backend, and a PostgreSQL database.

🌐 **Live Deployment**: [http://34.237.51.31](http://34.237.51.31)

```
                                    ┌──────────────────────────────────┐
                                    │           AWS Cloud             │
                                    │  ┌────────────────────────────┐ │
                                    │  │      EC2 Instance          │ │
┌──────────────┐                    │  │  ┌────────┐  ┌───────────┐ │ │
│   Browser    │────HTTP:80────────▶│  │  │Frontend│  │  Backend  │ │ │
│   (User)     │                    │  │  │ Nginx  │──│  Express  │ │ │
└──────────────┘                    │  │  └────────┘  └─────┬─────┘ │ │
                                    │  │                    │       │ │
                                    │  │              ┌─────▼─────┐ │ │
                                    │  │              │PostgreSQL │ │ │
                                    │  │              │    DB     │ │ │
                                    │  │              └───────────┘ │ │
                                    │  └────────────────────────────┘ │
                                    └──────────────────────────────────┘
```

## Components

### 1. Frontend (React + Vite)

The frontend is a single-page application built with React and Vite.

| Aspect                | Details                            |
| --------------------- | ---------------------------------- |
| **Framework**         | React 19 with TypeScript           |
| **Build Tool**        | Vite                               |
| **Styling**           | TailwindCSS with Typography plugin |
| **State Management**  | React Query (TanStack Query)       |
| **Routing**           | React Router v7                    |
| **Content Rendering** | react-markdown                     |
| **Serving**           | Nginx (in production)              |

**Key Features:**

- Displays list of blog articles with pagination
- Renders full article content (Markdown support)
- Communicates with backend via REST API

### 2. Backend (Node.js + Express)

The backend is a RESTful API built with Express and TypeScript.

| Aspect             | Details                    |
| ------------------ | -------------------------- |
| **Runtime**        | Node.js 20                 |
| **Framework**      | Express with TypeScript    |
| **ORM**            | Prisma                     |
| **Validation**     | Zod                        |
| **Documentation**  | Swagger/OpenAPI            |
| **Security**       | Helmet, CORS               |
| **Scheduling**     | node-cron                  |
| **AI Integration** | Hugging Face Inference API |

**Key Features:**

- CRUD operations for articles and authors
- Automatic article generation using AI
- Daily scheduled article generation (midnight)
- Swagger API documentation at `/api-docs`

### 3. Database (PostgreSQL)

PostgreSQL stores all application data.

**Schema:**

```
┌─────────────────────────┐       ┌─────────────────────────┐
│        Article          │       │         Author          │
├─────────────────────────┤       ├─────────────────────────┤
│ id: String (PK)         │       │ id: String (PK)         │
│ title: String           │       │ name: String            │
│ excerpt: String         │       │ avatar: String?         │
│ content: String         │       │ bio: String?            │
│ htmlContent: String?    │       │ createdAt: DateTime     │
│ imageUrl: String?       │       │ updatedAt: DateTime     │
│ readingTime: Int?       │───────│                         │
│ publishedAt: DateTime   │       │ articles: Article[]     │
│ createdAt: DateTime     │       └─────────────────────────┘
│ updatedAt: DateTime     │
│ authorId: String (FK)   │
│ tags: String[]          │
└─────────────────────────┘
```

### 4. Scheduler (node-cron)

The scheduler runs inside the backend container and triggers automatic article generation.

| Schedule                     | Action                 |
| ---------------------------- | ---------------------- |
| `0 0 * * *` (Midnight daily) | Generate 1 new article |

**Process:**

1. Scheduler triggers at midnight
2. Calls `articleGeneratorService.generateArticle()`
3. Service generates topic using Hugging Face AI
4. Generates article title, excerpt, content, and tags
5. Stores article in PostgreSQL

## Data Flow

### User Reading Articles

```
Browser                Frontend              Backend               Database
   │                      │                     │                      │
   │──GET /─────────────▶│                     │                      │
   │                      │──GET /api/articles─▶│                      │
   │                      │                     │──SELECT articles────▶│
   │                      │                     │◀─────────────────────│
   │                      │◀────JSON response───│                      │
   │◀─────HTML/JS─────────│                     │                      │
   │                      │                     │                      │
```

### Automatic Article Generation

```
Scheduler              Generator Service      Hugging Face         Database
   │                          │                    │                   │
   │──Trigger (midnight)─────▶│                    │                   │
   │                          │──Generate topic───▶│                   │
   │                          │◀─────Topic─────────│                   │
   │                          │──Generate content─▶│                   │
   │                          │◀─Article JSON──────│                   │
   │                          │──INSERT article───────────────────────▶│
   │◀──────────Done───────────│                    │                   │
```

## Deployment Workflow

### Infrastructure Components

| AWS Service   | Purpose                                            |
| ------------- | -------------------------------------------------- |
| **EC2**       | Single instance hosting all Docker containers      |
| **ECR**       | Docker image registry (2 repos: frontend, backend) |
| **CodeBuild** | CI/CD for building and pushing Docker images       |

### CI/CD Pipeline

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│              │     │              │     │              │     │              │
│   GitHub     │────▶│  CodeBuild   │────▶│     ECR      │────▶│     EC2      │
│   (Push)     │     │  (Build)     │     │  (Registry)  │     │  (Deploy)    │
│              │     │              │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

### Build Phase (CodeBuild)

1. **Pre-build**: Authenticate with ECR
2. **Build**: Build Docker images for frontend and backend
3. **Post-build**: Push images to ECR with `latest` and commit hash tags

```yaml
# Key buildspec.yml steps
- docker build -t $REPOSITORY_URI_BACKEND:latest ./backend
- docker build -t $REPOSITORY_URI_FRONTEND:latest ./frontend
- docker push $REPOSITORY_URI_BACKEND:latest
- docker push $REPOSITORY_URI_FRONTEND:latest
```

### Deployment Phase (EC2)

1. SSH into EC2 instance
2. Run `deploy.sh` script:
   - Authenticate with ECR
   - Pull latest images
   - Restart containers with `docker-compose up -d`

```bash
# deploy.sh summary
aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_URI
docker-compose -f infra/docker-compose.yml pull
docker-compose -f infra/docker-compose.yml up -d
```

### Production Container Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       EC2 Instance                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                   Docker Network                       │ │
│  │                                                        │ │
│  │  ┌──────────────┐   ┌──────────────┐   ┌────────────┐ │ │
│  │  │   Frontend   │   │   Backend    │   │ PostgreSQL │ │ │
│  │  │    (Nginx)   │──▶│  (Express)   │──▶│   (DB)     │ │ │
│  │  │   Port: 80   │   │  Port: 3000  │   │ Port: 5432 │ │ │
│  │  └──────────────┘   └──────────────┘   └────────────┘ │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│                    postgres_data volume                     │
└─────────────────────────────────────────────────────────────┘
```

## Security Considerations

- **Helmet.js**: Sets security-related HTTP headers
- **CORS**: Configured for cross-origin requests
- **Environment Variables**: Sensitive data stored in `.env` files (not committed)
- **Docker Networks**: Internal network isolation between services
- **Database**: Only accessible within Docker network

## Scaling Considerations

For horizontal scaling (future improvements):

- Load balancer (ALB) in front of multiple EC2 instances
- RDS for managed PostgreSQL
- ElastiCache for session/cache management
- S3 + CloudFront for static assets
