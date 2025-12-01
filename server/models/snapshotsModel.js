import { connectDB } from "../db/init.js"

export async function getLatest() {
  const db = await connectDB()
  return db.get("SELECT * FROM snapshots ORDER BY id DESC LIMIT 1")
}

export async function getAll() {
  const db = await connectDB()
  return db.all("SELECT * FROM snapshots")
}

export async function create(data) {
  const db = await connectDB()
  const result = await db.run(
    "INSERT INTO snapshots (label, percentage) VALUES (?, ?)",
    [data.label, data.percentage]
  )
  return { id: result.lastID, ...data }
}

export async function update(id, data) {
  const db = await connectDB()
  await db.run(
    "UPDATE snapshots SET label=?, percentage=? WHERE id=?",
    [data.label, data.percentage, id]
  )
  return get(id)
}

export async function remove(id) {
  const db = await connectDB()
  return db.run("DELETE FROM snapshots WHERE id=?", id)
}

export async function get(id) {
  const db = await connectDB()
  return db.get("SELECT * FROM snapshots WHERE id=?", id)
}
