# Kete of Knowledge — full update

98 files across mobile, server and admin. Apply `kete-full-update.patch`, or drop the `kete-update/` tree over your repo root preserving paths.

```bash
cd ~/kete-of-knowledge-1
git apply --check kete-full-update.patch   # dry run first
git apply kete-full-update.patch

npm test                                    # 43 assertions, should exit 0

cd clean/mobile
npx expo install expo-notifications @react-native-community/netinfo
npx expo start -c
```

Both native modules load through dynamic imports, so the app runs without them — reminders save but don't alert, and sync falls back to foreground-only. Install and rebuild to enable both.

---

## Verified

| Check | Result |
|---|---|
| ESLint (mobile + admin + server) | **0 errors** |
| Mobile parse + import integrity | **81 files, 0 problems** |
| `npm test` | **43 assertions, exit 0** |
| Admin panel build | **passes** |
| Server boot + live HTTP round trips | **0 errors in log** |
| WCAG AA contrast | **12/12 pairs pass** |

## Not verified

**Nothing here has run on a device or simulator.** Everything above is static analysis plus server-side integration testing. That gap is the reason for the recommendation at the bottom of this file.

---

# What changed

## Round 1 — the blocker and the missing MVP features

**Data layer.** Six of seven modules used `db.transaction()` / `tx.executeSql()`, removed in expo-sqlite v11. You're on v16, so every save in symptoms, medicines, goals, profile, reminders and checklists threw at runtime. All rewritten to the async API.

`notes.db.js` was opening a **different database file** (`app.db`) from everything else (`kete.db`) — notes lived in their own database. One shared connection now.

`initDB()` is async and `App.js` waits for it. An idempotent migration runner upgrades existing installs rather than breaking them.

**Schema.** `checklist_items` (checklists could only store a title), `contacts`, `reminders.time_of_day` / `notification_id`, `profiles.updated_at`, `notes.updated_at`, `consent.version`, plus indexes.

**Auth bug.** `GuestGate`, `useAuthGuard` and `SettingsStack` destructured `login` and `authReady` from `useAuth()`; `AuthContext` provided neither. The Settings sign-in button was permanently disabled and any guest tapping "Sign in" hit `undefined is not a function`.

**New features.** Conditions library (`contentApi.js` was an empty file, so CMS conditions never reached the app), contacts with 111 quick-dial, working reminders and checklists (`AddReminderScreen` had a literal `// later → SQLite insert` where the save should have been), Settings (was a zero-byte file), versioned consent gate.

## Round 2 — sync, bilingual, accessibility

**Server sync.** `POST` / `DELETE /api/app/sync` behind `requireAppAuth`. Ten user-scoped tables, unique on `(user_id, uuid)`. The device owns the uuid so the same record from two devices resolves to one row. Checklist items link by `checklist_uuid`, not autoincrement id, because ids differ per device.

Conflict resolution is **last-write-wins on `updated_at`**, applied identically on both ends. A stale device replaying old edits cannot clobber newer data. Deletes are tombstones so they propagate.

**Mobile sync.** Local tables gained `uuid` / `updated_at` / `deleted_at` / `dirty`, with a **uuid backfill on init** so existing beta installs keep their data at first sync. All feature modules moved onto shared helpers in `db/records.js`.

**Bilingual.** `title_mi` / `summary_mi` / `triggers_mi` / `treatments_mi` on conditions, `title_mi` / `description_mi` on resources, with migrations. Admin forms have the fields plus a translation-completeness badge. Mobile has a full en/mi string table, a persisted language toggle, and **per-field** English fallback with an "English only" marker. English-only content still works exactly as before, so this ships safely before any translation exists.

**Accessibility.** A contrast audit found `muted` (#727D73) — the caption colour used across the entire app — **failed WCAG AA body text on every background**. For a heart-health app used by older whānau that's a real problem.

| Token | Was | Now | Result |
|---|---|---|---|
| `muted` | `#727D73` | `#616B62` | 3.49–4.29:1 → 4.52–5.54:1 |
| `camel` | `#C2A88F` | `#7E6D5D` | 2.26:1 → 4.96:1 |
| `orange` | `#D0824E` | `#A5673E` | 3.01:1 → 4.56:1 (the 111 bar) |

Original tints kept as `camelLight` / `orangeLight` for decorative use. Also: OS text scaling honoured app-wide, capped at 1.6×; `accessibilityRole` on 39 tappable elements across 27 files; 44–48px touch targets throughout.

## Round 3 — closing the remaining scope gaps

**Sync on reconnect.** Named explicitly in the project scope and previously missing — sync only ran on foreground. `sync/network.js` now watches connectivity and fires a sync the moment the device comes back online.

**Reflection prompts — was fully orphaned.** The admin panel has managed reflection templates all along, but the server exposed **no app endpoint at all** and nothing consumed them. Added `GET /api/app/reflection-templates`, a synced `reflections` table, and a screen that rotates the prompt daily and keeps past entries.

**Profile seeds — was orphaned.** `fetchProfileSeeds()` existed but nothing called it. Goal presets from the CMS now appear as tappable suggestions when adding a goal.

**Whakataukī on goals.** Scope says "Profiles & goals (with simple whakataukī prompts)". A whakataukī with its translation now sits above goal creation.

**Symptom tags.** Scope says "weekly grid, tag + note". Severity and notes were captured; tags weren't. Six bilingual tags (at rest, during activity, morning, night, stressed, after medicine).

**Every server endpoint is now consumed by the app.** No orphaned CMS content remains.

**Test suites committed.** `npm test` runs four suites — manifest drift, sync, bilingual, contrast — 43 assertions. Tests are portable (`os.tmpdir()`, relative imports) so they run on your machine, not just mine.

The sync manifest is duplicated between server and mobile because the packages share no module boundary. `manifest.test.mjs` fails loudly if the copies ever disagree on table names, remote names, or columns.

---

## Three things to do before this goes anywhere

1. **Rotate the secrets in `clean/server/.env.example`** — committed with a live SMTP app password, both JWT secrets and the seed admin password.
2. **Replace the placeholder URLs** in `SettingsScreen.jsx` and `ConsentScreen.jsx`. Apple rejects without a working privacy policy link.
3. **Load real content.** The DB still has "Sample… (replace before launch)" entries.

## What I could not build

- **Native-speaker review of the te reo strings.** I reused wording already in your app and wrote the rest. It's all in `src/i18n/strings.js` so a reviewer can do it in one pass. **This should not ship without that review.**
- **Content translation** — needs the client's scope decision and their content.
- **Device testing, and a VoiceOver/TalkBack walkthrough.** Roles and labels are in place; nobody has listened to it.

## Recommendation

Stop adding features and run it.

Booting the server for real caught a bug that static analysis and mocked controllers both passed — a valid token for a deleted account returned 500 instead of 401. That is the argument in miniature: roughly 5,300 lines have now changed and none of the mobile code has executed. The next most valuable hour is `npx expo start -c` and clicking through, not another feature.
