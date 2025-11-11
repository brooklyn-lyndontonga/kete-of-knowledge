// server/controllers/mymedicinesController.js
import {
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} from "../models/myMedicinesModel.js"

export async function getAllMedicines(req, res) {
  try {
    const medicines = await getMedicines(req.db)
    res.json(medicines)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function addMedicine(req, res) {
  try {
    const { name, dosage, frequency } = req.body
    await createMedicine(req.db, { name, dosage, frequency })
    res.status(201).json({ message: "Medicine added successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function editMedicine(req, res) {
  try {
    const { id } = req.params
    await updateMedicine(req.db, id, req.body)
    res.json({ message: "Medicine updated successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function removeMedicine(req, res) {
  try {
    const { id } = req.params
    await deleteMedicine(req.db, id)
    res.json({ message: "Medicine deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
