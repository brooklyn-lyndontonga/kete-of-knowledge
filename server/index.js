 
/* eslint-disable no-undef */
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { initDB } from "./db/db.js"
import path from "path"

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

// Routes
app.use("/admin", adminRoute)
app.use("/home", homeRoutes)
app.use("/admin/reflection-templates", reflectionTemplatesRoutes)
app.use("/whakatauki", whakataukiRoutes)
app.use("/profile", profileRoutes)
app.use("/upload", uploadRoutes)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")))
app.use("/library", libraryRoutes)
app.use("/symptoms", symptomsRoutes)


// Boot
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 API running at http://0.0.0.0:${PORT}`)
  })
})
