export function getResourcesByCategory(db, categoryId) {
  return db.all(
    `SELECT * FROM library_resources WHERE category_id = ?`,
    [categoryId]
  )
}

export function createResource(db, r) {
  return db.run(
    `INSERT INTO library_resources (category_id, title, content)
     VALUES (?, ?, ?)`,
    [r.category_id, r.title, r.content]
  )
}

export function deleteResource(db, id) {
  return db.run(`DELETE FROM library_resources WHERE id = ?`, [id])
}
