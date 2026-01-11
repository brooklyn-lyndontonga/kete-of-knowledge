// server/controllers/reflectionTemplatesController.js

export async function getAllReflectionTemplates(req, res) {
  const db = req.app.get("db")

  try {
    const rows = await db.all(`
      SELECT id, category, title, prompt
      FROM reflection_templates
      ORDER BY id DESC
    `)

    res.json(rows)
  } catch (err) {
    console.error("getAllReflectionTemplates error:", err)
    res.status(500).json({ error: "Failed to fetch reflection templates" })
  }
}

export async function getReflectionTemplateById(req, res) {
  const db = req.app.get("db")
  const { id } = req.params

  try {
    const row = await db.get(
      `
      SELECT id, category, title, prompt
      FROM reflection_templates
      WHERE id = ?
    `,
      id
    )

    if (!row) {
      return res.status(404).json({ error: "Reflection template not found" })
    }

    res.json(row)
  } catch (err) {
    console.error("getReflectionTemplateById error:", err)
    res.status(500).json({ error: "Failed to fetch reflection template" })
  }
}

export async function createReflectionTemplate(req, res) {
  const db = req.app.get("db")
  const { category, title, prompt } = req.body

  if (!category || !title || !prompt) {
    return res
      .status(400)
      .json({ error: "category, title and prompt are required" })
  }

  try {
    const result = await db.run(
      `
      INSERT INTO reflection_templates (category, title, prompt)
      VALUES (?, ?, ?)
    `,
      category,
      title,
      prompt
    )

    const created = await db.get(
      `
      SELECT id, category, title, prompt
      FROM reflection_templates
      WHERE id = ?
    `,
      result.lastID
    )

    res.status(201).json(created)
  } catch (err) {
    console.error("createReflectionTemplate error:", err)
    res.status(500).json({ error: "Failed to create reflection template" })
  }
}

export async function updateReflectionTemplate(req, res) {
  const db = req.app.get("db")
  const { id } = req.params
  const { category, title, prompt } = req.body

  try {
    const existing = await db.get(
      `SELECT id FROM reflection_templates WHERE id = ?`,
      id
    )

    if (!existing) {
      return res.status(404).json({ error: "Reflection template not found" })
    }

    await db.run(
      `
      UPDATE reflection_templates
      SET category = ?, title = ?, prompt = ?
      WHERE id = ?
    `,
      category,
      title,
      prompt,
      id
    )

    const updated = await db.get(
      `
      SELECT id, category, title, prompt
      FROM reflection_templates
      WHERE id = ?
    `,
      id
    )

    res.json(updated)
  } catch (err) {
    console.error("updateReflectionTemplate error:", err)
    res.status(500).json({ error: "Failed to update reflection template" })
  }
}

export async function deleteReflectionTemplate(req, res) {
  const db = req.app.get("db")
  const { id } = req.params

  try {
    const existing = await db.get(
      `SELECT id FROM reflection_templates WHERE id = ?`,
      id
    )

    if (!existing) {
      return res.status(404).json({ error: "Reflection template not found" })
    }

    await db.run(
      `
      DELETE FROM reflection_templates
      WHERE id = ?
    `,
      id
    )

    res.json({ success: true })
  } catch (err) {
    console.error("deleteReflectionTemplate error:", err)
    res.status(500).json({ error: "Failed to delete reflection template" })
  }
}
