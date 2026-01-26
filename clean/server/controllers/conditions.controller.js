import { getDB } from "../db/index.js"

export async function getAllConditions(req, res) {
  const db = getDB()
  const rows = await db.all(
    `SELECT * FROM conditions ORDER BY id DESC`
  )
  res.json(rows)
}

export async function createCondition(req, res) {
  const { title, summary } = req.body
  const db = getDB()

  const result = await db.run(
    `INSERT INTO conditions (title, summary)
     VALUES (?, ?)`,
    [title, summary]
  )

  res.json({ id: result.lastID, title, summary })
}

export async function updateCondition(req, res) {
  const { id } = req.params
  const { title, summary } = req.body
  const db = getDB()

  await db.run(
    `UPDATE conditions
     SET title=?, summary=?
     WHERE id=?`,
    [title, summary, id]
  )

  res.json({ id, title, summary })
}

export async function deleteCondition(req, res) {
  const { id } = req.params
  const db = getDB()

  await db.run(`DELETE FROM conditions WHERE id=?`, [id])
  res.json({ success: true })
}
