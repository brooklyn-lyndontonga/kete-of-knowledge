import {
  getMedicines,
  addMedicine,
  deleteMedicine as deleteMedicineModel,
} from "../models/medicinesModel.js"

// GET /api/medicines
export async function listMedicines(req, res) {
  try {
    const items = await getMedicines()
    res.json(items)
  } catch (err) {
    console.error("Error loading medicines:", err)
    res.status(500).json({ error: "Failed to load medicines" })
  }
}

// POST /api/medicines
export async function createMedicine(req, res) {
  try {
    const item = await addMedicine(req.body)
    res.json(item)
  } catch (err) {
    console.error("Error creating medicine:", err)
    res.status(500).json({ error: "Failed to create medicine" })
  }
}

// DELETE /api/medicines/:id
export async function deleteMedicine(req, res) {
  try {
    await deleteMedicineModel(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error("Error deleting medicine:", err)
    res.status(500).json({ error: "Failed to delete medicine" })
  }
}
