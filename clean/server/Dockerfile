FROM node:18-slim

# Install build tools required by sqlite3 (native node-gyp addon) + openssl for Prisma
RUN apt-get update -y && apt-get install -y \
    openssl \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Server now has its own package.json (clean/server/package.json),
# so we install only what the API needs.
COPY clean/server/package*.json ./
RUN npm install --omit=dev

# Copy server source code
COPY clean/server ./

# Generate Prisma Client
RUN npx prisma generate --schema=prisma/schema.prisma

# Persistent data lives on the mounted volume at /app/data:
#   /app/data/db      → SQLite database
#   /app/data/uploads → admin-uploaded media
# Set SQLITE_DB_PATH and UPLOADS_DIR env vars accordingly in your host
# (see render.yaml / Railway variables).
EXPOSE 3000

CMD ["node", "index.js"]
