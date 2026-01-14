// server/controllers/resourceCategoriesController.js

import {
  listResourceCategories,
  getResourceCategory,
  createResourceCategory,
  updateResourceCategory,
  deleteResourceCategory,
} from "../models/resourceCategoriesModel.js"

// GET /api/library
export async function listResourceCategoriesController(req, res) {
  try {
    const db = req.app.get("db")
    const items = await listResourceCategories(db)
    res.json(items)
  } catch (err) {
    console.error("Error loading resource categories:", err)
    res.status(500).json({ error: "Failed to load resource categories" })
  }
}

// GET /api/library/:id
export async function getResourceCategoryController(req, res) {
  try {
    const db = req.app.get("db")
    const item = await getResourceCategory(db, req.params.id)
    res.json(item)
  } catch (err) {
    console.error("Error fetching category:", err)
    res.status(500).json({ error: "Failed to get resource category" })
  }
}

// POST /api/library
export async function createResourceCategoryController(req, res) {
  try {
    const db = req.app.get("db")
    const result = await createResourceCategory(db, req.body)
    res.json(result)
  } catch (err) {
    console.error("Error creating resource category:", err)
    res.status(500).json({ error: "Failed to create category" })
  }
}

// PUT /api/library/:id
export async function updateResourceCategoryController(req, res) {
  try {
    const db = req.app.get("db")
    await updateResourceCategory(db, req.params.id, req.body)
    res.json({ success: true })
  } catch (err) {
    console.error("Error updating resource category:", err)
    res.status(500).json({ error: "Failed to update category" })
  }
}

// DELETE /api/library/:id
export async function deleteResourceCategoryController(req, res) {
  try {
    const db = req.app.get("db")
    await deleteResourceCategory(db, req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error("Error deleting resource category:", err)
    res.status(500).json({ error: "Failed to delete category" })
  }
}
