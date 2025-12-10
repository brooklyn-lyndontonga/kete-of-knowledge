import express from "express"
import {
  listProfileSeeds,
  createProfileSeed,
  updateProfileSeed,
  deleteProfileSeed,
} from "../controllers/profileSeedsController.js"

const router = express.Router()

router.get("/", listProfileSeeds)
router.post("/", createProfileSeed)
router.put("/:id", updateProfileSeed)
router.delete("/:id", deleteProfileSeed)

export default router
