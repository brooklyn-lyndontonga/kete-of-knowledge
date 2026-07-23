import { getDB } from "../../db/index.js"

// =======================
// APP: GET REFLECTION PROMPTS (READ ONLY)
// =======================
export async function getAppReflectionTemplates(req, res) {
  try {
    const db = await getDB()

    const rows = await db.all(`
      SELECT id, category, title, prompt
      FROM reflection_templates
      WHERE status = 'published' AND archived = 0
      ORDER BY sort_order ASC, id ASC
    `)

    res.json(rows)
  } catch (err) {
    console.error("❌ App getReflectionTemplates error:", err)
    res.status(500).json({ error: err.message })
  }
}
