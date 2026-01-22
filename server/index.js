/* eslint-disable no-undef */
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

import { initDB } from "../db/database.js"

// routes
import adminRoute from "./routes/admin.js"
import homeRoutes from "./routes/home.js"
import reflectionTemplatesRoutes from "./routes/reflectionTemplates.js"
import profileRoutes from "./routes/profile.js"
import uploadRoutes from "./routes/upload.js"
import whakataukiRoutes from "./routes/whakatauki.js"
import libraryRoutes from "./routes/library.js"
import symptomsRoutes from "./routes/symptoms.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// routes
app.use("/api/admin", adminRoute)
app.use("/api/home", homeRoutes)
app.use("/api/admin/reflection-templates", reflectionTemplatesRoutes)
app.use("/api/whakatauki", whakataukiRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))
app.use("/api/library", libraryRoutes)
app.use("/api/symptoms", symptomsRoutes)

// boot
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 API running at http://localhost:${PORT}`)
  })
})
