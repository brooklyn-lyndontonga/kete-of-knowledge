/* eslint-disable no-undef */
import express from "express"
import { uploadPdf } from "../middleware/upload.js"
import { connectDB } from "../../../db/database.js"

const router = express.Router()

router.get("/", async (_, res) => {
  const db = await connectDB()
  const rows = await db.all("SELECT * FROM resources")
  res.json(rows)
})

router.post(
  "/resources",
  uploadPdf.single("pdf"),
  async (req, res) => {
    const { title, summary, categoryId } = req.body
    const pdfPath = req.file ? `/uploads/pdfs/${req.file.filename}` : null

    const result = await db.run(
      `
      INSERT INTO resources (title, summary, categoryId, pdfPath)
      VALUES (?, ?, ?, ?)
      `,
      [title, summary, categoryId, pdfPath]
    )

    res.json({ id: result.lastID })
  }
)


router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { title, summary, image, categoryId } = req.body
  const db = await connectDB()

  await db.run(
    "UPDATE resources SET title=?, summary=?, image=?, categoryId=? WHERE id=?",
    [title, summary, image, categoryId, id]
  )

  res.json({ success: true })
})

router.delete("/:id", async (req, res) => {
  const db = await connectDB()
  await db.run("DELETE FROM resources WHERE id=?", [req.params.id])
  res.json({ success: true })
})

export default router
