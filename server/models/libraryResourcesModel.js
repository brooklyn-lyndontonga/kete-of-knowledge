export async function getResources(db) {
  return db.all(`
    SELECT r.*, c.name AS category_name
    FROM resources r
    LEFT JOIN resource_categories c ON r.category_id = c.id
    ORDER BY r.id DESC
  `)
}

export async function getResourcesByCategory(db, category_id) {
  return db.all(
    "SELECT * FROM resources WHERE category_id = ?",
    [category_id]
  )
}

export async function createResource(db, { category_id, title, content, image_url }) {
  const result = await db.run(
    "INSERT INTO resources (category_id, title, content, image_url) VALUES (?, ?, ?, ?)",
    [category_id, title, content, image_url]
  )

  return { id: result.lastID }
}

export async function deleteResource(db, id) {
  await db.run("DELETE FROM resources WHERE id = ?", [id])
}
