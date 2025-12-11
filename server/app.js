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

import adminRoutes from "./routes/admin.js"

const app = express()

// ----------------------
// CORS MUST BE HERE ONLY
// ----------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://kofk-admin-production.up.railway.app"
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

app.set("db", db)

// ----------------------
// MAIN API ROUTER
// ----------------------
const router = express.Router()

router.use("/user/goals", userGoals)
router.use("/user/symptoms", userSymptoms)
router.use("/user/medicines", userMedicines)
router.use("/user/contacts", userContacts)
router.use("/user/reflections", userReflections)

// ADMIN ROUTES
router.use("/admin", adminRoutes)

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
