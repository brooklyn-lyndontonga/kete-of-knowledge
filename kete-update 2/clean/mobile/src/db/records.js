import { getDB } from "./index"

/**
 * RFC4122 v4 identifier. Uses the platform CSPRNG where available and
 * falls back to Math.random, which is fine here - these are local record
 * keys, not secrets.
 */
export function newUuid() {
  const bytes = new Uint8Array(16)

  if (typeof globalThis.crypto?.getRandomValues === "function") {
    globalThis.crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256)
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20),
  ].join("-")
}

export function now() {
  return new Date().toISOString()
}

/**
 * Inserts a row with sync metadata attached.
 */
export async function insertRecord(table, fields) {
  const db = await getDB()
  const uuid = fields.uuid || newUuid()
  const timestamp = now()

  const payload = { ...fields, uuid, updated_at: timestamp, dirty: 1 }
  const columns = Object.keys(payload)
  const placeholders = columns.map(() => "?").join(", ")

  const result = await db.runAsync(
    `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders});`,
    columns.map((c) => payload[c])
  )

  return { id: result.lastInsertRowId, uuid, updated_at: timestamp, ...fields }
}

/**
 * Updates a row by local id and marks it for sync.
 */
export async function updateRecord(table, id, fields) {
  const db = await getDB()
  const timestamp = now()

  const payload = { ...fields, updated_at: timestamp, dirty: 1 }
  const setClause = Object.keys(payload)
    .map((c) => `${c} = ?`)
    .join(", ")

  await db.runAsync(`UPDATE ${table} SET ${setClause} WHERE id = ?;`, [
    ...Object.values(payload),
    id,
  ])

  return { id, updated_at: timestamp, ...fields }
}

/**
 * Tombstones a row rather than removing it, so the delete can reach
 * the server and any other device. Rows are hard-removed only once
 * the tombstone has been acknowledged.
 */
export async function softDeleteRecord(table, id) {
  const db = await getDB()
  const timestamp = now()

  await db.runAsync(
    `UPDATE ${table} SET deleted_at = ?, updated_at = ?, dirty = 1 WHERE id = ?;`,
    [timestamp, timestamp, id]
  )
}

/**
 * Reads live (non-tombstoned) rows.
 */
export async function listRecords(
  table,
  { orderBy = "id DESC", where = "", params = [] } = {}
) {
  const db = await getDB()
  const filter = where ? `AND ${where}` : ""

  return db.getAllAsync(
    `SELECT * FROM ${table} WHERE deleted_at IS NULL ${filter} ORDER BY ${orderBy};`,
    params
  )
}

export async function getRecord(table, id) {
  const db = await getDB()
  return db.getFirstAsync(
    `SELECT * FROM ${table} WHERE id = ? AND deleted_at IS NULL;`,
    [id]
  )
}

/**
 * Backfills uuids for rows created before sync existed, so an existing
 * beta install doesn't lose its data when it first syncs.
 */
export async function backfillUuids(tables) {
  const db = await getDB()

  for (const table of tables) {
    const rows = await db.getAllAsync(
      `SELECT id FROM ${table} WHERE uuid IS NULL OR uuid = '';`
    )
    for (const row of rows) {
      await db.runAsync(
        `UPDATE ${table} SET uuid = ?, updated_at = COALESCE(updated_at, ?), dirty = 1 WHERE id = ?;`,
        [newUuid(), now(), row.id]
      )
    }
  }
}
