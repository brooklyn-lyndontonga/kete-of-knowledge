// server/routes/symptoms.js

import { Router } from "express"
import {
  listSymptoms,
  createSymptom,
  removeSymptom,
  symptomSummary
} from "../controllers/symptomsController.js"

const router = Router()

router.get("/", listSymptoms)
router.post("/", createSymptom)
router.delete("/:id", removeSymptom)

// Summary endpoint
router.get("/summary", symptomSummary)

export default router
