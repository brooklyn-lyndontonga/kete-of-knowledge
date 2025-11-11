// server/routes/symptoms.js
import express from "express"
import {
  getAllSymptoms,
  addSymptom,
  editSymptom,
  removeSymptom,
} from "../controllers/symptomsController.js"

const router = express.Router()

router.get("/", getAllSymptoms)
router.post("/", addSymptom)
router.put("/:id", editSymptom)
router.delete("/:id", removeSymptom)

export default router
