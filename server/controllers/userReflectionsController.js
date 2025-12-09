// server/controllers/userReflectionsController.js
import {
  listUserReflections,
  createUserReflection,
  deleteUserReflection
} from "../models/userReflectionsModel.js"

export async function listUserEntries(req, res) {
  try {
    const db = req.app.get("db")
    const items = await listUserReflections(db)
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function createUserEntry(req, res) {
  try {
    const db = req.app.get("db")
    const newItem = await createUserReflection(db, req.body)
    res.json(newItem)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function removeUserEntry(req, res) {
  try {
    const db = req.app.get("db")
    await deleteUserReflection(db, req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
