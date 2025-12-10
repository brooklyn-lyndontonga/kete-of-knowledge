// server/controllers/reflectionTemplatesController.js
import {
  listReflectionTemplates,
  getReflectionTemplate,
  createReflectionTemplate,
  updateReflectionTemplate,
  deleteReflectionTemplate
} from "../models/reflectionTemplatesModel.js"

export async function listTemplates(req, res) {
  try {
    const db = req.app.get("db")
    const items = await listReflectionTemplates(db)
    res.json(items)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getTemplate(req, res) {
  try {
    const db = req.app.get("db")
    const item = await getReflectionTemplate(db, req.params.id)
    if (!item) return res.status(404).json({ error: "Not found" })
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function createTemplate(req, res) {
  try {
    const db = req.app.get("db")
    const newItem = await createReflectionTemplate(db, req.body)
    res.json(newItem)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function updateTemplate(req, res) {
  try {
    const db = req.app.get("db")
    const updated = await updateReflectionTemplate(db, req.params.id, req.body)
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function removeTemplate(req, res) {
  try {
    const db = req.app.get("db")
    await deleteReflectionTemplate(db, req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
