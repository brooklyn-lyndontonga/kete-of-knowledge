// server/routes/profileSeeds.js
import express from "express"
import {
  getAllProfileSeeds,
  getProfileSeedById,
  createProfileSeed,
  updateProfileSeed,
  deleteProfileSeed,
} from "../controllers/profileSeedsController.js"

const router = express.Router()

router.get("/", getAllProfileSeeds)
router.get("/:id", getProfileSeedById)
router.post("/", createProfileSeed)
router.put("/:id", updateProfileSeed)
router.delete("/:id", deleteProfileSeed)

export default router
