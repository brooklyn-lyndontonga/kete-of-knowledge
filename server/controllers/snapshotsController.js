export async function createSnapshot(req, res) {
  const db = req.app.get("db");
  const { label, percentage, color } = req.body;

  const pct = parseInt(percentage, 10);

  if (isNaN(pct)) {
    return res.status(400).json({ error: "Percentage must be a number" });
  }

  try {
    const result = await db.run(
      `INSERT INTO snapshots (label, percentage, color) VALUES (?, ?, ?)`,
      [label, pct, color]
    );

    res.json({ id: result.lastID });
  } catch {
    res.status(500).json({ error: "Failed to create snapshot" });
  }
}
