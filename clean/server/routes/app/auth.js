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
        expiresAt: BigInt(expiresAt),
      },
    })

    const deepLink = `keteofknowledge://auth?token=${token}`

    // Build an HTTPS redirect URL that email clients will render as a
    // clickable link. The redirect endpoint (GET /magic-redirect) bounces
    // the user's browser into the app via the deep link.
    const serverBase =
      process.env.SERVER_URL ||
      `http://localhost:${process.env.PORT || 3000}`
    const emailLink = `${serverBase}/api/app/auth/magic-redirect?token=${token}`

    // Always print the magic link in development to ease testing
    if (process.env.NODE_ENV !== "production") {
        console.log("\n✨ ---------------------------------------------------")
        console.log(`🔮 Magic Link for ${email}:`)
        console.log(deepLink)
        console.log(`📧 Email link: ${emailLink}`)
        console.log("--------------------------------------------------- ✨\n")
    }

    // Send email using service
    try {
        await sendMagicLink(email, emailLink);
    } catch (emailErr) {
        console.error("⚠️ Failed to send magic link email (check SMTP settings):", emailErr.message)
        if (process.env.NODE_ENV === "production") {
            throw emailErr;
        }
    }

    return res.json({ ok: true, message: "Magic link sent" })
  } catch (err) {
    console.error("Magic link request failed", err)
    return res.status(500).json({ error: "Server error" })
  }
})

// GET /magic-redirect — browser-based trampoline from email → deep link
// The email contains an https:// URL pointing here. This page auto-redirects
// to the keteofknowledge:// deep link so the app opens directly.
router.get("/magic-redirect", (req, res) => {
  const { token } = req.query
  if (!token) {
    return res.status(400).send("Missing token")
  }

  const deepLink = `keteofknowledge://auth?token=${encodeURIComponent(token)}`

  // Serve a small HTML page that immediately redirects to the deep link.
  // Falls back to a tap-to-open link if the redirect doesn't fire.
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Opening Kete of Knowledge…</title>
  <meta http-equiv="refresh" content="0;url=${deepLink}">
  <style>
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f5f5f5;color:#333;text-align:center;padding:1rem}
    .card{background:#fff;border-radius:16px;padding:2.5rem;max-width:380px;box-shadow:0 4px 24px rgba(0,0,0,.08)}
    h1{font-size:1.25rem;margin:0 0 .75rem}
    p{margin:0 0 1.25rem;color:#666;font-size:.9rem}
    a{display:inline-block;background:#1a7a5c;color:#fff;text-decoration:none;padding:.75rem 2rem;border-radius:10px;font-weight:600;font-size:1rem}
    a:hover{background:#15614a}
  </style>
</head>
<body>
  <div class="card">
    <h1>Opening Kete of Knowledge…</h1>
    <p>If the app doesn't open automatically, tap the button below.</p>
    <a href="${deepLink}">Open App</a>
  </div>
  <script>window.location.href="${deepLink}";</script>
</body>
</html>`)
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
    if (Date.now() > Number(record.expiresAt)) {
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
