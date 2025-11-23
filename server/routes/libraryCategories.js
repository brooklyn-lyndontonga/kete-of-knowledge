import express from "express"
import {
  getCategories,
  addCategory,
  removeCategory,
} from "../controllers/libraryCategoriesController.js"

const router = express.Router()

router.get("/", getCategories)
router.post("/", addCategory)
router.delete("/:id", removeCategory)

export default router
