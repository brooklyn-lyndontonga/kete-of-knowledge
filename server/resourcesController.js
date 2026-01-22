import {
  getResources,
  getResourcesByCategory,
  addResource,
  deleteResource,
} from "../models/resourcesModel.js"

export async function listResources(req, res) {
  try {
    const db = req.app.get("db")
    const data = await getResources(db)
    res.json(data)
  } catch {
    res.status(500).json({ error: "Failed to load resources" })
  }
}

export async function listResourcesByCategory(req, res) {
  try {
    const db = req.app.get("db")
    const data = await getResourcesByCategory(db, req.params.category_id)
    res.json(data)
  } catch {
    res.status(500).json({ error: "Failed to load resources" })
  }
}

export async function createResource(req, res) {
  try {
    const db = req.app.get("db")
    const item = await addResource(db, req.body)
    res.json(item)
  } catch {
    res.status(500).json({ error: "Failed to add resource" })
  }
}

export async function removeResource(req, res) {
  try {
    const db = req.app.get("db")
    await deleteResource(db, req.params.id)
    res.json({ success: true })
  } catch {
    res.status(500).json({ error: "Failed to delete resource" })
  }
}
