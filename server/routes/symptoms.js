import express from "express"
import {
  listSymptoms,
  createSymptom,
  removeSymptom,
  summary,
} from "../controllers/symptomsController.js"

const router = express.Router()

router.get("/", listSymptoms)
router.get("/summary", summary)
router.post("/", createSymptom)
router.delete("/:id", removeSymptom)

export default router
