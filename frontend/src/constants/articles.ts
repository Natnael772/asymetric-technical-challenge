import type { Article } from "@/types/article";

/**
 * Mock articles data for development and fallback
 */
export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Building Scalable Microservices with AWS Lambda",
    excerpt:
      "Learn how to design and deploy serverless microservices that scale automatically with demand while keeping costs under control.",
    content: `
# Building Scalable Microservices with AWS Lambda

Serverless architecture has revolutionized how we build and deploy applications. In this comprehensive guide, we'll explore how to leverage AWS Lambda to create microservices that scale effortlessly.

## Why Serverless?

Traditional server-based architectures require constant capacity planning. With serverless, you only pay for what you use, and scaling happens automatically.

### Key Benefits

- **Auto-scaling**: Lambda automatically scales based on incoming requests
- **Cost-effective**: Pay only for compute time consumed
- **Reduced operational overhead**: No servers to manage

## Architecture Overview

A typical serverless microservices architecture includes:

1. **API Gateway**: Handles HTTP requests and routing
2. **Lambda Functions**: Process business logic
3. **DynamoDB**: Provides fast, scalable storage
4. **SQS/SNS**: Enables async communication between services

## Best Practices

When building serverless microservices, consider:

- Keep functions small and focused
- Use environment variables for configuration
- Implement proper error handling and retries
- Monitor with CloudWatch and X-Ray

## Conclusion

Serverless microservices offer a powerful paradigm for building modern applications. By following these patterns, you can create systems that are both scalable and maintainable.
    `.trim(),
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      bio: "Cloud architect specializing in AWS solutions",
    },
    publishedAt: "2024-12-01T10:00:00Z",
    tags: ["AWS", "Serverless", "Microservices", "Architecture"],
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    readingTime: 8,
  },
  {
    id: "2",
    title: "The Complete Guide to React Server Components",
    excerpt:
      "Dive deep into React Server Components and learn how they change the way we think about building React applications.",
    content: `
# The Complete Guide to React Server Components

React Server Components (RSC) represent a fundamental shift in how we build React applications. Let's explore what they are and how to use them effectively.

## What Are Server Components?

Server Components are React components that render on the server. Unlike traditional SSR, they never hydrate on the client, reducing bundle size significantly.

### Key Differences

| Feature | Client Components | Server Components |
|---------|------------------|-------------------|
| Render Location | Browser | Server |
| Bundle Size | Included | Zero |
| Interactivity | Full | None (pass to client) |
| Data Access | API calls | Direct DB access |

## When to Use Server Components

Use Server Components when:

- Fetching data from databases or APIs
- Accessing backend resources directly
- Keeping sensitive logic on the server
- Reducing client-side JavaScript

## Implementation Example

\`\`\`tsx
// This component runs only on the server
async function ArticleList() {
  const articles = await db.articles.findMany();
  
  return (
    <ul>
      {articles.map(article => (
        <li key={article.id}>{article.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Conclusion

Server Components are a game-changer for React development, enabling better performance and simpler data fetching patterns.
    `.trim(),
    author: {
      name: "Marcus Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
      bio: "Frontend architect and React enthusiast",
    },
    publishedAt: "2024-11-28T14:30:00Z",
    tags: ["React", "Server Components", "Performance", "Frontend"],
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    readingTime: 10,
  },
  {
    id: "3",
    title: "Docker Best Practices for Production Deployments",
    excerpt:
      "Essential Docker practices for building secure, efficient, and maintainable container images for production environments.",
    content: `
# Docker Best Practices for Production Deployments

Containerization with Docker has become the standard for deploying applications. Here are essential best practices for production-ready containers.

## Image Optimization

### Use Multi-Stage Builds

Multi-stage builds help create smaller, more secure images:

\`\`\`dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["node", "server.js"]
\`\`\`

### Choose Minimal Base Images

- Use Alpine-based images when possible
- Consider distroless images for maximum security
- Avoid using \`latest\` tag in production

## Security Considerations

1. **Run as non-root user**: Always specify a non-root user
2. **Scan for vulnerabilities**: Use tools like Trivy or Snyk
3. **Keep images updated**: Regularly rebuild with security patches

## Health Checks

Always include health checks:

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

## Conclusion

Following these practices ensures your Docker deployments are secure, efficient, and production-ready.
    `.trim(),
    author: {
      name: "Alex Rivera",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      bio: "DevOps engineer focused on container orchestration",
    },
    publishedAt: "2024-11-25T09:15:00Z",
    tags: ["Docker", "DevOps", "Containers", "Security"],
    imageUrl:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop",
    readingTime: 7,
  },
  {
    id: "4",
    title: "TypeScript 5.0: New Features You Should Know",
    excerpt:
      "Explore the latest TypeScript 5.0 features including decorators, const type parameters, and improved enums.",
    content: `
# TypeScript 5.0: New Features You Should Know

TypeScript 5.0 brings exciting new features that improve developer experience and type safety. Let's explore what's new.

## Decorators

Stage 3 decorators are now fully supported:

\`\`\`typescript
function logged(target: any, context: ClassMethodDecoratorContext) {
  return function (...args: any[]) {
    console.log(\`Calling \${String(context.name)}\`);
    return target.apply(this, args);
  };
}

class Calculator {
  @logged
  add(a: number, b: number) {
    return a + b;
  }
}
\`\`\`

## Const Type Parameters

New \`const\` modifier for type parameters:

\`\`\`typescript
function createTuple<const T extends readonly unknown[]>(items: T): T {
  return items;
}

// Type is readonly ["hello", 42] instead of (string | number)[]
const tuple = createTuple(["hello", 42]);
\`\`\`

## All Enums Are Union Enums

Enums now behave more predictably:

\`\`\`typescript
enum Status {
  Pending,
  Active,
  Completed
}

// This now works correctly!
function isActive(status: Status): status is Status.Active {
  return status === Status.Active;
}
\`\`\`

## Faster Type Checking

TypeScript 5.0 includes significant performance improvements, with some projects seeing 10-25% faster build times.

## Conclusion

TypeScript 5.0 is a major release that brings long-awaited features and performance improvements.
    `.trim(),
    author: {
      name: "Emma Watson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      bio: "TypeScript advocate and open source contributor",
    },
    publishedAt: "2024-11-20T16:45:00Z",
    tags: ["TypeScript", "JavaScript", "Programming", "Web Development"],
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    readingTime: 6,
  },
  {
    id: "5",
    title: "Introduction to Infrastructure as Code with Terraform",
    excerpt:
      "Get started with Terraform and learn how to manage your cloud infrastructure programmatically.",
    content: `
# Introduction to Infrastructure as Code with Terraform

Infrastructure as Code (IaC) transforms how we provision and manage cloud resources. Terraform by HashiCorp is the industry standard for IaC.

## What is Terraform?

Terraform is a declarative IaC tool that lets you define infrastructure in configuration files that can be versioned, reused, and shared.

## Core Concepts

### Providers

Providers are plugins that interact with cloud platforms:

\`\`\`hcl
provider "aws" {
  region = "us-east-1"
}
\`\`\`

### Resources

Resources define infrastructure components:

\`\`\`hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  
  tags = {
    Name = "WebServer"
  }
}
\`\`\`

### State

Terraform maintains state to track resource mappings between configuration and real infrastructure.

## Workflow

1. **Write**: Define infrastructure in \`.tf\` files
2. **Plan**: Preview changes with \`terraform plan\`
3. **Apply**: Create/update infrastructure with \`terraform apply\`

## Best Practices

- Use remote state storage (S3, Terraform Cloud)
- Implement state locking
- Use modules for reusability
- Version control your configurations

## Conclusion

Terraform enables reliable, repeatable infrastructure deployments. Start small and gradually adopt IaC practices.
    `.trim(),
    author: {
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      bio: "Platform engineer and IaC enthusiast",
    },
    publishedAt: "2024-11-15T11:00:00Z",
    tags: ["Terraform", "IaC", "DevOps", "AWS"],
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    readingTime: 9,
  },
  {
    id: "6",
    title: "Building Real-Time Applications with WebSockets",
    excerpt:
      "Learn how to implement real-time features in your applications using WebSockets and modern frameworks.",
    content: `
# Building Real-Time Applications with WebSockets

Real-time functionality is essential for modern applications. WebSockets provide full-duplex communication channels over a single TCP connection.

## Understanding WebSockets

Unlike HTTP, WebSockets maintain a persistent connection between client and server, enabling instant bidirectional data transfer.

### When to Use WebSockets

- Live chat applications
- Real-time notifications
- Collaborative editing
- Live sports scores
- Stock tickers

## Implementation Example

### Server (Node.js with ws)

\`\`\`javascript
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
\`\`\`

### Client (React)

\`\`\`tsx
function useWebSocket(url: string) {
  const [messages, setMessages] = useState<string[]>([]);
  
  useEffect(() => {
    const ws = new WebSocket(url);
    
    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };
    
    return () => ws.close();
  }, [url]);
  
  return messages;
}
\`\`\`

## Scaling Considerations

- Use Redis pub/sub for multi-server deployments
- Implement reconnection logic
- Consider using Socket.IO for additional features

## Conclusion

WebSockets unlock powerful real-time capabilities. Combined with modern frameworks, building real-time features has never been easier.
    `.trim(),
    author: {
      name: "Lisa Park",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
      bio: "Full-stack developer specializing in real-time systems",
    },
    publishedAt: "2024-11-10T13:20:00Z",
    tags: ["WebSockets", "Real-Time", "Node.js", "React"],
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    readingTime: 8,
  },
];

export default mockArticles;
