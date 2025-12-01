// server/routes/resourceCategories.js
import express from "express"
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/resourceCategoriesController.js"

const router = express.Router()

router.get("/", listCategories)
router.post("/", createCategory)
router.put("/:id", updateCategory)
router.delete("/:id", deleteCategory)

export default router
