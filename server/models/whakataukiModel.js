import { connectDB } from "../db/init.js"

export async function getAll() {
  const db = await connectDB()
  return db.all("SELECT * FROM whakatauki")
}

export async function getRandom() {
  const db = await connectDB()
  return db.get("SELECT * FROM whakatauki ORDER BY RANDOM() LIMIT 1")
}

export async function create(data) {
  const db = await connectDB()
  const result = await db.run(
    "INSERT INTO whakatauki (text, translation) VALUES (?, ?)",
    [data.text, data.translation]
  )
  return { id: result.lastID, ...data }
}

export async function update(id, data) {
  const db = await connectDB()
  await db.run(
    "UPDATE whakatauki SET text=?, translation=? WHERE id=?",
    [data.text, data.translation, id]
  )
  return get(id)
}

export async function remove(id) {
  const db = await connectDB()
  return db.run("DELETE FROM whakatauki WHERE id=?", id)
}

export async function get(id) {
  const db = await connectDB()
  return db.get("SELECT * FROM whakatauki WHERE id=?", id)
}
