import { getDB } from "../db/db.js"

// =======================
// ADMIN: LIST ALL CONDITIONS
// GET /admin/conditions
// =======================
export async function getAllConditions(req, res) {
  const db = getDB()

  const rows = await db.all(`
    SELECT
      id,
      name AS title,
      description AS content,
      triggers,
      treatments,
      images
    FROM conditions
    ORDER BY name ASC
  `)

  res.json(rows)
}

// =======================
// ADMIN: GET ONE CONDITION
// GET /admin/conditions/:id
// =======================
export async function getConditionById(req, res) {
  const db = getDB()

  const row = await db.get(
    `
    SELECT
      id,
      name AS title,
      description AS content,
      triggers,
      treatments,
      images
    FROM conditions
    WHERE id = ?
    `,
    req.params.id
  )

  if (!row) {
    return res.status(404).json({ error: "Condition not found" })
  }

  res.json(row)
}

// =======================
// ADMIN: CREATE CONDITION
// POST /admin/conditions
// =======================
export async function createCondition(req, res) {
  const {
    title,
    content,
    triggers = null,
    treatments = null,
    images = null,
  } = req.body

  const db = getDB()

  await db.run(
    `
    INSERT INTO conditions (name, description, triggers, treatments, images)
    VALUES (?, ?, ?, ?, ?)
    `,
    [title, content, triggers, treatments, images]
  )

  res.json({ success: true })
}

// =======================
// ADMIN: UPDATE CONDITION
// PUT /admin/conditions/:id
// =======================
export async function updateCondition(req, res) {
  const {
    title,
    content,
    triggers = null,
    treatments = null,
    images = null,
  } = req.body

  const db = getDB()

  await db.run(
    `
    UPDATE conditions
    SET
      name = ?,
      description = ?,
      triggers = ?,
      treatments = ?,
      images = ?
    WHERE id = ?
    `,
    [title, content, triggers, treatments, images, req.params.id]
  )

  res.json({ success: true })
}

// =======================
// ADMIN: DELETE CONDITION
// DELETE /admin/conditions/:id
// =======================
export async function deleteCondition(req, res) {
  const db = getDB()

  await db.run(
    "DELETE FROM conditions WHERE id = ?",
    req.params.id
  )

  res.json({ success: true })
}
