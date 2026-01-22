import express from "express"
import {
  listResourceCategoriesController,
} from "../controllers/resourceCategoriesController.js"
import {
  listResourcesByCategory,
} from "../controllers/libraryResourcesController.js"

const router = express.Router()

// Categories
router.get("/", listResourceCategoriesController)

// Resources inside category
router.get("/:id/resources", listResourcesByCategory)

export default router
