// server/routes/profiles.js
import express from "express"
import {
  getAllProfiles,
  addProfile,
  editProfile,
  removeProfile,
} from "../controllers/profilesController.js"

const router = express.Router()

router.get("/", getAllProfiles)
router.post("/", addProfile)
router.put("/:id", editProfile)
router.delete("/:id", removeProfile)

export default router
