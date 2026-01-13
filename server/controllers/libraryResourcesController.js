import { getResourcesByCategory } from "../models/resourcesModel.js"

// GET /api/library/:id/resources
export async function listResourcesByCategory(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params

    const items = await getResourcesByCategory(db, id)

    res.json(items)
  } catch (err) {
    console.error("❌ Error loading resources:", err)
    res.status(500).json({ error: "Failed to load resources" })
  }
}
