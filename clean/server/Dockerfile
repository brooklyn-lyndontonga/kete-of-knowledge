FROM node:18-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Install dependencies (installs root dependencies including server deps)
RUN npm install

# Copy server source code
COPY clean/server ./clean/server

# Set working directory to server for execution
WORKDIR /app/clean/server

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "index.js"]
