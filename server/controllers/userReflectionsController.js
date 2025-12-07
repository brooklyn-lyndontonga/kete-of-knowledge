/* eslint-disable no-unused-vars */
// server/controllers/userReflectionsController.js

export async function listUserReflections(req, res) {
  const db = req.app.get("db");
  try {
    const rows = await db.all("SELECT * FROM user_reflections ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reflections" });
  }
}

export async function createUserReflection(req, res) {
  const db = req.app.get("db");
  const { type, content } = req.body; // type = 'daily' or 'weekly'

  try {
    const result = await db.run(
      `INSERT INTO user_reflections (type, content) VALUES (?, ?)`,
      [type, content]
    );
    res.json({ id: result.lastID, type, content });
  } catch (err) {
    res.status(500).json({ error: "Failed to create reflection" });
  }
}

export async function deleteUserReflection(req, res) {
  const db = req.app.get("db");
  const { id } = req.params;

  try {
    await db.run(`DELETE FROM user_reflections WHERE id = ?`, [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete reflection" });
  }
}
