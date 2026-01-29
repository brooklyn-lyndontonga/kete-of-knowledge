import express from "express"
import { getAppConditions } from "../../controllers/app/conditions.js"

const router = express.Router()

router.get("/", getAppConditions)

export default router
