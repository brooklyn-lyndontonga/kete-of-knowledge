import { getDB } from "../db"

// -------------------------
// Create a goal
// -------------------------
export function addGoal({ title, description = "" }) {
  const db = getDB()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO goals (title, description, active)
        VALUES (?, ?, 1)
        `,
        [title, description],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      )
    })
  })
}

// -------------------------
// Get all goals
// -------------------------
export function getGoals() {
  const db = getDB()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT *
        FROM goals
        ORDER BY created_at DESC
        `,
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      )
    })
  })
}

// -------------------------
// Toggle achieved / active
// -------------------------
export function toggleGoal(id, active) {
  const db = getDB()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        UPDATE goals
        SET active = ?
        WHERE id = ?
        `,
        [active ? 1 : 0, id],
        () => resolve(),
        (_, error) => reject(error)
      )
    })
  })
}
