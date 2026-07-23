import { getDB } from "../db"

/**
 * Kept for backwards compatibility - table creation now happens
 * centrally in initDB(). This is a no-op.
 */
export async function initNotesTable() {}

export async function getNotes() {
  const db = await getDB()
  return db.getAllAsync(`SELECT * FROM notes ORDER BY created_at DESC;`)
}

export async function addNote({ title = "", content }) {
  const db = await getDB()
  const timestamp = new Date().toISOString()

  const result = await db.runAsync(
    `INSERT INTO notes (title, content, created_at) VALUES (?, ?, ?);`,
    [title, content, timestamp]
  )

  return { id: result.lastInsertRowId, title, content, created_at: timestamp }
}

export async function updateNote({ id, title = "", content }) {
  const db = await getDB()
  const timestamp = new Date().toISOString()

  await db.runAsync(
    `UPDATE notes SET title = ?, content = ?, updated_at = ? WHERE id = ?;`,
    [title, content, timestamp, id]
  )

  return { id, title, content, updated_at: timestamp }
}

export async function deleteNote(id) {
  const db = await getDB()
  await db.runAsync(`DELETE FROM notes WHERE id = ?;`, [id])
}
