/* eslint-disable no-unused-vars */
import {
  getSupportContacts,
  addSupportContact,
  updateSupportContact,
  deleteSupportContact,
} from "../models/supportContactsModel.js"

export async function listSupportContacts(req, res) {
  try {
    const db = req.app.get("db")
    const contacts = await getSupportContacts(db)
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ error: "Failed to load support contacts" })
  }
}

export async function createSupportContact(req, res) {
  try {
    const db = req.app.get("db")
    const item = await addSupportContact(db, req.body)
    res.json(item)
  } catch {
    res.status(500).json({ error: "Failed to add support contact" })
  }
}

export async function editSupportContact(req, res) {
  try {
    const db = req.app.get("db")
    await updateSupportContact(db, req.params.id, req.body)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: "Failed to update support contact" })
  }
}

export async function removeSupportContact(req, res) {
  try {
    const db = req.app.get("db")
    await deleteSupportContact(db, req.params.id)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: "Failed to delete support contact" })
  }
}
