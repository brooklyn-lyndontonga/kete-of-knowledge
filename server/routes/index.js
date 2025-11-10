import { Router } from "express"
import profiles from "./profiles.js"
import symptoms from "./symptoms.js"
import goals from "./goals.js"

const router = Router()
router.use("/profiles", profiles)
router.use("/symptoms", symptoms)
router.use("/goals", goals)
export default router
