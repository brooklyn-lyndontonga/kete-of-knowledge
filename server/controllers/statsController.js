// server/controllers/statsController.js

export async function getStats(req, res) {
  try {
    const db = req.app.get("db")
    if (!db) {
      return res.status(500).json({ error: "Database not available on app" })
    }

    // Simple counts for homepage stats
    const [
      resources,
      categories,
      whakatauki,
      conditions,
      support,
      snapshots,
    ] = await Promise.all([
      db.get("SELECT COUNT(*) AS total FROM resources"),
      db.get("SELECT COUNT(*) AS total FROM resource_categories"),
      db.get("SELECT COUNT(*) AS total FROM whakatauki"),
      db.get("SELECT COUNT(*) AS total FROM conditions"),
      db.get("SELECT COUNT(*) AS total FROM support_contacts"),
      db.get("SELECT COUNT(*) AS total FROM snapshots"),
    ])

    res.json({
      resources: resources?.total ?? 0,
      categories: categories?.total ?? 0,
      whakatauki: whakatauki?.total ?? 0,
      conditions: conditions?.total ?? 0,
      support: support?.total ?? 0,
      snapshots: snapshots?.total ?? 0,
    })
  } catch (err) {
    console.error("❌ getStats error:", err)
    res.status(500).json({ error: "Failed to load admin stats" })
  }
}
