import express from "express"
import {
  listResources,
  listResourcesByCategory,
  createResource,
  removeResource,
} from "../controllers/resourcesController.js"

const router = express.Router()

router.get("/", listResources)
router.get("/category/:category_id", listResourcesByCategory)
router.post("/", createResource)
router.delete("/:id", removeResource)

export default router
