/* eslint-disable no-undef */
import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4173

// Serve the built assets
app.use(express.static(path.join(__dirname, "dist")))

// SPA fallback for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.listen(PORT, () => {
  console.log(`🌐 Admin dashboard running on port ${PORT}`)
})
