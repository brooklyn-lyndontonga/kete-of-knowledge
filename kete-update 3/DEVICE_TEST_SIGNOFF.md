# Device test plan — Kete of Knowledge

Work through this on a real phone. Tick each box as you confirm it. `npm run check:release` reads this file and will keep reporting a blocker until every box is ticked.

**Do not tick a box you haven't actually done.** The point of this file is that it means something.

```bash
cd clean/mobile
npx expo install expo-notifications @react-native-community/netinfo
npx expo start -c
```

Tested on: `___________________` (device + OS version)
Tested by: `___________________`
Date: `___________________`

---

## 1. First launch — the paths that only happen once

- [ ] Fresh install shows the privacy/consent screen before anything else
- [ ] The privacy wording is accurate and ManawaOra have approved it
- [ ] Tapping "I understand" moves to sign-in and never shows the consent screen again
- [ ] Force-quit and reopen — consent does not reappear

## 2. Guest mode — easy to forget, because you're always signed in

- [ ] "Continue as guest" works
- [ ] A guest can browse the Library and read conditions
- [ ] A guest tapping "Add symptom" gets the sign-in prompt, not a crash
- [ ] Tapping "Sign in" on that prompt actually opens sign-in
- [ ] Settings sign-in button works for a guest

## 3. Sign in

- [ ] Magic link email arrives (check spam)
- [ ] Tapping the link opens the app and signs you in
- [ ] The link expires after 15 minutes as expected
- [ ] Closing and reopening the app keeps you signed in
- [ ] Sign out works, and signing back in restores your data

## 4. Saving data — every screen, because the whole layer is new

- [ ] Profile saves and survives an app restart
- [ ] Editing the profile updates it rather than creating a second one
- [ ] Goal saves; whakataukī appears above the form; goal presets are tappable
- [ ] Symptom saves with severity, tags and notes
- [ ] Medicine saves; toggling active/inactive works
- [ ] Note saves, edits and deletes
- [ ] Reminder saves with a time
- [ ] Checklist saves **with its items** (this was previously broken)
- [ ] Ticking a checklist item persists after leaving and returning
- [ ] Contact saves in the right category
- [ ] Reflection saves against the day's prompt

## 5. Reading, deleting, and the weekly grid

- [ ] Every list screen shows what you saved
- [ ] Deleting works everywhere and the item does not reappear
- [ ] Symptoms weekly grid shows the right days
- [ ] Days with entries are shaded; higher severity is visibly darker
- [ ] Tapping a day expands that day's entries
- [ ] Today is marked

## 6. Reminders and notifications

- [ ] Setting a reminder for two minutes' time actually fires a notification
- [ ] The notification fires with the app closed
- [ ] Pausing a reminder stops it firing
- [ ] Deleting a reminder cancels its notification
- [ ] Permission prompt appears the first time and is handled if declined

## 7. Offline and sync — the highest-risk area

- [ ] Aeroplane mode: previously-read conditions and resources still readable
- [ ] Aeroplane mode: you can still add symptoms, notes and medicines
- [ ] Settings shows "offline" and a count of changes waiting
- [ ] Turning connectivity back on syncs **automatically**, without opening Settings
- [ ] Sign in on a **second device** — data from the first device appears
- [ ] Edit the same record on both devices — the most recent edit wins
- [ ] Delete on one device — the deletion reaches the other
- [ ] A checklist created on device A shows **with its items** on device B
- [ ] Nothing is duplicated after several sync cycles

## 8. Contacts and emergency

- [ ] "Call 111" opens the dialler with 111 (**cancel — do not call**)
- [ ] Tapping a contact's Call opens the dialler with the right number
- [ ] Emergency contacts appear in the quick-dial row

## 9. Language

- [ ] Switching to te reo Māori changes the interface immediately
- [ ] The choice survives an app restart
- [ ] Content with a translation shows in te reo
- [ ] Content **without** a translation falls back to English and is marked
- [ ] Switching back to English works

## 10. Privacy controls

- [ ] Export produces a file containing your data
- [ ] "Delete — this device only" clears the app but leaves the account
- [ ] "Delete — device and account" clears both; signing in on another device confirms it
- [ ] Privacy policy, terms and support links all open

## 11. Accessibility

- [ ] Set the phone's text size to maximum — no text is cut off or overlapping
- [ ] All buttons remain tappable at large text sizes
- [ ] VoiceOver (iOS) or TalkBack (Android): every button announces something meaningful
- [ ] Screen reader can complete: add a symptom, then find it in the list
- [ ] Text is comfortably readable in bright outdoor light

## 12. Content check with real data

- [ ] Publishing a condition in the admin panel makes it appear in the app
- [ ] Setting it back to draft removes it
- [ ] Conditions read clearly and are free of jargon
- [ ] Clinical reviewer has signed off the health content

---

## Anything that broke

| What | Where | Fixed? |
|---|---|---|
|  |  |  |
|  |  |  |

---

## Sign-off

- [ ] Everything above has been tested on a physical Android device
- [ ] Everything above has been tested on a physical iPhone
- [ ] Issues found have been fixed and retested
- [ ] I am comfortable putting this in front of whānau testers

Signed: `___________________`  Date: `___________________`
