// server/models/reflectionTemplatesModel.js
export async function getAllReflectionTemplates(db) {
  return db.all(`SELECT * FROM reflection_templates ORDER BY id DESC`)
}

export async function getReflectionTemplateById(db, id) {
  return db.get(`SELECT * FROM reflection_templates WHERE id = ?`, [id])
}

export async function createReflectionTemplate(db, { title, story, caption }) {
  return db.run(
    `
    INSERT INTO reflection_templates (title, story, caption)
    VALUES (?, ?, ?)
  `,
    [title, story, caption]
  )
}

export async function updateReflectionTemplate(db, id, { title, story, caption }) {
  return db.run(
    `
    UPDATE reflection_templates
    SET title = ?, story = ?, caption = ?
    WHERE id = ?
  `,
    [title, story, caption, id]
  )
}

export async function deleteReflectionTemplate(db, id) {
  return db.run(`DELETE FROM reflection_templates WHERE id = ?`, [id])
}
