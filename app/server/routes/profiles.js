import express from "express"
import {
  getProfiles,
  createProfile,
  updateProfile,
  removeProfile,
} from "../controllers/profileController.js"

const router = express.Router()

router.get("/", getProfiles)
router.post("/", createProfile)
router.put("/:id", updateProfile)
router.delete("/:id", removeProfile)

export default router
