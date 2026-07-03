import express from "express"
import {
  getAllConditions,
  createCondition,
  updateCondition,
  deleteCondition,
  restoreCondition,
} from "../controllers/conditions.controller.js"
import { requireAdminRole } from "../middleware/adminAuth.js"
import { requireFields } from "../middleware/validate.js"

const router = express.Router()

router.get("/", getAllConditions)
router.post("/", requireFields("title"), createCondition)
router.put("/:id", requireFields("title"), updateCondition)
router.delete("/:id", requireAdminRole, deleteCondition)
router.post("/:id/restore", restoreCondition)

export default router
