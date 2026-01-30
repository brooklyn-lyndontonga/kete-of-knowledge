import { getDB } from "../db"

// -------------------------
// Add reminder
// -------------------------
export function addReminder({
  title,
  schedule = "",
  notes = "",
}) {
  const db = getDB()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO reminders (title, schedule, notes, active)
        VALUES (?, ?, ?, 1)
        `,
        [title, schedule, notes],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      )
    })
  })
}

// -------------------------
// Get reminders
// -------------------------
export function getReminders() {
  const db = getDB()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT *
        FROM reminders
        ORDER BY active DESC, id DESC
        `,
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      )
    })
  })
}
