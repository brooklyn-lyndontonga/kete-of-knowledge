import { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { randomBytes } from "crypto"
import { getPrisma } from "../db/prisma.js"
import { getAdminJwtSecret } from "../middleware/adminAuth.js"
import { sendPasswordResetLink } from "../services/email.js"

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
      select: { id: true, email: true, password_hash: true, role: true },
    })

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const isValid = await bcrypt.compare(password, admin.password_hash)

    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign(
      { sub: admin.id, email: admin.email, role: admin.role || "editor" },
      getAdminJwtSecret(),
      { expiresIn: "12h" }
    )

    return res.json({ token, expiresIn: 60 * 60 * 12 })
  } catch (err) {
    console.error("Admin login failed", err)
    return res.status(500).json({ error: "Server error" })
  }
})

// POST /forgot-password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body || {}

  if (!email) {
    return res.status(400).json({ error: "Email required" })
  }

  try {
    const prisma = getPrisma()
    
    // Verify admin user exists
    const admin = await prisma.admin_users.findUnique({
      where: { email },
    })

    if (!admin) {
      // Return 200 even if user not found to prevent user enumeration attacks
      return res.json({ ok: true, message: "If this email is registered, a password reset link has been sent." })
    }

    const token = randomBytes(32).toString("hex")
    const expiresAt = Date.now() + 15 * 60 * 1000 // 15 mins

    // Clean up old reset tokens for this email
    await prisma.admin_password_resets.deleteMany({
      where: { email },
    })

    // Insert token
    await prisma.admin_password_resets.create({
      data: {
        token,
        email,
        expiresAt,
      },
    })

    const appUrl = process.env.ADMIN_APP_URL || "http://localhost:5173"
    const resetLink = `${appUrl}?resetToken=${token}`

    // Send email
    await sendPasswordResetLink(email, resetLink)

    // Development log
    if (process.env.SMTP_HOST === 'smtp.ethereal.email' || process.env.NODE_ENV !== 'production') {
        console.log("\n✨ ---------------------------------------------------")
        console.log(`🔮 Password Reset Link for ${email}:`)
        console.log(resetLink)
        console.log("--------------------------------------------------- ✨\n")
    }

    return res.json({ ok: true, message: "Password reset link sent" })
  } catch (err) {
    console.error("Forgot password request failed", err)
    return res.status(500).json({ error: "Server error" })
  }
})

// POST /reset-password
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body || {}

  if (!token || !password) {
    return res.status(400).json({ error: "Token and password are required" })
  }

  try {
    const prisma = getPrisma()

    // Find reset token
    const record = await prisma.admin_password_resets.findUnique({
      where: { token },
    })

    if (!record) {
      return res.status(400).json({ error: "Invalid or expired token" })
    }

    if (Date.now() > record.expiresAt) {
      await prisma.admin_password_resets.delete({
        where: { token },
      })
      return res.status(400).json({ error: "Token expired" })
    }

    // Update user password hash
    const passwordHash = await bcrypt.hash(password, 10)
    await prisma.admin_users.update({
      where: { email: record.email },
      data: { password_hash: passwordHash },
    })

    // Delete token
    await prisma.admin_password_resets.delete({
      where: { token },
    })

    return res.json({ ok: true, message: "Password reset successful" })
  } catch (err) {
    console.error("Reset password failed", err)
    return res.status(500).json({ error: "Server error" })
  }
})

export default router
