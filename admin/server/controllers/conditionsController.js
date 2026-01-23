// =======================
// ADMIN: LIST ALL CONDITIONS
// GET /api/admin/conditions
// =======================
export async function getAllConditions(req, res) {
  try {
    const db = req.app.get("db")

    const rows = await db.all(`
      SELECT
        id,
        title,
        summary,
        triggers,
        treatments,
        images
      FROM conditions
      ORDER BY title ASC
    `)

    res.json(rows)
  } catch (err) {
    console.error("getAllConditions error:", err)
    res.status(500).json({ error: "Failed to fetch conditions" })
  }
}

// =======================
// ADMIN: GET ONE CONDITION
// GET /api/admin/conditions/:id
// =======================
export async function getConditionById(req, res) {
  try {
    const db = req.app.get("db")

    const row = await db.get(
      `
      SELECT
        id,
        title,
        summary,
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
  } catch (err) {
    console.error("getConditionById error:", err)
    res.status(500).json({ error: "Failed to fetch condition" })
  }
}

// =======================
// ADMIN: CREATE CONDITION
// POST /api/admin/conditions
// =======================
export async function createCondition(req, res) {
  try {
    const {
      title,
      summary = null,
      triggers = null,
      treatments = null,
      images = null,
    } = req.body

    if (!title) {
      return res.status(400).json({ error: "Title is required" })
    }

    const db = req.app.get("db")

    await db.run(
      `
      INSERT INTO conditions (title, summary, triggers, treatments, images)
      VALUES (?, ?, ?, ?, ?)
      `,
      [title, summary, triggers, treatments, images]
    )

    res.status(201).json({ success: true })
  } catch (err) {
    console.error("createCondition error:", err)
    res.status(500).json({ error: "Failed to create condition" })
  }
}

// =======================
// ADMIN: UPDATE CONDITION
// PUT /api/admin/conditions/:id
// =======================
export async function updateCondition(req, res) {
  try {
    const {
      title,
      summary = null,
      triggers = null,
      treatments = null,
      images = null,
    } = req.body

    const db = req.app.get("db")

    await db.run(
      `
      UPDATE conditions
      SET
        title = ?,
        summary = ?,
        triggers = ?,
        treatments = ?,
        images = ?
      WHERE id = ?
      `,
      [title, summary, triggers, treatments, images, req.params.id]
    )

    res.json({ success: true })
  } catch (err) {
    console.error("updateCondition error:", err)
    res.status(500).json({ error: "Failed to update condition" })
  }
}

// =======================
// ADMIN: DELETE CONDITION
// DELETE /api/admin/conditions/:id
// =======================
export async function deleteCondition(req, res) {
  try {
    const db = req.app.get("db")

    await db.run(
      `DELETE FROM conditions WHERE id = ?`,
      req.params.id
    )

    res.json({ success: true })
  } catch (err) {
    console.error("deleteCondition error:", err)
    res.status(500).json({ error: "Failed to delete condition" })
  }
}
