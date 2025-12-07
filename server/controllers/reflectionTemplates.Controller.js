/* eslint-disable no-unused-vars */
// server/controllers/reflectionTemplatesController.js

export async function listReflectionTemplates(req, res) {
  const db = req.app.get("db");
  try {
    const rows = await db.all("SELECT * FROM reflection_templates");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch templates" });
  }
}

export async function createReflectionTemplate(req, res) {
  const db = req.app.get("db");
  const { title, message } = req.body;

  try {
    const result = await db.run(
      `INSERT INTO reflection_templates (title, message) VALUES (?, ?)`,
      [title, message]
    );
    res.json({ id: result.lastID, title, message });
  } catch (err) {
    res.status(500).json({ error: "Failed to create template" });
  }
}

export async function updateReflectionTemplate(req, res) {
  const db = req.app.get("db");
  const { id } = req.params;
  const { title, message } = req.body;

  try {
    await db.run(
      `UPDATE reflection_templates SET title = ?, message = ? WHERE id = ?`,
      [title, message, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update template" });
  }
}

export async function deleteReflectionTemplate(req, res) {
  const db = req.app.get("db");
  const { id } = req.params;

  try {
    await db.run(`DELETE FROM reflection_templates WHERE id = ?`, [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete template" });
  }
}
