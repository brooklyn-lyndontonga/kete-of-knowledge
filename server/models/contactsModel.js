// server/models/contactsModel.js
import { connectDB } from "../db/init.js"

export async function getContacts() {
  const db = await connectDB()
  return db.all("SELECT * FROM contacts ORDER BY id DESC")
}

export async function addContact({ name, phone, notes }) {
  const db = await connectDB()
  const result = await db.run(
    "INSERT INTO contacts (name, phone, notes) VALUES (?, ?, ?)",
    [name, phone, notes]
  )
  return { id: result.lastID, name, phone, notes }
}

export async function deleteContact(id) {
  const db = await connectDB()
  await db.run("DELETE FROM contacts WHERE id = ?", id)
  return true
}
