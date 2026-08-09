const DEFAULT_BASE_URL = "http://localhost:3000"

const baseUrl = (process.env.API_URL || DEFAULT_BASE_URL).replace(/\/$/, "")
const timeoutMs = Number(process.env.TIMEOUT_MS || 8000)

const adminToken = process.env.ADMIN_TOKEN || process.env.ADMIN_BEARER_TOKEN

function withTimeout(signal, ms) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), ms)

  signal?.addEventListener("abort", () => controller.abort(), { once: true })

  return {
    signal: controller.signal,
    cancel: () => clearTimeout(timeout),
  }
}

async function fetchJson(path, options = {}) {
  const { signal, cancel } = withTimeout(options.signal, timeoutMs)
  try {
    const res = await fetch(`${baseUrl}${path}`, { ...options, signal })
    const text = await res.text()
    let json = null
    try {
      json = text ? JSON.parse(text) : null
    } catch (_err) {
      json = null
    }
    return { ok: res.ok, status: res.status, json, text }
  } finally {
    cancel()
  }
}

function logResult(label, result) {
  const status = result.ok ? "PASS" : "FAIL"
  console.log(`${status} ${label} (${result.status})`)
  if (!result.ok) {
    console.log(result.text || result.json || "No response body")
  }
  return result.ok
}

async function run() {
  let ok = true

  const health = await fetchJson("/health")
  ok = logResult("GET /health", health) && ok

  const appWhakatauki = await fetchJson("/api/app/whakatauki")
  ok = logResult("GET /api/app/whakatauki", appWhakatauki) && ok

  const appResources = await fetchJson("/api/app/learning-resources")
  ok = logResult("GET /api/app/learning-resources", appResources) && ok

  const appConditions = await fetchJson("/api/app/conditions")
  ok = logResult("GET /api/app/conditions", appConditions) && ok

  if (adminToken) {
    const adminMe = await fetchJson("/api/admin/auth/me", {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    ok = logResult("GET /api/admin/auth/me", adminMe) && ok

    const adminWhakatauki = await fetchJson("/api/admin/whakatauki", {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
    ok = logResult("GET /api/admin/whakatauki", adminWhakatauki) && ok
  } else {
    console.log("SKIP admin auth checks (set ADMIN_TOKEN or ADMIN_BEARER_TOKEN)")
  }

  if (!ok) {
    process.exitCode = 1
  }
}

run().catch((err) => {
  console.error("Smoke test failed:", err)
  process.exit(1)
})
