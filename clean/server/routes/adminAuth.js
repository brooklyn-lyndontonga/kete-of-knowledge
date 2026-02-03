import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getDB } from "../db/index.js"
import { getAdminJwtSecret } from "../middleware/adminAuth.js"

const router = Router()

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" })
  }

  try {
    const db = await getDB()
    const admin = await db.get(
      "SELECT id, email, password_hash FROM admin_users WHERE email = ?",
      email
    )

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const isValid = await bcrypt.compare(password, admin.password_hash)

    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign(
      { sub: admin.id, email: admin.email, role: "admin" },
      getAdminJwtSecret(),
      { expiresIn: "12h" }
    )

    return res.json({ token, expiresIn: 60 * 60 * 12 })
  } catch (err) {
    console.error("Admin login failed", err)
    return res.status(500).json({ error: "Server error" })
  }
})

export default router
