import express from "express"
import {
  getCurrentProfile,
  updateCurrentProfile,
} from "../controllers/profileController.js"

const router = express.Router()

router.get("/", getCurrentProfile)
router.put("/", updateCurrentProfile)

export default router
