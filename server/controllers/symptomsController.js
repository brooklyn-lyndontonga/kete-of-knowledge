// server/controllers/symptomsController.js

import {
  getAllSymptoms,
  addSymptom,
  deleteSymptom,
  getSymptomSummary
} from "../models/symptomsModel.js"

export function listSymptoms(req, res) {
  res.json(getAllSymptoms())
}

export function createSymptom(req, res) {
  const { date, symptom, severity, notes } = req.body

  if (!symptom) {
    return res.status(400).json({ error: "Symptom name is required" })
  }

  const entry = addSymptom({ date, symptom, severity, notes })
  res.json(entry)
}

export function removeSymptom(req, res) {
  deleteSymptom(req.params.id)
  res.json({ success: true })
}

export function symptomSummary(req, res) {
  res.json(getSymptomSummary())
}
