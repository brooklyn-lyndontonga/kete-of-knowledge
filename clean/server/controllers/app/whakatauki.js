import { getDB } from "../../db/index.js"

// =======================
// APP: GET WHAKATAUKI (READ ONLY)
// =======================
export async function getAppWhakatauki(req, res) {
  try {
    const db = await getDB()

    const rows = await db.all(`
      SELECT
        id,
        text,
        translation,
        theme,
        source
      FROM whakatauki
      ORDER BY id ASC
    `)

    res.json(rows)
  } catch (err) {
    console.error("❌ App getWhakatauki error:", err)
    res.status(500).json({ error: err.message })
  }
}
