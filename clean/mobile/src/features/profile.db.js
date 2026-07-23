import { getDB } from "../db"

function parseJson(value, fallback) {
  if (!value) return fallback
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

export async function getProfile() {
  const db = await getDB()

  const row = await db.getFirstAsync(
    `SELECT * FROM profiles ORDER BY id DESC LIMIT 1;`
  )
  if (!row) return null

  return {
    ...row,
    health_providers: parseJson(row.health_providers, []),
    emergency_contacts: parseJson(row.emergency_contacts, []),
  }
}

/**
 * Upserts the single local profile rather than inserting a new row
 * every save, which is what the previous version did.
 */
export async function saveProfile(profile) {
  const db = await getDB()
  const {
    name = "",
    dob = "",
    photo_uri = null,
    health_info = "",
    health_providers = [],
    emergency_contacts = [],
  } = profile || {}

  const timestamp = new Date().toISOString()
  const existing = await db.getFirstAsync(
    `SELECT id FROM profiles ORDER BY id DESC LIMIT 1;`
  )

  const params = [
    name,
    dob,
    photo_uri,
    health_info,
    JSON.stringify(health_providers || []),
    JSON.stringify(emergency_contacts || []),
    timestamp,
  ]

  if (existing) {
    await db.runAsync(
      `UPDATE profiles
       SET name = ?, dob = ?, photo_uri = ?, health_info = ?,
           health_providers = ?, emergency_contacts = ?, updated_at = ?
       WHERE id = ?;`,
      [...params, existing.id]
    )
    return { id: existing.id, ...profile }
  }

  const result = await db.runAsync(
    `INSERT INTO profiles
     (name, dob, photo_uri, health_info, health_providers, emergency_contacts, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    params
  )

  return { id: result.lastInsertRowId, ...profile }
}
