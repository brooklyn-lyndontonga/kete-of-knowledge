import { auth } from "express-oauth2-jwt-bearer"

// ─────────────────────────────────────
// Auth0 JWT validation middleware
// ─────────────────────────────────────
// Validates the access token in the Authorization header against Auth0's
// JWKS endpoint. Populates req.auth with the decoded payload on success.

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || ""
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || ""

if (!AUTH0_DOMAIN) {
  console.warn("⚠️  AUTH0_DOMAIN not set. Admin auth will fail.")
}

/**
 * Custom namespace claim used by the Auth0 Action to embed the user's
 * admin role ("admin" | "editor") into the access token.
 *
 * Must match the namespace in your Auth0 "Assign Role" Action.
 */
const ROLE_CLAIM = "https://kete.app/role"

/**
 * Express middleware that validates Auth0 access tokens.
 *
 * Uses JWKS (JSON Web Key Sets) to verify the token signature against
 * Auth0's published keys — no shared secret needed.
 */
export const requireAdminAuth = AUTH0_DOMAIN
  ? auth({
      issuerBaseURL: `https://${AUTH0_DOMAIN}/`,
      audience: AUTH0_AUDIENCE || undefined,
    })
  : (_req, _res, next) => {
      // Passthrough in development when Auth0 is not configured.
      // Remove this fallback in production.
      console.warn("⚠️  Auth0 not configured — skipping admin auth.")
      next()
    }

/**
 * After requireAdminAuth runs, req.auth.payload contains the decoded JWT.
 * This helper extracts the role from the custom namespace claim.
 */
export function getAdminRole(req) {
  return req.auth?.payload?.[ROLE_CLAIM] || "editor"
}

/**
 * Middleware that restricts a route to users with the "admin" role.
 * Must be used AFTER requireAdminAuth.
 */
export function requireAdminRole(req, res, next) {
  const role = getAdminRole(req)
  if (role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admin role required for this action" })
  }
  return next()
}
