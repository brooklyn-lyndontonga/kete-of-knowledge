import express from "express"
import {
  listConditions,
  createCondition,
  removeCondition,
} from "../controllers/conditionsController.js"

const router = express.Router()

router.get("/", listConditions)
router.post("/", createCondition)
router.delete("/:id", removeCondition)

export default router
