import { getDB } from "../db/index.js"

export async function getAllTemplates(req, res) {
  try {
    const db = await getDB()
    const rows = await db.all(
      "SELECT * FROM reflection_templates ORDER BY id DESC"
    )
    res.json(rows)
  } catch (err) {
    console.error("❌ getAllTemplates error:", err)
    res.status(500).json({ error: "Failed to fetch templates" })
  }
}

export async function createTemplate(req, res) {
  try {
    const { category, title, prompt } = req.body
    const db = await getDB()

    const result = await db.run(
      `
      INSERT INTO reflection_templates (category, title, prompt)
      VALUES (?, ?, ?)
      `,
      [category, title, prompt]
    )

    res.json({ id: result.lastID, category, title, prompt })
  } catch (err) {
    console.error("❌ createTemplate error:", err)
    res.status(500).json({ error: "Failed to create template" })
  }
}

export async function updateTemplate(req, res) {
  try {
    const { id } = req.params
    const { category, title, prompt } = req.body
    const db = await getDB()

    await db.run(
      `
      UPDATE reflection_templates
      SET category = ?, title = ?, prompt = ?
      WHERE id = ?
      `,
      [category, title, prompt, id]
    )

    res.json({ id, category, title, prompt })
  } catch (err) {
    console.error("❌ updateTemplate error:", err)
    res.status(500).json({ error: "Failed to update template" })
  }
}

export async function deleteTemplate(req, res) {
  try {
    const { id } = req.params
    const db = await getDB()

    await db.run(
      "DELETE FROM reflection_templates WHERE id = ?",
      [id]
    )

    res.json({ success: true })
  } catch (err) {
    console.error("❌ deleteTemplate error:", err)
    res.status(500).json({ error: "Failed to delete template" })
  }
}
