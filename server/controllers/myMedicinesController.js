// server/controllers/myMedicinesController.js
import {
  getMedicines,
  addMedicine,
  deleteMedicine,
} from "../models/myMedicinesModel.js"

export async function listMedicines(req, res) {
  try {
    const rows = await getMedicines()
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function createMedicine(req, res) {
  try {
    const newMed = await addMedicine(req.body)
    res.json(newMed)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function removeMedicine(req, res) {
  try {
    await deleteMedicine(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
