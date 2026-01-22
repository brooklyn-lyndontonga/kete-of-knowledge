// GET /library/conditions
export async function listLibraryConditions(req, res) {
  const db = req.app.get("db")

  const rows = await db.all(`
    SELECT
      id,
      name AS title
    FROM conditions
    ORDER BY name ASC
  `)

  res.json(rows)
}

// GET /library/conditions/:id
export async function getLibraryCondition(req, res) {
  const db = req.app.get("db")

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
