import express from "express"
import {
  getAllWhakatauki,
  createWhakatauki,
  updateWhakatauki,
  deleteWhakatauki,
  restoreWhakatauki,
} from "../controllers/whakatauki.controller.js"
import { requireAdminRole } from "../middleware/adminAuth.js"

const router = express.Router()

router.get("/", getAllWhakatauki)
router.post("/", createWhakatauki)
router.put("/:id", updateWhakatauki)
router.delete("/:id", requireAdminRole, deleteWhakatauki)
router.post("/:id/restore", restoreWhakatauki)

export default router
