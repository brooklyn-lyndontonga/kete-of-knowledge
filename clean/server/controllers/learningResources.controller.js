import { getDB } from "../db/index.js"
import { logAudit } from "../services/audit.js"

// =======================
// GET ALL
// =======================
export async function getAllLearningResources(req, res) {
  try {
    const db = await getDB()
    const showArchived = req.query.showArchived === "true" ? 1 : 0

    const rows = await db.all(
      `
      SELECT *
      FROM learning_resources
      WHERE archived = ?
      ORDER BY sort_order ASC, createdAt DESC
      `,
      [showArchived]
    )

    // Load category associations for each resource
    for (const row of rows) {
      const catRows = await db.all(
        `
        SELECT lc.key
        FROM library_categories lc
        JOIN learning_resource_categories lrc ON lrc.category_id = lc.id
        WHERE lrc.resource_id = ?
        `,
        [row.id]
      )
      row.categories = catRows.map((c) => c.key)
    }

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

    const titleMi = req.body.title_mi ?? null
    const descriptionMi = req.body.description_mi ?? null

    const status = req.body.status ?? "draft"
    const sort_order = Number(req.body.sort_order) || 0
    const categories = req.body.categories || []

    // 🛡 Validation (prevents NOT NULL crash)
    if (!title || title.trim() === "") {
      return res.status(400).json({
        error: "Learning resource title is required"
      })
    }

    const db = await getDB()

    const result = await db.run(
      `
      INSERT INTO learning_resources (title, description, title_mi, description_mi, type, file_path, status, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title.trim(),
        description?.trim() || null,
        titleMi?.trim() || null,
        descriptionMi?.trim() || null,
        type,
        filePath,
        status,
        sort_order
      ]
    )

    const id = result.lastID

    // Save category associations
    for (const catKey of categories) {
      const catRow = await db.get("SELECT id FROM library_categories WHERE key = ?", [catKey])
      if (catRow) {
        await db.run(
          "INSERT OR IGNORE INTO learning_resource_categories (resource_id, category_id) VALUES (?, ?)",
          [id, catRow.id]
        )
      }
    }

    await logAudit("CREATE", "learning_resources", id, `Created learning resource: "${title.slice(0, 30)}"`, req.admin?.email)

    res.status(201).json({
      id,
      title,
      description,
      type,
      file_path: filePath,
      status,
      sort_order,
      categories
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

    const titleMi = req.body.title_mi ?? null
    const descriptionMi = req.body.description_mi ?? null

    const status = req.body.status ?? "draft"
    const sort_order = Number(req.body.sort_order) || 0
    const categories = req.body.categories || []

    if (!title || title.trim() === "") {
      return res.status(400).json({
        error: "Learning resource title is required"
      })
    }

    const db = await getDB()

    await db.run(
      `
      UPDATE learning_resources
      SET title = ?, description = ?, title_mi = ?, description_mi = ?, type = ?, file_path = ?, status = ?, sort_order = ?
      WHERE id = ?
      `,
      [
        title.trim(),
        description?.trim() || null,
        titleMi?.trim() || null,
        descriptionMi?.trim() || null,
        type,
        filePath,
        status,
        sort_order,
        id
      ]
    )

    // Clear old categories and write new ones
    await db.run("DELETE FROM learning_resource_categories WHERE resource_id = ?", [id])
    for (const catKey of categories) {
      const catRow = await db.get("SELECT id FROM library_categories WHERE key = ?", [catKey])
      if (catRow) {
        await db.run(
          "INSERT OR IGNORE INTO learning_resource_categories (resource_id, category_id) VALUES (?, ?)",
          [id, catRow.id]
        )
      }
    }

    await logAudit("UPDATE", "learning_resources", id, `Updated learning resource: "${title.slice(0, 30)}"`, req.admin?.email)

    res.json({
      id,
      title,
      description,
      type,
      file_path: filePath,
      status,
      sort_order,
      categories
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

    const existing = await db.get("SELECT title FROM learning_resources WHERE id = ?", [id])

    if (!existing) {
      return res.status(404).json({ error: "Learning resource not found" })
    }

    await db.run(
      `UPDATE learning_resources SET archived = 1 WHERE id = ?`,
      [id]
    )

    await logAudit("DELETE", "learning_resources", id, `Archived learning resource: "${existing?.title || "Unknown"}"`, req.admin?.email)

    res.json({ success: true })
  } catch (err) {
    console.error("❌ deleteLearningResource error:", err)
    res.status(500).json({ error: err.message })
  }
}

export async function restoreLearningResource(req, res) {
  try {
    const { id } = req.params
    const db = await getDB()

    const existing = await db.get("SELECT title FROM learning_resources WHERE id = ?", [id])

    if (!existing) {
      return res.status(404).json({ error: "Learning resource not found" })
    }

    await db.run(
      `UPDATE learning_resources SET archived = 0 WHERE id = ?`,
      [id]
    )

    await logAudit("RESTORE", "learning_resources", id, `Restored learning resource: "${existing?.title || "Unknown"}"`, req.admin?.email)

    res.json({ success: true })
  } catch (err) {
    console.error("❌ restoreLearningResource error:", err)
    res.status(500).json({ error: err.message })
  }
}
