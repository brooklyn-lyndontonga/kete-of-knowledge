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

// GET /api/admin/reflection-templates
router.get("/", getAllReflectionTemplates)

// GET /api/admin/reflection-templates/:id
router.get("/:id", getReflectionTemplateById)

// POST /api/admin/reflection-templates
router.post("/", createReflectionTemplate)

// PUT /api/admin/reflection-templates/:id
router.put("/:id", updateReflectionTemplate)

// DELETE /api/admin/reflection-templates/:id
router.delete("/:id", deleteReflectionTemplate)

export default router
