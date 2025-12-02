import express from "express"
import {
  listResourceCategories,
  getResourceCategory,
  createResourceCategory,
  updateResourceCategoryController,
  deleteResourceCategoryController,
} from "../controllers/resourceCategoriesController.js"

const router = express.Router()

router.get("/", listResourceCategories)
router.get("/:id", getResourceCategory)
router.post("/", createResourceCategory)
router.put("/:id", updateResourceCategoryController)
router.delete("/:id", deleteResourceCategoryController)

export default router
