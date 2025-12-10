// Parse JSON fields from DB rows
function parseJSONfields(row) {
  return {
    ...row,
    triggers: row.triggers ? JSON.parse(row.triggers) : [],
    treatments: row.treatments ? JSON.parse(row.treatments) : [],
    images: row.images ? JSON.parse(row.images) : []
  }
}

// ==============================
// CREATE
// ==============================
export async function createCondition(req, res) {
  try {
    const db = req.app.get("db")
    const { name, triggers = [], treatments = [], images = [] } = req.body

    const result = await db.run(
      `
      INSERT INTO conditions (name, triggers, treatments, images)
      VALUES (?, ?, ?, ?)
      `,
      [
        name,
        JSON.stringify(triggers),
        JSON.stringify(treatments),
        JSON.stringify(images)
      ]
    )

    res.json({ id: result.lastID })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ==============================
// READ ALL
// ==============================
export async function getConditions(req, res) {
  try {
    const db = req.app.get("db")
    const rows = await db.all("SELECT * FROM conditions")
    res.json(rows.map(parseJSONfields))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// alias for your existing list method (optional)
export const listConditions = getConditions

// ==============================
// READ ONE
// ==============================
export async function getConditionById(req, res) {
  try {
    const db = req.app.get("db")
    const row = await db.get(
      "SELECT * FROM conditions WHERE id = ?",
      [req.params.id]
    )

    if (!row) return res.status(404).json({ error: "Not found" })

    res.json(parseJSONfields(row))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ==============================
// UPDATE
// ==============================
export async function updateCondition(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params
    const { name, triggers = [], treatments = [], images = [] } = req.body

    await db.run(
      `
      UPDATE conditions
      SET name = ?, triggers = ?, treatments = ?, images = ?
      WHERE id = ?
      `,
      [
        name,
        JSON.stringify(triggers),
        JSON.stringify(treatments),
        JSON.stringify(images),
        id
      ]
    )

    res.json({ message: "Updated" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ==============================
// DELETE
// ==============================
export async function deleteCondition(req, res) {
  try {
    const db = req.app.get("db")
    await db.run("DELETE FROM conditions WHERE id = ?", [req.params.id])
    res.json({ message: "Deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
