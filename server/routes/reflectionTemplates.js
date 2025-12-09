// server/routes/reflectionTemplates.js
import express from "express"
import {
  listTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  removeTemplate
} from "../controllers/reflectionTemplatesController.js"

const router = express.Router()

router.get("/", listTemplates)
router.get("/:id", getTemplate)
router.post("/", createTemplate)
router.put("/:id", updateTemplate)
router.delete("/:id", removeTemplate)

export default router
