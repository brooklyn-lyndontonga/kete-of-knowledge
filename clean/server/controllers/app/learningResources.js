import { getDB } from "../../db/index.js"

// =======================
// APP: GET LEARNING RESOURCES (READ ONLY)
// =======================
export async function getAppLearningResources(req, res) {
  try {
    const db = await getDB()

    const rows = await db.all(`
      SELECT
        id,
        title,
        description,
        type,
        file_path,
        createdAt
      FROM learning_resources
      ORDER BY createdAt DESC
    `)

    res.json(rows)
  } catch (err) {
    console.error("❌ App getLearningResources error:", err)
    res.status(500).json({ error: err.message })
  }
}
