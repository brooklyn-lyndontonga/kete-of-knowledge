# Beta Setup & Release Guide

This guide will help you get "Kete of Knowledge" ready for beta testing.

## 1. Configure Render (Backend)

Go to your Render Dashboard for `kete-server` > **Environment**.

### Database Persistence
Ensure you have the following Environment Variable set to match your Disk mount:
- **Key**: `SQLITE_DB_PATH`
- **Value**: `/app/db/database.db`

*Note: This ensures your users and content aren't wiped every time the server restarts.*

### Auth Secrets (Required)
Set strong secrets for both admin and app auth:
- `ADMIN_JWT_SECRET`
- `APP_JWT_SECRET`

### Seed Admin User (Required)
These create your first admin login on boot:
- `ADMIN_SEED_EMAIL`
- `ADMIN_SEED_PASSWORD`

### Email Service (Magic Links)
You must provide real SMTP credentials for the magic link emails to be sent. Update these variables:
- `SMTP_HOST`: e.g., `smtp.gmail.com`
- `SMTP_PORT`: `587`
- `SMTP_USER`: Your email address
- `SMTP_PASS`: Your App Password (not your login password)
- `SMTP_FROM`: `"Kete Support" <your-email@example.com>`
- `SMTP_SECURE`: `false` for 587, `true` for 465

## 2. Deploy Admin Panel

Ensure `kete-admin` is deployed and can reach your server.
- The `VITE_API_URL` should automatically pick up the server URL if you linked them in `render.yaml`. Check the Environment tab to be sure.

## 3. Build the Mobile App (Android + iOS)

### Android (APK)
1. Open your terminal in the project root.
2. Run the beta release script:

```bash
./release-beta.sh --platform android
```

3. When prompted, paste your **Production Server URL** (e.g., `https://kete-server.onrender.com`).
4. Wait for EAS to finish building.
5. Download the APK and share it with your testers!

### iOS (TestFlight)
**Prereqs**
- You must have an Apple Developer account.
- The App Store Connect app must exist with bundle ID: `com.keteofknowledge.mobile` (matches `clean/mobile/app.json`).
- Increment `ios.buildNumber` in `clean/mobile/app.json` for every new TestFlight build.

**Build**
1. Open your terminal in the project root.
2. Run:

```bash
./release-beta.sh --platform ios
```

3. Paste your **Production Server URL** when prompted.
4. Wait for EAS to finish building the IPA.

**Submit to TestFlight**
- Submit the latest build to App Store Connect:

```bash
npx eas submit -p ios --latest
```

- In App Store Connect → TestFlight, add internal or external testers.

## 4. Updates

If you make changes to the code:
1. Commit and push to update the Server/Admin (Render auto-deploys).
2. Run `./release-beta.sh --platform all` to build both platforms after mobile changes.
