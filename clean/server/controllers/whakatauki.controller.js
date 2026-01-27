import { getDB } from "../db/index.js"

export async function getAllWhakatauki(req, res) {
  try {
    const db = await getDB()   // 👈 THIS MUST BE AWAITED
    const rows = await db.all(
      "SELECT * FROM whakatauki ORDER BY id ASC"
    )
    res.json(rows)
  } catch (err) {
    console.error("❌ getAllWhakatauki error:", err)
    res.status(500).json({ error: "Failed to fetch whakatauki" })
  }
}

export async function createWhakatauki(req, res) {
  const { text, translation, theme, source } = req.body
  const db = getDB()

  const result = await db.run(
    `INSERT INTO whakatauki (text, translation, theme, source)
     VALUES (?, ?, ?, ?)`,
    [text, translation, theme, source]
  )

  res.json({ id: result.lastID, text, translation, theme, source })
}

export async function updateWhakatauki(req, res) {
  const { id } = req.params
  const { text, translation, theme, source } = req.body
  const db = getDB()

  await db.run(
    `UPDATE whakatauki
     SET text=?, translation=?, theme=?, source=?
     WHERE id=?`,
    [text, translation, theme, source, id]
  )

  res.json({ id, text, translation, theme, source })
}

export async function deleteWhakatauki(req, res) {
  const { id } = req.params
  const db = getDB()

  await db.run(`DELETE FROM whakatauki WHERE id=?`, [id])
  res.json({ success: true })
}
