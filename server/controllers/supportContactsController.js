export default function supportContactsController(db) {
  return {
    async getAll(req, res) {
      try {
        const rows = await db.all(`SELECT * FROM support_contacts`)
        res.json(rows)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async create(req, res) {
      const { name, desc, phone, emoji } = req.body
      try {
        const result = await db.run(
          `INSERT INTO support_contacts (name, desc, phone, emoji)
          VALUES (?, ?, ?, ?)`,
          [name, desc, phone, emoji]
        )
        res.json({ id: result.lastID, name, desc, phone, emoji })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async update(req, res) {
      const { id } = req.params
      const { name, desc, phone, emoji } = req.body

      try {
        await db.run(
          `UPDATE support_contacts
           SET name = ?, desc = ?, phone = ?, emoji = ?
           WHERE id = ?`,
          [name, desc, phone, emoji, id]
        )
        res.json({ id, name, desc, phone, emoji })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async remove(req, res) {
      const { id } = req.params
      try {
        await db.run(`DELETE FROM support_contacts WHERE id = ?`, [id])
        res.json({ success: true })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },
  }
}
