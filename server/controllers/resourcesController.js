export default function resourcesController(db) {
  return {
    async getAll(req, res) {
      try {
        const rows = await db.all(`
        SELECT resources.*, resource_categories.name AS category_name
        FROM resources
        LEFT JOIN resource_categories ON resources.category_id = resource_categories.id
        `)
        res.json(rows)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async getByCategory(req, res) {
      const { categoryId } = req.params
      try {
        const rows = await db.all(
          `SELECT * FROM resources WHERE category_id = ?`,
          [categoryId]
        )
        res.json(rows)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async create(req, res) {
      const { category_id, title, content, image_url } = req.body

      try {
        const result = await db.run(
          `INSERT INTO resources (category_id, title, content, image_url)
          VALUES (?, ?, ?, ?)`,
          [category_id, title, content, image_url]
        )
        res.json({ id: result.lastID, category_id, title, content, image_url })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async update(req, res) {
      const { id } = req.params
      const { category_id, title, content, image_url } = req.body

      try {
        await db.run(
          `UPDATE resources
           SET category_id = ?, title = ?, content = ?, image_url = ?
           WHERE id = ?`,
          [category_id, title, content, image_url, id]
        )
        res.json({ id, category_id, title, content, image_url })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async remove(req, res) {
      const { id } = req.params
      try {
        await db.run(`DELETE FROM resources WHERE id = ?`, [id])
        res.json({ success: true })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },
  }
}
