import express from "express"
import multer from "multer"
import path from "path"

const router = express.Router()

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `profile-${Date.now()}${path.extname(file.originalname)}`)
  },
})

const upload = multer({ storage })

router.post("/profile-image", upload.single("image"), (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`
  res.json({ imageUrl })
})

export default router
