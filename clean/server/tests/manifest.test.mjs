/**
 * The sync manifest is duplicated between server and mobile because the
 * two packages have no shared module boundary. Duplication is a liability,
 * so this test fails loudly the moment the two copies disagree on anything
 * that matters — table names, remote names, or column lists.
 *
 * The header comments intentionally differ (each points at the other file)
 * and are not compared.
 */
import { fileURLToPath } from "url"
import path from "path"

const __dir = path.dirname(fileURLToPath(import.meta.url))
const SERVER = path.resolve(__dir, "..")
const MOBILE = path.resolve(__dir, "../../mobile/src/sync")

const server = await import(`${SERVER}/db/syncManifest.js`)
const mobile = await import(`${MOBILE}/manifest.js`)

let failures = 0

function check(label, ok, detail = "") {
  console.log(`${ok ? "✅" : "❌"} ${label}${detail ? " — " + detail : ""}`)
  if (!ok) failures++
}

const s = server.SYNC_TABLES
const m = mobile.SYNC_TABLES

check("same number of synced tables", s.length === m.length, `server ${s.length}, mobile ${m.length}`)

const serverKeys = s.map((t) => t.local).sort()
const mobileKeys = m.map((t) => t.local).sort()
check(
  "same local table names",
  JSON.stringify(serverKeys) === JSON.stringify(mobileKeys),
  `server [${serverKeys}] vs mobile [${mobileKeys}]`
)

for (const table of s) {
  const twin = m.find((t) => t.local === table.local)
  if (!twin) {
    check(`"${table.local}" exists on both sides`, false)
    continue
  }
  check(
    `"${table.local}" remote name matches`,
    table.remote === twin.remote,
    `${table.remote} vs ${twin.remote}`
  )
  check(
    `"${table.local}" columns match`,
    JSON.stringify(table.columns) === JSON.stringify(twin.columns),
    JSON.stringify(table.columns) === JSON.stringify(twin.columns)
      ? ""
      : `${JSON.stringify(table.columns)} vs ${JSON.stringify(twin.columns)}`
  )
}

check(
  "meta columns match",
  JSON.stringify(server.SYNC_META_COLUMNS) ===
    JSON.stringify(mobile.SYNC_META_COLUMNS)
)

console.log(
  failures === 0
    ? "\nManifests are in sync."
    : `\n${failures} mismatch(es). Update both copies before shipping.`
)

process.exit(failures === 0 ? 0 : 1)
