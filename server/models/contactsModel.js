export async function getContacts(db) {
  return db.all("SELECT * FROM contacts ORDER BY id DESC")
}

export async function addContact(db, { name, phone, relationship }) {
  const result = await db.run(
    "INSERT INTO contacts (name, phone, relationship) VALUES (?, ?, ?)",
    [name, phone, relationship]
  )
  return { id: result.lastID, name, phone, relationship }
}

export async function deleteContact(db, id) {
  await db.run("DELETE FROM contacts WHERE id = ?", [id])
  return true
}
