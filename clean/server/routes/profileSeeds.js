import express from "express"
import {
  getAllSeeds,
  createSeed,
  updateSeed,
  deleteSeed,
} from "../controllers/profileSeeds.controller.js"

const router = express.Router()

router.get("/", getAllSeeds)
router.post("/", createSeed)
router.put("/:id", updateSeed)
router.delete("/:id", deleteSeed)

export default router
