// server/controllers/profileSeedsController.js

// GET /api/profile-seeds
export async function getAllProfileSeeds(req, res) {
  try {
    const db = req.app.get("db")
    const seeds = await db.all("SELECT * FROM profile_seeds")
    res.json(seeds)
  } catch (err) {
    console.error("Error getting profile seeds:", err)
    res.status(500).json({ error: "Failed to fetch profile seeds" })
  }
}

// GET /api/profile-seeds/:id
export async function getProfileSeedById(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params

    const seed = await db.get("SELECT * FROM profile_seeds WHERE id = ?", [
      id,
    ])

    if (!seed) {
      return res.status(404).json({ error: "Profile seed not found" })
    }

    res.json(seed)
  } catch (err) {
    console.error("Error getting profile seed:", err)
    res.status(500).json({ error: "Failed to fetch profile seed" })
  }
}

// POST /api/profile-seeds
export async function createProfileSeed(req, res) {
  try {
    const db = req.app.get("db")
    const { name, value } = req.body

    if (!name) {
      return res.status(400).json({ error: "name is required" })
    }

    const result = await db.run(
      `
      INSERT INTO profile_seeds (name, value)
      VALUES (?, ?)
      `,
      [name, value ?? null]
    )

    const newSeed = await db.get("SELECT * FROM profile_seeds WHERE id = ?", [
      result.lastID,
    ])

    res.status(201).json(newSeed)
  } catch (err) {
    console.error("Error creating profile seed:", err)
    res.status(500).json({ error: "Failed to create profile seed" })
  }
}

// PUT /api/profile-seeds/:id
export async function updateProfileSeed(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params
    const { name, value } = req.body

    const existing = await db.get("SELECT * FROM profile_seeds WHERE id = ?", [
      id,
    ])

    if (!existing) {
      return res.status(404).json({ error: "Profile seed not found" })
    }

    const newName = name ?? existing.name
    const newValue = value ?? existing.value

    await db.run(
      `
      UPDATE profile_seeds
      SET name = ?, value = ?
      WHERE id = ?
      `,
      [newName, newValue, id]
    )

    const updated = await db.get("SELECT * FROM profile_seeds WHERE id = ?", [
      id,
    ])

    res.json(updated)
  } catch (err) {
    console.error("Error updating profile seed:", err)
    res.status(500).json({ error: "Failed to update profile seed" })
  }
}

// DELETE /api/profile-seeds/:id
export async function deleteProfileSeed(req, res) {
  try {
    const db = req.app.get("db")
    const { id } = req.params

    const result = await db.run("DELETE FROM profile_seeds WHERE id = ?", [
      id,
    ])

    if (result.changes === 0) {
      return res.status(404).json({ error: "Profile seed not found" })
    }

    res.sendStatus(204)
  } catch (err) {
    console.error("Error deleting profile seed:", err)
    res.status(500).json({ error: "Failed to delete profile seed" })
  }
}
