import { getDB } from "../../db/index.js"
import { SYNC_TABLES, tableByLocal } from "../../db/syncManifest.js"

const MAX_ROWS_PER_PUSH = 2000

function isValidIso(value) {
  if (typeof value !== "string") return false
  const t = Date.parse(value)
  return !Number.isNaN(t)
}

/**
 * POST /api/app/sync
 *
 * Body:  { since: ISO|null, device_id: string, changes: { <localTable>: [rows] } }
 * Reply: { server_time, changes: { <localTable>: [rows] }, pushed: n }
 *
 * Conflict resolution is last-write-wins on the row's updated_at. A row is
 * only overwritten if the incoming updated_at is strictly newer, so a stale
 * device replaying old edits can't clobber newer data.
 */
export async function syncUserData(req, res) {
  const userId = req.user?.sub
  if (!userId) return res.status(401).json({ error: "Not authenticated" })

  const { since = null, device_id: deviceId = "unknown", changes = {} } = req.body || {}

  if (since !== null && !isValidIso(since)) {
    return res.status(400).json({ error: "Invalid 'since' timestamp" })
  }

  const totalIncoming = Object.values(changes).reduce(
    (n, rows) => n + (Array.isArray(rows) ? rows.length : 0),
    0
  )
  if (totalIncoming > MAX_ROWS_PER_PUSH) {
    return res.status(413).json({
      error: `Too many rows in one sync (${totalIncoming}). Send at most ${MAX_ROWS_PER_PUSH}.`,
    })
  }

  try {
    const db = await getDB()

    // A token can outlive its account (deleted user, restored database).
    // Fail as "not authenticated" so the app signs out cleanly rather
    // than surfacing a server error the person can't act on.
    const account = await db.get(`SELECT id FROM app_users WHERE id = ?`, [userId])
    if (!account) {
      return res.status(401).json({ error: "Account no longer exists" })
    }

    const serverTime = new Date().toISOString()
    let pushed = 0

    await db.exec("BEGIN")

    try {
      // ---------- PUSH: device changes up to the server ----------
      for (const [localName, rows] of Object.entries(changes)) {
        const table = tableByLocal(localName)
        if (!table || !Array.isArray(rows)) continue

        for (const row of rows) {
          if (!row?.uuid || !isValidIso(row.updated_at)) continue

          const existing = await db.get(
            `SELECT uuid, updated_at FROM ${table.remote}
             WHERE user_id = ? AND uuid = ?`,
            [userId, row.uuid]
          )

          // Last-write-wins: ignore anything not strictly newer.
          if (existing && Date.parse(row.updated_at) <= Date.parse(existing.updated_at)) {
            continue
          }

          const values = table.columns.map((c) =>
            row[c] === undefined || row[c] === null ? null : String(row[c])
          )

          if (existing) {
            const setClause = table.columns.map((c) => `${c} = ?`).join(", ")
            await db.run(
              `UPDATE ${table.remote}
               SET ${setClause}, updated_at = ?, deleted_at = ?, server_updated_at = ?
               WHERE user_id = ? AND uuid = ?`,
              [...values, row.updated_at, row.deleted_at || null, serverTime, userId, row.uuid]
            )
          } else {
            const cols = ["user_id", "uuid", ...table.columns, "updated_at", "deleted_at", "server_updated_at"]
            const placeholders = cols.map(() => "?").join(", ")
            await db.run(
              `INSERT INTO ${table.remote} (${cols.join(", ")}) VALUES (${placeholders})`,
              [userId, row.uuid, ...values, row.updated_at, row.deleted_at || null, serverTime]
            )
          }

          pushed++
        }
      }

      // ---------- PULL: server changes down to the device ----------
      const outgoing = {}

      for (const table of SYNC_TABLES) {
        const rows = since
          ? await db.all(
              `SELECT * FROM ${table.remote}
               WHERE user_id = ? AND server_updated_at > ?
               ORDER BY server_updated_at ASC`,
              [userId, since]
            )
          : await db.all(
              `SELECT * FROM ${table.remote} WHERE user_id = ?
               ORDER BY server_updated_at ASC`,
              [userId]
            )

        if (rows.length) {
          outgoing[table.local] = rows.map((r) => {
            const out = { uuid: r.uuid, updated_at: r.updated_at, deleted_at: r.deleted_at }
            for (const c of table.columns) out[c] = r[c]
            return out
          })
        }
      }

      await db.run(
        `INSERT INTO user_sync_state (user_id, device_id, last_synced_at)
         VALUES (?, ?, ?)
         ON CONFLICT(user_id, device_id)
         DO UPDATE SET last_synced_at = excluded.last_synced_at`,
        [userId, String(deviceId).slice(0, 100), serverTime]
      )

      await db.exec("COMMIT")

      return res.json({ server_time: serverTime, changes: outgoing, pushed })
    } catch (err) {
      await db.exec("ROLLBACK")
      throw err
    }
  } catch (err) {
    console.error("Sync failed:", err)
    return res.status(500).json({ error: "Sync failed" })
  }
}

/**
 * DELETE /api/app/sync
 * Removes every synced row for this user. Backs "delete my data" when the
 * person wants it gone from the server as well as the device.
 */
export async function deleteUserData(req, res) {
  const userId = req.user?.sub
  if (!userId) return res.status(401).json({ error: "Not authenticated" })

  try {
    const db = await getDB()
    await db.exec("BEGIN")
    try {
      for (const { remote } of SYNC_TABLES) {
        await db.run(`DELETE FROM ${remote} WHERE user_id = ?`, [userId])
      }
      await db.run(`DELETE FROM user_sync_state WHERE user_id = ?`, [userId])
      await db.exec("COMMIT")
    } catch (err) {
      await db.exec("ROLLBACK")
      throw err
    }

    return res.json({ ok: true })
  } catch (err) {
    console.error("Delete user data failed:", err)
    return res.status(500).json({ error: "Could not delete data" })
  }
}
