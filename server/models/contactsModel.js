export async function getAllContacts(db) {
  return db.all(`SELECT * FROM contacts ORDER BY id DESC`)
}

export async function createContact(db, contact) {
  const { name, phone, relationship } = contact

  return db.run(
    `INSERT INTO contacts (name, phone, relationship)
     VALUES (?, ?, ?)`,
    [name, phone, relationship]
  )
}

export async function deleteContact(db, id) {
  return db.run(`DELETE FROM contacts WHERE id = ?`, [id])
}

export async function updateContact(db, id, updates) {
  const { name, phone, relationship } = updates

  return db.run(
    `UPDATE contacts
     SET name = ?, phone = ?, relationship = ?
     WHERE id = ?`,
    [name, phone, relationship, id]
  )
}
