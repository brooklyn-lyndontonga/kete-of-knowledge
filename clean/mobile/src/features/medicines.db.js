import { getDB } from "../db"

export async function addMedicine({ name, type = "", dosage = "", notes = "" }) {
  const db = await getDB()
  const createdAt = new Date().toISOString()

  const result = await db.runAsync(
    `INSERT INTO medicines (name, type, dosage, notes, active, created_at)
     VALUES (?, ?, ?, ?, 1, ?);`,
    [name, type, dosage, notes, createdAt]
  )

  return { id: result.lastInsertRowId, name, type, dosage, notes, active: 1 }
}

export async function getMedicines() {
  const db = await getDB()
  return db.getAllAsync(
    `SELECT * FROM medicines ORDER BY active DESC, name ASC;`
  )
}

export async function updateMedicine({ id, name, type = "", dosage = "", notes = "" }) {
  const db = await getDB()
  await db.runAsync(
    `UPDATE medicines SET name = ?, type = ?, dosage = ?, notes = ? WHERE id = ?;`,
    [name, type, dosage, notes, id]
  )
}

export async function toggleMedicine(id, active) {
  const db = await getDB()
  await db.runAsync(`UPDATE medicines SET active = ? WHERE id = ?;`, [
    active ? 1 : 0,
    id,
  ])
}

export async function deleteMedicine(id) {
  const db = await getDB()
  await db.runAsync(`DELETE FROM medicines WHERE id = ?;`, [id])
}
