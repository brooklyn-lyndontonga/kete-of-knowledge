/* eslint-disable no-unused-vars */
// server/controllers/userReflectionsController.js
import {
  getUserReflections,
  createUserReflection,
  deleteUserReflection,
} from "../models/userReflectionsModel.js"

export async function listUserReflections(req, res) {
  try {
    const db = req.app.get("db")
    const reflections = await getUserReflections(db)
    res.json(reflections)
  } catch (err) {
    res.status(500).json({ error: "Failed to get user reflections" })
  }
}

export async function addUserReflection(req, res) {
  try {
    const db = req.app.get("db")
    const { title, story } = req.body

    await createUserReflection(db, { title, story })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to save reflection" })
  }
}

export async function removeUserReflection(req, res) {
  try {
    const db = req.app.get("db")
    await deleteUserReflection(db, req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete reflection" })
  }
}
