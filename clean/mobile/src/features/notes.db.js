import { openDatabaseAsync } from "expo-sqlite"

let db = null

/**
 * Get or open database (singleton)
 */
async function getDb() {
  if (!db) {
    db = await openDatabaseAsync("app.db")
  }
  return db
}

/**
 * Initialise notes table
 * Call once on app start
 */
export async function initNotesTable() {
  const db = await getDb()

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT
    );
  `)
}

/**
 * Get all notes
 */
export async function getNotes() {
  const db = await getDb()

  const rows = await db.getAllAsync(`
    SELECT * FROM notes
    ORDER BY created_at DESC;
  `)

  return rows
}

/**
 * Add a new note
 */
export async function addNote({ title = "", content }) {
  const db = await getDb()
  const timestamp = new Date().toISOString()

  const result = await db.runAsync(
    `
    INSERT INTO notes (title, content, created_at)
    VALUES (?, ?, ?);
    `,
    [title, content, timestamp]
  )

  return {
    id: result.lastInsertRowId,
    title,
    content,
    created_at: timestamp
  }
}

/**
 * Update an existing note
 */
export async function updateNote({ id, title = "", content }) {
  const db = await getDb()
  const timestamp = new Date().toISOString()

  await db.runAsync(
    `
    UPDATE notes
    SET title = ?, content = ?, updated_at = ?
    WHERE id = ?;
    `,
    [title, content, timestamp, id]
  )

  return {
    id,
    title,
    content,
    updated_at: timestamp
  }
}

/**
 * Delete a note
 */
export async function deleteNote(id) {
  const db = await getDb()

  await db.runAsync(
    `
    DELETE FROM notes
    WHERE id = ?;
    `,
    [id]
  )
}
