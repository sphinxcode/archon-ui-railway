# Multi-stage build for optimized production deployment
# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files from the original Archon repo structure
COPY package*.json ./

# Install all dependencies including dev dependencies for building
RUN npm ci

# Copy all source files
COPY . .

# Build the application with production optimizations
# The build will create a dist folder with static files
RUN npm run build

# Stage 2: Production server with nginx
FROM nginx:alpine

# Install gettext for envsubst (environment variable substitution)
RUN apk add --no-cache gettext

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration template
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy startup script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Expose port (Railway will override with PORT env var)
EXPOSE 80

# Use the startup script as entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]