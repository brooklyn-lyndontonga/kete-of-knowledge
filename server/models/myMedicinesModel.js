// server/models/mymedicinesModel.js
export async function getMedicines(db) {
  return db.all("SELECT * FROM medicines")
}

export async function createMedicine(db, { name, dosage, frequency }) {
  await db.run(
    "INSERT INTO medicines (name, dosage, frequency) VALUES (?, ?, ?)",
    [name, dosage, frequency]
  )
}

export async function updateMedicine(db, id, data) {
  const { name, dosage, frequency } = data
  await db.run(
    "UPDATE medicines SET name=?, dosage=?, frequency=? WHERE id=?",
    [name, dosage, frequency, id]
  )
}

export async function deleteMedicine(db, id) {
  await db.run("DELETE FROM medicines WHERE id=?", [id])
}
