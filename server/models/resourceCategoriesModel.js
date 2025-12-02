import { connectDB } from "../db/init.js"

export async function getAllCategories() {
  const db = await connectDB()
  return db.all("SELECT * FROM resource_categories ORDER BY id ASC")
}

export async function getCategory(id) {
  const db = await connectDB()
  return db.get("SELECT * FROM resource_categories WHERE id=?", id)
}

export async function addResourceCategory(data) {
  const db = await connectDB()
  const result = await db.run(
    "INSERT INTO resource_categories (name, icon) VALUES (?, ?)",
    [data.name, data.icon]
  )
  return { id: result.lastID, ...data }
}

export async function updateResourceCategory(id, data) {
  const db = await connectDB()
  await db.run(
    "UPDATE resource_categories SET name=?, icon=? WHERE id=?",
    [data.name, data.icon, id]
  )
  return getCategory(id)
}

export async function deleteResourceCategory(id) {
  const db = await connectDB()
  await db.run("DELETE FROM resource_categories WHERE id=?", id)
  return true
}
