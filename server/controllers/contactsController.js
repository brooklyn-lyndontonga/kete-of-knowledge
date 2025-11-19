// server/controllers/contactsController.js
import {
  getContacts,
  addContact,
  deleteContact,
} from "../models/contactsModel.js"

export async function listContacts(req, res) {
  try {
    const rows = await getContacts()
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function createContact(req, res) {
  try {
    const contact = await addContact(req.body)
    res.json(contact)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function removeContact(req, res) {
  try {
    await deleteContact(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
