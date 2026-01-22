export async function listSnapshots(req, res) {
  try {
    const db = req.app.get("db")
    const snapshots = await db.all(
      "SELECT * FROM snapshots ORDER BY created_at DESC"
    )
    res.json(snapshots)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to load snapshots" })
  }
}

export async function createSnapshot(req, res) {
  try {
    const db = req.app.get("db")
    const { title, content } = req.body

    await db.run(
      "INSERT INTO snapshots (title, content) VALUES (?, ?)",
      [title, content]
    )

    res.status(201).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to create snapshot" })
  }
}

export async function deleteSnapshot(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params

    await db.run("DELETE FROM snapshots WHERE id = ?", [id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete snapshot" })
  }
}
