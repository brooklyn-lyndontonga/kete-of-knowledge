import jwt from "jsonwebtoken"

const APP_JWT_SECRET = process.env.APP_JWT_SECRET || "dev-app-secret"

if (!process.env.APP_JWT_SECRET) {
  console.warn("⚠️  APP_JWT_SECRET not set. Using a dev fallback.")
}

export function requireAppAuth(req, res, next) {
  const header = req.headers.authorization || ""

  if (!header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing auth token" })
  }

  const token = header.slice("Bearer ".length)

  try {
    const payload = jwt.verify(token, APP_JWT_SECRET)
    req.user = payload
    return next()
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}

export function getAppJwtSecret() {
  return APP_JWT_SECRET
}
