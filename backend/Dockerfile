# Build stage
FROM node:20 AS builder

WORKDIR /app

# Copy configuration files
COPY package*.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./

# Copy Prisma schema
COPY prisma ./prisma/

# Install ALL dependencies
RUN npm ci

# Copy source code
COPY src ./src

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN npm run build

# Verify build output
RUN echo "=== Build Output ===" && ls -la dist/ && echo "==================="