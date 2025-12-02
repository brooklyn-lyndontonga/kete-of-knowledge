import {
  getSymptoms,
  addSymptom,
  deleteSymptom,
} from "../models/symptomsModel.js"

// GET /api/symptoms
export async function listSymptoms(req, res) {
  try {
    const data = await getSymptoms()
    res.json(data)
  } catch (err) {
    console.error("Error loading symptoms:", err)
    res.status(500).json({ error: "Failed to load symptoms" })
  }
}

// POST /api/symptoms
export async function createSymptom(req, res) {
  try {
    const item = await addSymptom(req.body)
    res.json(item)
  } catch (err) {
    console.error("Error creating symptom:", err)
    res.status(500).json({ error: "Failed to create symptom" })
  }
}

// DELETE /api/symptoms/:id
export async function removeSymptom(req, res) {
  try {
    await deleteSymptom(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error("Error deleting symptom:", err)
    res.status(500).json({ error: "Failed to delete symptom" })
  }
}
