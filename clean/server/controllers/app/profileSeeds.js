import { getDB } from "../../db/index.js"

// =======================
// APP: GET PROFILE SEEDS (READ ONLY)
// =======================
export async function getAppProfileSeeds(req, res) {
  try {
    const db = await getDB()

    const rows = await db.all(`
      SELECT
        id,
        name,
        value
      FROM profile_seeds
      ORDER BY id ASC
    `)

    res.json(rows)
  } catch (err) {
    console.error("❌ App getProfileSeeds error:", err)
    res.status(500).json({ error: err.message })
  }
}
