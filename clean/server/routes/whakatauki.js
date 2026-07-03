import express from "express"
import {
  getAllWhakatauki,
  createWhakatauki,
  updateWhakatauki,
  deleteWhakatauki,
  restoreWhakatauki,
} from "../controllers/whakatauki.controller.js"
import { requireAdminRole } from "../middleware/adminAuth.js"
import { requireFields } from "../middleware/validate.js"

const router = express.Router()

router.get("/", getAllWhakatauki)
router.post("/", requireFields("text"), createWhakatauki)
router.put("/:id", requireFields("text"), updateWhakatauki)
router.delete("/:id", requireAdminRole, deleteWhakatauki)
router.post("/:id/restore", restoreWhakatauki)

export default router
