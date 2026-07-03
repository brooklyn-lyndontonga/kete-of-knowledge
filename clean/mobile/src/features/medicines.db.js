import { getDB } from "../db"

// Uses the modern expo-sqlite (SDK 51+) API.

// -------------------------
// Add medicine
// -------------------------
export async function addMedicine({ name, type = "", dosage = "", notes = "" }) {
  const db = getDB()

  const result = await db.runAsync(
    `INSERT INTO medicines (name, type, dosage, notes, active)
     VALUES (?, ?, ?, ?, 1)`,
    [name, type, dosage, notes]
  )

  return { id: result.lastInsertRowId }
}

// -------------------------
// Get medicines
// -------------------------
export async function getMedicines() {
  const db = getDB()

  return db.getAllAsync(
    `SELECT *
     FROM medicines
     ORDER BY active DESC, name ASC`
  )
}

// -------------------------
// Toggle active
// -------------------------
export async function toggleMedicine(id, active) {
  const db = getDB()

  await db.runAsync(
    `UPDATE medicines SET active = ? WHERE id = ?`,
    [active ? 1 : 0, id]
  )
}

// -------------------------
// Delete a medicine
// -------------------------
export async function deleteMedicine(id) {
  const db = getDB()
  await db.runAsync(`DELETE FROM medicines WHERE id = ?`, [id])
}
