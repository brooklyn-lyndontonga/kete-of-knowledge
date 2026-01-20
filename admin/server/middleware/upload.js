import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads/pdfs")
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const name = file.originalname
      .replace(ext, "")
      .replace(/\s+/g, "-")
      .toLowerCase()

    cb(null, `${name}-${Date.now()}${ext}`)
  },
})

function pdfOnly(req, file, cb) {
  if (file.mimetype !== "application/pdf") {
    cb(new Error("Only PDF files allowed"), false)
  } else {
    cb(null, true)
  }
}

export const uploadPdf = multer({
  storage,
  fileFilter: pdfOnly,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
})
