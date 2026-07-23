import { SYNC_TABLES } from "./syncManifest.js"

/**
 * Creates one table per synced entity, scoped to a user.
 *
 * (user_id, uuid) is unique - the device owns the uuid, so the same record
 * pushed from two devices resolves to one row rather than duplicating.
 */
export async function initSyncSchema(db) {
  for (const { remote, columns } of SYNC_TABLES) {
    const columnDefs = columns.map((c) => `      ${c} TEXT`).join(",\n")

    await db.exec(`
      CREATE TABLE IF NOT EXISTS ${remote} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        uuid TEXT NOT NULL,
${columnDefs},
        updated_at TEXT NOT NULL,
        deleted_at TEXT,
        server_updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES app_users(id) ON DELETE CASCADE
      );

      CREATE UNIQUE INDEX IF NOT EXISTS idx_${remote}_user_uuid
        ON ${remote} (user_id, uuid);

      CREATE INDEX IF NOT EXISTS idx_${remote}_user_updated
        ON ${remote} (user_id, server_updated_at);
    `)
  }

  // Records the last successful sync per device, useful for support.
  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_sync_state (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      device_id TEXT NOT NULL,
      last_synced_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES app_users(id) ON DELETE CASCADE
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_user_sync_state_device
      ON user_sync_state (user_id, device_id);
  `)
}
