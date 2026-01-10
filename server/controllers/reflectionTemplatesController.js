// server/controllers/reflectionTemplatesController.js

// GET /api/reflection-templates
export async function getAllReflectionTemplates(req, res) {
  try {
    const db = req.app.get("db")
    const { category } = req.query

    let sql = "SELECT * FROM reflection_templates"
    const params = []

    if (category) {
      sql += " WHERE category = ?"
      params.push(category)
    }

    const templates = await db.all(sql, params)
    res.json(templates)
  } catch (err) {
    console.error("Error getting reflection templates:", err)
    res.status(500).json({ error: "Failed to fetch reflection templates" })
  }
}

// GET /api/reflection-templates/:id
export async function getReflectionTemplateById(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params

    const template = await db.get(
      "SELECT * FROM reflection_templates WHERE id = ?",
      [id]
    )

    if (!template) {
      return res.status(404).json({ error: "Reflection template not found" })
    }

    res.json(template)
  } catch (err) {
    console.error("Error getting reflection template:", err)
    res.status(500).json({ error: "Failed to fetch reflection template" })
  }
}

// POST /api/reflection-templates
export async function createReflectionTemplate(req, res) {
  try {
    const db = req.app.get("db")
    const { category, title, prompt } = req.body

    if (!category || !title || !prompt) {
      return res
        .status(400)
        .json({ error: "category, title, and prompt are required" })
    }

    const result = await db.run(
      `
      INSERT INTO reflection_templates (category, title, prompt)
      VALUES (?, ?, ?)
      `,
      [category, title, prompt]
    )

    const newTemplate = await db.get(
      "SELECT * FROM reflection_templates WHERE id = ?",
      [result.lastID]
    )

    res.status(201).json(newTemplate)
  } catch (err) {
    console.error("Error creating reflection template:", err)
    res.status(500).json({ error: "Failed to create reflection template" })
  }
}

// PUT /api/reflection-templates/:id
export async function updateReflectionTemplate(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params
    const { category, title, prompt } = req.body

    const existing = await db.get(
      "SELECT * FROM reflection_templates WHERE id = ?",
      [id]
    )
    if (!existing) {
      return res.status(404).json({ error: "Reflection template not found" })
    }

    const newCategory = category ?? existing.category
    const newTitle = title ?? existing.title
    const newPrompt = prompt ?? existing.prompt

    await db.run(
      `
      UPDATE reflection_templates
      SET category = ?, title = ?, prompt = ?
      WHERE id = ?
      `,
      [newCategory, newTitle, newPrompt, id]
    )

    const updated = await db.get(
      "SELECT * FROM reflection_templates WHERE id = ?",
      [id]
    )

    res.json(updated)
  } catch (err) {
    console.error("Error updating reflection template:", err)
    res.status(500).json({ error: "Failed to update reflection template" })
  }
}

// DELETE /api/reflection-templates/:id
export async function deleteReflectionTemplate(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params

    const result = await db.run(
      "DELETE FROM reflection_templates WHERE id = ?",
      [id]
    )

    if (result.changes === 0) {
      return res.status(404).json({ error: "Reflection template not found" })
    }

    res.sendStatus(204)
  } catch (err) {
    console.error("Error deleting reflection template:", err)
    res.status(500).json({ error: "Failed to delete reflection template" })
  }
}
