import { getDB } from "../db/index.js"

export async function getAllLearningResources(req, res) {
  try {
    const db = await getDB()

    // SAFEST possible query while stabilising schema
    const rows = await db.all(
      "SELECT * FROM learning_resources ORDER BY id DESC"
    )

    res.json(rows)
  } catch (err) {
    console.error("❌ getAllLearningResources error:", err)
    res.status(500).json({ error: err.message })
  }
}

export async function createLearningResource(req, res) {
  try {
    const { title, type, description, file_path } = req.body
    const db = await getDB()

    const result = await db.run(
      `
      INSERT INTO learning_resources (title, type, description, file_path)
      VALUES (?, ?, ?, ?)
      `,
      [title, type, description, file_path]
    )

    const row = await db.get(
      "SELECT * FROM learning_resources WHERE id = ?",
      [result.lastID]
    )

    res.status(201).json(row)
  } catch (err) {
    console.error("❌ createLearningResource error:", err)
    res.status(500).json({ error: err.message })
  }
}

export async function updateLearningResource(req, res) {
  try {
    const { id } = req.params
    const { title, type, description, file_path } = req.body
    const db = await getDB()

    await db.run(
      `
      UPDATE learning_resources
      SET title = ?, type = ?, description = ?, file_path = ?
      WHERE id = ?
      `,
      [title, type, description, file_path, id]
    )

    const row = await db.get(
      "SELECT * FROM learning_resources WHERE id = ?",
      [id]
    )

    res.json(row)
  } catch (err) {
    console.error("❌ updateLearningResource error:", err)
    res.status(500).json({ error: err.message })
  }
}

export async function deleteLearningResource(req, res) {
  try {
    const { id } = req.params
    const db = await getDB()

    await db.run(
      "DELETE FROM learning_resources WHERE id = ?",
      [id]
    )

    res.json({ success: true })
  } catch (err) {
    console.error("❌ deleteLearningResource error:", err)
    res.status(500).json({ error: err.message })
  }
}
