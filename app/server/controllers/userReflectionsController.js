// server/controllers/userReflectionsController.js

// GET /api/user/reflections?user_id=abc&template_id=1
export async function getAllUserReflections(req, res) {
  try {
    const db = req.app.get("db")
    const { user_id, template_id } = req.query

    let sql = "SELECT * FROM user_reflections"
    const params = []
    const conditions = []

    if (user_id) {
      conditions.push("user_id = ?")
      params.push(user_id)
    }

    if (template_id) {
      conditions.push("template_id = ?")
      params.push(template_id)
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ")
    }

    sql += " ORDER BY created_at DESC"

    const reflections = await db.all(sql, params)
    res.json(reflections)
  } catch (err) {
    console.error("Error getting user reflections:", err)
    res.status(500).json({ error: "Failed to fetch user reflections" })
  }
}

// GET /api/user/reflections/:id
export async function getUserReflectionById(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params

    const reflection = await db.get(
      "SELECT * FROM user_reflections WHERE id = ?",
      [id]
    )

    if (!reflection) {
      return res.status(404).json({ error: "User reflection not found" })
    }

    res.json(reflection)
  } catch (err) {
    console.error("Error getting user reflection:", err)
    res.status(500).json({ error: "Failed to fetch user reflection" })
  }
}

// POST /api/user/reflections
export async function createUserReflection(req, res) {
  try {
    const db = req.app.get("db")
    const { template_id, user_id, response } = req.body

    if (!template_id || !user_id || !response) {
      return res.status(400).json({
        error: "template_id, user_id, and response are required",
      })
    }

    const result = await db.run(
      `
      INSERT INTO user_reflections (template_id, user_id, response)
      VALUES (?, ?, ?)
      `,
      [template_id, user_id, response]
    )

    const newReflection = await db.get(
      "SELECT * FROM user_reflections WHERE id = ?",
      [result.lastID]
    )

    res.status(201).json(newReflection)
  } catch (err) {
    console.error("Error creating user reflection:", err)
    res.status(500).json({ error: "Failed to create user reflection" })
  }
}

// PUT /api/user/reflections/:id
export async function updateUserReflection(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params
    const { response } = req.body

    const existing = await db.get(
      "SELECT * FROM user_reflections WHERE id = ?",
      [id]
    )

    if (!existing) {
      return res.status(404).json({ error: "User reflection not found" })
    }

    const newResponse = response ?? existing.response

    await db.run(
      `
      UPDATE user_reflections
      SET response = ?
      WHERE id = ?
      `,
      [newResponse, id]
    )

    const updated = await db.get(
      "SELECT * FROM user_reflections WHERE id = ?",
      [id]
    )

    res.json(updated)
  } catch (err) {
    console.error("Error updating user reflection:", err)
    res.status(500).json({ error: "Failed to update user reflection" })
  }
}

// DELETE /api/user/reflections/:id
export async function deleteUserReflection(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params

    const result = await db.run(
      "DELETE FROM user_reflections WHERE id = ?",
      [id]
    )

    if (result.changes === 0) {
      return res.status(404).json({ error: "User reflection not found" })
    }

    res.sendStatus(204)
  } catch (err) {
    console.error("Error deleting user reflection:", err)
    res.status(500).json({ error: "Failed to delete user reflection" })
  }
}
