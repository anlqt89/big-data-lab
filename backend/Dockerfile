# --- Stage 1: Base (Shared by both) ---
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# --- Stage 2: Development (For your Mac) ---
FROM base AS development
# Install EVERYTHING (including devDependencies like nodemon)
RUN npm install
# Install bash and pg-client as you had in your local version
RUN apk add --no-cache bash postgresql-client
COPY . .
ENV PORT=5001
EXPOSE 5001
CMD ["npm", "run", "dev"]

# --- Stage 3: Production (For Hetzner) ---
FROM base AS production
# Only install production dependencies
RUN npm ci --omit=dev
COPY . .
# Use the production start command
CMD ["npm", "start"]