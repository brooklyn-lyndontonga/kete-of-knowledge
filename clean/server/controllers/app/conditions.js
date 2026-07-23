import { getDB } from "../../db/index.js"

// =======================
// APP: GET CONDITIONS (READ ONLY)
// =======================
export async function getAppConditions(req, res) {
  try {
    const db = await getDB()

    const rows = await db.all(`
      SELECT
        id,
        title,
        summary,
        triggers,
        treatments,
        title_mi,
        summary_mi,
        triggers_mi,
        treatments_mi
      FROM conditions
      WHERE status = 'published' AND archived = 0
      ORDER BY sort_order ASC, title ASC
    `)

    res.json(rows)
  } catch (err) {
    console.error("❌ App getConditions error:", err)
    res.status(500).json({ error: err.message })
  }
}
