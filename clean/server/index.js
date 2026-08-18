import "dotenv/config"
import express from "express"
import cors from "cors"
import compression from "compression"
import rateLimit from "express-rate-limit"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

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
import mediaRoutes from "./routes/media.js"
import { requireAdminAuth } from "./middleware/adminAuth.js"

// ─────────────────────────────────────
// APP ROUTES (read-only)
// ─────────────────────────────────────
import appWhakataukiRoutes from "./routes/app/whakatauki.js"
import appLearningResourceRoutes from "./routes/app/learningResources.js"
import appConditionRoutes from "./routes/app/conditions.js"
import appProfileSeedRoutes from "./routes/app/profileSeeds.js"
import appAuthRoutes from "./routes/app/auth.js"
import appSyncRoutes from "./routes/app/sync.js"
import appReflectionTemplateRoutes from "./routes/app/reflectionTemplates.js"

// DB
import { getDB, initSchema } from "./db/index.js"
import { initSyncSchema } from "./db/syncSchema.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ─────────────────────────────────────
// PRODUCTION SAFETY GUARD
// Refuse to boot in production with missing Auth0 / app secrets.
// ─────────────────────────────────────
if (process.env.NODE_ENV === "production") {
  const missing = ["AUTH0_DOMAIN", "AUTH0_AUDIENCE", "APP_JWT_SECRET"].filter(
    (key) => !process.env[key]
  )
  if (missing.length) {
    console.warn(
      `⚠️  WARNING: missing recommended env vars in production: ${missing.join(", ")}`
    )
  }
}

const app = express()

// ─────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────

// CORS: wide open in development; restricted via ALLOWED_ORIGINS in
// production (comma-separated list, e.g. the deployed admin panel URL).
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean)

app.use(
  cors(
    allowedOrigins.length
      ? { origin: allowedOrigins }
      : {} // no ALLOWED_ORIGINS set → allow all (local dev)
  )
)

app.use(compression()) // Greatly reduces response payload sizes
app.use(express.json())

// Uploads: resolved to an ABSOLUTE path so it works regardless of the
// process working directory (the old relative "clean/server/uploads"
// broke inside Docker, where WORKDIR is /app/clean/server).
// UPLOADS_DIR lets production point this at a persistent volume.
export const UPLOADS_DIR =
  process.env.UPLOADS_DIR ||
  (process.env.NODE_ENV === "production"
    ? path.join(__dirname, "data/uploads")
    : path.join(__dirname, "uploads"))

fs.mkdirSync(UPLOADS_DIR, { recursive: true })
app.use("/uploads", express.static(UPLOADS_DIR))
app.use(express.static(path.join(__dirname, "public")))

// Rate limiting for auth routes to prevent brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 auth requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many authentication requests, please try again later." },
})

// Init DB + schema
await initSchema()
await initSyncSchema(await getDB())

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
app.use("/api/admin/auth", adminAuthRoutes)
app.use("/api/admin", requireAdminAuth)
app.use("/api/admin/snapshots", snapshotRoutes)
app.use("/api/admin/whakatauki", whakataukiRoutes)
app.use("/api/admin/reflection-templates", reflectionTemplateRoutes)
app.use("/api/admin/profile-seeds", profileSeedRoutes)
app.use("/api/admin/learning-resources", learningResourceRoutes)
app.use("/api/admin/conditions", conditionRoutes)
app.use("/api/admin/audit-logs", auditLogsRoutes)
app.use("/api/admin/media", mediaRoutes)

// ─────────────────────────────────────
// APP API (read-only, mobile app)
// ─────────────────────────────────────
app.use("/api/app/whakatauki", appWhakataukiRoutes)
app.use("/api/app/learning-resources", appLearningResourceRoutes)
app.use("/api/app/conditions", appConditionRoutes)
app.use("/api/app/profile-seeds", appProfileSeedRoutes)
app.use("/api/app/auth", authLimiter, appAuthRoutes)
app.use("/api/app/sync", appSyncRoutes)
app.use("/api/app/reflection-templates", appReflectionTemplateRoutes)

// ─────────────────────────────────────
// SERVER
// ─────────────────────────────────────
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📁 Serving uploads from ${UPLOADS_DIR}`)
})
