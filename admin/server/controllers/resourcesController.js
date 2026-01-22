/* eslint-disable no-unused-vars */
import path from "path"

/**
 * GET /api/admin/resources
 * List all resources
 */
export async function listResources(req, res) {
  try {
    const db = req.app.get("db")

    const rows = await db.all(`
      SELECT r.*, c.name AS categoryName
      FROM resources r
      LEFT JOIN resource_categories c
        ON r.categoryId = c.id
      ORDER BY r.id DESC
    `)

    res.json(rows)
  } catch (err) {
    console.error("listResources error:", err)
    res.status(500).json({ error: "Failed to fetch resources" })
  }
}

/**
 * GET /api/admin/resources/category/:category_id
 * List resources by category
 */
export async function listResourcesByCategory(req, res) {
  try {
    const db = req.app.get("db")
    const { category_id } = req.params

    const rows = await db.all(
      `
      SELECT *
      FROM resources
      WHERE categoryId = ?
      ORDER BY id DESC
      `,
      [category_id]
    )

    res.json(rows)
  } catch (err) {
    console.error("listResourcesByCategory error:", err)
    res.status(500).json({ error: "Failed to fetch resources by category" })
  }
}

/**
 * POST /api/admin/resources
 * Create a new resource
 */
export async function createResource(req, res) {
  try {
    const db = req.app.get("db")

    const {
      title,
      summary,
      categoryId,
      pdfPath = null,
      image = null,
    } = req.body

    if (!title) {
      return res.status(400).json({ error: "Title is required" })
    }

    const result = await db.run(
      `
      INSERT INTO resources (title, summary, categoryId, pdfPath, image)
      VALUES (?, ?, ?, ?, ?)
      `,
      [title, summary, categoryId, pdfPath, image]
    )

    const created = await db.get(
      `SELECT * FROM resources WHERE id = ?`,
      [result.lastID]
    )

    res.status(201).json(created)
  } catch (err) {
    console.error("createResource error:", err)
    res.status(500).json({ error: "Failed to create resource" })
  }
}

/**
 * DELETE /api/admin/resources/:id
 * Delete a resource
 */
export async function removeResource(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params

    const existing = await db.get(
      `SELECT * FROM resources WHERE id = ?`,
      [id]
    )

    if (!existing) {
      return res.status(404).json({ error: "Resource not found" })
    }

    await db.run(`DELETE FROM resources WHERE id = ?`, [id])

    res.json({ success: true })
  } catch (err) {
    console.error("removeResource error:", err)
    res.status(500).json({ error: "Failed to delete resource" })
  }
}
