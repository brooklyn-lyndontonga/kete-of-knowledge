// server/app.js
import express from "express"
import cors from "cors"

import { connectDB, initTables } from "./db/init.js"

// ROUTES
import goalsRoutes from "./routes/goals.js"
import symptomsRoutes from "./routes/symptoms.js"
import myMedicinesRoutes from "./routes/myMedicines.js"

const app = express()

app.use(cors())
app.use(express.json())

// 🟢 INIT DB + TABLES
const db = await connectDB()
await initTables(db)

// 🛣 ROUTES
app.use("/goals", goalsRoutes)
app.use("/symptoms", symptomsRoutes)
app.use("/mymedicines", myMedicinesRoutes)

export default app
