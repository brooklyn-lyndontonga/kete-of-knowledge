import { getDB } from "../db"

// Now uses the SHARED app database (kete.db) instead of opening its own
// separate "app.db" file. Previously notes lived in a second database that
// the schema in src/db/schema.js knew nothing about.
//
// ⚠️ Migration note: notes saved by earlier beta builds (stored in the old
// app.db file) will not appear after this change. If you have beta testers
// with real notes, tell them before shipping, or write a one-off copy step.

// -------------------------
// Get all notes
// -------------------------
export async function getNotes() {
  const db = getDB()

  return db.getAllAsync(
    `SELECT * FROM notes ORDER BY created_at DESC`
  )
}

// -------------------------
// Add a new note
// -------------------------
export async function addNote({ title = "", content }) {
  const db = getDB()
  const timestamp = new Date().toISOString()

  const result = await db.runAsync(
    `INSERT INTO notes (title, content, created_at)
     VALUES (?, ?, ?)`,
    [title, content, timestamp]
  )

  return {
    id: result.lastInsertRowId,
    title,
    content,
    created_at: timestamp,
  }
}

// -------------------------
// Update an existing note
// -------------------------
export async function updateNote({ id, title = "", content }) {
  const db = getDB()
  const timestamp = new Date().toISOString()

  await db.runAsync(
    `UPDATE notes
     SET title = ?, content = ?, updated_at = ?
     WHERE id = ?`,
    [title, content, timestamp, id]
  )

  return { id, title, content, updated_at: timestamp }
}

// -------------------------
// Delete a note
// -------------------------
export async function deleteNote(id) {
  const db = getDB()
  await db.runAsync(`DELETE FROM notes WHERE id = ?`, [id])
}
