# Frontend - Auto-Generated Blog

A modern React application for displaying AI-generated blog articles. Built with Vite, TypeScript, and TailwindCSS.

## Overview

The frontend provides a responsive, modern UI for browsing and reading blog articles. It communicates with the backend API to fetch article data and supports server-side pagination.

### Key Features

- 📝 Article list with pagination
- 📖 Full article view with Markdown rendering
- 🎨 TailwindCSS styling with typography support
- ⚡ Fast development with Vite HMR
- 🔄 React Query for efficient data fetching and caching

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI framework |
| Vite | 7.x | Build tool & dev server |
| TypeScript | 5.x | Type safety |
| TailwindCSS | 4.x | Styling |
| React Query | 5.x | Server state management |
| React Router | 7.x | Client-side routing |
| react-markdown | 10.x | Markdown rendering |
| react-icons | 5.x | Icon library |

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Development Commands

```bash
# Start dev server with network access
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
src/
├── api/                    # API client and endpoints
│   ├── client.ts           # Base fetch wrapper with error handling
│   └── articles.ts         # Article-specific API calls
│
├── app/                    # Page components
│   ├── home/               # Home page
│   ├── article/            # Single article view
│   └── articles/           # Articles list page
│
├── components/             # Reusable UI components
│   ├── ArticleCard/        # Article preview card
│   ├── Pagination/         # Pagination controls
│   ├── Header/             # Site header
│   ├── Footer/             # Site footer
│   └── ErrorBoundary/      # Error handling component
│
├── hooks/                  # Custom React hooks
│   └── api/                # API-related hooks
│       └── useArticles.ts  # Article data fetching hook
│
├── types/                  # TypeScript type definitions
│   └── article.ts          # Article type interfaces
│
├── constants/              # App constants
├── utils/                  # Utility functions
│
├── App.tsx                 # Main app component with routing
├── main.tsx                # App entry point
└── index.css               # Global styles
```

## Backend Communication

### API Configuration

The frontend communicates with the backend through a REST API. The base URL is configured via environment variable:

```typescript
// src/api/client.ts
export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
```

### API Endpoints Used

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/articles` | GET | Fetch paginated article list |
| `/articles/:id` | GET | Fetch single article by ID |

### Request Flow

```
Component → Hook → API Function → Backend
    ↓
useArticles() → getArticles() → GET /api/articles
    ↓
Returns { articles: Article[], meta: PaginationMeta }
```

### Example API Usage

```typescript
// Using the custom hook
import { useArticles } from '@/hooks/api/useArticles';

function ArticlesList() {
  const { data, isLoading, error } = useArticles(page, limit);
  
  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return (
    <div>
      {data.articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
```

## Environment Variables

Create a `.env` file in the frontend directory:

```bash
# Backend API URL
# For development (pointing to local backend)
VITE_API_URL=http://localhost:3000/api

# For production (relative path when served by Nginx proxy)
VITE_API_URL=/api
```

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | No | Backend API base URL. Defaults to `/api` |

> **Note**: In production, Nginx is configured to proxy `/api` requests to the backend container.

## Building for Production

```bash
# Build the application
npm run build

# Output will be in ./dist directory
```

### Docker Build

```bash
# Build Docker image
docker build -t asymetric-frontend .

# Build with custom API URL
docker build --build-arg VITE_API_URL=/api -t asymetric-frontend .

# Run container
docker run -p 80:80 asymetric-frontend
```

### Production Docker Image

The production image uses a multi-stage build:
1. **Builder stage**: Installs dependencies and builds the app
2. **Production stage**: Uses Nginx Alpine to serve static files

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Production stage
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Nginx Configuration

The included `nginx.conf` handles:
- Serving static files from `/usr/share/nginx/html`
- SPA routing (fallback to `index.html`)
- Proxying `/api` requests to backend (in production)

## Dependencies

### Production

```json
{
  "@tailwindcss/typography": "^0.5.19",
  "@tailwindcss/vite": "^4.1.17",
  "@tanstack/react-query": "^5.90.12",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-icons": "^5.5.0",
  "react-markdown": "^10.1.0",
  "react-router-dom": "^7.10.1",
  "tailwindcss": "^4.1.17"
}
```

### Development

```json
{
  "@eslint/js": "^9.39.1",
  "@types/node": "^24.10.1",
  "@types/react": "^19.2.5",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^5.1.1",
  "eslint": "^9.39.1",
  "typescript": "~5.9.3",
  "vite": "^7.2.4"
}
```

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |
