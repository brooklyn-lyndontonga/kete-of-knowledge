// server/models/myMedicinesModel.js
import { connectDB } from "../db/init.js"

export async function getMedicines() {
  const db = await connectDB()
  return db.all("SELECT * FROM mymedicines ORDER BY id DESC")
}

export async function addMedicine({ name, dosage, frequency }) {
  const db = await connectDB()
  const result = await db.run(
    "INSERT INTO mymedicines (name, dosage, frequency) VALUES (?, ?, ?)",
    [name, dosage, frequency]
  )
  return { id: result.lastID, name, dosage, frequency }
}

export async function deleteMedicine(id) {
  const db = await connectDB()
  await db.run("DELETE FROM mymedicines WHERE id = ?", id)
  return true
}
