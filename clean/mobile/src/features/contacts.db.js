import {
  insertRecord,
  listRecords,
  softDeleteRecord,
  updateRecord,
} from "../db/records"

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
  return insertRecord("contacts", {
    name,
    relationship,
    phone,
    email,
    category,
    is_emergency: isEmergency ? 1 : 0,
    notes,
  })
}

export async function getContacts() {
  return listRecords("contacts", {
    orderBy: "is_emergency DESC, sort_order ASC, name ASC",
  })
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
  return updateRecord("contacts", id, {
    name: fields.name,
    relationship: fields.relationship || "",
    phone: fields.phone || "",
    email: fields.email || "",
    category: fields.category || "whanau",
    is_emergency: fields.isEmergency ? 1 : 0,
    notes: fields.notes || "",
  })
}

export async function deleteContact(id) {
  return softDeleteRecord("contacts", id)
}
