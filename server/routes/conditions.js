// server/routes/conditions.js

import { Router } from "express"
import { listConditions, getSingleCondition } from "../controllers/conditionsController.js"

const router = Router()

router.get("/", listConditions)
router.get("/:id", getSingleCondition)

export default router
