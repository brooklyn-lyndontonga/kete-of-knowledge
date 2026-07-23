import {
  insertRecord,
  listRecords,
  softDeleteRecord,
  updateRecord,
} from "../db/records"

/** Table creation now happens centrally in initDB(). Kept as a no-op. */
export async function initNotesTable() {}

export async function getNotes() {
  return listRecords("notes", { orderBy: "created_at DESC" })
}

export async function addNote({ title = "", content }) {
  return insertRecord("notes", {
    title,
    content,
    created_at: new Date().toISOString(),
  })
}

export async function updateNote({ id, title = "", content }) {
  return updateRecord("notes", id, { title, content })
}

export async function deleteNote(id) {
  return softDeleteRecord("notes", id)
}
