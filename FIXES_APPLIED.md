# Fixes Applied — Kete of Knowledge

Every file in this bundle is a drop-in replacement (or new file) mirroring the
repo structure. Copy the whole tree over the repo root, review the diff, and
commit. Manual steps that code can't do for you are listed at the bottom —
**do the security steps first.**

---

## 1. Mobile — broken local database (P0)

**Problem:** expo-sqlite v16 (SDK 54) removed the legacy
`db.transaction(tx => tx.executeSql(...))` API. Six of seven feature modules
used it, so logging symptoms, medicines, goals, and profile edits threw
`db.transaction is not a function` at runtime — silently, because callers had
no `.catch`.

**Fixed files:**

| File | Change |
| --- | --- |
| `src/features/symptoms.db.js` | Rewritten on `runAsync`/`getAllAsync`; added `deleteSymptom` |
| `src/features/medicines.db.js` | Rewritten; added `deleteMedicine` |
| `src/features/goals.db.js` | Rewritten; added `deleteGoal` |
| `src/features/profile.db.js` | Rewritten; `saveProfile` now **updates** the existing row instead of inserting a duplicate on every save |
| `src/features/reminders.db.js` | Rewritten; added `toggleReminder`, `deleteReminder` |
| `src/features/checklists.db.js` | Rewritten; checklist **items** now persist (new table); added `toggleChecklistItem`, `deleteChecklist` |
| `src/features/notes.db.js` | Migrated onto the shared `kete.db` (was opening its own separate `app.db`) |
| `src/db/schema.js` | Added `checklist_items` table and `notes.updated_at` |
| `src/db/index.js` | Enables `PRAGMA foreign_keys`; runs lightweight column migrations for existing installs |

⚠️ **Notes migration caveat:** notes previously lived in a separate `app.db`
file. After this change, notes saved by earlier beta builds won't appear.
Fine pre-launch; warn testers if any have real notes.

All function names and return shapes match the old modules, so no other
callers needed changes beyond the screens below.

## 2. Mobile — reminders & checklists never saved (P0)

**Problem:** `AddReminderScreen.save()` and `AddChecklistScreen.save()` were
stubs (`// later → SQLite insert`) — user input was silently discarded. The
list screens held state in `useState([])`, so they were always empty.

**Fixed files:**

- `src/screens/hub/AddReminderScreen.jsx` — persists via `addReminder`, shows
  a saving state, alerts on failure, disables save until a title is entered.
- `src/screens/hub/RemindersScreen.jsx` — loads from SQLite on focus, tap a
  reminder to pause/resume, error state with retry.
- `src/screens/hub/AddChecklistScreen.jsx` — persists checklist **and its
  items**; tap an added item to remove it before saving.
- `src/screens/hub/ChecklistsScreen.jsx` — loads from SQLite on focus, shows
  per-list progress (`2/5 done`), tap items to tick them off, error state.

## 3. Mobile — library resources couldn't be opened (P0)

**Problem:** `ResourceCard` was a plain `View` — no press handler, no
`Linking`. Users could never open a single resource the admin published.
Additionally, the server returns one row per (resource, category) pair, so
multi-category resources appeared twice (duplicate React keys) and
uncategorised resources never rendered at all.

**Fixed files:**

- `src/components/ResourceCard.jsx` — tappable; resolves `file_path` (full
  URLs used as-is, `/uploads/...` paths prefixed with the API root); "Open ↗"
  hint; graceful alert if the URL can't be opened; accessibility labels.
- `src/screens/LibraryScreen.jsx` — groups duplicate rows into unique
  resources with a `categories` array; adds a **More Resources** section for
  uncategorised items; full error state with retry (previously an unhandled
  promise rejection).

## 4. Mobile — home screen now shows live content

- `src/screens/home/HomeScreen.jsx` — the daily whakataukī now comes from the
  admin-managed API (rotating deterministically by day of year) with the old
  hardcoded proverb kept as an offline fallback; the Reminders preview now
  shows the user's real active reminders (refreshes on focus).
- `src/screens/home/WhakataukiScreen.jsx` — error state with retry and an
  empty state, instead of spinning forever when the request fails.

## 5. Server — production bugs (P0)

**Fixed files:**

- `clean/server/index.js`
  - `express.static` for uploads now uses an **absolute** path
    (`UPLOADS_DIR` env var, falling back to `<server>/uploads`). The old
    CWD-relative `"clean/server/uploads"` 404'd inside Docker, where
    `WORKDIR` is `/app/clean/server`.
  - Boot-time guard: in `NODE_ENV=production`, missing
    `ADMIN_JWT_SECRET`/`APP_JWT_SECRET` now **exits with an error** instead of
    silently falling back to `"dev-admin-secret"` (which would let anyone
    forge admin tokens).
  - CORS: `ALLOWED_ORIGINS` env var (comma-separated) restricts origins in
    production; unset = allow all (local dev), preserving current behaviour.
