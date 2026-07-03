import { getDB } from "../db"

// Uses the modern expo-sqlite (SDK 51+) API.

// -------------------------
// Create a goal
// -------------------------
export async function addGoal({ title, description = "" }) {
  const db = getDB()

  const result = await db.runAsync(
    `INSERT INTO goals (title, description, active)
     VALUES (?, ?, 1)`,
    [title, description]
  )

  return { id: result.lastInsertRowId }
}

// -------------------------
// Get all goals
// -------------------------
export async function getGoals() {
  const db = getDB()

  return db.getAllAsync(
    `SELECT *
     FROM goals
     ORDER BY created_at DESC`
  )
}

// -------------------------
// Toggle achieved / active
// -------------------------
export async function toggleGoal(id, active) {
  const db = getDB()

  await db.runAsync(
    `UPDATE goals SET active = ? WHERE id = ?`,
    [active ? 1 : 0, id]
  )
}

// -------------------------
// Delete a goal
// -------------------------
export async function deleteGoal(id) {
  const db = getDB()
  await db.runAsync(`DELETE FROM goals WHERE id = ?`, [id])
}
