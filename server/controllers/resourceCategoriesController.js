import {
  getAllCategories,
  getCategory,
  addResourceCategory,
  updateResourceCategory,
  deleteResourceCategory,
} from "../models/resourceCategoriesModel.js"

// GET /api/resource-categories
export async function listResourceCategories(req, res) {
  try {
    const items = await getAllCategories()
    res.json(items)
  } catch (err) {
    console.error("Error loading resource categories:", err)
    res.status(500).json({ error: "Failed to load resource categories" })
  }
}

// GET /api/resource-categories/:id
export async function getResourceCategory(req, res) {
  try {
    const item = await getCategory(req.params.id)
    res.json(item)
  } catch (err) {
    console.error("Error fetching category:", err)
    res.status(500).json({ error: "Failed to get resource category" })
  }
}

// POST /api/resource-categories
export async function createResourceCategory(req, res) {
  try {
    const item = await addResourceCategory(req.body)
    res.json(item)
  } catch (err) {
    console.error("Error creating resource category:", err)
    res.status(500).json({ error: "Failed to create category" })
  }
}

// PUT /api/resource-categories/:id
export async function updateResourceCategoryController(req, res) {
  try {
    const item = await updateResourceCategory(req.params.id, req.body)
    res.json(item)
  } catch (err) {
    console.error("Error updating resource category:", err)
    res.status(500).json({ error: "Failed to update category" })
  }
}

// DELETE /api/resource-categories/:id
export async function deleteResourceCategoryController(req, res) {
  try {
    await deleteResourceCategory(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error("Error deleting resource category:", err)
    res.status(500).json({ error: "Failed to delete category" })
  }
}
