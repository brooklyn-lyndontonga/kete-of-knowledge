// server/routes/goals.js
import express from "express"
import {
  getAllGoals,
  addGoal,
  editGoal,
  removeGoal,
} from "../controllers/goalsController.js"

const router = express.Router()

router.get("/", getAllGoals)
router.post("/", addGoal)
router.put("/:id", editGoal)
router.delete("/:id", removeGoal)

export default router
