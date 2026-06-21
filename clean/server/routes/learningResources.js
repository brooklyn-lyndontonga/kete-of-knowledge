import express from "express"
import {
  getAllLearningResources,
  createLearningResource,
  updateLearningResource,
  deleteLearningResource,
  restoreLearningResource,
} from "../controllers/learningResources.controller.js"
import { requireAdminRole } from "../middleware/adminAuth.js"

const router = express.Router()

router.get("/", getAllLearningResources)
router.post("/", createLearningResource)
router.put("/:id", updateLearningResource)
router.delete("/:id", requireAdminRole, deleteLearningResource)
router.post("/:id/restore", restoreLearningResource)

export default router
