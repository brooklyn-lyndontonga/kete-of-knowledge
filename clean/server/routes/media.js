import { Router } from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"

const router = Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const UPLOADS_DIR = path.join(__dirname, "../uploads")

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
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    return res.json({ 
      ok: true, 
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      fileUrl 
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
