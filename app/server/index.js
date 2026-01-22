import express from "express"
import cors from "cors"
import { initDB } from "../../db/index.js"

import homeRoutes from "./routes/home.js"
import profileRoutes from "./routes/profile.js"
import profilesRoutes from "./routes/profiles.js"
import goalsRoutes from "./routes/goals.js"
import symptomsRoutes from "./routes/symptoms.js"
import snapshotsRoutes from "./routes/snapshots.js"
import reflectionsRoutes from "./routes/reflections.js"
import userReflectionsRoutes from "./routes/userReflections.js"
import contactsRoutes from "./routes/contacts.js"

const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())

async function boot() {
  // 🔑 Initialise shared DB
  const db = await initDB()

  // 🔑 Make DB available to controllers
  app.set("db", db)

  // App-facing routes ONLY
  app.use("/home", homeRoutes)
  app.use("/profile", profileRoutes)
  app.use("/profiles", profilesRoutes)
  app.use("/goals", goalsRoutes)
  app.use("/symptoms", symptomsRoutes)
  app.use("/snapshots", snapshotsRoutes)
  app.use("/reflections", reflectionsRoutes)
  app.use("/user-reflections", userReflectionsRoutes)
  app.use("/contacts", contactsRoutes)

  app.listen(PORT, () => {
    console.log(`📱 App API running at http://localhost:${PORT}`)
  })
}

boot()
