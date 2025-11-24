import express from "express"
const router = express.Router()

// GET all
router.get("/", async (req, res) => {
  const db = req.app.get("db")
  const items = await db.all("SELECT * FROM whakatauki")
  res.json(items)
})

// CREATE
router.post("/", async (req, res) => {
  const db = req.app.get("db")
  const { maori, english, context } = req.body

  await db.run(
    "INSERT INTO whakatauki (maori, english, context) VALUES (?, ?, ?)",
    [maori, english, context]
  )

  res.json({ success: true })
})

// UPDATE
router.put("/:id", async (req, res) => {
  const db = req.app.get("db")
  const { id } = req.params
  const { maori, english, context } = req.body

  await db.run(
    "UPDATE whakatauki SET maori=?, english=?, context=? WHERE id=?",
    [maori, english, context, id]
  )

  res.json({ success: true })
})

// DELETE
router.delete("/:id", async (req, res) => {
  const db = req.app.get("db")
  const { id } = req.params

  await db.run("DELETE FROM whakatauki WHERE id=?", [id])
  res.json({ success: true })
})

export default router
