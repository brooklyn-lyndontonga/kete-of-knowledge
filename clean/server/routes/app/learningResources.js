import express from "express"
import { getAppLearningResources } from "../../controllers/app/learningResources.js"

const router = express.Router()

router.get("/", getAppLearningResources)

export default router
