import express from "express"
import {
  listResourceCategories,
  getResourceCategory,
  createResourceCategory,
  updateResourceCategoryController,
  deleteResourceCategoryController,
} from "../controllers/resourceCategoriesController.js"

const router = express.Router()

// ----------------------
// RESOURCE CATEGORIES
// ----------------------

// GET /api/library
router.get("/", listResourceCategories)

// GET /api/library/:id
router.get("/:id", getResourceCategory)

// POST /api/library
router.post("/", createResourceCategory)

// PUT /api/library/:id
router.put("/:id", updateResourceCategoryController)

// DELETE /api/library/:id
router.delete("/:id", deleteResourceCategoryController)

export default router
