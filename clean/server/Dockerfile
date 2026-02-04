FROM node:18-alpine

WORKDIR /app

# Copy package files (from server directory)
COPY package*.json ./

# Install dependencies
# If package-lock.json exists, npm ci is better, but install is safer if lockfile is missing/out of sync
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]
