import { connectDB } from "../db/init.js"

export async function getSymptoms() {
  const db = await connectDB()
  return db.all("SELECT * FROM symptoms ORDER BY id DESC")
}

export async function addSymptom(data) {
  const db = await connectDB()
  const result = await db.run(
    "INSERT INTO symptoms (date, symptom, severity, notes) VALUES (?, ?, ?, ?)",
    [data.date, data.symptom, data.severity, data.notes]
  )
  return { id: result.lastID, ...data }
}

export async function deleteSymptom(id) {
  const db = await connectDB()
  await db.run("DELETE FROM symptoms WHERE id=?", id)
  return true
}
