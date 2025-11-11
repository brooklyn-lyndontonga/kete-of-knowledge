import express from "express"
import profilesRouter from "./profiles.js"
import goalsRouter from "./goals.js"
import medicinesRouter from "./myMedicines.js"

const router = express.Router()

router.use("/profiles", profilesRouter)
router.use("/goals", goalsRouter)
router.use("/mymedicines", medicinesRouter)

export default router
