import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { initDB } from "../../db/index.js"
 0/  7 

// ROUTES
import adminAuthRoutes from "./routes/adminAuth.js"
import resourcesRoutes from "./routes/resources.js"
import resourceCategoriesRoutes from "./routes/resourceCategories.js"
import conditionsRoutes from "./routes/conditions.js"
import whakataukiRoutes from "./routes/whakatauki.js"
import snapshotsRoutes from "./routes/snapshots.js"

const app = express()
const PORT = 3000

// --------------------------------------------------
// PATH SETUP (ESM-safe)
// --------------------------------------------------
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// --------------------------------------------------
// GLOBAL MIDDLEWARE
// --------------------------------------------------
app.use(cors())
app.use(express.json())

// --------------------------------------------------
// STATIC FILES (uploads)
// --------------------------------------------------
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
)

// --------------------------------------------------
// ADMIN ROUTES
// --------------------------------------------------
app.use("/api/admin", adminAuthRoutes)
app.use("/api/admin/resources", resourcesRoutes)
app.use("/api/admin/resource-categories", resourceCategoriesRoutes)
app.use("/api/admin/conditions", conditionsRoutes)
app.use("/api/admin/whakatauki", whakataukiRoutes)
app.use("/api/admin/snapshots", snapshotsRoutes)

// --------------------------------------------------
// HEALTH CHECK
// --------------------------------------------------
app.get("/", (_, res) => {
  res.send("🛠 Kete Admin API running")
})

// --------------------------------------------------
// BOOT SERVER
// --------------------------------------------------
initDB().then(() => app.listen(PORT, () => {
  console.log(`🚀 Admin API running at http://localhost:${PORT}`)
  })
)