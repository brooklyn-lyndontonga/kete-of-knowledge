// server/routes/goals.js
import express from "express"
import {
  listGoals,
  createGoal,
  removeGoal,
} from "../controllers/goalsController.js"

const router = express.Router()

router.get("/", listGoals)
router.post("/", createGoal)
router.delete("/:id", removeGoal)

export default router
