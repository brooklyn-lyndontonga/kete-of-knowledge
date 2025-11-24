export default function snapshotsController(db) {
  return {
    async getAll(req, res) {
      try {
        const rows = await db.all(`SELECT * FROM snapshots`)
        res.json(rows)
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },

    async update(req, res) {
      const { id } = req.params
      const { label, percentage } = req.body

      try {
        await db.run(
          `UPDATE snapshots SET label = ?, percentage = ? WHERE id = ?`,
          [label, percentage, id]
        )
        res.json({ id, label, percentage })
      } catch (err) {
        res.status(500).json({ error: err.message })
      }
    },
  }
}
