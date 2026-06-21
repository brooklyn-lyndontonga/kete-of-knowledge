import express from "express"
import {
  getAllConditions,
  createCondition,
  updateCondition,
  deleteCondition,
  restoreCondition,
} from "../controllers/conditions.controller.js"
import { requireAdminRole } from "../middleware/adminAuth.js"

const router = express.Router()

router.get("/", getAllConditions)
router.post("/", createCondition)
router.put("/:id", updateCondition)
router.delete("/:id", requireAdminRole, deleteCondition)
router.post("/:id/restore", restoreCondition)

export default router
