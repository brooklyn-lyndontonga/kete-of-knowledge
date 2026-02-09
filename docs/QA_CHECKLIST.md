# QA Checklist

## Core Flows
1. Launch app and reach welcome screen without errors.
2. Request magic link with a valid email.
3. Open the magic link and confirm login succeeds.
4. Log out and confirm session is cleared.
5. Continue as guest and confirm read-only areas work.

## Content
1. Whakataukī list loads with no errors.
2. Learning resources list loads with no errors.
3. Conditions list loads with no errors.
4. Offline mode shows cached content after first load.

## Admin
1. Admin can log in and create content.
2. Admin can edit and delete content.
3. Admin changes appear in the app after refresh.

## Stability
1. App handles API downtime gracefully.
2. App handles slow network without crashing.
3. No red screens during navigation.
