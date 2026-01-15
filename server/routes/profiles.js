// server/routes/profiles.js
import express from "express"
import {
  getAllProfiles,
  addProfile,
  editProfile,
  removeProfile,
} from "../controllers/profileController.js/index.js"

const router = express.Router()

router.get("/", getAllProfiles)
router.post("/", addProfile)
router.put("/:id", editProfile)
router.delete("/:id", removeProfile)

export default router
