import { getDB } from "../db/index.js"
import { logAudit } from "../services/audit.js"

export async function getAllSeeds(req, res) {
  try {
    const db = await getDB()
    const rows = await db.all(
      "SELECT * FROM profile_seeds ORDER BY sort_order ASC, id ASC"
    )
    res.json(rows)
  } catch (err) {
    console.error("❌ getAllSeeds error:", err)
    res.status(500).json({ error: "Failed to fetch profile seeds" })
  }
}

export async function createSeed(req, res) {
  try {
    const { name, value, status, sort_order } = req.body
    const db = await getDB()

    const result = await db.run(
      "INSERT INTO profile_seeds (name, value, status, sort_order) VALUES (?, ?, ?, ?)",
      [name, value, status || "draft", Number(sort_order) || 0]
    )

    const id = result.lastID
    await logAudit("CREATE", "profile_seeds", id, `Created profile seed: "${name.slice(0, 30)}"`, req.admin?.email)

    res.json({ id, name, value, status, sort_order: Number(sort_order) || 0 })
  } catch (err) {
    console.error("❌ createSeed error:", err)
    res.status(500).json({ error: "Failed to create seed" })
  }
}

export async function updateSeed(req, res) {
  try {
    const { id } = req.params
    const { name, value, status, sort_order } = req.body
    const db = await getDB()

    await db.run(
      "UPDATE profile_seeds SET name = ?, value = ?, status = ?, sort_order = ? WHERE id = ?",
      [name, value, status || "draft", Number(sort_order) || 0, id]
    )

    await logAudit("UPDATE", "profile_seeds", id, `Updated profile seed: "${name.slice(0, 30)}"`, req.admin?.email)

    res.json({ id, name, value, status, sort_order: Number(sort_order) || 0 })
  } catch (err) {
    console.error("❌ updateSeed error:", err)
    res.status(500).json({ error: "Failed to update seed" })
  }
}

export async function deleteSeed(req, res) {
  try {
    const { id } = req.params
    const db = await getDB()

    const existing = await db.get("SELECT name FROM profile_seeds WHERE id = ?", [id])

    await db.run(
      "DELETE FROM profile_seeds WHERE id = ?",
      [id]
    )

    await logAudit("DELETE", "profile_seeds", id, `Deleted profile seed: "${existing?.name || "Unknown"}"`, req.admin?.email)

    res.json({ success: true })
  } catch (err) {
    console.error("❌ deleteSeed error:", err)
    res.status(500).json({ error: "Failed to delete seed" })
  }
}
