# Project Handover Guide - Kete of Knowledge

## 1. Project Overview
The **Kete of Knowledge** is a health and wellbeing platform designed to provide accessible information to whānau. The system consists of three main components:
- **Mobile App**: A React Native (Expo) application for iOS and Android.
- **Admin Panel**: A React (Vite) web dashboard for content management.
- **Backend Server**: A Node.js/Express API with a SQLite database.

## 2. Deliverables Checklist
Ensure the client receives the following items:

- [ ] **GitHub Repository Access**: Full admin access to the [repository URL].
- [ ] **Documentation**:
    - `README.md` (Technical setup and overview).
    - `CLIENT_INSTRUCTIONS.md` (Testing guide).
    - `HANDOVER.md` (This document).
- [ ] **Design Assets**: Links to Figma files, logo exports, and brand guidelines.
- [ ] **Environment Variables**: A secure copy of the `.env` files for Mobile, Admin, and Server (do not commit these to GitHub).

## 3. Accounts & Credentials
*Important: Share actual passwords securely via a password manager (e.g., 1Password, LastPass).*

### Hosting & Infrastructure
- **Server Hosting** (e.g., Railway/Render/AWS):
    - Login URL:
    - Account Email:
- **Database**:
    - Connection String (Production):
- **Expo (Mobile Builds)**:
    - Account:
    - Project Link:

### Third-Party Services
- **Authentication** (e.g., Firebase/Auth0/Supabase):
    - Console URL:
- **Google Play Console** (Android Release):
    - Developer Account:
- **Apple App Store Connect** (iOS Release):
    - Developer Account:

## 4. Deployment & Release Process

### Mobile App (Expo)
1.  **Development**: Run `npx expo start` to test locally.
2.  **Build**: Use EAS Build to create production binaries.
    ```bash
    eas build --platform all --profile production
    ```
3.  **Submit**: Upload to App Store/Play Store.
    ```bash
    eas submit --platform all
    ```

### Admin Panel & Server
- **Link specific deployment triggers** (e.g., "Push to `main` branch automatically deploys to production").
- **Manual Deployment**: Instructions if manual steps are required (e.g., Docker commands).

## 5. Technical Maintenance

### Routine Tasks
- **Security Updates**: Regularly run `npm audit` and update dependencies.
- **Database Backups**: Schedule automated backups of the SQLite database file (or configured cloud database).
- **Monitoring**: Check server logs for errors or downtime.

## 6. Support & Warranty
*(Define your post-handover support terms here)*
- **Warranty Period**: [e.g., 30 days] for bug fixes related to existing features.
- **Contact**: [Your Email/Contact Info] for critical issues.
- **New Features**: Any new work will require a separate agreement/contract.
