import { connectDB } from "../db/init.js"

export async function getMedicines() {
  const db = await connectDB()
  return db.all("SELECT * FROM mymedicines ORDER BY id DESC")
}

export async function addMedicine(data) {
  const db = await connectDB()
  const result = await db.run(
    "INSERT INTO mymedicines (name, dosage, frequency) VALUES (?, ?, ?)",
    [data.name, data.dosage, data.frequency]
  )
  return { id: result.lastID, ...data }
}

export async function deleteMedicine(id) {
  const db = await connectDB()
  await db.run("DELETE FROM mymedicines WHERE id=?", id)
  return true
}

