import {
  listResourceCategories,
  getResourceCategory,
  createResourceCategory,
  updateResourceCategory,
  deleteResourceCategory,
} from "../../../shared/models/resourceCategoriesModel.js"

export async function listResourceCategoriesController(req, res) {
  try {
    const items = await listResourceCategories()
    res.json(items)
  } catch (err) {
    console.error("Error loading resource categories:", err)
    res.status(500).json({ error: "Failed to load resource categories" })
  }
}

export async function getResourceCategoryController(req, res) {
  try {
    const item = await getResourceCategory(req.params.id)
    res.json(item)
  } catch (err) {
    console.error("Error fetching category:", err)
    res.status(500).json({ error: "Failed to get resource category" })
  }
}

export async function createResourceCategoryController(req, res) {
  try {
    const result = await createResourceCategory(req.body)
    res.json(result)
  } catch (err) {
    console.error("Error creating resource category:", err)
    res.status(500).json({ error: "Failed to create category" })
  }
}

export async function updateResourceCategoryController(req, res) {
  try {
    await updateResourceCategory(req.params.id, req.body)
    res.json({ success: true })
  } catch (err) {
    console.error("Error updating resource category:", err)
    res.status(500).json({ error: "Failed to update category" })
  }
}

export async function deleteResourceCategoryController(req, res) {
  try {
    await deleteResourceCategory(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error("Error deleting resource category:", err)
    res.status(500).json({ error: "Failed to delete category" })
  }
}
