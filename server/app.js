// server/app.js
import express from "express"
import cors from "cors"
import { connectDB, initTables } from "./db/init.js"
import { setDB } from "./db/db.js"

// ROUTERS (existing user/admin routes)
import userGoals from "./routes/goals.js"
import userSymptoms from "./routes/symptoms.js"
import userMedicines from "./routes/medicines.js"
import userContacts from "./routes/contacts.js"
import userReflections from "./routes/userReflections.js"
import adminRoutes from "./routes/admin.js"

// ROUTERS (new Phase 1 routes)
import reflectionTemplates from "./routes/reflectionTemplates.js"
import profileSeeds from "./routes/profileSeeds.js"
import conditions from "./routes/conditions.js"
import library from "./routes/library.js"

const app = express()

// ----------------------
// CORS MUST BE HERE ONLY
// ----------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://kofk-admin-production.up.railway.app",
    ],
    methods: "GET,POST,PUT,DELETE",
  })
)

app.use(express.json())

// ----------------------
// DATABASE INIT
// ----------------------
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

setDB(db)

// ----------------------
// MAIN API ROUTER
// ----------------------
const router = express.Router()

// USER ROUTES
router.use("/user/goals", userGoals)
router.use("/user/symptoms", userSymptoms)
router.use("/user/medicines", userMedicines)
router.use("/user/contacts", userContacts)
router.use("/user/reflections", userReflections)

// ADMIN ROUTES
router.use("/admin", adminRoutes)

// NEW PHASE 1 ROUTES
router.use("/reflection-templates", reflectionTemplates)
router.use("/profile-seeds", profileSeeds)
router.use("/conditions", conditions)
router.use("/library", library)

app.use("/api", router)

// ----------------------
// ROOT
// ----------------------
app.get("/", (req, res) => {
  res.json({
    message: "Kete of Knowledge API is running 🚀",
    user_routes: "/api/user/*",
    admin_routes: "/api/admin/*",
  })
})

export default app
