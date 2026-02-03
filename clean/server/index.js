import "dotenv/config"
import express from "express"
import cors from "cors"

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
import { requireAdminAuth } from "./middleware/adminAuth.js"

// ─────────────────────────────────────
// APP ROUTES (read-only)
// ─────────────────────────────────────
import appWhakataukiRoutes from "./routes/app/whakatauki.js"
import appLearningResourceRoutes from "./routes/app/learningResources.js"
import appConditionRoutes from "./routes/app/conditions.js"
import appProfileSeedRoutes from "./routes/app/profileSeeds.js"


// DB
import { initSchema } from "./db/index.js"

const app = express()

// ─────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────
app.use(cors())
app.use(express.json())

// Init DB + schema
await initSchema()

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

// ─────────────────────────────────────
// APP API (read-only, mobile app)
// ─────────────────────────────────────
app.use("/api/app/whakatauki", appWhakataukiRoutes)
app.use("/api/app/learning-resources", appLearningResourceRoutes)
app.use("/api/app/conditions", appConditionRoutes)
app.use("/api/app/profile-seeds", appProfileSeedRoutes)


// ─────────────────────────────────────
// SERVER
// ─────────────────────────────────────
const PORT = 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
