import { getDB } from "../db"

// Uses the modern expo-sqlite (SDK 51+) API.
// The legacy db.transaction(tx => tx.executeSql(...)) API was removed
// in expo-sqlite v14+ and throws "db.transaction is not a function".

// -------------------------
// Add symptom
// -------------------------
export async function addSymptom({ symptom, severity = null, notes = "", tags = "" }) {
  const db = getDB()

  const result = await db.runAsync(
    `INSERT INTO symptoms (symptom, severity, notes, tags)
     VALUES (?, ?, ?, ?)`,
    [symptom, severity, notes, tags]
  )

  return { id: result.lastInsertRowId }
}

// -------------------------
// Get all symptoms
// -------------------------
export async function getSymptoms() {
  const db = getDB()

  return db.getAllAsync(
    `SELECT *
     FROM symptoms
     ORDER BY logged_at DESC`
  )
}

// -------------------------
// Delete a symptom entry
// -------------------------
export async function deleteSymptom(id) {
  const db = getDB()
  await db.runAsync(`DELETE FROM symptoms WHERE id = ?`, [id])
}
