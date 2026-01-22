/* eslint-disable no-undef */
export async function getMedicines(db) {
  return db.all("SELECT * FROM mymedicines ORDER BY id DESC")
}

export async function addMedicine(db, { name, dosage, frequency }) {
  const result = await db.run(
    "INSERT INTO mymedicines (name, dosage, frequency) VALUES (?, ?, ?)",
    [name, dosage, frequency]
  )

  return {
    id: result.lastID,
    name,
    dosage,
    frequency,
  }
}

export async function deleteMedicine(db, id) {
  await db.run("DELETE FROM mymedicines WHERE id = ?", [id])
  return true
}

export async function getActiveMedicinesCount(userId) {
  const db = getDB()

  const result = await db.get(
    `
    SELECT COUNT(*) as count
    FROM medicines
    WHERE user_id = ? AND active = 1
    `,
    [userId]
  )

  return result.count
}
