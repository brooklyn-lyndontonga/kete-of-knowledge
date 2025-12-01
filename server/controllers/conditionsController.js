import {
  getConditions,
  addCondition,
  deleteCondition,
} from "../models/conditionsModel.js"

export async function listConditions(req, res) {
  try {
    const db = req.app.get("db")
    const data = await getConditions(db)
    res.json(data)
  } catch {
    res.status(500).json({ error: "Failed to load conditions" })
  }
}

export async function createCondition(req, res) {
  try {
    const db = req.app.get("db")
    const item = await addCondition(db, req.body)
    res.json(item)
  } catch {
    res.status(500).json({ error: "Failed to add condition" })
  }
}

export async function removeCondition(req, res) {
  try {
    const db = req.app.get("db")
    await deleteCondition(db, req.params.id)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: "Failed to delete condition" })
  }
}
