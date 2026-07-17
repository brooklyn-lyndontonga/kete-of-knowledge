# 🔐 Auth0 Setup Guide — Kete of Knowledge

This guide walks you through configuring Auth0 as the identity provider for the **Kete Admin Panel**.

> **Who is this for?** The developer or IT person setting up the production environment, or anyone migrating from the old email/password login.

---

## 1. Create an Auth0 Account & Tenant

1. Go to [auth0.com](https://auth0.com) and sign up (free tier is sufficient).
2. When prompted, create a **Tenant** — this is your isolated Auth0 environment.
   - Suggested name: `kete-of-knowledge` (or your organisation name).
   - Region: choose the closest to your users (e.g. AU for New Zealand/Australia).

---

## 2. Create a Single Page Application (SPA)

This represents the admin panel (Vite + React frontend).

1. Go to **Applications → Create Application**.
2. Name: `Kete Admin Panel`
3. Type: **Single Page Application**
4. Click **Create**.

### Configure the SPA Settings

In the application's **Settings** tab, set:

| Setting | Value |
|---|---|
| **Allowed Callback URLs** | `http://localhost:5173, https://kete-of-knowledge-production.up.railway.app` |
| **Allowed Logout URLs** | `http://localhost:5173, https://kete-of-knowledge-production.up.railway.app` |
| **Allowed Web Origins** | `http://localhost:5173, https://kete-of-knowledge-production.up.railway.app` |

> Replace the Railway URL with your actual production admin panel URL.

### Copy These Values

From the **Settings** tab, note down:
- **Domain** → use as `VITE_AUTH0_DOMAIN` (admin `.env`) and `AUTH0_DOMAIN` (server `.env`)
- **Client ID** → use as `VITE_AUTH0_CLIENT_ID` (admin `.env`)

---

## 3. Create an API

This represents the Express backend that validates admin tokens.

1. Go to **Applications → APIs → Create API**.
2. Name: `Kete Server API`
3. Identifier (Audience): `https://kete-api.example.com` (or any URI you choose — it doesn't need to resolve, it's just an identifier).
4. Signing Algorithm: **RS256** (default).
5. Click **Create**.

### Copy This Value

- **Identifier** → use as `VITE_AUTH0_AUDIENCE` (admin `.env`) and `AUTH0_AUDIENCE` (server `.env`)

---

## 4. Create Roles

1. Go to **User Management → Roles → Create Role**.
2. Create two roles:

| Role Name | Description |
|---|---|
| `admin` | Full access: view, create, edit, delete, and restore content |
| `editor` | Read/write access: view, create, and edit content (no delete/restore) |

---

## 5. Add an Action to Inject Roles into the Access Token

Auth0 doesn't include roles in the access token by default. You need a **Login Action** to do this.

1. Go to **Actions → Library → Create Action → Build from scratch**.
2. Name: `Assign Role to Token`
3. Trigger: **Login / Post Login**
4. Replace the code with:

```javascript
exports.onExecutePostLogin = async (event, api) => {
  const namespace = "https://kete.app/role"

  // Get the user's roles from Auth0
  const roles = event.authorization?.roles || []

  // Pick the highest-privilege role, defaulting to "editor"
  let role = "editor"
  if (roles.includes("admin")) {
    role = "admin"
  }

  // Inject into both the access token and ID token
  api.accessToken.setCustomClaim(namespace, role)
  api.idToken.setCustomClaim(namespace, role)
  
  // Also inject the email for the /me endpoint
  api.accessToken.setCustomClaim("https://kete.app/email", event.user.email)
}
```

5. Click **Deploy**.
6. Go to **Actions → Flows → Login**.
7. Drag your `Assign Role to Token` action into the flow between **Start** and **Complete**.
8. Click **Apply**.

---

## 6. Create Admin Users

1. Go to **User Management → Users → Create User**.
2. Enter the user's email and set a temporary password.
3. Connection: **Username-Password-Authentication** (default).
4. After creating the user, go to their profile and click **Roles** → assign either `admin` or `editor`.
5. The user can change their password at any time using Auth0's "Forgot Password?" flow on the Universal Login page.

> **Pro tip:** You can also invite users by enabling the "Verify Email" toggle — they'll receive an email to set their own password.

---

## 7. Set Environment Variables

### Admin Frontend (`clean/admin/.env`)

```env
VITE_API_URL=http://localhost:3000
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your_client_id_here
VITE_AUTH0_AUDIENCE=https://kete-api.example.com
```

### Server Backend (`clean/server/.env`)

```env
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_AUDIENCE=https://kete-api.example.com
```

> In production (Railway), set these as environment variables in the Railway dashboard.

---

## 8. Test the Integration

1. Start the server: `npm start` (from the project root)
2. Start the admin panel: `cd clean/admin && npm run dev`
3. Visit `http://localhost:5173`
4. You should be redirected to the Auth0 Universal Login page.
5. Sign in with a user you created in step 6.
6. After login, you should see the admin dashboard.
7. Check that role-based UI works:
   - `admin` users see Delete/Restore buttons.
   - `editor` users do not.

---

## Troubleshooting

### "Auth0 Configuration Missing" error on the admin panel
- Check that `VITE_AUTH0_DOMAIN` and `VITE_AUTH0_CLIENT_ID` are set in `clean/admin/.env`.
- Restart the Vite dev server after changing `.env` values.

### 401 Unauthorized on API requests
- Check that `AUTH0_DOMAIN` and `AUTH0_AUDIENCE` are set in the server `.env`.
- Verify that the **Audience** in the SPA and API match exactly.
- Check the Auth0 Action is deployed and attached to the Login flow.

### "Callback URL mismatch" on login redirect
- Ensure your current URL (including port) is in the **Allowed Callback URLs** in the Auth0 SPA settings.

### User has no role / appears as "editor" by default
- Check that the user has been assigned a role in **User Management → Users → [user] → Roles**.
- Verify the Auth0 Action is correctly deployed and attached to the Login flow.

---

## Migration Notes

- The old `admin_users` and `admin_password_resets` database tables are no longer used for authentication. They can be left in the database safely — they're simply inert.
- The mobile app auth (`/api/app/auth`, magic links) is completely unaffected by this change.
- `ADMIN_JWT_SECRET` and `ADMIN_SEED_*` env vars are no longer needed for the admin panel.
