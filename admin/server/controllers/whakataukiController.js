import {
  getAllWhakatauki,
  getDailyWhakatauki,
} from "../../../shared/models/whakataukiModel.js"

/**
 * GET /api/admin/whakatauki
 */
export async function listWhakatauki(req, res) {
  try {
    console.log("🧪 listWhakatauki hit")

    // ✅ GET THE INITIALISED DB FROM EXPRESS
    const db = req.app.get("db")

    // ✅ PASS DB INTO MODEL
    const data = await getAllWhakatauki(db)

    console.log("🧪 data from model:", data)

    res.json(data)
  } catch (err) {
    console.error("❌ Controller error (listWhakatauki):", err)
    res.status(500).json({ error: "Failed to fetch whakataukī" })
  }
}

/**
 * GET /api/admin/whakatauki/daily
 */
export async function dailyWhakatauki(req, res) {
  try {
    console.log("🧪 dailyWhakatauki hit")

    // ✅ SAME DB INSTANCE
    const db = req.app.get("db")

    const item = await getDailyWhakatauki(db)

    console.log("🧪 daily item:", item)

    res.json(item)
  } catch (err) {
    console.error("❌ Controller error (dailyWhakatauki):", err)
    res.status(500).json({ error: "Failed to fetch whakataukī" })
  }
}
