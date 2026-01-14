/* eslint-disable no-unused-vars */
// server/app.js
import express from "express"
import cors from "cors"
import { connectDB, initTables } from "./db/init.js"
import { setDB } from "./db/db.js"

// USER ROUTES
import userGoals from "./routes/goals.js"
import userSymptoms from "./routes/symptoms.js"
import userMedicines from "./routes/medicines.js"
import userContacts from "./routes/contacts.js"
import userReflections from "./routes/userReflections.js"

// ADMIN ROUTES
import adminRoutes from "./routes/admin.js"

// PHASE 1 ROUTES
import reflectionTemplates from "./routes/reflectionTemplates.js"
import profileSeeds from "./routes/profileSeeds.js"
import conditions from "./routes/conditions.js"
import library from "./routes/library.js"
import whakatauki from "./routes/whakatauki.js" // ✅ ADD THIS

const app = express()

// ----------------------
// CORS
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

// ✅ PUBLIC CONTENT ROUTES (mobile app)
router.use("/whakatauki", whakatauki)
router.use("/reflection-templates", reflectionTemplates)
router.use("/profile-seeds", profileSeeds)
router.use("/conditions", conditions)
router.use("/library", library)

// 🔐 ADMIN ROUTES (admin panel only)
router.use("/admin", adminRoutes)

app.use("/api", router)

// ----------------------
// ROOT
// ----------------------
app.get("/", (req, res) => {
  res.json({
    message: "Kete of Knowledge API is running 🚀",
  })
})

app.use((err, req, res, next) => {
  console.error("❌ API Error:", err)
  res.status(500).json({ error: "Something went wrong." })
})


export default app
