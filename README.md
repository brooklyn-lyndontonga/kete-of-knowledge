# Kete of Knowledge

A platform providing accessible health and wellbeing information to whānau. The project consists of a mobile application for users, an admin panel for content management, and a backend server.

## 📂 Project Structure

The project is organised into the following key directories within `clean/`:

- **`mobile`** — React Native (Expo) mobile application.
- **`admin`** — React (Vite) web-based admin dashboard.
- **`server`** — Node.js/Express backend API with a SQLite database.
- **`shared`** — Shared data models and utilities.

## 🛠 Tech Stack

- **Mobile**: React Native, Expo (SDK 54), React Navigation, expo-sqlite (on-device storage).
- **Admin**: React, Vite, Tailwind.
- **Backend**: Node.js, Express 5, SQLite (WAL mode), Prisma (auth routes).
- **Authentication**: Magic links (mobile), email + password with JWT (admin).

## 🚀 Getting Started

### Prerequisites

- Node.js **v18+**
- npm
- Expo Go app on your phone (for mobile testing)

### 1. Server

```bash
cd clean/server
cp .env.example .env    # then fill in real values — see comments in the file
npm install
npx prisma generate --schema=prisma/schema.prisma
npm run dev             # starts on http://localhost:3000 with auto-reload
```

Verify it's up: `curl http://localhost:3000/health` → `{"ok":true,"db":true}`

> **Secrets:** generate JWT secrets with `openssl rand -hex 32`. Never commit
> your `.env` — the `.env.example` files contain placeholders only.

### 2. Admin Panel

```bash
cd clean/admin
cp .env.example .env    # VITE_API_URL should point at the server
npm install
npm run dev             # http://localhost:5173
```

Log in with the `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` you set in the
server's `.env` (the account is created automatically on first boot).

### 3. Mobile App

```bash
cd clean/mobile
cp .env.example .env
npm install
npx expo start          # scan the QR code with Expo Go
```

> **Testing on a real device:** `localhost` won't reach your machine from a
> phone. Either leave `EXPO_PUBLIC_API_URL` unset (the app auto-detects the
> Expo dev host IP), or set it to your machine's LAN IP, e.g.
> `http://192.168.1.50:3000`.

## 🧪 Useful Scripts (from `clean/server`)

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the API with auto-reload |
| `npm start` | Start the API (production mode) |
| `npm run seed:content` | Seed starter content |
| `npm run smoke` | Run smoke tests against a running server |

## 📱 Order of Operations

Start the **server first**, then the admin panel and/or mobile app. Content
must be set to **Published** in the admin panel before it appears in the app.

## 🚢 Deployment

- **Render**: `render.yaml` defines the API (Docker, with a persistent disk
  at `/app/data` holding both the SQLite DB and uploaded media) and the admin
  panel (static site). Set SMTP + admin seed variables in the dashboard.
- **Railway**: see `docs/RAILWAY_SETUP.md`. Make sure a volume is mounted and
  `SQLITE_DB_PATH` / `UPLOADS_DIR` point into it — otherwise data and uploads
  are wiped on redeploy.
- **Mobile builds**: EAS profiles are in `clean/mobile/eas.json`.

## 📄 Further Documentation

- `PROJECT_HANDOVER.md` — admin guide and day-to-day content management
- `HANDOVER.md` — deliverables and credentials checklist
- `docs/` — QA checklist, release checklist, store metadata, policy templates
