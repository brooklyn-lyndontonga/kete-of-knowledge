import { getDB } from "../db"
import { insertRecord, updateRecord } from "../db/records"

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
    `SELECT * FROM profiles WHERE deleted_at IS NULL ORDER BY id DESC LIMIT 1;`
  )
  if (!row) return null

  return {
    ...row,
    health_providers: parseJson(row.health_providers, []),
    emergency_contacts: parseJson(row.emergency_contacts, []),
  }
}

/** Upserts the single local profile rather than inserting a new row each save. */
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

  const fields = {
    name,
    dob,
    photo_uri,
    health_info,
    health_providers: JSON.stringify(health_providers || []),
    emergency_contacts: JSON.stringify(emergency_contacts || []),
  }

  const existing = await db.getFirstAsync(
    `SELECT id FROM profiles WHERE deleted_at IS NULL ORDER BY id DESC LIMIT 1;`
  )

  if (existing) return updateRecord("profiles", existing.id, fields)
  return insertRecord("profiles", fields)
}
