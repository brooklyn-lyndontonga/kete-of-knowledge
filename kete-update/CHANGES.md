# Kete of Knowledge — full update

88 files across mobile, server and admin. Drop over `clean/`, preserving paths, or apply `kete-full-update.patch`.

**Verified:** 78 mobile files parse with 0 import errors · ESLint 0 errors across all three packages · admin panel builds · server boots and serves the new endpoints over real HTTP · sync suite 12/12 · bilingual suite 6/6 · contrast audit 12/12 pairs at WCAG AA.

**Not verified:** none of this has run on a physical device or simulator. Do that before promising anyone a build.

---

## Before you run it

```bash
cd clean/mobile
npx expo install expo-notifications
npx expo start -c
```

`expo-notifications` loads through a dynamic import, so the app runs without it — reminders save but don't alert, and the Reminders screen says so. Install and rebuild to enable alerts.

---

# Round 1 — the blocker and the missing MVP features

## Data layer

Six of seven modules used `db.transaction()` / `tx.executeSql()`, removed in expo-sqlite v11. You're on v16, so every save in symptoms, medicines, goals, profile, reminders and checklists threw at runtime. All rewritten to the current async API.

`notes.db.js` was opening a **different database file** (`app.db`) from everything else (`kete.db`) — notes were in their own database. Everything now shares one connection.

`initDB()` is async and `App.js` waits for it, so screens can't query tables that don't exist yet. An idempotent migration runner (`PRAGMA table_info` then `ALTER TABLE`) upgrades existing installs rather than breaking them.

## Schema

`checklist_items` (checklists could only store a title), `contacts`, `reminders.time_of_day` / `notification_id`, `profiles.updated_at`, `notes.updated_at`, `consent.version`, plus indexes on `checklist_items.checklist_id` and `symptoms.logged_at`.

## Auth bug

`GuestGate`, `useAuthGuard` and `SettingsStack` destructured `login` and `authReady` from `useAuth()`; `AuthContext` provided neither. The Settings sign-in button was permanently disabled (`!undefined` → `true`) and any guest tapping "Sign in" hit `undefined is not a function`. Both now exposed.

## New features

- **Conditions library** — `contentApi.js` was an empty file, so CMS conditions never reached the app. Now implemented with cache-first + background refresh, plus list and detail screens.
- **Contacts** — grouped Whānau / Provider / Emergency, `tel:` quick-dial, Call 111 bar, up to three pinned emergency contacts.
- **Reminders & checklists** — both were `useState([])` shells; `AddReminderScreen` had a literal `// later → SQLite insert` where the save should have been. Both now persist, reminders schedule and cancel notifications properly.
- **Settings** — was a zero-byte file. Now export my data, delete my data, privacy/terms/support links.
- **Consent** — versioned first-launch gate.

---

# Round 2 — sync, bilingual, weekly grid, accessibility

## Server sync

New `POST /api/app/sync` and `DELETE /api/app/sync`, behind `requireAppAuth`.

Nine user-scoped tables (`user_profiles`, `user_goals`, `user_symptoms`, `user_medicines`, `user_notes`, `user_reminders`, `user_checklists`, `user_checklist_items`, `user_contacts`), each unique on `(user_id, uuid)`.

The device owns the `uuid`, so a record pushed from two devices resolves to one row. `checklist_items` link to their parent by `checklist_uuid`, not autoincrement id, because ids differ per device.

**Conflict resolution is last-write-wins on `updated_at`**, applied identically on both ends so they converge on the same winner. A stale device replaying old edits cannot clobber newer data. Deletes are tombstones, so they propagate instead of the row silently reappearing from another device.

`syncManifest.js` defines what syncs; it is mirrored at `clean/mobile/src/sync/manifest.js`. **Change one, change both.**

Tested: push/pull across two devices, stale write rejected, newer write accepted, incremental pull, tombstone propagation, cross-user isolation, malformed timestamp → 400, no token → 401, deleted-account token → 401, server-side wipe.

## Mobile sync

Local tables gained `uuid` / `updated_at` / `deleted_at` / `dirty`, with migrations and a **uuid backfill on init** so existing beta installs keep their data at first sync instead of losing it.

All feature modules refactored onto shared helpers in `db/records.js` that maintain sync metadata automatically. Deletes are soft; rows are hard-removed only once the tombstone is acknowledged.

`SyncProvider` syncs on sign-in and on app foreground, throttled to 30s, with a manual trigger and live status in Settings.

## Bilingual

**Server:** `title_mi` / `summary_mi` / `triggers_mi` / `treatments_mi` on conditions, `title_mi` / `description_mi` on resources, with migrations. Exposed through the app endpoints.

**Admin:** te reo fields on both forms, and a translation-completeness badge on the conditions table (Complete / 2-of-4 / None) so the client can see at a glance what still needs translating.

**Mobile:** full en/mi string table, language toggle in Settings, persisted. Content falls back to English **per field**, with a small "English only" marker — the app doesn't pretend content is bilingual when it isn't.

English-only content still saves and displays exactly as before, so this is safe to ship before any translation work begins.

## Weekly symptoms grid

Seven-day grid, severity-graded colour intensity, today marked, tap a day to expand its entries. `getSymptomsForWeek()` returns every day in range including empty ones so the grid never has gaps.

## Accessibility

A contrast audit found **`muted` (#727D73) failed WCAG AA body text on every background it was used on** — and it's the caption colour across the entire app. For a health app used by older whānau that's a real problem, not a technicality.

Corrected, preserving hue:

| Token | Was | Now | Result |
|---|---|---|---|
| `muted` | `#727D73` | `#616B62` | 3.49–4.29:1 → 4.52–5.54:1 |
| `camel` | `#C2A88F` | `#7E6D5D` | 2.26:1 → 4.96:1 |
| `orange` | `#D0824E` | `#A5673E` | 3.01:1 → 4.56:1 (the 111 bar) |

All 12 audited pairs now pass AA. The original tints are kept as `camelLight` / `orangeLight` for decorative use where no text sits on top.

Also: OS text scaling honoured app-wide, capped at 1.6× so cards don't shatter; `accessibilityRole` added to 39 tappable elements across 27 files; 44–48px minimum touch targets throughout.

Formatting was normalised with Prettier (config at `clean/mobile/.prettierrc`), which is why the diff is larger than the logic change alone.

---

## Three things to do before this goes anywhere

1. **Rotate the secrets in `clean/server/.env.example`** — it's committed with a live SMTP app password, both JWT secrets and the seed admin password. Rotate all four, then replace with placeholders.

2. **Replace the placeholder URLs** in `SettingsScreen.jsx` and `ConsentScreen.jsx` — `PRIVACY_POLICY_URL`, `TERMS_URL`, `SUPPORT_EMAIL` are guesses at the client's domain. Apple rejects without a working privacy policy link.

3. **Load real content.** The local DB still has one condition and three resources reading "Sample… (replace before launch)".

## Still outstanding

- **The te reo strings have not been reviewed by a native speaker.** I reused the wording already in your app where it existed and wrote the rest. It's all in `src/i18n/strings.js` so a reviewer can do it in one pass. This should not ship without that review.
- **Content translation** is a separate job again, and still needs the client's scope decision.
- **Device testing** — everything above is static verification plus server-side integration tests. No simulator, no phone.
- **Screen-reader walkthrough** with VoiceOver and TalkBack. Roles and labels are in place; nobody has actually listened to it.
