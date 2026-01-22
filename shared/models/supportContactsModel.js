export async function getSupportContacts(db) {
  return db.all("SELECT * FROM support_contacts ORDER BY id ASC")
}

export async function addSupportContact(db, { name, desc, phone, emoji }) {
  const result = await db.run(
    "INSERT INTO support_contacts (name, desc, phone, emoji) VALUES (?, ?, ?, ?)",
    [name, desc, phone, emoji]
  )

  return { id: result.lastID, name, desc, phone, emoji }
}

export async function updateSupportContact(db, id, { name, desc, phone, emoji }) {
  await db.run(
    "UPDATE support_contacts SET name = ?, desc = ?, phone = ?, emoji = ? WHERE id = ?",
    [name, desc, phone, emoji, id]
  )
  return true
}

export async function deleteSupportContact(db, id) {
  await db.run("DELETE FROM support_contacts WHERE id = ?", [id])
  return true
}
