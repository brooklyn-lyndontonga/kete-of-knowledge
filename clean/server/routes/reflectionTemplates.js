import express from "express"
import {
  getAllTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from "../controllers/reflectionTemplates.controller.js"

const router = express.Router()

router.get("/", getAllTemplates)
router.post("/", createTemplate)
router.put("/:id", updateTemplate)
router.delete("/:id", deleteTemplate)

export default router
