// server/routes/medicines.js
import express from "express"
import {
  listMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} from "../controllers/medicinesController.js"

const router = express.Router()

router.get("/", listMedicines)
router.post("/", createMedicine)
router.put("/:id", updateMedicine)
router.delete("/:id", deleteMedicine)

export default router
