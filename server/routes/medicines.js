// server/routes/medicines.js

import { Router } from "express"
import { listMedicines, getSingleMedicine } from "../controllers/medicinesController.js"

const router = Router()

router.get("/", listMedicines)
router.get("/:id", getSingleMedicine)

export default router
