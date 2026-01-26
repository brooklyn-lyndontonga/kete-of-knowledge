import { getDB } from "../db/index.js"

export async function getAllSeeds(req, res) {
  const db = getDB()
  const rows = await db.all(
    `SELECT * FROM profile_seeds ORDER BY id DESC`
  )
  res.json(rows)
}

export async function createSeed(req, res) {
  const { name, value } = req.body
  const db = getDB()

  const result = await db.run(
    `INSERT INTO profile_seeds (name, value)
     VALUES (?, ?)`,
    [name, value]
  )

  res.json({ id: result.lastID, name, value })
}

export async function updateSeed(req, res) {
  const { id } = req.params
  const { name, value } = req.body
  const db = getDB()

  await db.run(
    `UPDATE profile_seeds
     SET name=?, value=?
     WHERE id=?`,
    [name, value, id]
  )

  res.json({ id, name, value })
}

export async function deleteSeed(req, res) {
  const { id } = req.params
  const db = getDB()

  await db.run(`DELETE FROM profile_seeds WHERE id=?`, [id])
  res.json({ success: true })
}
