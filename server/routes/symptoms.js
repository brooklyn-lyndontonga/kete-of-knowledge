import express from "express"
import {
  listSymptoms,
  createSymptom,
  removeSymptom,
} from "../controllers/symptomsController.js"

const router = express.Router()

router.get("/", listSymptoms)
router.post("/", createSymptom)
router.delete("/:id", removeSymptom)

export default router