- `clean/server/routes/media.js` — same `UPLOADS_DIR` resolution, creates the
  directory if missing, and now returns `filePath` (relative, e.g.
  `/uploads/foo.pdf`) alongside `fileUrl`. **Store the relative path** in
  learning resources so links survive domain changes; the mobile
  `ResourceCard` handles both forms.
- `clean/server/middleware/validate.js` (new) + all five admin route files —
  required-field validation returning clean 400s. Previously a POST without a
  title crashed on `title.slice(0, 30)` → 500.
- `clean/server/package.json` (new) — the server finally has its own
  package.json, so `cd clean/server && npm install && npm run dev` works as
  the README always claimed. Includes `dev` (auto-reload), `start`,
  `seed:content`, `smoke`, `prisma:generate`.
- `clean/server/Dockerfile` — installs from the server's own package.json
  (smaller image, no Expo/mobile deps), documents the `/app/data` volume
  layout.
- `clean/server/.env.example` — **sanitised**: placeholders only, with
  instructions. (See manual steps — the old one contained real secrets.)

## 6. Deployment & repo hygiene

- `render.yaml` — single persistent disk at `/app/data` now holds **both**
  the SQLite DB and uploaded media (previously only the DB was on the disk,
  so every redeploy deleted all uploaded files). SMTP and admin seed values
  are `sync: false` (set in the dashboard, never in the repo).
- `.gitignore` — now ignores `*.db-wal` / `*.db-shm` (these contain real row
  data and were committed), everything in `clean/server/uploads/` except
  `.gitkeep`, `appfilemap.txt`, `.DS_Store`/`__MACOSX`.
- `README.md` — rewritten with setup steps that actually work, LAN-IP note
  for device testing, script reference, and deployment pointers.

---

## ⚠️ Manual steps — DO THESE FIRST (not fixable by code)

### Security (today)

1. **Revoke the Gmail app password** (`haeatamedia@gmail.com` → Google
   Account → Security → App passwords) and create a new one. The old one is
   in git history.
2. **Generate new JWT secrets** (`openssl rand -hex 32` twice) and update
   them in Railway/Render. This logs everyone out — intended.
3. **Change the admin account password** — `@dmin1` is trivially guessable,
   and `seed.js` hardcodes `@administrator1` in source. Delete root-level
   `seed.js` and `test-prisma.js` (superseded by env-based seeding).
4. **Purge secrets from git history** with
   [git-filter-repo](https://github.com/newren/git-filter-repo) or BFG,
   targeting the old `clean/server/.env.example`, `*.db-wal`, `*.db-shm`, and
   the test PDFs in `clean/server/uploads/`. Then force-push and have any
   collaborators re-clone.
5. Untrack the journal files going forward:
   `git rm --cached clean/server/db/database.db-shm clean/server/db/database.db-wal clean/server/uploads/*.pdf`

### Cleanup (this week)

6. Delete from the repo root: `appfilemap.txt`, `Admin_Panel_Walkthrough.webp`
   (4.3 MB — attach to a release or share via Drive instead), root
   `index.js`, one of the two duplicate eslint configs, and the empty files
   `clean/mobile/src/api/contentApi.js` and
   `clean/mobile/src/screens/SettingsScreen.jsx`.
7. Fix root `package.json` `main` field (points at a non-existent
   `index.expo.js`).
8. **Compress the mobile images** — `clean/mobile/assets/images` is 90 MB and
   ships inside the app binary. From `clean/mobile/assets/images`:
   ```bash
   # requires ImageMagick; resizes to max 1440px wide, quality 80
   mogrify -resize '1440>' -quality 80 *.jpg
   ```
   Expect ~85 MB saved with no visible difference on a phone.
9. After copying these fixes in, run `npm install` inside `clean/server` and
   commit the generated `package-lock.json`.
10. On Railway: confirm a volume is mounted and set `SQLITE_DB_PATH` and
    `UPLOADS_DIR` to paths inside it; set `ALLOWED_ORIGINS` to the admin
    panel URL; set `NODE_ENV=production`.

### Still recommended (not in this bundle)

- Local notifications for reminders (`expo-notifications`) — reminders now
  persist, but they don't alert anyone yet.
- Surface **Conditions** in the mobile app — the API endpoint and admin CRUD
  exist; no screen consumes them yet.
- Consent screen + data export/delete in Settings (App Store review will ask
  for a health app; NZ Privacy Act 2020 access rights).
- A GitHub Action running `eslint` + the smoke test on every push.
- Nightly SQLite backup from the volume to object storage.

## ✅ Test checklist after applying

1. `cd clean/server && npm install && npm run dev` — boots, `/health` ok.
2. Admin: create a learning resource with an uploaded PDF, assign no
   category, publish → appears in the app under **More Resources** and opens
   on tap.
3. Mobile: add a symptom, medicine, goal, note, reminder, and a checklist
   with 3 items → kill and reopen the app → everything is still there.
4. Home screen shows a published whakataukī and your active reminders.
5. Turn off wi-fi → Library shows the error state with a working Retry.
6. POST `/api/admin/conditions` with no title → 400, not 500.
