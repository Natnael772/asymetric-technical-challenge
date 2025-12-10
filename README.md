# Auto-Generated Blog Platform

A full-stack blog platform with AI-powered automatic article generation. Built with React, Node.js, PostgreSQL, and deployed on AWS using Docker.

## 🏗️ High-Level Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   React + Vite  │────▶│  Express API    │────▶│   PostgreSQL    │
│   (Frontend)    │     │  (Backend)      │     │   (Database)    │
│                 │     │                 │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                        ┌────────▼────────┐
                        │  node-cron      │
                        │  Scheduler      │
                        │       +         │
                        │  Hugging Face   │
                        │  AI Generation  │
                        └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (or use Docker)

### Run Locally with Docker

```bash
# Clone the repository
git clone https://github.com/your-username/asymetric-technical-challenge.git
cd asymetric-technical-challenge

# Copy environment file and configure
cp backend/.env.example backend/.env
# Edit backend/.env with your HUGGINGFACE_API_TOKEN

# Start all services (frontend, backend, database)
cd infra
docker-compose up -d
```

The application will be available at:

- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:3000/api
- **API Docs**: http://localhost:3000/api-docs

### Run Without Docker (Development)

```bash
# Start PostgreSQL (if not using Docker)
# Ensure DATABASE_URL is configured in backend/.env

# Backend
cd backend
npm install
npm run db:generate
npm run db:migrate
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

### Build & Deploy

```bash
# Build Docker images
cd backend && docker build -t asymetric-backend .
cd ../frontend && docker build -t asymetric-frontend .

# Deploy to EC2 (after setting up AWS resources)
./infra/scripts/deploy.sh
```

## 📁 Folder Structure

```
.
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── modules/         # Feature modules (articles, authors, hugging-face)
│   │   ├── jobs/            # Cron jobs & seeds
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API route definitions
│   │   └── config/          # Configuration (Swagger, etc.)
│   ├── prisma/              # Database schema & migrations
│   ├── Dockerfile           # Backend Docker image
│   └── package.json
│
├── frontend/                # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── app/             # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── api/             # API client & endpoints
│   │   └── types/           # TypeScript types
│   ├── Dockerfile           # Frontend Docker image
│   └── package.json
│
├── infra/                   # Infrastructure & deployment
│   ├── docker-compose.yml   # Production Docker Compose
│   ├── buildspec.yml        # AWS CodeBuild configuration
│   └── scripts/
│       ├── init-ec2.sh      # EC2 instance setup script
│       └── deploy.sh        # Deployment script
│
├── docs/
│   └── ARCHITECTURE.md      # Architecture documentation
│
└── README.md
```

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable                | Description                              | Example                                        |
| ----------------------- | ---------------------------------------- | ---------------------------------------------- |
| `NODE_ENV`              | Environment mode                         | `development` or `production`                  |
| `PORT`                  | Server port                              | `3000`                                         |
| `DATABASE_URL`          | PostgreSQL connection string             | `postgresql://user:pass@localhost:5432/dbname` |
| `HUGGINGFACE_API_TOKEN` | Hugging Face API token for AI generation | `hf_xxxxx`                                     |

### Frontend (`frontend/.env`)

| Variable       | Description     | Example                               |
| -------------- | --------------- | ------------------------------------- |
| `VITE_API_URL` | Backend API URL | `http://localhost:3000/api` or `/api` |

### Infrastructure (`infra/.env`)

| Variable            | Description                 | Example                                                           |
| ------------------- | --------------------------- | ----------------------------------------------------------------- |
| `AWS_REGION`        | AWS region                  | `us-east-1`                                                       |
| `AWS_ACCOUNT_ID`    | AWS account ID              | `123456789012`                                                    |
| `ECR_REPO_FRONTEND` | Frontend ECR repository URI | `123456789012.dkr.ecr.us-east-1.amazonaws.com/asymetric-frontend` |
| `ECR_REPO_BACKEND`  | Backend ECR repository URI  | `123456789012.dkr.ecr.us-east-1.amazonaws.com/asymetric-backend`  |
| `POSTGRES_USER`     | Database username           | `postgres`                                                        |
| `POSTGRES_PASSWORD` | Database password           | `your_password`                                                   |
| `POSTGRES_DB`       | Database name               | `blog_db`                                                         |

## 🧪 Running Tests

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Linting & Type Checking

```bash
# Backend
cd backend
npm run lint
npm run typecheck

# Frontend
cd frontend
npm run lint
```

## 📚 Additional Documentation

- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

## 🛠️ Tech Stack

| Layer          | Technologies                                           |
| -------------- | ------------------------------------------------------ |
| **Frontend**   | React 19, Vite, TailwindCSS, React Query, React Router |
| **Backend**    | Node.js, Express, TypeScript, Prisma ORM               |
| **Database**   | PostgreSQL 16                                          |
| **AI**         | Hugging Face Inference API                             |
| **Scheduling** | node-cron                                              |
| **Deployment** | Docker, AWS (EC2, ECR, CodeBuild)                      |
