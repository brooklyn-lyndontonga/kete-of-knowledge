import path from "path"
import os from "os"
import fs from "fs"

const DB_PATH = path.join(os.tmpdir(), "sync-test.db")

process.env.SQLITE_DB_PATH = DB_PATH
process.env.APP_JWT_SECRET = "test-secret"
process.env.ADMIN_JWT_SECRET = "test-admin"
process.env.PORT = "3999"

for (const suffix of ["", "-wal", "-shm"]) {
  try {
    fs.unlinkSync(DB_PATH + suffix)
  } catch {
    // no previous run to clean up
  }
}

const { initSchema, getDB } = await import("../db/index.js")
const { initSyncSchema } = await import("../db/syncSchema.js")

await initSchema()
const db = await getDB()
await initSyncSchema(db)
console.log("✅ schema + sync schema created")

// create a user
await db.run("INSERT OR IGNORE INTO app_users (email) VALUES (?)", ["tester@example.com"])
const user = await db.get("SELECT * FROM app_users WHERE email = ?", ["tester@example.com"])
console.log("✅ user id", user.id)

const { syncUserData, deleteUserData } = await import("../controllers/app/sync.js")

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(c) { this.statusCode = c; return this },
    json(b) { this.body = b; return this },
  }
}

// ---- Push from device A ----
let res = mockRes()
await syncUserData({
  user: { sub: user.id },
  body: {
    since: null,
    device_id: "deviceA",
    changes: {
      symptoms: [
        { uuid: "s-1", symptom: "Chest tightness", severity: "3", notes: "after stairs", tags: "", logged_at: "2026-07-20T09:00:00.000Z", updated_at: "2026-07-20T09:00:00.000Z", deleted_at: null },
      ],
      medicines: [
        { uuid: "m-1", name: "Metoprolol", type: "tablet", dosage: "25mg", notes: "", active: "1", updated_at: "2026-07-20T09:01:00.000Z", deleted_at: null },
      ],
      checklists: [{ uuid: "c-1", title: "Morning routine", updated_at: "2026-07-20T09:02:00.000Z", deleted_at: null }],
      checklist_items: [
        { uuid: "ci-1", checklist_uuid: "c-1", label: "Take meds", done: "0", sort_order: "0", updated_at: "2026-07-20T09:02:00.000Z", deleted_at: null },
      ],
    },
  },
}, res)
console.log("✅ push A:", res.statusCode, "pushed:", res.body.pushed)
const firstSync = res.body.server_time

// ---- Device B pulls everything ----
res = mockRes()
await syncUserData({ user: { sub: user.id }, body: { since: null, device_id: "deviceB", changes: {} } }, res)
console.log("✅ pull B: symptoms", res.body.changes.symptoms?.length, "| medicines", res.body.changes.medicines?.length, "| checklist_items", res.body.changes.checklist_items?.length)
console.log("   item links to parent:", res.body.changes.checklist_items[0].checklist_uuid === "c-1")

// ---- Conflict: device B sends an OLDER edit, must be rejected ----
res = mockRes()
await syncUserData({
  user: { sub: user.id },
  body: { since: firstSync, device_id: "deviceB", changes: {
    symptoms: [{ uuid: "s-1", symptom: "STALE OVERWRITE", severity: "9", notes: "", tags: "", logged_at: "2026-07-19T00:00:00.000Z", updated_at: "2026-07-19T00:00:00.000Z", deleted_at: null }],
  }},
}, res)
let row = await db.get("SELECT symptom FROM user_symptoms WHERE uuid='s-1'")
console.log("✅ stale write rejected:", row.symptom === "Chest tightness", `(value is "${row.symptom}")`)

// ---- Conflict: newer edit wins ----
res = mockRes()
await syncUserData({
  user: { sub: user.id },
  body: { since: firstSync, device_id: "deviceB", changes: {
    symptoms: [{ uuid: "s-1", symptom: "Chest tightness (updated)", severity: "2", notes: "", tags: "", logged_at: "2026-07-21T00:00:00.000Z", updated_at: "2026-07-21T00:00:00.000Z", deleted_at: null }],
  }},
}, res)
row = await db.get("SELECT symptom FROM user_symptoms WHERE uuid='s-1'")
console.log("✅ newer write accepted:", row.symptom === "Chest tightness (updated)")

// ---- Incremental pull: device A asks for changes since its first sync ----
res = mockRes()
await syncUserData({ user: { sub: user.id }, body: { since: firstSync, device_id: "deviceA", changes: {} } }, res)
console.log("✅ incremental pull returns only changed rows:", JSON.stringify(Object.keys(res.body.changes)), res.body.changes.symptoms?.length === 1)

// ---- Tombstone delete propagates ----
res = mockRes()
await syncUserData({
  user: { sub: user.id },
  body: { since: null, device_id: "deviceA", changes: {
    medicines: [{ uuid: "m-1", name: "Metoprolol", type: "tablet", dosage: "25mg", notes: "", active: "0", updated_at: "2026-07-22T00:00:00.000Z", deleted_at: "2026-07-22T00:00:00.000Z" }],
  }},
}, res)
res = mockRes()
await syncUserData({ user: { sub: user.id }, body: { since: null, device_id: "deviceB", changes: {} } }, res)
const med = res.body.changes.medicines.find(m => m.uuid === "m-1")
console.log("✅ tombstone propagates:", Boolean(med.deleted_at))

// ---- User isolation ----
await db.run("INSERT OR IGNORE INTO app_users (email) VALUES (?)", ["other@example.com"])
const other = await db.get("SELECT * FROM app_users WHERE email = ?", ["other@example.com"])
res = mockRes()
await syncUserData({ user: { sub: other.id }, body: { since: null, device_id: "x", changes: {} } }, res)
console.log("✅ other user sees nothing:", Object.keys(res.body.changes).length === 0)

// ---- Bad input ----
res = mockRes()
await syncUserData({ user: { sub: user.id }, body: { since: "not-a-date", changes: {} } }, res)
console.log("✅ rejects bad timestamp:", res.statusCode === 400)

res = mockRes()
await syncUserData({ user: {}, body: {} }, res)
console.log("✅ rejects unauthenticated:", res.statusCode === 401)

// ---- Server-side delete ----
res = mockRes()
await deleteUserData({ user: { sub: user.id } }, res)
const remaining = await db.get("SELECT COUNT(*) as n FROM user_symptoms WHERE user_id = ?", [user.id])
console.log("✅ server-side wipe:", res.body.ok === true && remaining.n === 0)

process.exit(0)
