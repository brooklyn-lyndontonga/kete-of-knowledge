import jwt from "jsonwebtoken"

const JWT_SECRET = "dev_admin_secret"

export function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "Missing token" })
  }

  const token = authHeader.replace("Bearer ", "")

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.admin = decoded
    next()
  } catch {
    return res.status(401).json({ error: "Invalid token" })
  }
}
