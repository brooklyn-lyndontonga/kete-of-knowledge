import { getDB } from "../db/index.js"
import { logAudit } from "../services/audit.js"

export async function getAllConditions(req, res) {
  try {
    const db = await getDB()
    const rows = await db.all(
      "SELECT * FROM conditions ORDER BY sort_order ASC, title ASC"
    )
    res.json(rows)
  } catch (err) {
    console.error("❌ getAllConditions error:", err)
    res.status(500).json({ error: "Failed to fetch conditions" })
  }
}

export async function createCondition(req, res) {
  try {
    const { title, summary, triggers, treatments, status, sort_order } = req.body
    const db = await getDB()

    const result = await db.run(
      "INSERT INTO conditions (title, summary, triggers, treatments, status, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
      [
        title,
        summary || null,
        triggers || null,
        treatments || null,
        status || "draft",
        Number(sort_order) || 0
      ]
    )

    const id = result.lastID
    await logAudit("CREATE", "conditions", id, `Created condition: "${title.slice(0, 30)}"`, req.admin?.email)

    res.json({ id, title, summary, triggers, treatments, status, sort_order: Number(sort_order) || 0 })
  } catch (err) {
    console.error("❌ createCondition error:", err)
    res.status(500).json({ error: "Failed to create condition" })
  }
}

export async function updateCondition(req, res) {
  try {
    const { id } = req.params
    const { title, summary, triggers, treatments, status, sort_order } = req.body
    const db = await getDB()

    await db.run(
      "UPDATE conditions SET title = ?, summary = ?, triggers = ?, treatments = ?, status = ?, sort_order = ? WHERE id = ?",
      [
        title,
        summary || null,
        triggers || null,
        treatments || null,
        status || "draft",
        Number(sort_order) || 0,
        id
      ]
    )

    await logAudit("UPDATE", "conditions", id, `Updated condition: "${title.slice(0, 30)}"`, req.admin?.email)

    res.json({ id, title, summary, triggers, treatments, status, sort_order: Number(sort_order) || 0 })
  } catch (err) {
    console.error("❌ updateCondition error:", err)
    res.status(500).json({ error: "Failed to update condition" })
  }
}

export async function deleteCondition(req, res) {
  try {
    const { id } = req.params
    const db = await getDB()

    const existing = await db.get("SELECT title FROM conditions WHERE id = ?", [id])

    await db.run("DELETE FROM conditions WHERE id = ?", [id])

    await logAudit("DELETE", "conditions", id, `Deleted condition: "${existing?.title || "Unknown"}"`, req.admin?.email)

    res.json({ success: true })
  } catch (err) {
    console.error("❌ deleteCondition error:", err)
    res.status(500).json({ error: "Failed to delete condition" })
  }
}
