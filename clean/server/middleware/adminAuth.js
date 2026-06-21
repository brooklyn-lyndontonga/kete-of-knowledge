import jwt from "jsonwebtoken"

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "dev-admin-secret"

if (!process.env.ADMIN_JWT_SECRET) {
  console.warn("⚠️  ADMIN_JWT_SECRET not set. Using a dev fallback.")
}

export function requireAdminAuth(req, res, next) {
  const header = req.headers.authorization || ""

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing auth token" })
  }

  const token = header.slice("Bearer ".length)

  try {
    const payload = jwt.verify(token, ADMIN_JWT_SECRET)
    req.admin = payload
    return next()
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}

export function getAdminJwtSecret() {
  return ADMIN_JWT_SECRET
}

export function requireAdminRole(req, res, next) {
  if (req.admin?.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admin role required for this action" })
  }
  return next()
}
