import express from "express"
import { listWhakatauki, dailyWhakatauki } from "../controllers/whakataukiController.js"

const router = express.Router()

router.get("/", listWhakatauki)
router.get("/daily", dailyWhakatauki)

export default router
