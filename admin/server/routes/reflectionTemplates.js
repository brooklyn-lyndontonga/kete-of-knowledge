import express from "express"
import {
  listTemplates,
  createTemplate,
  getLatestTemplate,
} from "../controllers/reflectionTemplatesController.js"

const router = express.Router()

router.get("/", listTemplates)
router.get("/latest", getLatestTemplate)
router.post("/", createTemplate)

export default router
