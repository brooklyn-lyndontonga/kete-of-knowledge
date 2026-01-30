import { getDB } from "../db"

// -------------------------
// Add checklist
// -------------------------
export function addChecklist({ title }) {
  const db = getDB()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO checklists (title)
        VALUES (?)
        `,
        [title],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      )
    })
  })
}

// -------------------------
// Get checklists
// -------------------------
export function getChecklists() {
  const db = getDB()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT *
        FROM checklists
        ORDER BY id DESC
        `,
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      )
    })
  })
}
