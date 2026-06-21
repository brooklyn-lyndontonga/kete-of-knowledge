import { getDB } from "../db/index.js"
import { logAudit } from "../services/audit.js"

export async function getAllTemplates(req, res) {
  try {
    const db = await getDB()
    const showArchived = req.query.showArchived === "true" ? 1 : 0
    const rows = await db.all(
      "SELECT * FROM reflection_templates WHERE archived = ? ORDER BY sort_order ASC, id DESC",
      [showArchived]
    )
    res.json(rows)
  } catch (err) {
    console.error("❌ getAllTemplates error:", err)
    res.status(500).json({ error: "Failed to fetch templates" })
  }
}

export async function createTemplate(req, res) {
  try {
    const { category, title, prompt, status, sort_order } = req.body
    const db = await getDB()

    const result = await db.run(
      `
      INSERT INTO reflection_templates (category, title, prompt, status, sort_order)
      VALUES (?, ?, ?, ?, ?)
      `,
      [category, title, prompt, status || "draft", Number(sort_order) || 0]
    )

    const id = result.lastID
    await logAudit("CREATE", "reflection_templates", id, `Created reflection template: "${title.slice(0, 30)}"`, req.admin?.email)

    res.json({ id, category, title, prompt, status, sort_order: Number(sort_order) || 0 })
  } catch (err) {
    console.error("❌ createTemplate error:", err)
    res.status(500).json({ error: "Failed to create template" })
  }
}

export async function updateTemplate(req, res) {
  try {
    const { id } = req.params
    const { category, title, prompt, status, sort_order } = req.body
    const db = await getDB()

    await db.run(
      `
      UPDATE reflection_templates
      SET category = ?, title = ?, prompt = ?, status = ?, sort_order = ?
      WHERE id = ?
      `,
      [category, title, prompt, status || "draft", Number(sort_order) || 0, id]
    )

    await logAudit("UPDATE", "reflection_templates", id, `Updated reflection template: "${title.slice(0, 30)}"`, req.admin?.email)

    res.json({ id, category, title, prompt, status, sort_order: Number(sort_order) || 0 })
  } catch (err) {
    console.error("❌ updateTemplate error:", err)
    res.status(500).json({ error: "Failed to update template" })
  }
}

export async function deleteTemplate(req, res) {
  try {
    const { id } = req.params
    const db = await getDB()

    const existing = await db.get("SELECT title FROM reflection_templates WHERE id = ?", [id])

    if (!existing) {
      return res.status(404).json({ error: "Reflection template not found" })
    }

    await db.run(
      "UPDATE reflection_templates SET archived = 1 WHERE id = ?",
      [id]
    )

    await logAudit("DELETE", "reflection_templates", id, `Archived reflection template: "${existing?.title || "Unknown"}"`, req.admin?.email)

    res.json({ success: true })
  } catch (err) {
    console.error("❌ deleteTemplate error:", err)
    res.status(500).json({ error: "Failed to delete template" })
  }
}

export async function restoreTemplate(req, res) {
  try {
    const { id } = req.params
    const db = await getDB()

    const existing = await db.get("SELECT title FROM reflection_templates WHERE id = ?", [id])

    if (!existing) {
      return res.status(404).json({ error: "Reflection template not found" })
    }

    await db.run(
      "UPDATE reflection_templates SET archived = 0 WHERE id = ?",
      [id]
    )

    await logAudit("RESTORE", "reflection_templates", id, `Restored reflection template: "${existing?.title || "Unknown"}"`, req.admin?.email)

    res.json({ success: true })
  } catch (err) {
    console.error("❌ restoreTemplate error:", err)
    res.status(500).json({ error: "Failed to restore template" })
  }
}
