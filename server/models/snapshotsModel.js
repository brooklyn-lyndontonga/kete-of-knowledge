export async function getSnapshots(db) {
  return db.all("SELECT * FROM snapshots ORDER BY created_at DESC")
}

export async function addSnapshot(db, { label, percentage, color }) {
  const result = await db.run(
    "INSERT INTO snapshots (label, percentage, color) VALUES (?, ?, ?)",
    [label, percentage, color]
  )

  return { id: result.lastID, label, percentage, color }
}

export async function deleteSnapshot(db, id) {
  await db.run("DELETE FROM snapshots WHERE id = ?", [id])
  return true
}
