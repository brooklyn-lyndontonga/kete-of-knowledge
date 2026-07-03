import express from "express"
import {
  getAllLearningResources,
  createLearningResource,
  updateLearningResource,
  deleteLearningResource,
  restoreLearningResource,
} from "../controllers/learningResources.controller.js"
import { requireAdminRole } from "../middleware/adminAuth.js"
import { requireFields } from "../middleware/validate.js"

const router = express.Router()

router.get("/", getAllLearningResources)
router.post("/", requireFields("title"), createLearningResource)
router.put("/:id", requireFields("title"), updateLearningResource)
router.delete("/:id", requireAdminRole, deleteLearningResource)
router.post("/:id/restore", restoreLearningResource)

export default router
