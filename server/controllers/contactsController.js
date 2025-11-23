import {
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
} from "../models/contactsModel.js"

export async function getContacts(req, res) {
  const db = req.app.get("db")

  try {
    const rows = await getAllContacts(db)
    res.json(rows)
  } catch (err) {
    console.error("❌ Error getting contacts:", err)
    res.status(500).json({ error: "Failed to get contacts" })
  }
}

export async function addContact(req, res) {
  const db = req.app.get("db")
  const newContact = req.body

  try {
    const result = await createContact(db, newContact)
    res.json({ message: "Contact added", id: result.lastID })
  } catch (err) {
    console.error("❌ Error adding contact:", err)
    res.status(500).json({ error: "Failed to add contact" })
  }
}

export async function removeContact(req, res) {
  const db = req.app.get("db")
  const { id } = req.params

  try {
    await deleteContact(db, id)
    res.json({ message: "Contact removed" })
  } catch (err) {
    console.error("❌ Error deleting contact:", err)
    res.status(500).json({ error: "Failed to delete contact" })
  }
}

export async function editContact(req, res) {
  const db = req.app.get("db")
  const { id } = req.params
  const updates = req.body

  try {
    await updateContact(db, id, updates)
    res.json({ message: "Contact updated" })
  } catch (err) {
    console.error("❌ Error updating contact:", err)
    res.status(500).json({ error: "Failed to update contact" })
  }
}
