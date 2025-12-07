// server/controllers/profileSeedsController.js

export async function listProfileSeeds(req, res) {
  const db = req.app.get("db");
  try {
    const rows = await db.all("SELECT * FROM profile_seeds");
    res.json(rows);
  } catch {
    res.status(500).json({ error: "Unable to fetch profile seeds" });
  }
}

export async function createProfileSeed(req, res) {
  const db = req.app.get("db");
  const { label, value } = req.body;

  try {
    const result = await db.run(
      `INSERT INTO profile_seeds (label, value) VALUES (?, ?)`,
      [label, value]
    );
    res.json({ id: result.lastID, label, value });
  } catch {
    res.status(500).json({ error: "Unable to create profile seed" });
  }
}

export async function updateProfileSeed(req, res) {
  const db = req.app.get("db");
  const { id } = req.params;
  const { label, value } = req.body;

  try {
    await db.run(`UPDATE profile_seeds SET label = ?, value = ? WHERE id = ?`,
      [label, value, id]
    );
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Unable to update profile seed" });
  }
}

export async function deleteProfileSeed(req, res) {
  const db = req.app.get("db");
  const { id } = req.params;

  try {
    await db.run(`DELETE FROM profile_seeds WHERE id = ?`, [id]);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Unable to delete profile seed" });
  }
}
