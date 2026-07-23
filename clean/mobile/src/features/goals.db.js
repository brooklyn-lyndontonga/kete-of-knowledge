import { getDB } from "../db"

export async function addGoal({ title, description = "" }) {
  const db = await getDB()
  const createdAt = new Date().toISOString()

  const result = await db.runAsync(
    `INSERT INTO goals (title, description, active, created_at)
     VALUES (?, ?, 1, ?);`,
    [title, description, createdAt]
  )

  return { id: result.lastInsertRowId, title, description, active: 1, created_at: createdAt }
}

export async function getGoals() {
  const db = await getDB()
  return db.getAllAsync(`SELECT * FROM goals ORDER BY created_at DESC;`)
}

export async function toggleGoal(id, active) {
  const db = await getDB()
  await db.runAsync(`UPDATE goals SET active = ? WHERE id = ?;`, [
    active ? 1 : 0,
    id,
  ])
}

export async function deleteGoal(id) {
  const db = await getDB()
  await db.runAsync(`DELETE FROM goals WHERE id = ?;`, [id])
}
