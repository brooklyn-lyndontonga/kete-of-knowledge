import {
  getWhakatauki,
  addWhakatauki,
  deleteWhakatauki,
} from "../models/whakataukiModel.js"

export async function listWhakatauki(req, res) {
  try {
    const db = req.app.get("db")
    const data = await getWhakatauki(db)
    res.json(data)
  } catch {
    res.status(500).json({ error: "Failed to load whakatauki" })
  }
}

export async function createWhakatauki(req, res) {
  try {
    const db = req.app.get("db")
    const item = await addWhakatauki(db, req.body)
    res.json(item)
  } catch {
    res.status(500).json({ error: "Failed to add whakatauki" })
  }
}

export async function removeWhakatauki(req, res) {
  try {
    const db = req.app.get("db")
    await deleteWhakatauki(db, req.params.id)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: "Failed to delete whakatauki" })
  }
}
