// server/controllers/medicinesController.js

import { getAllMedicines, getMedicineById } from "../models/medicinesModel.js"

export function listMedicines(req, res) {
  res.json(getAllMedicines())
}

export function getSingleMedicine(req, res) {
  const med = getMedicineById(req.params.id)

  if (!med) return res.status(404).json({ error: "Medicine not found" })

  res.json(med)
}
