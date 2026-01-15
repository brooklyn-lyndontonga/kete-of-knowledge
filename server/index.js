/* eslint-disable no-undef */
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { initDB } from "./db/db.js"

import adminRoute from "./routes/admin.js"
import profileRoutes from "./routes/profile.js"
import symptomsRoutes from "./routes/symptoms.js"
import reflectionTemplatesRoutes from "./routes/reflectionTemplates.js"
import libraryRoutes from "./routes/library.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Routes
app.use("/profile", profileRoutes)
app.use("/symptoms", symptomsRoutes)
app.use("/admin/reflection-templates", reflectionTemplatesRoutes)
app.use("/library", libraryRoutes)
app.use("/admin", adminRoute)

// Boot
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 API running at http://0.0.0.0:${PORT}`)
  })
})
