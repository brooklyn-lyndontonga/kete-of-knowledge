import { getDB } from "../db/index.js"

export async function getAllSeeds(req, res) {
  try {
    const db = await getDB()
    const rows = await db.all(
      "SELECT * FROM profile_seeds ORDER BY id ASC"
    )
    res.json(rows)
  } catch (err) {
    console.error("❌ getAllSeeds error:", err)
    res.status(500).json({ error: "Failed to fetch profile seeds" })
  }
}

export async function createSeed(req, res) {
  try {
    const { name, value } = req.body
    const db = await getDB()

    const result = await db.run(
      "INSERT INTO profile_seeds (name, value) VALUES (?, ?)",
      [name, value]
    )

    res.json({ id: result.lastID, name, value })
  } catch (err) {
    console.error("❌ createSeed error:", err)
    res.status(500).json({ error: "Failed to create seed" })
  }
}

export async function updateSeed(req, res) {
  try {
    const { id } = req.params
    const { name, value } = req.body
    const db = await getDB()

    await db.run(
      "UPDATE profile_seeds SET name = ?, value = ? WHERE id = ?",
      [name, value, id]
    )

    res.json({ id, name, value })
  } catch (err) {
    console.error("❌ updateSeed error:", err)
    res.status(500).json({ error: "Failed to update seed" })
  }
}

export async function deleteSeed(req, res) {
  try {
    const { id } = req.params
    const db = await getDB()

    await db.run(
      "DELETE FROM profile_seeds WHERE id = ?",
      [id]
    )

    res.json({ success: true })
  } catch (err) {
    console.error("❌ deleteSeed error:", err)
    res.status(500).json({ error: "Failed to delete seed" })
  }
}
