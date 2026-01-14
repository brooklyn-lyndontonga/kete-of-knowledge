import express from "express"
import {
  listResourceCategoriesController,
  getResourceCategoryController,
  createResourceCategoryController,
  updateResourceCategoryController,
  deleteResourceCategoryController,
} from "../controllers/resourceCategoriesController.js"

import { listResourcesByCategory } from "../controllers/libraryResourcesController.js"

const router = express.Router()

// Categories
router.get("/", listResourceCategoriesController)
router.get("/:id", getResourceCategoryController)

// Resources under category
router.get("/:id/resources", listResourcesByCategory)

// Admin
router.post("/", createResourceCategoryController)
router.put("/:id", updateResourceCategoryController)
router.delete("/:id", deleteResourceCategoryController)

export default router
