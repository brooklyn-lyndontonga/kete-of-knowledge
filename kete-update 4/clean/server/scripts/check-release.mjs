/**
 * Release readiness check.
 *
 * Verifies the things that are easy to forget and expensive to miss.
 * It cannot tell you the app works — only a device can do that — but it
 * will stop you submitting with placeholder URLs or committed secrets.
 *
 *   npm run check:release
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"

const ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.."
)

let failures = 0
let warnings = 0

function fail(label, detail) {
  console.log(`  BLOCKER   ${label}`)
  if (detail) console.log(`            ${detail}`)
  failures++
}
function warn(label, detail) {
  console.log(`  WARNING   ${label}`)
  if (detail) console.log(`            ${detail}`)
  warnings++
}
function pass(label) {
  console.log(`  ok        ${label}`)
}

function read(relative) {
  try {
    return fs.readFileSync(path.join(ROOT, relative), "utf8")
  } catch {
    return null
  }
}

console.log("\nRelease readiness — Kete of Knowledge\n")

// ── 1. Client-specific values ────────────────────────────
console.log("Client configuration")
const config = read("clean/mobile/src/config.js")
if (!config) {
  fail("config.js not found")
} else {
  const placeholders = [...config.matchAll(/(\w+): "REPLACE_ME[^"]*"/g)].map(
    (m) => m[1]
  )
  if (placeholders.length) {
    fail(
      `${placeholders.length} value(s) still placeholder`,
      `${placeholders.join(", ")} — Apple rejects without a live privacy policy URL`
    )
  } else {
    pass("privacy policy, terms and support contact are set")
  }
}

// ── 2. Secrets ───────────────────────────────────────────
console.log("\nSecrets")
const envExample = read("clean/server/.env.example")
if (!envExample) {
  warn(".env.example not found")
} else {
  const suspicious = envExample
    .split("\n")
    .filter((line) => {
      const [key, ...rest] = line.split("=")
      const value = rest.join("=").trim()
      if (!value || line.trim().startsWith("#")) return false
      if (/replace|example\.|localhost|^\d+$/i.test(value)) return false
      return /SECRET|PASS|TOKEN|KEY/i.test(key)
    })
    .map((l) => l.split("=")[0])

  if (suspicious.length) {
    fail(
      `.env.example may contain real secrets`,
      `${suspicious.join(", ")} — replace with placeholders and rotate the real values`
    )
  } else {
    pass(".env.example contains no real-looking secrets")
  }
}

try {
  const tracked = execSync("git ls-files", { cwd: ROOT }).toString()
  const envFiles = tracked
    .split("\n")
    .filter((f) => /(^|\/)\.env$/.test(f.trim()))
  if (envFiles.length) {
    fail("a real .env file is committed", envFiles.join(", "))
  } else {
    pass("no .env files tracked by git")
  }
} catch {
  warn("could not check git for tracked .env files")
}

// ── 3. Content ───────────────────────────────────────────
console.log("\nContent")
const seed = read("clean/server/scripts/seed-content.js")
if (seed && /replace before launch/i.test(seed)) {
  warn(
    "seed script still contains placeholder content",
    "check the live database has real conditions, resources and whakataukī"
  )
} else {
  pass("no placeholder markers in the seed script")
}

// ── 4. Te reo review ─────────────────────────────────────
console.log("\nTe reo Māori")
const strings = read("clean/mobile/src/i18n/strings.js")
if (!strings) {
  fail("strings.js not found")
} else if (/NOT been reviewed by a native speaker/i.test(strings)) {
  fail(
    "te reo strings not yet marked as reviewed",
    "have a fluent speaker review src/i18n/strings.js, then remove that note"
  )
} else {
  pass("te reo strings marked as reviewed")
}

// ── 5. Native modules ────────────────────────────────────
console.log("\nNative modules")
const pkg = read("clean/mobile/package.json")
if (pkg) {
  const deps = JSON.parse(pkg).dependencies || {}
  if (!deps["expo-notifications"]) {
    warn(
      "expo-notifications not installed",
      "reminders will save but never alert — run: npx expo install expo-notifications"
    )
  } else {
    pass("expo-notifications installed")
  }
  if (!deps["@react-native-community/netinfo"]) {
    warn(
      "netinfo not installed",
      "sync runs on app foreground only, not on reconnect"
    )
  } else {
    pass("netinfo installed")
  }
}

// ── 6. Device testing ────────────────────────────────────
console.log("\nDevice testing")
const signoff = read("DEVICE_TEST_SIGNOFF.md")
if (!signoff) {
  fail(
    "no device test sign-off recorded",
    "work through docs/DEVICE_TEST_PLAN.md, then record the result in DEVICE_TEST_SIGNOFF.md"
  )
} else if (/\[ \]/.test(signoff)) {
  const remaining = (signoff.match(/\[ \]/g) || []).length
  fail(`${remaining} device test(s) not yet signed off`)
} else {
  pass("device testing signed off")
}

// ── Summary ──────────────────────────────────────────────
console.log("\n" + "─".repeat(56))
if (failures === 0 && warnings === 0) {
  console.log("Ready to submit.")
} else {
  console.log(
    `${failures} blocker(s), ${warnings} warning(s).\n` +
      (failures
        ? "Blockers must be cleared before store submission."
        : "No blockers — review the warnings and decide.")
  )
}
console.log("─".repeat(56) + "\n")

process.exit(failures === 0 ? 0 : 1)
