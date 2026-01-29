import { getDB } from "../db/index.js"

// =======================
// GET ALL
// =======================
export async function getAllLearningResources(req, res) {
  try {
    const db = await getDB()

    const rows = await db.all(
      `
      SELECT *
      FROM learning_resources
      ORDER BY createdAt DESC
      `
    )

    res.json(rows)
  } catch (err) {
    console.error("❌ getAllLearningResources error:", err)
    res.status(500).json({ error: err.message })
  }
}

// =======================
// CREATE
// =======================
export async function createLearningResource(req, res) {
  try {
    console.log("📦 Incoming body:", req.body)

    // 🔁 Defensive mapping (frontend-proof)
    const title =
      req.body.title ??
      req.body.name ??
      req.body.label ??
      ""

    const description =
      req.body.description ??
      req.body.summary ??
      ""

    const type =
      req.body.type ??
      req.body.resourceType ??
      null

    const filePath =
      req.body.file_path ??
      req.body.filePath ??
      req.body.url ??
      null

    // 🛡 Validation (prevents NOT NULL crash)
    if (!title || title.trim() === "") {
      return res.status(400).json({
        error: "Learning resource title is required"
      })
    }

    const db = await getDB()

    const result = await db.run(
      `
      INSERT INTO learning_resources (title, description, type, file_path)
      VALUES (?, ?, ?, ?)
      `,
      [
        title.trim(),
        description?.trim() || null,
        type,
        filePath
      ]
    )

    res.status(201).json({
      id: result.lastID,
      title,
      description,
      type,
      file_path: filePath
    })
  } catch (err) {
    console.error("❌ createLearningResource error:", err)
    res.status(500).json({ error: err.message })
  }
}

// =======================
// UPDATE
// =======================
export async function updateLearningResource(req, res) {
  try {
    const { id } = req.params

    const title =
      req.body.title ??
      req.body.name ??
      ""

    const description =
      req.body.description ??
      req.body.summary ??
      ""

    const type =
      req.body.type ??
      null

    const filePath =
      req.body.file_path ??
      req.body.filePath ??
      req.body.url ??
      null

    if (!title || title.trim() === "") {
      return res.status(400).json({
        error: "Learning resource title is required"
      })
    }

    const db = await getDB()

    await db.run(
      `
      UPDATE learning_resources
      SET title = ?, description = ?, type = ?, file_path = ?
      WHERE id = ?
      `,
      [
        title.trim(),
        description?.trim() || null,
        type,
        filePath,
        id
      ]
    )

    res.json({
      id,
      title,
      description,
      type,
      file_path: filePath
    })
  } catch (err) {
    console.error("❌ updateLearningResource error:", err)
    res.status(500).json({ error: err.message })
  }
}

// =======================
// DELETE
// =======================
export async function deleteLearningResource(req, res) {
  try {
    const { id } = req.params
    const db = await getDB()

    await db.run(
      `DELETE FROM learning_resources WHERE id = ?`,
      [id]
    )

    res.json({ success: true })
  } catch (err) {
    console.error("❌ deleteLearningResource error:", err)
    res.status(500).json({ error: err.message })
  }
}
