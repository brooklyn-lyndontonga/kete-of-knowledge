import { getDB } from "../db/db.js"

export async function getAllCategories() {
  const db = getDB()
  return db.all("SELECT * FROM resource_categories ORDER BY id ASC")
}

export async function getCategory(id) {
  const db = getDB()
  return db.get(
    "SELECT * FROM resource_categories WHERE id = ?",
    id
  )
}

export async function addResourceCategory(data) {
  const db = getDB()
  const result = await db.run(
    "INSERT INTO resource_categories (name, icon) VALUES (?, ?)",
    [data.name, data.icon]
  )
  return { id: result.lastID, ...data }
}

export async function updateResourceCategory(id, data) {
  const db = getDB()
  await db.run(
    "UPDATE resource_categories SET name=?, icon=? WHERE id=?",
    [data.name, data.icon, id]
  )
  return getCategory(id)
}

export async function deleteResourceCategory(id) {
  const db = getDB()
  await db.run(
    "DELETE FROM resource_categories WHERE id=?",
    id
  )
  return true
}
