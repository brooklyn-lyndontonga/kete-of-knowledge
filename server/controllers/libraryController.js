// server/controllers/libraryController.js
import { getResourcesByCategory } from "../models/resourcesModel.js"

export async function listResourcesByCategory(req, res) {
  try {
    const { id } = req.params
    const items = await getResourcesByCategory(id)
    res.json(items)
  } catch (err) {
    console.error("❌ Error loading resources:", err)
    res.status(500).json({ error: "Failed to load resources" })
  }
}

// GET /api/library/search?q=term
export async function searchLibrary(req, res) {
  try {
    const db = req.app.get("db")
    const { q } = req.query

    if (!q) {
      return res.status(400).json({ error: "Missing ?q search term" })
    }

    const term = `%${q}%`

    const [conditions, resources, templates] = await Promise.all([
      db.all(
        `
        SELECT id, name AS title, description, 'condition' AS type
        FROM conditions
        WHERE name LIKE ? OR description LIKE ?
        `,
        [term, term]
      ),
      db.all(
        `
        SELECT id, title, content AS description, 'resource' AS type
        FROM resources
        WHERE title LIKE ? OR content LIKE ?
        `,
        [term, term]
      ),
      db.all(
        `
        SELECT id, title, prompt AS description, 'reflection_template' AS type
        FROM reflection_templates
        WHERE title LIKE ? OR prompt LIKE ?
        `,
        [term, term]
      ),
    ])

    const results = [...conditions, ...resources, ...templates]

    res.json({
      query: q,
      count: results.length,
      results,
    })
  } catch (err) {
    console.error("Error searching library:", err)
    res.status(500).json({ error: "Failed to search library" })
  }
}
