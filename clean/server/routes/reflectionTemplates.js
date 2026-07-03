import express from "express"
import {
  getAllTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  restoreTemplate,
} from "../controllers/reflectionTemplates.controller.js"
import { requireAdminRole } from "../middleware/adminAuth.js"
import { requireFields } from "../middleware/validate.js"

const router = express.Router()

router.get("/", getAllTemplates)
router.post("/", requireFields("category", "title", "prompt"), createTemplate)
router.put("/:id", requireFields("category", "title", "prompt"), updateTemplate)
router.delete("/:id", requireAdminRole, deleteTemplate)
router.post("/:id/restore", restoreTemplate)

export default router
