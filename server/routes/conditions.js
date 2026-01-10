// server/routes/conditions.js
import express from "express"
import {
  getAllConditions,
  getConditionById,
  createCondition,
  updateCondition,
  deleteCondition,
} from "../controllers/conditionsController.js"

const router = express.Router()

router.get("/", getAllConditions)
router.get("/:id", getConditionById)
router.post("/", createCondition)
router.put("/:id", updateCondition)
router.delete("/:id", deleteCondition)

export default router
