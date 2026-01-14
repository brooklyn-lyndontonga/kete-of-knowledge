import { getDB } from "../db/db.js"

// Get ALL resources (optional, admin use later)
export async function getResources() {
  const db = getDB()

  return db.all(`
    SELECT r.*, c.name AS category_name
    FROM resources r
    LEFT JOIN resource_categories c ON r.category_id = c.id
    ORDER BY r.id DESC
  `)
}

// ✅ THIS IS THE ONE YOUR APP USES
export async function getResourcesByCategory(categoryId) {
  const db = getDB()

  return db.all(
    "SELECT * FROM resources WHERE category_id = ?",
    [categoryId]
  )
}

export async function addResource({ category_id, title, content, image_url }) {
  const db = getDB()

  const result = await db.run(
    "INSERT INTO resources (category_id, title, content, image_url) VALUES (?, ?, ?, ?)",
    [category_id, title, content, image_url]
  )

  return {
    id: result.lastID,
    category_id,
    title,
    content,
    image_url,
  }
}

export async function deleteResource(id) {
  const db = getDB()

  await db.run("DELETE FROM resources WHERE id = ?", [id])
  return true
}
