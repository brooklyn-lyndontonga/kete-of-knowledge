# Kete of Knowledge — mobile fixes

32 files. Drop these over `clean/mobile/`, preserving paths. Everything parses and passes your existing ESLint config.

---

## Before you run it

```bash
cd clean/mobile
npx expo install expo-notifications
npx expo start -c
```

`expo-notifications` is loaded through a dynamic import in `src/features/notifications.js`, so the app runs without it — reminders just save without alerting, and the Reminders screen shows a notice saying so. Install it and rebuild to turn alerts on.

---

## 1. The data layer (this was the blocker)

Six of seven modules used `db.transaction()` / `tx.executeSql()`. That API was removed in expo-sqlite v11 and you're on v16, so every save in symptoms, medicines, goals, profile, reminders and checklists was throwing at runtime. All rewritten to `runAsync` / `getAllAsync` / `getFirstAsync` / `withTransactionAsync`.

**`notes.db.js` was opening a different database file** (`app.db`) from everything else (`kete.db`). Notes were sitting in their own database. Everything now goes through one shared connection in `src/db/index.js`.

`initDB()` is now async and `App.js` waits for it before rendering — previously screens could query tables that didn't exist yet.

Added an idempotent migration runner (`PRAGMA table_info` check, then `ALTER TABLE`) so anyone already carrying build 2 upgrades cleanly instead of hitting missing columns.

## 2. Schema additions

- **`checklist_items`** — checklists could only ever store a title before; items had nowhere to go
- **`contacts`** — name, relationship, phone, email, category, emergency flag
- `reminders.time_of_day` and `reminders.notification_id` so alerts can be scheduled and cancelled
- `profiles.updated_at`, `notes.updated_at`, `consent.version`
- Indexes on `checklist_items.checklist_id` and `symptoms.logged_at`

## 3. The auth bug

`GuestGate`, `useAuthGuard` and `SettingsStack` all destructured `login` and `authReady` from `useAuth()`. `AuthContext` never provided either. Net effect: the Settings sign-in button was permanently disabled (`!authReady` → `!undefined` → `true`), and any guest tapping "Sign in" on the alert hit `undefined is not a function`. Both are now exposed.

## 4. Conditions library — new

`src/api/contentApi.js` was an empty file, so the conditions content sitting in your CMS never reached the app. Now implemented with the same cache-first + background-refresh pattern as learning resources, so it reads offline.

Two new screens under `src/screens/library/` (list + detail, showing summary / triggers / treatments with a clinical disclaimer), registered in `LibraryStack`, with an entry card on the Library screen.

## 5. Contacts — new

`ContactsScreen` + `AddContactScreen`, grouped into Whānau / Health provider / Emergency, with `tel:` quick-dial, a prominent Call 111 bar, and up to three pinned emergency contacts. Added to `HubScreen` and `HubStack`.

## 6. Reminders and checklists — now actually persist

Both were `useState([])` shells. `AddReminderScreen` had a literal `// later → SQLite insert` comment where the save should have been.

Reminders now save, schedule a daily repeating notification, and pause/resume/delete cancels the notification properly. Time entry has Morning/Midday/Evening/Night presets plus HH:MM with validation.

Checklists save with their items, items tick on and off, lists delete with their children.

## 7. Settings — rebuilt

`SettingsScreen.jsx` was a zero-byte file; the real screen was inlined in `SettingsStack` and only did sign-in/out. Now a proper screen with:

- **Export my data** — dumps all nine tables to JSON via the native share sheet
- **Delete my data** — confirmed destructive wipe of every personal table
- Privacy policy, terms and support links
- A plain statement that health data stays on the device

Both data controls are MVP must-haves under section 2.5 of the proposal.

## 8. Consent — new

`ConsentScreen` gates first launch, records acceptance with a version string, and covers what's stored locally, what's collected on sign-in, and a not-medical-advice notice. Versioned so you can re-prompt if the policy changes.

## 9. Accessibility

Not a full pass, but along the way: 44–48px minimum touch targets on every new control, `accessibilityRole` / `accessibilityLabel` / `accessibilityState` on buttons, checkboxes and radio groups.

---

## Three things to change before this goes anywhere

1. **Rotate the secrets in `clean/server/.env.example`.** It's committed with a live SMTP app password, both JWT secrets and the seed admin password. Rotate all four, then replace the file with placeholders.

2. **Replace the placeholder URLs.** `PRIVACY_POLICY_URL`, `TERMS_URL` and `SUPPORT_EMAIL` appear in `SettingsScreen.jsx` and `ConsentScreen.jsx` as guesses at the client's domain. They need the real hosted URLs before store submission — Apple will reject without a working privacy policy link.

3. **Load real content.** Your local DB has one condition and three resources, all reading "Sample… (replace before launch)".

---

## Still outstanding after this patch

- **Server sync.** Personal data is still device-only. The only network writes in the app are the two auth calls. "Save entries offline, sync on reconnect" from section 2.5 is not started, and it's the largest remaining piece.
- **Symptoms weekly grid.** `getSymptomsForWeek()` is written and returns the seven-day grouping; the grid UI on `SymptomsHubScreen` still needs building on top of it.
- **Bilingual content.** Screen labels are bilingual. The content models (`conditions`, `learning_resources`) have no te reo fields, so content is English-only. Needs a scope decision before it's worth building.
- **Full accessibility audit** — dynamic type scaling, contrast ratios against WCAG AA, screen-reader walkthrough.
- **Device testing.** I've verified this parses, lints, and that imports and exports line up. None of it has been run on a physical device. Do that before you promise anyone a build.
