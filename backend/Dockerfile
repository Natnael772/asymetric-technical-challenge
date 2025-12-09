# Build stage
FROM public.ecr.aws/docker/library/node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Required for Prisma engines (provides OpenSSL libraries)
RUN apk add --no-cache openssl

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Production stage
FROM public.ecr.aws/docker/library/node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Required for Prisma engines (provides OpenSSL libraries)
RUN apk add --no-cache openssl

# Install production dependencies only
RUN npm ci --omit=dev

# Generate Prisma client
RUN npx prisma generate

# Copy built files
COPY --from=builder /app/dist ./dist

# Set environment
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/server.js"]
