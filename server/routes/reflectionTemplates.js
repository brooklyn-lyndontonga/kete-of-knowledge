// server/routes/reflectionTemplates.js
import express from "express"
import {
  listReflectionTemplates,
  getReflectionTemplate,
  addReflectionTemplate,
  editReflectionTemplate,
  removeReflectionTemplate,
} from "../controllers/reflectionTemplatesController.js"

const router = express.Router()

router.get("/", listReflectionTemplates)
router.get("/:id", getReflectionTemplate)
router.post("/", addReflectionTemplate)
router.put("/:id", editReflectionTemplate)
router.delete("/:id", removeReflectionTemplate)

export default router
