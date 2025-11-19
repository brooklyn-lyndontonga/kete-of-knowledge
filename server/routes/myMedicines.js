// server/routes/myMedicines.js
import express from "express"
import {
  listMedicines,
  createMedicine,
  removeMedicine,
} from "../controllers/myMedicinesController.js"

const router = express.Router()

router.get("/", listMedicines)
router.post("/", createMedicine)
router.delete("/:id", removeMedicine)

export default router
