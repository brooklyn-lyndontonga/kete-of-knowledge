// server/app.js
import express from "express"
import cors from "cors"

import { connectDB, initTables } from "./db/init.js"

// USER ROUTES
import goalsRoutes from "./routes/goals.js"
import symptomsRoutes from "./routes/symptoms.js"
import medicinesRoutes from "./routes/medicines.js"
import contactsRoutes from "./routes/contacts.js"
import userReflectionsRoutes from "./routes/userReflections.js"

// ADMIN ROUTES
import supportContactsRoutes from "./routes/supportContacts.js"
import resourceCategoriesRoutes from "./routes/resourceCategories.js"
import resourcesRoutes from "./routes/resources.js"
import conditionsRoutes from "./routes/conditions.js"
import whakataukiRoutes from "./routes/whakatauki.js"
import snapshotsRoutes from "./routes/snapshots.js"

const app = express()

app.use(cors())
app.use(express.json())

// DB INIT
let db
try {
  console.log("🔌 Connecting to DB...")
  db = await connectDB()

  console.log("🧱 Running initTables()...")
  await initTables(db)

  console.log("🔥 DB Ready & Tables Loaded")
} catch (err) {
  console.error("❌ DB INIT FAILURE:", err)
}

app.set("db", db)

// =========================
// ROUTES
// =========================
const router = express.Router()

// USER DATA
router.use("/user/goals", goalsRoutes)
router.use("/user/symptoms", symptomsRoutes)
router.use("/user/medicines", medicinesRoutes)
router.use("/user/contacts", contactsRoutes)
router.use("/user/reflections", userReflectionsRoutes)

// ADMIN CONTENT
router.use("/admin/support", supportContactsRoutes)
router.use("/admin/resource-categories", resourceCategoriesRoutes)
router.use("/admin/resources", resourcesRoutes)
router.use("/admin/conditions", conditionsRoutes)
router.use("/admin/whakatauki", whakataukiRoutes)
router.use("/admin/snapshots", snapshotsRoutes)

// Attach router under /api
app.use("/api", router)

// API homepage
app.get("/", (req, res) => {
  res.json({
    message: "Kete of Knowledge API is running 🚀",
    admin: "/api/admin/*",
    user: "/api/user/*",
  })
})

export default app
