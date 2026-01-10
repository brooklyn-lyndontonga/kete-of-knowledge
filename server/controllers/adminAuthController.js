/* eslint-disable no-undef */
// server/controllers/adminAuthController.js
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "dev-secret-change-me"
const JWT_EXPIRY = "7d" // 7 days

export async function loginAdmin(req, res) {
  try {
    const db = req.app.get("db")
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" })
    }

    const admin = await db.get(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    )

    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY })

    res.json({
      token,
      admin: payload,
    })
  } catch (err) {
    console.error("Admin login error:", err)
    res.status(500).json({ error: "Failed to login" })
  }
}
