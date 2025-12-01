import { connectDB } from "../db/init.js"

export async function getLatest() {
  const db = await connectDB()
  return db.get("SELECT * FROM reflections ORDER BY id DESC LIMIT 1")
}

export async function getAll() {
  const db = await connectDB()
  return db.all("SELECT * FROM reflections")
}

export async function create(data) {
  const db = await connectDB()
  const result = await db.run(
    "INSERT INTO reflections (title, message) VALUES (?, ?)",
    [data.title, data.message]
  )
  return { id: result.lastID, ...data }
}

export async function update(id, data) {
  const db = await connectDB()
  await db.run(
    "UPDATE reflections SET title=?, message=? WHERE id=?",
    [data.title, data.message, id]
  )
  return get(id)
}

export async function remove(id) {
  const db = await connectDB()
  return db.run("DELETE FROM reflections WHERE id=?", id)
}

export async function get(id) {
  const db = await connectDB()
  return db.get("SELECT * FROM reflections WHERE id=?", id)
}
