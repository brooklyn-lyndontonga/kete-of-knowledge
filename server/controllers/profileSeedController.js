export default function profileSeedsController(db) {
  return {
    async getAll(req, res) {
      try {
        const rows = await db.all(`SELECT * FROM profile_seeds`)
        res.json(rows)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async create(req, res) {
      const { label, value } = req.body
      try {
        const result = await db.run(
          `INSERT INTO profile_seeds (label, value) VALUES (?, ?)`,
          [label, value]
        )
        res.json({ id: result.lastID, label, value })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async update(req, res) {
      const { id } = req.params
      const { label, value } = req.body

      try {
        await db.run(
          `UPDATE profile_seeds SET label = ?, value = ? WHERE id = ?`,
          [label, value, id]
        )
        res.json({ id, label, value })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async remove(req, res) {
      const { id } = req.params
      try {
        await db.run(`DELETE FROM profile_seeds WHERE id = ?`, [id])
        res.json({ success: true })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },
  }
}
