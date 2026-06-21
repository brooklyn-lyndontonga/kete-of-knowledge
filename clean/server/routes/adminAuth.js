import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getPrisma } from "../db/prisma.js"
import { getAdminJwtSecret } from "../middleware/adminAuth.js"

const router = Router()

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" })
  }

  try {
    const prisma = getPrisma()
    const admin = await prisma.admin_users.findUnique({
      where: { email },
      select: { id: true, email: true, password_hash: true },
    })

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
    return res.status(500).json({ 
      error: "Server error", 
      message: err.message, 
      stack: err.stack 
    })
  }
})

export default router
