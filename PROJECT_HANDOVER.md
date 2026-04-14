# 📚 Kete of Knowledge - Project Handover & Tutorials

Kia ora! Welcome to the official handover document for the **Kete of Knowledge** application. 

This document serves as your "Start Here" guide. It contains all the essential information, text tutorials, and references to video guides you will need to manage the application day-to-day, handle basic support queries, and understand the technical infrastructure.

---

## 📑 Table of Contents
1. [Module A: Day-to-Day Administration](#-module-a-day-to-day-administration)
2. [Module B: Support & Troubleshooting](#-module-b-support--troubleshooting)
3. [Module C: Technical Infrastructure](#-module-c-technical-infrastructure)
4. [Accounts & Credentials](#-accounts--credentials)
5. [Next Steps: Live Q&A](#-next-steps-live-qa)

---

## 🖥️ Module A: Day-to-Day Administration

These tutorials cover the standard tasks you will perform regularly.

### 1. Logging into the Admin Panel
* **Video Tutorial:** `[Video 01: How to Login]`
* **Text Guide:** 
  1. Navigate to the Admin URL: `[Insert Admin URL]`
  2. Enter your authorized admin email address (`maraea@thecentreforhealth.co.nz`).
  3. Click **"Send Magic Link"**.
  4. Check your email inbox and click the secure link to log in.

### 2. Managing Users
* **Video Tutorial:** `[Video 02: Managing Users]`
* **Overview:** In the admin dashboard, navigate to the **Users** tab. Here you can search for existing users, edit their profiles, or remove their access.

### 3. Adding and Managing Content
* **Video Tutorial:** `[Video 03: Adding Content]`
* **Overview:** Navigate to the **Content** tab. To add new content, click the "+ New" button, fill in the required fields (Title, Description, Media), and click "Publish". Existing content can be edited by clicking the pencil icon next to the item.

### 4. Exporting Data
* **Video Tutorial:** `[Video 04: Exporting Data]`
* **Overview:** If you need to export user lists or analytics, go to the **Data Export** section, select your date range, and click **"Download as CSV"**.

---

## 🛠️ Module B: Support & Troubleshooting

If a user reports an issue, refer to these guides first.

### 1. Magic Link Login Issues
* **Video Tutorial:** `[Video 05: Troubleshooting Login]`
* **Checklist:**
  * **Spam Folder:** Ask the user to check their Junk/Spam folder.
  * **Same Device:** Ensure the user is opening the email link on the *same device* they requested it on.
  * **Link Expiry:** Magic links expire after 15 minutes. Ask them to request a new one.

### 2. Resetting Accounts / Manual Access
* **Video Tutorial:** `[Video 06: Resetting Accounts]`
* **Overview:** If a user is completely stuck, you can find their profile in the Admin panel and click "Revoke Access" to clear their session, then ask them to try logging in again.

### 3. Checking Server Status
* **Video Tutorial:** `[Video 07: Server Status]`
* **Overview:** If the app is showing a "Red Screen" or throwing constant errors, the server might be offline. Check the hosting dashboard (e.g., Vercel or AWS) to ensure the service is marked as **"Healthy"** or **"Online"**.

---

## ⚙️ Module C: Technical Infrastructure

This section is primarily for technical/IT staff taking over the ongoing maintenance or deployment of the app.

### 1. Architecture Overview
* **Frontend/App:** Built using `[Insert Framework, e.g., React Native/Expo or Next.js]`.
* **Backend API:** Node.js / Express
* **Database:** SQLite with WAL Mode enabled for high-performance reads/writes.
* **ORM:** The database schema is strongly typed using **Prisma** (`/clean/server/prisma/schema.prisma`). Routes are currently being migrated from raw SQL queries (`getDB()`) to Prisma's ORM syntax (`getPrisma()`).
* **Authentication:** Handled via Magic Links (`jsonwebtoken` + custom Email SMTP logic).

### 2. Hosting & Domains
* **App/Web Hosting:** `[e.g., Vercel - Link to project]`
* **Database Host:** `[e.g., MongoDB Atlas - Link to project]`
* **Domain Registrar:** `[e.g., GoDaddy / Namecheap - where domain is registered]`

### 3. Source Code & Repositories
The full source code for the project is hosted securely on GitHub.
* **Repository:** `[Insert GitHub Repo Link]`
* To make changes, developers should branch off `main`, test locally, and create a Pull Request.

### 4. Deployment Process (How to update the app)
* **Web/Backend:** Pushing code to the `main` branch on GitHub will automatically trigger a deployment to production via `[e.g., Vercel]`.
* **Mobile App:** Detailed instructions on submitting an updated `.apk` or TestFlight build to the App Stores can be found in `CLIENT_INSTRUCTIONS.md`.

---

## 🔐 Accounts & Credentials

For security reasons, passwords and API keys are **not** stored in this document. 

All necessary credentials (including login details for the Database, Hosting, and Domain) have been securely transferred to you via:
* **`[Select Method: e.g., 1Password Secure Note / Shared Bitwarden Vault / Encrypted PDF]`**

Please ensure these credentials are saved immediately and kept safe.

---

## 📅 Next Steps: Live Q&A

Now that you have received this handover package, please take a few days to review the videos and read through this document. 

Once you are ready, we will jump on our scheduled **45-minute Live Walkthrough Zoom Call**.
During this call, we will not present the tutorials from scratch. Instead, we want **you** to share your screen, try out the tasks, and we will be there to answer any specific questions you have.

**Thank you for your tautoko (support) throughout this project!** 
