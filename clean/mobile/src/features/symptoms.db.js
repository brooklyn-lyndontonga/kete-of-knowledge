import { getDB } from "../db"

// -------------------------
// Add a symptom entry
// -------------------------
export function addSymptom({ symptom, severity = null, notes = "" }) {
  const db = getDB()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO symptoms (symptom, severity, notes)
        VALUES (?, ?, ?)
        `,
        [symptom, severity, notes],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      )
    })
  })
}

// -------------------------
// Get all symptoms
// -------------------------
export function getSymptoms() {
  const db = getDB()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT *
        FROM symptoms
        ORDER BY logged_at DESC
        `,
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      )
    })
  })
}
