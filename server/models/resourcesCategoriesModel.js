export async function getResourceCategories(db) {
  return db.all("SELECT * FROM resource_categories ORDER BY name ASC")
}

export async function addResourceCategory(db, { name, icon }) {
  const result = await db.run(
    "INSERT INTO resource_categories (name, icon) VALUES (?, ?)",
    [name, icon]
  )

  return { id: result.lastID, name, icon }
}

export async function deleteResourceCategory(db, id) {
  await db.run("DELETE FROM resource_categories WHERE id = ?", [id])
  return true
}
