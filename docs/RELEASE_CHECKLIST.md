# Release Checklist

## Hosting
1. Configure `kete-server` environment variables in Render.
2. Confirm `SQLITE_DB_PATH` is `/app/db/database.db`.
3. Set `ADMIN_SEED_EMAIL` and `ADMIN_SEED_PASSWORD`.
4. Set `ADMIN_JWT_SECRET` and `APP_JWT_SECRET`.
5. Configure SMTP credentials for magic link email.

## Deploy
1. Deploy `kete-server` and confirm `/health` is green.
2. Deploy `kete-admin` and confirm admin login works.

## Content
1. Populate core content in admin or run `npm run seed:content`.
2. Verify the app loads content in all tabs.

## Mobile Build
1. Verify `clean/mobile/app.json` name and versions are correct.
2. Run `eas build --profile production` for Android and iOS.
3. Smoke test the production build on a real device.

## Store Readiness
1. Finalize privacy policy and terms of use.
2. Prepare store listing metadata and screenshots.
3. Submit via `eas submit` or store consoles.
