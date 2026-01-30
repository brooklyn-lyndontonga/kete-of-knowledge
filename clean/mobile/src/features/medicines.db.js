import { getDB } from "../db"

// -------------------------
// Add medicine
// -------------------------
export function addMedicine({
  name,
  type = "",
  dosage = "",
  notes = "",
}) {
  const db = getDB()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO medicines (name, type, dosage, notes, active)
        VALUES (?, ?, ?, ?, 1)
        `,
        [name, type, dosage, notes],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      )
    })
  })
}

// -------------------------
// Get medicines
// -------------------------
export function getMedicines() {
  const db = getDB()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        SELECT *
        FROM medicines
        ORDER BY active DESC, name ASC
        `,
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      )
    })
  })
}

// -------------------------
// Toggle active
// -------------------------
export function toggleMedicine(id, active) {
  const db = getDB()

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE medicines SET active = ? WHERE id = ?`,
        [active ? 1 : 0, id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      )
    })
  })
}
