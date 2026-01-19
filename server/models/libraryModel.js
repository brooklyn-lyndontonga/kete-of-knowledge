import { getDB } from "../db/db.js"

export async function getAllResources() {
  const db = await getDB()
  return db.all("SELECT * FROM resources")
}

export async function getResourceById(id) {
  const db = await getDB()
  return db.get("SELECT * FROM resources WHERE id = ?", id)
}

export async function createResource(data) {
  const db = await getDB()
  const { category_id, title, content, image_url } = data

  const result = await db.run(
    "INSERT INTO resources (category_id, title, content, image_url) VALUES (?, ?, ?, ?)",
    [category_id, title, content, image_url]
  )

  return { id: result.lastID, ...data }
}

export async function updateResource(id, data) {
  const db = await getDB()
  const { category_id, title, content, image_url } = data

  await db.run(
    "UPDATE resources SET category_id=?, title=?, content=?, image_url=? WHERE id=?",
    [category_id, title, content, image_url, id]
  )

  return getResourceById(id)
}

export async function deleteResource(id) {
  const db = await getDB()
  return db.run("DELETE FROM resources WHERE id = ?", id)
}
