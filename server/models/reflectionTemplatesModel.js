// server/models/reflectionTemplatesModel.js

export async function listReflectionTemplates(db) {
  return db.all(`SELECT * FROM reflection_templates ORDER BY id DESC`)
}

export async function getReflectionTemplate(db, id) {
  return db.get(`SELECT * FROM reflection_templates WHERE id = ?`, [id])
}

export async function createReflectionTemplate(db, body) {
  const { title, prompt } = body
  await db.run(
    `INSERT INTO reflection_templates (title, prompt) VALUES (?, ?)`,
    [title, prompt]
  )
  return { title, prompt }
}

export async function updateReflectionTemplate(db, id, body) {
  const { title, prompt } = body
  await db.run(
    `UPDATE reflection_templates SET title = ?, prompt = ? WHERE id = ?`,
    [title, prompt, id]
  )
  return { id, title, prompt }
}

export async function deleteReflectionTemplate(db, id) {
  await db.run(`DELETE FROM reflection_templates WHERE id = ?`, [id])
  return true
}
