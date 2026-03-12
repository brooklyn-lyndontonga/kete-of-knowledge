import { Router } from "express"
import jwt from "jsonwebtoken"
import { randomBytes } from "crypto"
import { getPrisma } from "../../db/prisma.js"
import { getAppJwtSecret, requireAppAuth } from "../../middleware/appAuth.js"
import { sendMagicLink } from "../../services/email.js"

const router = Router()

// POST /magic-link
router.post("/magic-link", async (req, res) => {
  const { email } = req.body || {}

  if (!email) {
    return res.status(400).json({ error: "Email required" })
  }

  try {
    const prisma = getPrisma()
    const token = randomBytes(32).toString("hex")
    const expiresAt = Date.now() + 15 * 60 * 1000 // 15 mins

    // Clean up old tokens for this email
    await prisma.magic_link_tokens.deleteMany({
      where: { email },
    })

    // Insert new token
    await prisma.magic_link_tokens.create({
      data: {
        token,
        email,
        expiresAt,
      },
    })

    const magicLink = `keteofknowledge://auth?token=${token}`
    
    // Send email using service
    await sendMagicLink(email, magicLink);

    // Development log
    if (process.env.SMTP_HOST === 'smtp.ethereal.email') {
        console.log("\n✨ ---------------------------------------------------")
        console.log(`🔮 Magic Link for ${email}:`)
        console.log(magicLink)
        console.log("--------------------------------------------------- ✨\n")
    }

    return res.json({ ok: true, message: "Magic link sent" })
  } catch (err) {
    console.error("Magic link request failed", err)
    return res.status(500).json({ error: "Server error" })
  }
})

// POST /verify-magic-link
router.post("/verify-magic-link", async (req, res) => {
  const { token } = req.body || {}

  if (!token) {
    return res.status(400).json({ error: "Token required" })
  }

  try {
    const prisma = getPrisma()
    
    // Find token record
    const record = await prisma.magic_link_tokens.findUnique({
      where: { token },
    })

    if (!record) {
      return res.status(401).json({ error: "Invalid token" })
    }

    // Check expiration
    if (Date.now() > record.expiresAt) {
      await prisma.magic_link_tokens.delete({
        where: { token },
      })
      return res.status(401).json({ error: "Token expired" })
    }

    const { email } = record

    // Find or create user securely
    const user = await prisma.app_users.upsert({
      where: { email },
      update: {}, // No updates needed if they exist
      create: { email },
    })

    // Invalidate token so it can't be used twice
    await prisma.magic_link_tokens.delete({
      where: { token },
    })

    // Create session JWT
    const authToken = jwt.sign(
      { sub: user.id, email: user.email, role: "user" },
      getAppJwtSecret(),
      { expiresIn: "30d" }
    )

    return res.json({
      token: authToken,
      user: { id: user.id, email: user.email, name: user.name },
    })
  } catch (err) {
    console.error("Verify magic link failed", err)
    return res.status(500).json({ error: "Server error" })
  }
})

// GET /me
router.get("/me", requireAppAuth, async (req, res) => {
  try {
    const prisma = getPrisma()
    
    const user = await prisma.app_users.findUnique({
      where: { id: req.user.sub },
      select: { 
        id: true, 
        email: true, 
        name: true, 
        createdAt: true 
      },
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    return res.json({ user })
  } catch (err) {
    console.error("App /me failed", err)
    return res.status(500).json({ error: "Server error" })
  }
})

export default router
