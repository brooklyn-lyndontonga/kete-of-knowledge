import { getDB } from "../../../db/database.js"

/*
────────────────────────────────────────
CURRENT ACTIVE PROFILE (singular)
Used by /profile
────────────────────────────────────────
*/

// GET /profile
export async function getCurrentProfile(req, res) {
  try {
    const db = getDB()

    // TEMP: assumes single active profile
    // Later: swap to auth-based or selected profile
    const profile = await db.get(`
      SELECT *
      FROM profiles
      ORDER BY id ASC
      LIMIT 1
    `)

    res.json(profile ?? null)
  } catch (err) {
    console.error("❌ getCurrentProfile:", err)
    res.status(500).json({ error: "Failed to load profile" })
  }
}

// PUT /profile
export async function updateCurrentProfile(req, res) {
  try {
    const db = getDB()
    const { name, age, notes } = req.body

    await db.run(
      `
      UPDATE profiles
      SET name = ?, age = ?, notes = ?
      WHERE id = (
        SELECT id FROM profiles ORDER BY id ASC LIMIT 1
      )
      `,
      [name, age, notes]
    )

    res.json({ success: true })
  } catch (err) {
    console.error("❌ updateCurrentProfile:", err)
    res.status(500).json({ error: "Failed to update profile" })
  }
}

/*
────────────────────────────────────────
PROFILE COLLECTION (plural)
Used by /profiles
────────────────────────────────────────
*/

// GET /profiles
export async function getProfiles(req, res) {
  try {
    const db = getDB()
    const rows = await db.all(`SELECT * FROM profiles`)
    res.json(rows)
  } catch (err) {
    console.error("❌ getProfiles:", err)
    res.status(500).json({ error: "Failed to load profiles" })
  }
}

// POST /profiles
export async function createProfile(req, res) {
  try {
    const db = getDB()
    const { name, age, notes } = req.body

    const result = await db.run(
      `
      INSERT INTO profiles (name, age, notes)
      VALUES (?, ?, ?)
      `,
      [name, age, notes]
    )

    res.status(201).json({
      id: result.lastID,
      name,
      age,
      notes,
    })
  } catch (err) {
    console.error("❌ createProfile:", err)
    res.status(500).json({ error: "Failed to create profile" })
  }
}

// PUT /profiles/:id
export async function updateProfile(req, res) {
  try {
    const db = getDB()
    const { name, age, notes } = req.body

    await db.run(
      `
      UPDATE profiles
      SET name = ?, age = ?, notes = ?
      WHERE id = ?
      `,
      [name, age, notes, req.params.id]
    )

    res.json({ success: true })
  } catch (err) {
    console.error("❌ updateProfile:", err)
    res.status(500).json({ error: "Failed to update profile" })
  }
}

// DELETE /profiles/:id
export async function removeProfile(req, res) {
  try {
    const db = getDB()

    await db.run(
      `DELETE FROM profiles WHERE id = ?`,
      req.params.id
    )

    res.json({ success: true })
  } catch (err) {
    console.error("❌ removeProfile:", err)
    res.status(500).json({ error: "Failed to delete profile" })
  }
}
