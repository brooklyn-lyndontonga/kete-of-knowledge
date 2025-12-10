// =========================
// CREATE SNAPSHOT
// =========================
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
  } catch (err) {
    console.error("❌ Error creating snapshot:", err);
    res.status(500).json({ error: "Failed to create snapshot" });
  }
}

// =========================
// LIST ALL SNAPSHOTS
// =========================
export async function listSnapshots(req, res) {
  try {
    const db = req.app.get("db");
    const rows = await db.all(`SELECT * FROM snapshots`);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error listing snapshots:", err);
    res.status(500).json({ error: "Failed to load snapshots" });
  }
}

// =========================
// GET ONE SNAPSHOT
// =========================
export async function getSnapshotById(req, res) {
  try {
    const db = req.app.get("db");
    const row = await db.get(`SELECT * FROM snapshots WHERE id = ?`, [
      req.params.id,
    ]);

    if (!row) {
      return res.status(404).json({ error: "Snapshot not found" });
    }

    res.json(row);
  } catch (err) {
    console.error("❌ Error getting snapshot:", err);
    res.status(500).json({ error: "Failed to load snapshot" });
  }
}

// =========================
// UPDATE SNAPSHOT
// =========================
export async function updateSnapshot(req, res) {
  const db = req.app.get("db");
  const { id } = req.params;
  const { label, percentage, color } = req.body;

  const pct = parseInt(percentage, 10);
  if (isNaN(pct)) {
    return res.status(400).json({ error: "Percentage must be a number" });
  }

  try {
    await db.run(
      `
      UPDATE snapshots
      SET label = ?, percentage = ?, color = ?
      WHERE id = ?
      `,
      [label, pct, color, id]
    );

    res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error("❌ Error updating snapshot:", err);
    res.status(500).json({ error: "Failed to update snapshot" });
  }
}

// =========================
// DELETE SNAPSHOT
// =========================
export async function deleteSnapshot(req, res) {
  const db = req.app.get("db");
  const { id } = req.params;

  try {
    await db.run(`DELETE FROM snapshots WHERE id = ?`, [id]);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting snapshot:", err);
    res.status(500).json({ error: "Failed to delete snapshot" });
  }
}
