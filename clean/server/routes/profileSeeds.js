import express from "express"
import {
  getAllSeeds,
  createSeed,
  updateSeed,
  deleteSeed,
  restoreSeed,
} from "../controllers/profileSeeds.controller.js"
import { requireAdminRole } from "../middleware/adminAuth.js"
import { requireFields } from "../middleware/validate.js"

const router = express.Router()

router.get("/", getAllSeeds)
router.post("/", requireFields("name", "value"), createSeed)
router.put("/:id", requireFields("name", "value"), updateSeed)
router.delete("/:id", requireAdminRole, deleteSeed)
router.post("/:id/restore", restoreSeed)

export default router
