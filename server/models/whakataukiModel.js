export function getAllWhakatauki(db) {
  return db.all(`SELECT * FROM whakatauki ORDER BY id DESC`)
}

export function createWhakatauki(db, w) {
  return db.run(
    `INSERT INTO whakatauki (text, translation) VALUES (?, ?)`,
    [w.text, w.translation]
  )
}

export function deleteWhakatauki(db, id) {
  return db.run(`DELETE FROM whakatauki WHERE id = ?`, [id])
}
