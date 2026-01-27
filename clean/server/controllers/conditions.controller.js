import { getDB } from "../db/index.js"

export async function getAllConditions(req, res) {
  try {
    const db = await getDB()
    const rows = await db.all(
      "SELECT * FROM conditions ORDER BY id DESC"
    )
    res.json(rows)
  } catch (err) {
    console.error("❌ getAllConditions error:", err)
    res.status(500).json({ error: "Failed to fetch conditions" })
  }
}

export async function createCondition(req, res) {
  try {
    const { title, summary } = req.body
    const db = await getDB()

    const result = await db.run(
      "INSERT INTO conditions (title, summary) VALUES (?, ?)",
      [title, summary]
    )

    res.json({ id: result.lastID, title, summary })
  } catch (err) {
    console.error("❌ createCondition error:", err)
    res.status(500).json({ error: "Failed to create condition" })
  }
}

export async function updateCondition(req, res) {
  try {
    const { id } = req.params
    const { title, summary } = req.body
    const db = await getDB()

    await db.run(
      "UPDATE conditions SET title = ?, summary = ? WHERE id = ?",
      [title, summary, id]
    )

    res.json({ id, title, summary })
  } catch (err) {
    console.error("❌ updateCondition error:", err)
    res.status(500).json({ error: "Failed to update condition" })
  }
}

export async function deleteCondition(req, res) {
  try {
    const { id } = req.params
    const db = await getDB()

    await db.run("DELETE FROM conditions WHERE id = ?", [id])
    res.json({ success: true })
  } catch (err) {
    console.error("❌ deleteCondition error:", err)
    res.status(500).json({ error: "Failed to delete condition" })
  }
}
