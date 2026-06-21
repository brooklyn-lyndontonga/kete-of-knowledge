import express from "express"
import {
  getAllSeeds,
  createSeed,
  updateSeed,
  deleteSeed,
  restoreSeed,
} from "../controllers/profileSeeds.controller.js"
import { requireAdminRole } from "../middleware/adminAuth.js"

const router = express.Router()

router.get("/", getAllSeeds)
router.post("/", createSeed)
router.put("/:id", updateSeed)
router.delete("/:id", requireAdminRole, deleteSeed)
router.post("/:id/restore", restoreSeed)

export default router
