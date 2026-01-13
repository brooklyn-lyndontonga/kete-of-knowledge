export async function listResourceCategories(db) {
  return db.all("SELECT * FROM resource_categories")
}

export async function getResourceCategory(db, id) {
  return db.get(
    "SELECT * FROM resource_categories WHERE id = ?",
    [id]
  )
}

export async function createResourceCategory(db, data) {
  const result = await db.run(
    "INSERT INTO resource_categories (name, description) VALUES (?, ?)",
    [data.name, data.description]
  )
  return { id: result.lastID }
}

export async function updateResourceCategory(db, id, data) {
  await db.run(
    "UPDATE resource_categories SET name = ?, description = ? WHERE id = ?",
    [data.name, data.description, id]
  )
}

export async function deleteResourceCategory(db, id) {
  await db.run("DELETE FROM resource_categories WHERE id = ?", [id])
}
