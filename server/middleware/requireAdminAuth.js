/* eslint-disable no-undef */
// server/middleware/requireAdminAuth.js
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "dev-secret-change-me"

export function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization || ""

  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Missing or invalid Authorization header" })
  }

  const token = authHeader.replace("Bearer ", "").trim()

  try {
    const payload = jwt.verify(token, JWT_SECRET)

    req.admin = {
      id: payload.id,
      email: payload.email,
      name: payload.name,
    }

    next()
  } catch (err) {
    console.error("Admin auth error:", err.message)
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}
