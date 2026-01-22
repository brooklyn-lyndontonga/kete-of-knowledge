import { getDB } from "../../db/database.js"

export async function listTemplates(req, res) {
  const db = getDB()
  const rows = await db.all("SELECT * FROM reflection_templates")
  res.json(rows)
}

export async function createTemplate(req, res) {
  const { title, body } = req.body
  const db = getDB()

  await db.run(
    `
    INSERT INTO reflection_templates (title, body)
    VALUES (?, ?)
    `,
    [title, body]
  )

  res.json({ success: true })
}

export async function getLatestTemplate(req, res) {
  const db = getDB()
  const row = await db.get(
    `
    SELECT * FROM reflection_templates
    ORDER BY id DESC
    LIMIT 1
    `
  )
  res.json(row ?? null)
}
