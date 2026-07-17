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

Welcome to the **Kete of Knowledge Admin Panel** content guide!

* **Production Login Link:** https://kete-of-knowledge-production.up.railway.app
* **Password Recovery:** If you ever forget your password, click **"Forgot Password?"** on the login screen and follow the email link to set a new one.

### 🌟 The Golden Rules
There are two rules that apply across every section of the panel:
1. **Draft vs. Published**: Every piece of content has a Status. `"Draft"` means only you can see it in the panel — it will not appear in the app. `"Published"` means it is live in the mobile app. Always check the Status dropdown before saving!
2. **Deleting is Safe**: Deleting items is a non-destructive soft delete. Deleted items are marked as archived and hidden from the active list. They are moved to **"Archived Content"** (accessible via the tab at the top of each section), where you can restore them at any time.

---

### 📊 The Dashboard
The dashboard is your at-a-glance control center:
* **Quick Add Buttons**: Shortcuts to add Whakataukī, Learning Resources, or Condition Info on the fly without navigating to individual tabs.
* **Content Counts**: Displays total active conditions, resources, and whakataukī in the database.
* **Content Health Checker**: A real-time audit tool flagging entries that need attention (e.g. missing translations, missing URLs, or short summaries). These are advisory warnings, not errors.
* **System Activity Feed**: A scrollable log of recent actions (create, edit, delete) performed by team members with timestamps.

---

### 💬 Section-by-Section Guide

#### 💬 Whakataukī
* **Purpose**: Māori proverbs with English translations, organised by theme.
* **To Add**: Click **+ Add Whakataukī** and complete:
  * *Whakataukī*: The proverb in te reo Māori.
  * *Translation*: The English meaning.
  * *Theme*: A category label (e.g. `"resilience"`, `"whānau"`). Keep naming consistent.
  * *Source*: Optional origin.
  * *Status*: Set to `Published` to make it live, or `Draft` to save it privately.
  * *Sort Order*: Lower numbers appear first in the list (e.g. `1` shows before `10`).
* **Pro Tip**: Use the search bar to query entries and filter by theme. You can also import bulk proverbs using the **📥 Bulk CSV Import** button.

#### ✏️ Reflections
* **Purpose**: Journaling templates shown as daily prompts to users in the app.
* **To Add**: Click **+ Add Template** and complete:
  * *Category*: Grouping label (e.g. `"mood"`, `"energy"`).
  * *Title*: Short name for the template.
  * *Prompt*: The guiding sentence starter displayed to users.
  * *Status* & *Sort Order Priority*.

#### 👤 Profile Seeds
* **Purpose**: Preset goal options or system fields that pre-populate user profiles.
* **To Add**: Click **+ Add Seed** and complete:
  * *Name*: The field name (e.g. `"age_range"`, `"goal_type"`).
  * *Value*: The option text shown to the user.
  * *Status* & *Sort Order Priority*.

#### 📚 Learning Resources
* **Purpose**: Links, PDFs, videos, images, or audio files for learning and support.
* **To Add**: Click **+ Add Resource** and complete:
  * *Title* & *Description*.
  * *Type*: Choose from Link/URL, PDF File, Video, Image, Audio, or Other.
  * *File Path / URL Link*: Paste a web link, **OR** upload a file directly using the file selector. Uploaded files are served statically from the backend.
  * *Status* & *Sort Order Priority*.
  * *Assign Categories*: Tick any that apply: `Learn`, `Practice`, or `Support`. You can select multiple.

#### 🏥 Conditions
* **Purpose**: Information cards about medical conditions, triggers, and treatments.
* **To Add**: Click **+ Add Condition** and complete:
  * *Title* & *Summary* (Aim for at least 1–2 sentences to avoid dashboard health warnings).
  * *Triggers* & *Treatments*.
  * *Status* & *Sort Order Priority*.
* **Note**: Displays a linked "Resources" count showing how many Learning Resources reference this condition.

---

### 💡 Things Good to Know
* **Automatic Logout**: The session automatically terminates after **30 minutes of inactivity** for security. Logging back in is normal behaviour; content is safe if saved.
* **Global Search**: The search bar in the left sidebar queries across all database tables at once. Click any result to see a detailed preview card or navigate directly to its editor.
* **In-App Help FAQ Panel**: Click **Help & FAQs** at the bottom-left of the sidebar to access text FAQs and video tutorials built directly into the panel interface.
* **Sort Order**: Works identically in all sections. Lower numbers = shown first. If order does not matter, leave as `0`.

---

### 🔄 At a Glance — The Content Workflow
1. Navigate to the desired section in the sidebar.
2. Click the **+ Add** button.
3. Fill in the fields (fields marked with `*` are required).
4. Set **Status** to `Published` if you want it live immediately.
5. Click **Save Changes**.
6. Verify the status column in the table matches.
* *To edit*: Click **Edit** next to any item, apply modifications, and click **Save Changes**.

---

## 👥 Module B: User & Role Management

### How the System Works
The Kete Admin panel uses **Auth0** as its identity provider. When you visit the admin panel, you are redirected to Auth0's hosted login page (Universal Login). After signing in, you are redirected back to the admin dashboard with a valid session.

* User accounts, passwords, and roles are all managed in the **Auth0 Dashboard** ([manage.auth0.com](https://manage.auth0.com)).
* There is no password database on the Kete server — Auth0 handles all credential storage securely.
* For full Auth0 setup and configuration details, see [AUTH0_SETUP.md](file:///Users/brooklynlyndon-tonga/kete-of-knowledge-1/AUTH0_SETUP.md).

### Admin Roles
The system has two roles, configured in Auth0:
1. **Admin** — Full capabilities: view, create, edit, delete, and restore archived content.
2. **Editor** — Read/write access: can view, create, and edit, but **cannot delete or restore** content. The Delete and Bulk Delete controls are automatically hidden from Editors in the UI.

### How to Add a New Client/Staff Member
#### Step 1: Create the User in Auth0
1. Log in to the [Auth0 Dashboard](https://manage.auth0.com).
2. Navigate to **User Management → Users → Create User**.
3. Enter the user's email and set a temporary password.
4. Connection: **Username-Password-Authentication** (default).
5. Click **Create**.

#### Step 2: Assign Their Role
1. In the Auth0 Dashboard, go to the user's profile.
2. Click the **Roles** tab → **Assign Roles**.
3. Select either `admin` or `editor` and confirm.
4. To change a user's role later, repeat this step — remove the old role and assign the new one.

#### Step 3: Let Them Set Their Own Password
1. Direct the new user to the admin panel URL: https://kete-of-knowledge-production.up.railway.app
2. They will see the Auth0 login page.
3. Have them click **"Don't remember your password?"** (or similar link on the Auth0 login page).
4. They enter their email and receive a password reset link from Auth0.
5. After setting their password, they can log in normally.

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
