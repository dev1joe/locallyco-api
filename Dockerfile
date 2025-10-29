FROM node:24-alpine

WORKDIR /app

# Instal dependencies
COPY package*.json ./

# Copy source code
COPY . .

# Security: run as non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# TODO: shouldn't dev/prod be automated depending on env ? or should I use multiple dockerfiles ??
CMD ["npm", "run", "dev"]