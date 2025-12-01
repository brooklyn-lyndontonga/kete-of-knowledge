import {
  getUserReflections,
  addUserReflection,
  deleteUserReflection,
} from "../models/userReflectionsModel.js"

export async function listUserReflections(req, res) {
  try {
    const db = req.app.get("db")
    const data = await getUserReflections(db)
    res.json(data)
  } catch (err) {
    console.error("Error loading reflections:", err)
    res.status(500).json({ error: "Failed to load reflections" })
  }
}

export async function createUserReflection(req, res) {
  try {
    const db = req.app.get("db")
    const item = await addUserReflection(db, req.body)
    res.json(item)
  } catch (err) {
    console.error("Error creating reflection:", err)
    res.status(500).json({ error: "Failed to add reflection" })
  }
}

export async function removeUserReflection(req, res) {
  try {
    const db = req.app.get("db")
    await deleteUserReflection(db, req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error("Error deleting reflection:", err)
    res.status(500).json({ error: "Failed to delete reflection" })
  }
}
