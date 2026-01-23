import express from "express"
import cors from "cors"
import { initDB } from "../../db/index.js"

import adminAuthRoutes from "./routes/adminAuth.js"
import conditionsRoutes from "./routes/conditions.js"
// etc…

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// 🚀 INIT DB FIRST
const db = await initDB()
app.set("db", db)

// ROUTES
app.use("/api/admin", adminAuthRoutes)
app.use("/api/admin/conditions", conditionsRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Admin API running at http://localhost:${PORT}`)
})
