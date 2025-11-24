export default function conditionsController(db) {
  return {
    async getAll(req, res) {
      try {
        const rows = await db.all(`SELECT * FROM conditions`)
        res.json(rows)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async create(req, res) {
      const { name, description, symptoms, treatments } = req.body
      try {
        const result = await db.run(
          `INSERT INTO conditions (name, description, symptoms, treatments)
           VALUES (?, ?, ?, ?)`,
          [name, description, symptoms, treatments]
        )
        res.json({
          id: result.lastID,
          name,
          description,
          symptoms,
          treatments,
        })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async update(req, res) {
      const { id } = req.params
      const { name, description, symptoms, treatments } = req.body

      try {
        await db.run(
          `UPDATE conditions SET
            name = ?, description = ?, symptoms = ?, treatments = ?
           WHERE id = ?`,
          [name, description, symptoms, treatments, id]
        )
        res.json({ id, name, description, symptoms, treatments })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async remove(req, res) {
      const { id } = req.params
      try {
        await db.run(`DELETE FROM conditions WHERE id = ?`, [id])
        res.json({ success: true })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },
  }
}
