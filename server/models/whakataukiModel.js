export async function getWhakatauki(db) {
  return db.all("SELECT * FROM whakatauki ORDER BY id DESC")
}

export async function addWhakatauki(db, { text, translation }) {
  const result = await db.run(
    "INSERT INTO whakatauki (text, translation) VALUES (?, ?)",
    [text, translation]
  )

  return {
    id: result.lastID,
    text,
    translation,
  }
}

export async function deleteWhakatauki(db, id) {
  await db.run("DELETE FROM whakatauki WHERE id = ?", [id])
  return true
}
