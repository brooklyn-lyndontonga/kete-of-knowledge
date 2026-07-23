import { getDB } from "../db"

export const CONSENT_VERSION = "1.0"

export async function hasAcceptedConsent() {
  const db = await getDB()
  const row = await db.getFirstAsync(
    `SELECT * FROM consent WHERE accepted = 1 AND version = ?
     ORDER BY id DESC LIMIT 1;`,
    [CONSENT_VERSION]
  )
  return Boolean(row)
}

export async function acceptConsent() {
  const db = await getDB()
  await db.runAsync(
    `INSERT INTO consent (accepted, version, accepted_at) VALUES (1, ?, ?);`,
    [CONSENT_VERSION, new Date().toISOString()]
  )
}
