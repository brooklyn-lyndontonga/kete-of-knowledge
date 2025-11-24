export default function resourceCategoriesController(db) {
  return {
    async getAll(req, res) {
      try {
        const rows = await db.all(`SELECT * FROM resource_categories`)
        res.json(rows)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async create(req, res) {
      const { name, icon } = req.body
      try {
        const result = await db.run(
          `INSERT INTO resource_categories (name, icon) VALUES (?, ?)`,
          [name, icon]
        )
        res.json({ id: result.lastID, name, icon })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async update(req, res) {
      const { id } = req.params
      const { name, icon } = req.body
      try {
        await db.run(
          `UPDATE resource_categories SET name = ?, icon = ? WHERE id = ?`,
          [name, icon, id]
        )
        res.json({ id, name, icon })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async remove(req, res) {
      const { id } = req.params
      try {
        await db.run(`DELETE FROM resource_categories WHERE id = ?`, [id])
        res.json({ success: true })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },
  }
}
