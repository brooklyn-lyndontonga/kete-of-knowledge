# 📚 Kete of Knowledge - Project Handover & Tutorials

Kia ora! Welcome to the official handover document for the **Kete of Knowledge** application. 

This document serves as your "Start Here" guide. It contains all the essential information, text tutorials, and troubleshooting tips you will need to manage the application day-to-day, handle support queries, and understand the technical infrastructure.

---

## 📑 Table of Contents
1. [Module A: Day-to-Day Administration & Content Management](#-module-a-day-to-day-administration--content-management)
2. [Module B: User & Role Management](#-module-b-user--role-management)
3. [Module C: Support & Troubleshooting](#-module-c-support--troubleshooting)
4. [Module D: Technical Infrastructure](#-module-d-technical-infrastructure)
5. [Accounts & Credentials](#-accounts--credentials)
6. [Next Steps: Live Q&A](#-next-steps-live-qa)

---

## 🖥️ Module A: Day-to-Day Administration & Content Management

These tutorials cover the standard tasks you will perform regularly to keep the app populated with fresh content.

### 1. Logging into the Admin Panel
* **Production Admin URL:** https://kete-of-knowledge-production.up.railway.app
* **Text Guide:** 
  1. Navigate to the Admin URL above.
  2. Enter your authorized admin email address (e.g., `maraea@thecentreforhealth.co.nz`).
  3. Enter your password.
  4. Click **"Sign in"** to log in to the dashboard.
  
  > [!NOTE]
  > For security, the system has a **30-minute inactivity session timeout**. If you are idle for 30 minutes, you will be automatically logged out and must sign in again.

### 2. Dashboard & Content Health
* The dashboard features quick-add buttons for adding entries rapidly.
* Use the **Content Health Checker** on the dashboard to review advisory warnings (such as missing translations or empty summaries). Use this as a checklist to keep the data clean.

### 3. Adding and Managing Content
Navigate to the corresponding tabs on the sidebar:
* **Whakataukī**: View, search, filter, and prioritize quotes, translations, and themes.
* **Reflections**: Manage daily reflection templates and prompts.
* **Profile Seeds**: Configure base user goal suggestions.
* **Learning Resources**: Manage media attachments, links, and documents.
* **Conditions**: Update details about medical conditions, triggers, and treatments.

#### Direct Media Uploads (Learning Resources)
* When creating or editing Learning Resources, you can choose to either paste an external URL link or upload a local file directly (PDF, images, video, or audio) using the **"Or Upload a Local File"** input.
* Uploaded files are securely stored on the server and served statically.
* Remember to select the corresponding **Type** (e.g., PDF File, Image, Video) and assign one or more **Categories** (Learn, Practice, Support) using the checklist.

#### Publishing Drafts
* New items default to `Draft` status. 
* **Crucial Step:** You must toggle the status selector to **Published** for the content to show up in the public-facing mobile app.

---

## 👥 Module B: User & Role Management

### How the System Works
The Kete Admin panel uses a custom JWT-based authentication system backed by a separate server ([kete-server-production.up.railway.app](https://kete-server-production.up.railway.app)). 
* There is **no built-in "Invite User" button** visible in the admin UI.
* User creation and role assignment must be performed directly at the database level (e.g., via the Railway database console or a database-connected script).

### Admin Roles
The system has two roles defined in [schema.prisma](file:///Users/brooklynlyndon-tonga/kete-of-knowledge-1/clean/server/prisma/schema.prisma):
1. **Admin** — Full capabilities: view, create, edit, delete, and restore archived content.
2. **Editor** — Read/write access: can view, create, and edit, but **cannot delete or restore** content. The Delete and Bulk Delete controls are automatically hidden from Editors in the UI.

### Best Way to Add a New Client/Staff Member
#### Step 1: Create the Account on the Backend
Use the database console or Railway CLI shell to insert a new user record in the `admin_users` table:
* Specify the user's `email`.
* Set a temporary `password_hash` (or seed value) and assign their `role` (`"admin"` or `"editor"`).
* If you need to change a user's role later, this must also be updated directly in the database.

#### Step 2: Let Them Set Their Own Password
1. Direct the new user to the login page: https://kete-of-knowledge-production.up.railway.app
2. Have them click **"Forgot Password?"** on the login screen.
3. They enter their email and receive a secure password reset link.
4. Clicking the link takes them to a **Set New Password** screen to choose their own credentials securely.

---

## 🛠️ Module C: Support & Troubleshooting

If your client or app users report issues, consult this troubleshooting guide.

### 1. Magic Link / Password Reset Email Issues
* **Spam Folder:** Advise the user to check their Spam/Junk folder.
* **Link Expiry:** Reset links and magic links expire after 15 minutes. Have them request a new one if expired.
* **SMTP Settings:** Ensure that the SMTP environment variables in your Railway console are configured correctly so that emails are sent successfully.

### 2. Restoring Deleted Items (Soft Deletes)
* Deleting items in the UI does **not** permanently destroy them. They are safely marked as `archived` and hidden from the active list.
* To restore a deleted item, click the **"Archived Content"** tab on the section page.
* Select the archived item and click **"Restore"** (Admins only). The item will instantly return to the active list.

### 3. Content Not Showing in the App
* **Check Status:** Verify the item is set to **Published** instead of **Draft**.
* **Check Archive:** Check if the item was accidentally archived.
* **Check Categories:** For Learning Resources, verify that at least one category (Learn, Practice, Support) has been checked in the admin modal so it matches the mobile app's rendering categories.

---

## ⚙️ Module D: Technical Infrastructure

This section is for developers and IT staff maintaining the application.

### 1. Architecture Overview
* **Mobile App:** React Native Expo app ([LibraryScreen.jsx](file:///Users/brooklynlyndon-tonga/kete-of-knowledge-1/clean/mobile/src/screens/LibraryScreen.jsx)).
* **Backend API:** Node.js Express server ([index.js](file:///Users/brooklynlyndon-tonga/kete-of-knowledge-1/clean/server/index.js)).
* **Database:** SQLite database file with WAL Mode enabled for high-performance concurrent reads/writes ([index.js](file:///Users/brooklynlyndon-tonga/kete-of-knowledge-1/clean/server/db/index.js)).
* **ORM:** Prisma Client ([schema.prisma](file:///Users/brooklynlyndon-tonga/kete-of-knowledge-1/clean/server/prisma/schema.prisma)).
* **Static Assets:** Local uploads directory ([media.js](file:///Users/brooklynlyndon-tonga/kete-of-knowledge-1/clean/server/routes/media.js)) served at `/uploads` on the backend.

### 2. Deployment
* **Web/Backend**: Pushing changes to the `main` branch of the GitHub repository automatically triggers a deployment to Railway.
* **Official Notion Hub**: Notion documentation at `notion.so/kete-of-knowledge` contains additional developer notes, policies, and guidance.

---

## 🔐 Accounts & Credentials

For security reasons, database passwords and API keys are **not** stored in this document. All credentials (including server hosting, registration, and email keys) have been safely transferred to you via your secure password vault.

---

## 📅 Next Steps: Live Q&A

Now that you have received this handover package, please take a few days to review this document.

Once you are ready, we will jump on our scheduled **45-minute Live Walkthrough Zoom Call**.
During this call, we will not present the tutorials from scratch. Instead, we want **you** to share your screen, try out the tasks, and we will be there to answer any specific questions you have.

**Thank you for your tautoko (support) throughout this project!**
