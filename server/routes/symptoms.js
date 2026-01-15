import express from "express"
import {
  listSymptoms,
  createSymptom,
  removeSymptom,
  getLatestSymptom,
} from "../controllers/symptomsController.js"

const router = express.Router()

// ORDER MATTERS
router.get("/latest", getLatestSymptom)
router.get("/", listSymptoms)
router.post("/", createSymptom)
router.delete("/:id", removeSymptom)

export default router
