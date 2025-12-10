import express from "express"
import {
  listConditions,
  createCondition,
  deleteCondition,   // ✅ FIXED
} from "../controllers/conditionsController.js"

const router = express.Router()

router.get("/", listConditions)
router.post("/", createCondition)
router.delete("/:id", deleteCondition)  // ✅ FIXED

export default router
