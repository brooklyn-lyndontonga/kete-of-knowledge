import express from "express"
import cors from "cors"

// ROUTES
import snapshotRoutes from "./routes/snapshots.js"
import whakataukiRoutes from "./routes/whakatauki.js"
import reflectionTemplateRoutes from "./routes/reflectionTemplates.js"
import profileSeedRoutes from "./routes/profileSeeds.js"
import learningResourceRoutes from "./routes/learningResources.js"
import conditionRoutes from "./routes/conditions.js"

import { initSchema } from "./db/index.js"



const app = express()

app.use(cors())
app.use(express.json())

await initSchema()

// ─────────────────────────────────────
// ADMIN API (content management)
// ─────────────────────────────────────
app.use("/api/admin/snapshots", snapshotRoutes)
app.use("/api/admin/whakatauki", whakataukiRoutes)
app.use("/api/admin/reflection-templates", reflectionTemplateRoutes)
app.use("/api/admin/profile-seeds", profileSeedRoutes)
app.use("/api/admin/learning-resources", learningResourceRoutes)
app.use("/api/admin/conditions", conditionRoutes)

// ─────────────────────────────────────
const PORT = 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
