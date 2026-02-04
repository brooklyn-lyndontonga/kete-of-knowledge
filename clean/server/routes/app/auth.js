import { Router } from "express"
import jwt from "jsonwebtoken"
import { randomBytes } from "crypto"
import { getDB } from "../../db/index.js"
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
    const db = await getDB()
    const token = randomBytes(32).toString("hex")
    const expiresAt = Date.now() + 15 * 60 * 1000 // 15 mins

    // Clean up old tokens for this email
    await db.run("DELETE FROM magic_link_tokens WHERE email = ?", email)

    await db.run(
      "INSERT INTO magic_link_tokens (token, email, expiresAt) VALUES (?, ?, ?)",
      token,
      email,
      expiresAt
    )

    const magicLink = `keteofknowledge://auth?token=${token}`
    
    // Send email using service
    await sendMagicLink(email, magicLink);

    // Development log just in case (optional, maybe remove for prod or keep if ethereal)
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
    const db = await getDB()
    const record = await db.get(
      "SELECT email, expiresAt FROM magic_link_tokens WHERE token = ?",
      token
    )

    if (!record) {
      return res.status(401).json({ error: "Invalid token" })
    }

    if (Date.now() > record.expiresAt) {
      await db.run("DELETE FROM magic_link_tokens WHERE token = ?", token)
      return res.status(401).json({ error: "Token expired" })
    }

    const { email } = record

    // Find or create user
    let user = await db.get("SELECT * FROM app_users WHERE email = ?", email)

    if (!user) {
      const result = await db.run(
        "INSERT INTO app_users (email) VALUES (?)",
        email
      )
      user = { id: result.lastID, email }
    }

    // Invalidate token
    await db.run("DELETE FROM magic_link_tokens WHERE token = ?", token)

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
    const db = await getDB()
    const user = await db.get(
      "SELECT id, email, name, createdAt FROM app_users WHERE id = ?",
      req.user.sub
    )

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
