export function getAllCategories(db) {
  return db.all(`SELECT * FROM library_categories ORDER BY id DESC`)
}

export function createCategory(db, c) {
  return db.run(
    `INSERT INTO library_categories (name, icon, color) VALUES (?, ?, ?)`,
    [c.name, c.icon, c.color]
  )
}

export function deleteCategory(db, id) {
  return db.run(`DELETE FROM library_categories WHERE id = ?`, [id])
}
