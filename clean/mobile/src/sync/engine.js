import AsyncStorage from "@react-native-async-storage/async-storage"

import { getDB } from "../db"
import { newUuid } from "../db/records"
import { SYNC_TABLES, tableByLocal } from "./manifest"
import { API_BASE_URL } from "../api/apiConfig"

const LAST_SYNC_KEY = "sync:last_server_time"
const DEVICE_ID_KEY = "sync:device_id"
const PUSH_BATCH_LIMIT = 500

let inFlight = null

async function getDeviceId() {
  let id = await AsyncStorage.getItem(DEVICE_ID_KEY)
  if (!id) {
    id = newUuid()
    await AsyncStorage.setItem(DEVICE_ID_KEY, id)
  }
  return id
}

export async function getLastSyncedAt() {
  return AsyncStorage.getItem(LAST_SYNC_KEY)
}

export async function clearSyncState() {
  await AsyncStorage.removeItem(LAST_SYNC_KEY)
}

/**
 * Collects every locally-modified row across all synced tables.
 */
async function collectLocalChanges() {
  const db = await getDB()
  const changes = {}
  let count = 0

  for (const table of SYNC_TABLES) {
    if (count >= PUSH_BATCH_LIMIT) break

    const rows = await db.getAllAsync(
      `SELECT * FROM ${table.local} WHERE dirty = 1 LIMIT ?;`,
      [PUSH_BATCH_LIMIT - count]
    )
    if (!rows.length) continue

    changes[table.local] = rows.map((row) => {
      const out = {
        uuid: row.uuid,
        updated_at: row.updated_at,
        deleted_at: row.deleted_at || null,
      }
      for (const c of table.columns) {
        out[c] = row[c] === null || row[c] === undefined ? null : String(row[c])
      }
      return out
    })

    count += rows.length
  }

  return { changes, count }
}

/**
 * Applies server rows locally. Local rows are only overwritten when the
 * incoming updated_at is newer, matching the server's rule so both sides
 * converge on the same winner.
 */
async function applyRemoteChanges(remote) {
  const db = await getDB()
  let applied = 0

  for (const [localName, rows] of Object.entries(remote || {})) {
    const table = tableByLocal(localName)
    if (!table || !Array.isArray(rows)) continue

    for (const row of rows) {
      if (!row?.uuid) continue

      const existing = await db.getFirstAsync(
        `SELECT id, updated_at FROM ${table.local} WHERE uuid = ?;`,
        [row.uuid]
      )

      if (
        existing &&
        existing.updated_at &&
        Date.parse(row.updated_at) <= Date.parse(existing.updated_at)
      ) {
        continue
      }

      const values = table.columns.map((c) =>
        row[c] === undefined ? null : row[c]
      )

      if (existing) {
        const setClause = table.columns.map((c) => `${c} = ?`).join(", ")
        await db.runAsync(
          `UPDATE ${table.local}
           SET ${setClause}, updated_at = ?, deleted_at = ?, dirty = 0
           WHERE id = ?;`,
          [...values, row.updated_at, row.deleted_at || null, existing.id]
        )
      } else {
        const cols = [
          "uuid",
          ...table.columns,
          "updated_at",
          "deleted_at",
          "dirty",
        ]
        const placeholders = cols.map(() => "?").join(", ")
        await db.runAsync(
          `INSERT INTO ${table.local} (${cols.join(", ")}) VALUES (${placeholders});`,
          [row.uuid, ...values, row.updated_at, row.deleted_at || null, 0]
        )
      }

      applied++
    }
  }

  return applied
}

/**
 * Relinks checklist items to their parent after a pull, since local
 * autoincrement ids differ from the ones on the originating device.
 */
async function relinkChecklistItems() {
  const db = await getDB()
  await db.runAsync(`
    UPDATE checklist_items
    SET checklist_id = (
      SELECT id FROM checklists WHERE checklists.uuid = checklist_items.checklist_uuid
    )
    WHERE checklist_uuid IS NOT NULL
      AND (
        checklist_id IS NULL
        OR checklist_id NOT IN (SELECT id FROM checklists)
      );
  `)
}

/**
 * Clears the dirty flag on rows the server accepted, and hard-removes
 * tombstones once they've been acknowledged.
 */
async function finalisePush(pushedChanges) {
  const db = await getDB()

  for (const [localName, rows] of Object.entries(pushedChanges)) {
    const table = tableByLocal(localName)
    if (!table) continue

    for (const row of rows) {
      if (row.deleted_at) {
        await db.runAsync(`DELETE FROM ${table.local} WHERE uuid = ?;`, [
          row.uuid,
        ])
      } else {
        await db.runAsync(
          `UPDATE ${table.local} SET dirty = 0 WHERE uuid = ? AND updated_at = ?;`,
          [row.uuid, row.updated_at]
        )
      }
    }
  }
}

/**
 * Runs one full sync cycle. Safe to call often - concurrent calls share
 * the same in-flight promise rather than stacking up.
 *
 * Returns { ok, reason?, pushed, pulled }.
 */
export async function syncNow(token) {
  if (!token)
    return { ok: false, reason: "not-signed-in", pushed: 0, pulled: 0 }
  if (inFlight) return inFlight

  inFlight = (async () => {
    try {
      const [since, deviceId] = await Promise.all([
        getLastSyncedAt(),
        getDeviceId(),
      ])
      const { changes, count } = await collectLocalChanges()

      const res = await fetch(`${API_BASE_URL}/app/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ since, device_id: deviceId, changes }),
      })

      if (res.status === 401) {
        return { ok: false, reason: "session-expired", pushed: 0, pulled: 0 }
      }
      if (!res.ok) {
        return {
          ok: false,
          reason: `server-${res.status}`,
          pushed: 0,
          pulled: 0,
        }
      }

      const body = await res.json()

      await finalisePush(changes)
      const pulled = await applyRemoteChanges(body.changes)
      await relinkChecklistItems()

      if (body.server_time) {
        await AsyncStorage.setItem(LAST_SYNC_KEY, body.server_time)
      }

      return { ok: true, pushed: count, pulled }
    } catch (err) {
      // Offline is the normal case here, not an error worth surfacing.
      return {
        ok: false,
        reason: "offline",
        pushed: 0,
        pulled: 0,
        error: err?.message,
      }
    } finally {
      inFlight = null
    }
  })()

  return inFlight
}

/**
 * Asks the server to delete everything it holds for this user.
 */
export async function deleteRemoteData(token) {
  if (!token) return { ok: false, reason: "not-signed-in" }

  try {
    const res = await fetch(`${API_BASE_URL}/app/sync`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) return { ok: false, reason: `server-${res.status}` }
    await clearSyncState()
    return { ok: true }
  } catch (err) {
    return { ok: false, reason: "offline", error: err?.message }
  }
}

export async function countPendingChanges() {
  const db = await getDB()
  let total = 0

  for (const table of SYNC_TABLES) {
    try {
      const row = await db.getFirstAsync(
        `SELECT COUNT(*) as n FROM ${table.local} WHERE dirty = 1;`
      )
      total += row?.n || 0
    } catch {
      // table may not exist on an older install
    }
  }

  return total
}
