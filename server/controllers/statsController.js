// server/controllers/statsController.js

export async function getStats(req, res) {
  try {
    const db = req.app.get("db");

    console.log("📊 Running admin stats query...");

    const tables = [
      "resources",
      "resourceCategories",
      "whakatauki",
      "conditions",
      "supportContacts",
      "snapshots",
      "reflectionTemplates",
      "profileSeeds"
    ];

    const counts = {};

    for (const table of tables) {
      try {
        const row = await db.get(`SELECT COUNT(*) AS count FROM ${table}`);
        counts[table] = row?.count ?? 0;
      } catch (err) {
        console.error(`❌ ERROR querying table '${table}':`, err.message);
        counts[table] = 0;
      }
    }

    console.log("📊 Stats result:", counts);

    res.json({
      resources: counts.resources,
      categories: counts.resourceCategories,
      whakatauki: counts.whakatauki,
      conditions: counts.conditions,
      support: counts.supportContacts,
      snapshots: counts.snapshots,
      reflectionTemplates: counts.reflectionTemplates,
      profileSeeds: counts.profileSeeds,
    });

  } catch (err) {
    console.error("🔥 CRITICAL ERROR IN getStats():", err);
    res.status(500).json({ error: err.message });
  }
}
