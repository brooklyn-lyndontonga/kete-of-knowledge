import { getDB } from "../db"

export const CONTACT_CATEGORIES = [
  { key: "whanau", label: "Whānau", reo: "Whānau" },
  { key: "provider", label: "Health provider", reo: "Kaiwhakarato hauora" },
  { key: "emergency", label: "Emergency", reo: "Ohotata" },
]

export async function addContact({
  name,
  relationship = "",
  phone = "",
  email = "",
  category = "whanau",
  isEmergency = false,
  notes = "",
}) {
  const db = await getDB()

  const result = await db.runAsync(
    `INSERT INTO contacts (name, relationship, phone, email, category, is_emergency, notes, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      name,
      relationship,
      phone,
      email,
      category,
      isEmergency ? 1 : 0,
      notes,
      new Date().toISOString(),
    ]
  )

  return { id: result.lastInsertRowId, name, phone, category }
}

export async function getContacts() {
  const db = await getDB()
  return db.getAllAsync(
    `SELECT * FROM contacts
     ORDER BY is_emergency DESC, sort_order ASC, name ASC;`
  )
}

export async function getContactsByCategory() {
  const rows = await getContacts()
  const grouped = {}
  for (const { key } of CONTACT_CATEGORIES) grouped[key] = []
  for (const row of rows) {
    const key = grouped[row.category] ? row.category : "whanau"
    grouped[key].push(row)
  }
  return grouped
}

export async function updateContact({ id, ...fields }) {
  const db = await getDB()
  await db.runAsync(
    `UPDATE contacts
     SET name = ?, relationship = ?, phone = ?, email = ?, category = ?, is_emergency = ?, notes = ?
     WHERE id = ?;`,
    [
      fields.name,
      fields.relationship || "",
      fields.phone || "",
      fields.email || "",
      fields.category || "whanau",
      fields.isEmergency ? 1 : 0,
      fields.notes || "",
      id,
    ]
  )
}

export async function deleteContact(id) {
  const db = await getDB()
  await db.runAsync(`DELETE FROM contacts WHERE id = ?;`, [id])
}
