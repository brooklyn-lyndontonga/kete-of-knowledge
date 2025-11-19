// server/routes/index.js

import { Router } from "express"
import symptomsRoutes from "./symptoms.js"
import goalsRoutes from "./goals.js"
import myMedicinesRoutes from "./myMedicines.js"
import profilesRoutes from "./profiles.js"

const router = Router()

router.use("/symptoms", symptomsRoutes)
router.use("/goals", goalsRoutes)
router.use("/mymedicines", myMedicinesRoutes)
router.use("/profiles", profilesRoutes)

export default router
