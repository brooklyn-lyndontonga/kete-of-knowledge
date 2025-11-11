// server/controllers/symptomsController.js
import {
  getSymptoms,
  createSymptom,
  updateSymptom,
  deleteSymptom,
} from "../models/symptomsModel.js"

export async function getAllSymptoms(req, res) {
  try {
    const symptoms = await getSymptoms(req.db)
    res.json(symptoms)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function addSymptom(req, res) {
  try {
    const { name, severity } = req.body
    await createSymptom(req.db, { name, severity })
    res.status(201).json({ message: "Symptom added successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function editSymptom(req, res) {
  try {
    const { id } = req.params
    await updateSymptom(req.db, id, req.body)
    res.json({ message: "Symptom updated successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function removeSymptom(req, res) {
  try {
    const { id } = req.params
    await deleteSymptom(req.db, id)
    res.json({ message: "Symptom deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
