import express from "express"
import { getAppReflectionTemplates } from "../../controllers/app/reflectionTemplates.js"

const router = express.Router()

router.get("/", getAppReflectionTemplates)

export default router
