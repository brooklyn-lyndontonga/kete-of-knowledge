import {
  getResourceCategories,
  addResourceCategory,
  deleteResourceCategory,
} from "../models/resourceCategoriesModel.js"

export async function listResourceCategories(req, res) {
  try {
    const db = req.app.get("db")
    const data = await getResourceCategories(db)
    res.json(data)
  } catch {
    res.status(500).json({ error: "Failed to load resource categories" })
  }
}

export async function createResourceCategory(req, res) {
  try {
    const db = req.app.get("db")
    const category = await addResourceCategory(db, req.body)
    res.json(category)
  } catch {
    res.status(500).json({ error: "Failed to add resource category" })
  }
}

export async function removeResourceCategory(req, res) {
  try {
    const db = req.app.get("db")
    await deleteResourceCategory(db, req.params.id)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: "Failed to delete resource category" })
  }
}
