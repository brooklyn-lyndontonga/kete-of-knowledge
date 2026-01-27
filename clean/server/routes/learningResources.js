import express from "express"
import {
  getAllLearningResources,
  createLearningResource,
  updateLearningResource,
  deleteLearningResource,
} from "../controllers/learningResources.controller.js"

const router = express.Router()

router.get("/", getAllLearningResources)
router.post("/", createLearningResource)
router.put("/:id", updateLearningResource)
router.delete("/:id", deleteLearningResource)

export default router
