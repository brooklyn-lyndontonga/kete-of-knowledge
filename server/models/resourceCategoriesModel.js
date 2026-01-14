import { getDB } from "../db/db.js"

export async function listResourceCategories() {
  const db = getDB()
  return db.all("SELECT * FROM resource_categories")
}

export async function getResourceCategory(id) {
  const db = getDB()
  return db.get(
    "SELECT * FROM resource_categories WHERE id = ?",
    [id]
  )
}

export async function createResourceCategory(data) {
  const db = getDB()
  const result = await db.run(
    "INSERT INTO resource_categories (name, description) VALUES (?, ?)",
    [data.name, data.description]
  )
  return { id: result.lastID }
}

export async function updateResourceCategory(id, data) {
  const db = getDB()
  await db.run(
    "UPDATE resource_categories SET name = ?, description = ? WHERE id = ?",
    [data.name, data.description, id]
  )
}

export async function deleteResourceCategory(id) {
  const db = getDB()
  await db.run("DELETE FROM resource_categories WHERE id = ?", [id])
}
