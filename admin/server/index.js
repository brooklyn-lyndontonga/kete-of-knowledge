/* eslint-disable no-unused-vars */
import express from "express"
import cors from "cors"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"

import adminAuthRoutes from "./routes/adminAuth.js"
import resourcesRoutes from "./routes/resources.js"
import resourceCategoriesRoutes from "./routes/resourceCategories.js"
import conditionsRoutes from "./routes/conditions.js"
import whakataukiRoutes from "./routes/whakatauki.js"
import snapshotsRoutes from "./routes/snapshots.js"

const app = express()

const uploadDir = path.resolve("server/uploads/pdfs")
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-")
    cb(null, `${Date.now()}-${safeName}`)
  },
})

const uploadPdf = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new Error("Only PDF files allowed"))
    } else {
      cb(null, true)
    }
  },
})


app.use(cors())
app.use(express.json())

app.use("/api/admin", adminAuthRoutes)

app.use("/uploads", express.static("server/uploads"))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/api/admin/resources", resourcesRoutes)
app.use("/api/admin/resource-categories", resourceCategoriesRoutes)
app.use("/api/admin/conditions", conditionsRoutes)
app.use("/api/admin/whakatauki", whakataukiRoutes)
app.use("/api/admin/snapshots", snapshotsRoutes)

app.get("/", (_, res) => {
  res.send("Kete Admin API running")
})

const PORT = 3000
app.listen(PORT, () =>
  console.log(`🚀 Admin API running on http://localhost:${PORT}`)
)
