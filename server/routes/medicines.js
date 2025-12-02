import express from "express"
import {
  listMedicines,
  createMedicine,
  deleteMedicine,
} from "../controllers/medicinesController.js"

const router = express.Router()

router.get("/", listMedicines)
router.post("/", createMedicine)
router.delete("/:id", deleteMedicine)

export default router
