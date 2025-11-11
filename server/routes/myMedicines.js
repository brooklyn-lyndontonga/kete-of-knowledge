// server/routes/mymedicines.js
import express from "express"
import {
  getAllMedicines,
  addMedicine,
  editMedicine,
  removeMedicine,
} from "../controllers/myMedicinesController.js"

const router = express.Router()

router.get("/", getAllMedicines)
router.post("/", addMedicine)
router.put("/:id", editMedicine)
router.delete("/:id", removeMedicine)

export default router
