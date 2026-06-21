import express from "express"
import {
  getAllTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  restoreTemplate,
} from "../controllers/reflectionTemplates.controller.js"
import { requireAdminRole } from "../middleware/adminAuth.js"

const router = express.Router()

router.get("/", getAllTemplates)
router.post("/", createTemplate)
router.put("/:id", updateTemplate)
router.delete("/:id", requireAdminRole, deleteTemplate)
router.post("/:id/restore", restoreTemplate)

export default router
