import { Router } from "express"
import { requireAdminAuth, getAdminRole } from "../middleware/adminAuth.js"

const router = Router()

/**
 * GET /api/admin/auth/me
 *
 * Returns the currently authenticated admin's profile from the Auth0
 * access token. Useful for the frontend to confirm the session is
 * valid and to read the user's role.
 *
 * Requires a valid Auth0 Bearer token.
 */
router.get("/me", requireAdminAuth, (req, res) => {
  const payload = req.auth?.payload || {}

  return res.json({
    sub: payload.sub,
    email: payload.email || payload[`https://kete.app/email`] || null,
    role: getAdminRole(req),
  })
})

export default router
