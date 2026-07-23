import { getDB } from "../../db/index.js"

// =======================
// APP: GET LEARNING RESOURCES (READ ONLY)
// =======================
export async function getAppLearningResources(req, res) {
  try {
    const db = await getDB()

    const rows = await db.all(`
      SELECT
        r.id,
        r.title,
        r.description,
        r.title_mi,
        r.description_mi,
        r.type,
        r.file_path,
        r.createdAt,
        lc.key AS category
      FROM learning_resources r
      LEFT JOIN learning_resource_categories lrc ON lrc.resource_id = r.id
      LEFT JOIN library_categories lc ON lc.id = lrc.category_id
      WHERE r.status = 'published' AND r.archived = 0
      ORDER BY r.sort_order ASC, r.createdAt DESC
    `)

    res.json(rows)
  } catch (err) {
    console.error("❌ App getLearningResources error:", err)
    res.status(500).json({ error: err.message })
  }
}
