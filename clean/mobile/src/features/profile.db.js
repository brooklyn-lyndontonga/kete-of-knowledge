import { getDB } from "../db/index.js"

// Uses the modern expo-sqlite (SDK 51+) API.
//
// Behaviour change from the original: saveProfile now UPDATES the existing
// profile row if one exists, instead of inserting a brand-new row on every
// save. (Previously, every edit or photo change created another row and
// the app just read the most recent one, silently accumulating orphans.)

// -------------------------
// Get the current profile
// -------------------------
export async function getProfile() {
  const db = getDB()

  const row = await db.getFirstAsync(
    `SELECT * FROM profiles ORDER BY id DESC LIMIT 1`
  )

  return row || null
}

// -------------------------
// Create or update the profile
// -------------------------
export async function saveProfile(profile) {
  const db = getDB()

  const {
    name = null,
    dob = null,
    photo_uri = null,
    health_info = null,
    health_providers,
    emergency_contacts,
  } = profile || {}

  const providersJson = JSON.stringify(health_providers || [])
  const contactsJson = JSON.stringify(emergency_contacts || [])

  const existing = await db.getFirstAsync(
    `SELECT id FROM profiles ORDER BY id DESC LIMIT 1`
  )

  if (existing) {
    await db.runAsync(
      `UPDATE profiles
       SET name = ?, dob = ?, photo_uri = ?, health_info = ?,
           health_providers = ?, emergency_contacts = ?
       WHERE id = ?`,
      [name, dob, photo_uri, health_info, providersJson, contactsJson, existing.id]
    )
    return { id: existing.id }
  }

  const result = await db.runAsync(
    `INSERT INTO profiles
     (name, dob, photo_uri, health_info, health_providers, emergency_contacts)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, dob, photo_uri, health_info, providersJson, contactsJson]
  )

  return { id: result.lastInsertRowId }
}
