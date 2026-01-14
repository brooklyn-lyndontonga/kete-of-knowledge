import { getResourcesByCategory } from "../models/resourcesModel.js"
import { getDB } from "../db/db.js"

export async function listResourcesByCategory(req, res) {
  try {
    const db = getDB()
    const categoryId = req.params.id

    const resources = await getResourcesByCategory(db, categoryId)

    res.json(resources)
  } catch (err) {
    console.error("❌ Error loading resources:", err)
    res.status(500).json({ error: "Failed to load resources" })
  }
}
