// server/app.js
import express from "express"
import cors from "cors"

import { connectDB, initTables } from "./db/init.js"

// USER ROUTES
import goalsRoutes from "./routes/goals.js"
import symptomsRoutes from "./routes/symptoms.js"
import myMedicinesRoutes from "./routes/medicines.js"
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

// USER-GENERATED CONTENT
app.use("/goals", goalsRoutes)
app.use("/symptoms", symptomsRoutes)
app.use("/mymedicines", myMedicinesRoutes)
app.use("/contacts", contactsRoutes)
app.use("/reflections", userReflectionsRoutes)

// ADMIN (STATIC CONTENT)
app.use("/admin/support", supportContactsRoutes)
app.use("/admin/resource-categories", resourceCategoriesRoutes)
app.use("/admin/resources", resourcesRoutes)
app.use("/admin/conditions", conditionsRoutes)
app.use("/admin/whakatauki", whakataukiRoutes)
app.use("/admin/snapshots", snapshotsRoutes)

export default app
