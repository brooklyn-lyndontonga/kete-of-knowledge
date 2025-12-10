// server/app.js
import express from "express"
import cors from "cors"
import { connectDB, initTables } from "./db/init.js"

// ROUTERS
import userGoals from "./routes/goals.js"
import userSymptoms from "./routes/symptoms.js"
import userMedicines from "./routes/medicines.js"
import userContacts from "./routes/contacts.js"
import userReflections from "./routes/userReflections.js"

import adminRoutes from "./routes/admin.js"  // ✅ MASTER ADMIN ROUTER

const app = express()

app.use(cors())
app.use(express.json())

// =========================
// DATABASE INIT
// =========================
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
// MAIN API ROUTER
// =========================
const router = express.Router()

// USER ROUTES
router.use("/user/goals", userGoals)
router.use("/user/symptoms", userSymptoms)
router.use("/user/medicines", userMedicines)
router.use("/user/contacts", userContacts)
router.use("/user/reflections", userReflections)

// ADMIN ROUTES
router.use("/admin", adminRoutes)   // ✅ ONLY ONE LINE

app.use("/api", router)

// =========================
// HOME ROUTE
// =========================
app.get("/", (req, res) => {
  res.json({
    message: "Kete of Knowledge API is running 🚀",
    user_routes: "/api/user/*",
    admin_routes: "/api/admin/*",
  })
})

export default app
