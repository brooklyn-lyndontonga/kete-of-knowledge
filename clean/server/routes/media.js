import { Router } from "express"
import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const router = Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Must match index.js: UPLOADS_DIR env var wins (production persistent
// volume), otherwise <server>/uploads. Absolute either way.
const UPLOADS_DIR =
  process.env.UPLOADS_DIR ||
  (process.env.NODE_ENV === "production"
    ? path.join(__dirname, "../data/uploads")
    : path.join(__dirname, "../uploads"))

fs.mkdirSync(UPLOADS_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR)
  },
  filename: (req, file, cb) => {
    const cleanExt = path.extname(file.originalname).toLowerCase()
    const cleanName = path.basename(file.originalname, cleanExt)
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase()
    cb(null, `${cleanName}-${Date.now()}${cleanExt}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".pdf", ".png", ".jpg", ".jpeg", ".gif", ".mp4", ".mp3", ".wav", ".mov"]
    const ext = path.extname(file.originalname).toLowerCase()
    if (allowedExtensions.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error(`Only document, image, audio, or video files are allowed (${allowedExtensions.join(", ")})`))
    }
  }
})

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file was uploaded." })
  }

  try {
    // Store a RELATIVE path in the DB rather than an absolute URL, so
    // resources survive domain changes (dev → staging → production).
    // The mobile app prefixes this with its configured API root.
    const relativePath = `/uploads/${req.file.filename}`
    const fileUrl = `${req.protocol}://${req.get("host")}${relativePath}`

    return res.json({
      ok: true,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      filePath: relativePath,
      fileUrl,
    })
  } catch (err) {
    console.error("Media upload failed", err)
    return res.status(500).json({ error: "Server error during media upload." })
  }
})

// Error handler for Multer limits/errors
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `File upload error: ${err.message}` })
  }
  if (err) {
    return res.status(400).json({ error: err.message })
  }
  next()
})

export default router
