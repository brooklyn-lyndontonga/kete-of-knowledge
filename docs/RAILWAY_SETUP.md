# Railway Setup

This repo uses two Railway services.

## Services
1. `kete-server` (Node + SQLite)
2. `kete-admin` (React/Vite static build)

## Service Config Files
Railway config files are per service and must be referenced by absolute path in service settings.

Server config file path:
- `/railway.server.toml`

Admin config file path:
- `/railway.admin.toml`

## Setup Steps
1. Create a Railway project.
2. Create a new service for the server.
3. Set the server root directory to `/`.
4. Set the server config file path to `/railway.server.toml`.
5. Attach a Railway volume to the server at `/app/db`.
6. Set the server environment variables:
   - `SQLITE_DB_PATH=/app/db/database.db`
   - `ADMIN_SEED_EMAIL`
   - `ADMIN_SEED_PASSWORD`
   - `ADMIN_JWT_SECRET`
   - `APP_JWT_SECRET`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM`
   - `SMTP_SECURE`
7. Create a new service for the admin panel.
8. Set the admin root directory to `/clean/admin`.
9. Set the admin config file path to `/railway.admin.toml`.
10. Set the admin environment variable:
   - `VITE_API_URL` (use the public URL of the server)
11. Deploy both services.

## Notes
1. The server health check endpoint is `/health`.
2. The admin service responds on `/`.
