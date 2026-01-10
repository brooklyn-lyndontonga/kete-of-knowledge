// server/controllers/conditionsController.js

function parseJsonField(value, fallback) {
  if (!value) return fallback
  try {
    return JSON.parse(value)
  } catch (err) {
    console.warn("Failed to parse JSON field:", err)
    return fallback
  }
}

function serialiseJsonField(value) {
  if (value == null) return null
  return JSON.stringify(value)
}

function mapCondition(row) {
  return {
    ...row,
    triggers: parseJsonField(row.triggers, []),
    treatments: parseJsonField(row.treatments, []),
    images: parseJsonField(row.images, []),
  }
}

// GET /api/conditions?search=pcos
export async function getAllConditions(req, res) {
  try {
    const db = req.app.get("db")
    const { search } = req.query

    let sql = "SELECT * FROM conditions"
    const params = []

    if (search) {
      sql += " WHERE name LIKE ? OR description LIKE ?"
      const like = `%${search}%`
      params.push(like, like)
    }

    const rows = await db.all(sql, params)
    res.json(rows.map(mapCondition))
  } catch (err) {
    console.error("Error getting conditions:", err)
    res.status(500).json({ error: "Failed to fetch conditions" })
  }
}

// GET /api/conditions/:id
export async function getConditionById(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params

    const row = await db.get("SELECT * FROM conditions WHERE id = ?", [id])

    if (!row) {
      return res.status(404).json({ error: "Condition not found" })
    }

    res.json(mapCondition(row))
  } catch (err) {
    console.error("Error getting condition:", err)
    res.status(500).json({ error: "Failed to fetch condition" })
  }
}

// POST /api/conditions
export async function createCondition(req, res) {
  try {
    const db = req.app.get("db")
    const { name, description, triggers, treatments, images } = req.body

    if (!name) {
      return res.status(400).json({ error: "name is required" })
    }

    const result = await db.run(
      `
      INSERT INTO conditions (name, description, triggers, treatments, images)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        name,
        description ?? null,
        serialiseJsonField(triggers ?? []),
        serialiseJsonField(treatments ?? []),
        serialiseJsonField(images ?? []),
      ]
    )

    const row = await db.get("SELECT * FROM conditions WHERE id = ?", [
      result.lastID,
    ])

    res.status(201).json(mapCondition(row))
  } catch (err) {
    console.error("Error creating condition:", err)
    res.status(500).json({ error: "Failed to create condition" })
  }
}

// PUT /api/conditions/:id
export async function updateCondition(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params
    const { name, description, triggers, treatments, images } = req.body

    const existing = await db.get("SELECT * FROM conditions WHERE id = ?", [
      id,
    ])

    if (!existing) {
      return res.status(404).json({ error: "Condition not found" })
    }

    const newName = name ?? existing.name
    const newDescription = description ?? existing.description
    const newTriggers =
      triggers !== undefined ? serialiseJsonField(triggers) : existing.triggers
    const newTreatments =
      treatments !== undefined
        ? serialiseJsonField(treatments)
        : existing.treatments
    const newImages =
      images !== undefined ? serialiseJsonField(images) : existing.images

    await db.run(
      `
      UPDATE conditions
      SET name = ?, description = ?, triggers = ?, treatments = ?, images = ?
      WHERE id = ?
      `,
      [newName, newDescription, newTriggers, newTreatments, newImages, id]
    )

    const updated = await db.get("SELECT * FROM conditions WHERE id = ?", [id])

    res.json(mapCondition(updated))
  } catch (err) {
    console.error("Error updating condition:", err)
    res.status(500).json({ error: "Failed to update condition" })
  }
}

// DELETE /api/conditions/:id
export async function deleteCondition(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params

    const result = await db.run("DELETE FROM conditions WHERE id = ?", [id])

    if (result.changes === 0) {
      return res.status(404).json({ error: "Condition not found" })
    }

    res.sendStatus(204)
  } catch (err) {
    console.error("Error deleting condition:", err)
    res.status(500).json({ error: "Failed to delete condition" })
  }
}
