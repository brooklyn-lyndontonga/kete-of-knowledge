// server/routes/reflectionTemplates.js
import express from "express"
import {
  getAllReflectionTemplates,
  getReflectionTemplateById,
  createReflectionTemplate,
  updateReflectionTemplate,
  deleteReflectionTemplate,
} from "../controllers/reflectionTemplatesController.js"

const router = express.Router()

router.get("/", getAllReflectionTemplates)
router.get("/:id", getReflectionTemplateById)
router.post("/", createReflectionTemplate)
router.put("/:id", updateReflectionTemplate)
router.delete("/:id", deleteReflectionTemplate)

export default router
