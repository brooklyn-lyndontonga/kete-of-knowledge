import {
  getAllWhakatauki,
  createWhakatauki,
  deleteWhakatauki,
} from "../models/whakataukiModel.js"

export async function getWhakatauki(req, res) {
  const db = req.app.get("db")
  const rows = await getAllWhakatauki(db)
  res.json(rows)
}

export async function addWhakatauki(req, res) {
  const db = req.app.get("db")
  await createWhakatauki(db, req.body)
  res.json({ success: true })
}

export async function removeWhakatauki(req, res) {
  const db = req.app.get("db")
  await deleteWhakatauki(db, req.params.id)
  res.json({ success: true })
}
