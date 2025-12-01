// server/routes/index.js

import { Router } from 'express'
import symptomsRoutes from './symptoms.js'
import goalsRoutes from './goals.js'
import myMedicinesRoutes from './medicines.js/index.js'
import profilesRoutes from './profiles.js'
import medicinesRoutes from './medicines.js'
import conditionsRoutes from './conditions.js'
import contactsRoutes from './contacts.js'

const router = Router()

router.use('/symptoms', symptomsRoutes)
router.use('/goals', goalsRoutes)
router.use('/mymedicines', myMedicinesRoutes)
router.use('/profiles', profilesRoutes)
router.use('/medicines', medicinesRoutes)
router.use('/conditions', conditionsRoutes)
router.use('/contacts', contactsRoutes)

export default router
