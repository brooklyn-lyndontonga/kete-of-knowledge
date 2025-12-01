import {
  getSnapshots,
  addSnapshot,
  deleteSnapshot,
} from "../models/snapshotsModel.js"

export async function listSnapshots(req, res) {
  try {
    const db = req.app.get("db")
    const data = await getSnapshots(db)
    res.json(data)
  } catch {
    res.status(500).json({ error: "Failed to load snapshots" })
  }
}

export async function createSnapshot(req, res) {
  try {
    const db = req.app.get("db")
    const item = await addSnapshot(db, req.body)
    res.json(item)
  } catch {
    res.status(500).json({ error: "Failed to add snapshot" })
  }
}

export async function removeSnapshot(req, res) {
  try {
    const db = req.app.get("db")
    await deleteSnapshot(db, req.params.id)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: "Failed to delete snapshot" })
  }
}
