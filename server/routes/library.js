import express from "express"
const router = express.Router()

// GET all resources
router.get("/", async (req, res) => {
  const db = req.app.get("db")
  const rows = await db.all("SELECT * FROM library_resources")
  res.json(rows)
})

// CREATE resource
router.post("/", async (req, res) => {
  const db = req.app.get("db")
  const { category, title, summary, body, tags } = req.body

  await db.run(
    `INSERT INTO library_resources (category, title, summary, body, tags)
     VALUES (?, ?, ?, ?, ?)`,
    [category, title, summary, body, tags]
  )

  res.json({ success: true })
})

// UPDATE resource
router.put("/:id", async (req, res) => {
  const db = req.app.get("db")
  const { id } = req.params
  const { category, title, summary, body, tags } = req.body

  await db.run(
    `UPDATE library_resources
     SET category=?, title=?, summary=?, body=?, tags=?
     WHERE id=?`,
    [category, title, summary, body, tags, id]
  )

  res.json({ success: true })
})

// DELETE resource
router.delete("/:id", async (req, res) => {
  const db = req.app.get("db")
  const { id } = req.params

  await db.run("DELETE FROM library_resources WHERE id=?", [id])
  res.json({ success: true })
})

export default router
