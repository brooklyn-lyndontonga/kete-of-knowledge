import { getDB } from "../db/index.js"

export async function getAllTemplates(req, res) {
  const db = getDB()
  const rows = await db.all(
    `SELECT * FROM reflection_templates ORDER BY id DESC`
  )
  res.json(rows)
}

export async function createTemplate(req, res) {
  const { category, title, prompt } = req.body
  const db = getDB()

  const result = await db.run(
    `INSERT INTO reflection_templates (category, title, prompt)
     VALUES (?, ?, ?)`,
    [category, title, prompt]
  )

  res.json({ id: result.lastID, category, title, prompt })
}

export async function updateTemplate(req, res) {
  const { id } = req.params
  const { category, title, prompt } = req.body
  const db = getDB()

  await db.run(
    `UPDATE reflection_templates
     SET category=?, title=?, prompt=?
     WHERE id=?`,
    [category, title, prompt, id]
  )

  res.json({ id, category, title, prompt })
}

export async function deleteTemplate(req, res) {
  const { id } = req.params
  const db = getDB()

  await db.run(`DELETE FROM reflection_templates WHERE id=?`, [id])
  res.json({ success: true })
}
