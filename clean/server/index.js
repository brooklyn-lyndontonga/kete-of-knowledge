import "dotenv/config"
import express from "express"
import cors from "cors"
import compression from "compression"
import rateLimit from "express-rate-limit"

// ─────────────────────────────────────
// ADMIN ROUTES (write)
// ─────────────────────────────────────
import snapshotRoutes from "./routes/snapshots.js"
import whakataukiRoutes from "./routes/whakatauki.js"
import reflectionTemplateRoutes from "./routes/reflectionTemplates.js"
import profileSeedRoutes from "./routes/profileSeeds.js"
import learningResourceRoutes from "./routes/learningResources.js"
import conditionRoutes from "./routes/conditions.js"
import adminAuthRoutes from "./routes/adminAuth.js"
import auditLogsRoutes from "./routes/auditLogs.js"
import { requireAdminAuth } from "./middleware/adminAuth.js"

// ─────────────────────────────────────
// APP ROUTES (read-only)
// ─────────────────────────────────────
import appWhakataukiRoutes from "./routes/app/whakatauki.js"
import appLearningResourceRoutes from "./routes/app/learningResources.js"
import appConditionRoutes from "./routes/app/conditions.js"
import appProfileSeedRoutes from "./routes/app/profileSeeds.js"
import appAuthRoutes from "./routes/app/auth.js"


// DB
import { getDB, initSchema } from "./db/index.js"

const app = express()

// ─────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────
app.use(cors())
app.use(compression()) // Greatly reduces response payload sizes
app.use(express.json())

// Rate limiting for auth routes to prevent brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 auth requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many authentication requests, please try again later." }
})

// Init DB + schema
await initSchema()

// ─────────────────────────────────────
// HEALTH CHECKS
// ─────────────────────────────────────
app.get("/health", async (_req, res) => {
  try {
    const db = await getDB()
    await db.get("SELECT 1 AS ok")
    return res.json({ ok: true, db: true })
  } catch (err) {
    console.error("Health check failed:", err)
    return res.status(500).json({ ok: false, db: false })
  }
})

// ─────────────────────────────────────
// ADMIN API (content management)
// ─────────────────────────────────────
app.use("/api/admin/auth", authLimiter, adminAuthRoutes)
app.use("/api/admin", requireAdminAuth)
app.use("/api/admin/snapshots", snapshotRoutes)
app.use("/api/admin/whakatauki", whakataukiRoutes)
app.use("/api/admin/reflection-templates", reflectionTemplateRoutes)
app.use("/api/admin/profile-seeds", profileSeedRoutes)
app.use("/api/admin/learning-resources", learningResourceRoutes)
app.use("/api/admin/conditions", conditionRoutes)
app.use("/api/admin/audit-logs", auditLogsRoutes)

// ─────────────────────────────────────
// APP API (read-only, mobile app)
// ─────────────────────────────────────
app.use("/api/app/whakatauki", appWhakataukiRoutes)
app.use("/api/app/learning-resources", appLearningResourceRoutes)
app.use("/api/app/conditions", appConditionRoutes)
app.use("/api/app/profile-seeds", appProfileSeedRoutes)
app.use("/api/app/auth", authLimiter, appAuthRoutes)


// ─────────────────────────────────────
// SERVER
// ─────────────────────────────────────
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
