import express from "express"
import {
  getAllConditions,
  createCondition,
  updateCondition,
  deleteCondition,
} from "../controllers/conditions.controller.js"

const router = express.Router()

router.get("/", getAllConditions)
router.post("/", createCondition)
router.put("/:id", updateCondition)
router.delete("/:id", deleteCondition)

export default router
