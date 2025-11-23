import {
  getResourcesByCategory,
  createResource,
  deleteResource,
} from "../models/libraryResourcesModel.js"

export async function getResources(req, res) {
  const db = req.app.get("db")
  const rows = await getResourcesByCategory(db, req.params.categoryId)
  res.json(rows)
}

export async function addResource(req, res) {
  const db = req.app.get("db")
  await createResource(db, req.body)
  res.json({ success: true })
}

export async function removeResource(req, res) {
  const db = req.app.get("db")
  await deleteResource(db, req.params.id)
  res.json({ success: true })
}
