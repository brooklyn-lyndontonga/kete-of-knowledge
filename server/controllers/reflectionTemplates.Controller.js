/* eslint-disable no-unused-vars */
// server/controllers/reflectionTemplatesController.js
import {
  getAllReflectionTemplates,
  getReflectionTemplateById,
  createReflectionTemplate,
  updateReflectionTemplate,
  deleteReflectionTemplate,
} from "../models/reflectionTemplatesModel.js"

export async function listReflectionTemplates(req, res) {
  try {
    const db = req.app.get("db")
    const reflections = await getAllReflectionTemplates(db)
    res.json(reflections)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reflection templates" })
  }
}

export async function getReflectionTemplate(req, res) {
  try {
    const db = req.app.get("db")
    const reflection = await getReflectionTemplateById(db, req.params.id)
    res.json(reflection)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reflection template" })
  }
}

export async function addReflectionTemplate(req, res) {
  try {
    const db = req.app.get("db")
    const { title, story, caption } = req.body

    await createReflectionTemplate(db, { title, story, caption })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to add reflection template" })
  }
}

export async function editReflectionTemplate(req, res) {
  try {
    const db = req.app.get("db")
    const { title, story, caption } = req.body

    await updateReflectionTemplate(db, req.params.id, { title, story, caption })

    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to update reflection template" })
  }
}

export async function removeReflectionTemplate(req, res) {
  try {
    const db = req.app.get("db")
    await deleteReflectionTemplate(db, req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete reflection template" })
  }
}
