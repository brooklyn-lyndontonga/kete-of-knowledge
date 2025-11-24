export default function reflectionsController(db) {
  return {
    async getAll(req, res) {
      try {
        const rows = await db.all(`SELECT * FROM reflections`)
        res.json(rows)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async create(req, res) {
      const { title, message } = req.body
      try {
        const result = await db.run(
          `INSERT INTO reflections (title, message)
           VALUES (?, ?)`,
          [title, message]
        )
        res.json({ id: result.lastID, title, message })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async update(req, res) {
      const { id } = req.params
      const { title, message } = req.body
      try {
        await db.run(
          `UPDATE reflections SET title = ?, message = ? WHERE id = ?`,
          [title, message, id]
        )
        res.json({ id, title, message })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async remove(req, res) {
      const { id } = req.params
      try {
        await db.run(`DELETE FROM reflections WHERE id = ?`, [id])
        res.json({ success: true })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },
  }
}
