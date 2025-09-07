# Multi-stage build for ChronoClash Arena
FROM node:22-alpine AS builder

# Install Python and build tools for native dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for building)
RUN npm install --prefer-offline --no-audit

# Copy source code
COPY . .

# Build the frontend application
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production --prefer-offline --no-audit

# Copy built frontend from builder stage
COPY --from=builder /app/dist ./dist

# Copy backend server
COPY server.js ./

# Create a simple static file server that also serves the API
RUN npm install -g serve

# Copy startup script
COPY <<EOF /app/start.sh
#!/bin/sh
# Start the Express.js server in the background
node server.js &
# Start serving the frontend
serve -s dist -l 5173 &
# Wait for any process to exit
wait -n
# Exit with status of process that exited first
exit $?
EOF

RUN chmod +x /app/start.sh

# Expose both ports
EXPOSE 3000 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start both services
CMD ["/app/start.sh"]
