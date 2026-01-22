import {
  getMedicines,
  addMedicine,
  deleteMedicine,
} from "../../../shared/models/myMedicinesModel.js"

export async function listMedicines(req, res) {
  try {
    const db = req.app.get("db")
    const meds = await getMedicines(db)
    res.json(meds)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to load medicines" })
  }
}

export async function createMedicine(req, res) {
  try {
    const db = req.app.get("db")
    const med = await addMedicine(db, req.body)
    res.status(201).json(med)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to add medicine" })
  }
}

export async function removeMedicine(req, res) {
  try {
    const db = req.app.get("db")
    await deleteMedicine(db, req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete medicine" })
  }
}
