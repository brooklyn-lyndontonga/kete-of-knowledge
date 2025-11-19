// server/app.js
import express from "express"
import cors from "cors"

import { connectDB, initTables } from "./db/init.js"

// ROUTES
import goalsRoutes from "./routes/goals.js"
import symptomsRoutes from "./routes/symptoms.js"
import myMedicinesRoutes from "./routes/myMedicines.js"
import contactsRoutes from "./routes/contacts.js"

const app = express()

app.use(cors())
app.use(express.json())

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

// ROUTES
app.use("/goals", goalsRoutes)
app.use("/symptoms", symptomsRoutes)
app.use("/mymedicines", myMedicinesRoutes)
app.use("/contacts", contactsRoutes)

export default app
