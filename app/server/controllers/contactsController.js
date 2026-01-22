 
import {
  getContacts,
  addContact,
  deleteContact,
} from "../../../shared/models/contactsModel.js"

export async function listContacts(req, res) {
  try {
    const db = req.app.get("db")
    const contacts = await getContacts(db)
    res.json(contacts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to load contacts" })
  }
}

export async function createContact(req, res) {
  try {
    const db = req.app.get("db")
    const contact = await addContact(db, req.body)
    res.status(201).json(contact)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to add contact" })
  }
}

export async function removeContact(req, res) {
  try {
    const db = req.app.get("db")
    await deleteContact(db, req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete contact" })
  }
}
