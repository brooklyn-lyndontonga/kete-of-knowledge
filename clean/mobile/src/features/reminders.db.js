import { getDB } from "../db"

// Uses the modern expo-sqlite (SDK 51+) API.

// -------------------------
// Add reminder
// -------------------------
export async function addReminder({ title, schedule = "", notes = "" }) {
  const db = getDB()

  const result = await db.runAsync(
    `INSERT INTO reminders (title, schedule, notes, active)
     VALUES (?, ?, ?, 1)`,
    [title, schedule, notes]
  )

  return { id: result.lastInsertRowId }
}

// -------------------------
// Get reminders
// -------------------------
export async function getReminders() {
  const db = getDB()

  return db.getAllAsync(
    `SELECT *
     FROM reminders
     ORDER BY active DESC, id DESC`
  )
}

// -------------------------
// Toggle active
// -------------------------
export async function toggleReminder(id, active) {
  const db = getDB()

  await db.runAsync(
    `UPDATE reminders SET active = ? WHERE id = ?`,
    [active ? 1 : 0, id]
  )
}

// -------------------------
// Delete a reminder
// -------------------------
export async function deleteReminder(id) {
  const db = getDB()
  await db.runAsync(`DELETE FROM reminders WHERE id = ?`, [id])
}
