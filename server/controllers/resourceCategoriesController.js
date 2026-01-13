
import {
  listResourceCategories as listResourceCategoriesModel,
  getResourceCategory as getResourceCategoryModel,
  createResourceCategory as createResourceCategoryModel,
  updateResourceCategory as updateResourceCategoryModel,
  deleteResourceCategory as deleteResourceCategoryModel,
} from "../models/resourceCategoriesModel.js"


// GET /api/library
export async function listResourceCategories(req, res) {
  try {
    const db = req.app.get("db")
    const items = await listResourceCategoriesModel(db)
    res.json(items)
  } catch (err) {
    console.error("Error loading resource categories:", err)
    res.status(500).json({ error: "Failed to load resource categories" })
  }
}

// GET /api/library/:id
export async function getResourceCategory(req, res) {
  try {
    const db = req.app.get("db")
    const item = await getResourceCategoryModel(db, req.params.id)
    res.json(item)
  } catch (err) {
    console.error("Error fetching category:", err)
    res.status(500).json({ error: "Failed to get resource category" })
  }
}

// POST /api/library
export async function createResourceCategory(req, res) {
  try {
    const db = req.app.get("db")
    const result = await createResourceCategoryModel(db, req.body)
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
    await updateResourceCategoryModel(db, req.params.id, req.body)
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
    await deleteResourceCategoryModel(db, req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error("Error deleting resource category:", err)
    res.status(500).json({ error: "Failed to delete category" })
  }
}
