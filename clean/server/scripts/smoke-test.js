const DEFAULT_BASE_URL = "http://localhost:3000"

const baseUrl = (process.env.API_URL || DEFAULT_BASE_URL).replace(/\/$/, "")
const timeoutMs = Number(process.env.TIMEOUT_MS || 8000)

const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

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

  if (adminEmail && adminPassword) {
    const login = await fetchJson("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: adminEmail, password: adminPassword }),
    })
    const loginOk = logResult("POST /api/admin/auth/login", login)
    ok = loginOk && ok

    if (loginOk && login.json?.token) {
      const adminWhakatauki = await fetchJson("/api/admin/whakatauki", {
        headers: { Authorization: `Bearer ${login.json.token}` },
      })
      ok = logResult("GET /api/admin/whakatauki", adminWhakatauki) && ok
    }
  } else {
    console.log("SKIP admin auth checks (set ADMIN_EMAIL and ADMIN_PASSWORD)")
  }

  if (!ok) {
    process.exitCode = 1
  }
}

run().catch((err) => {
  console.error("Smoke test failed:", err)
  process.exit(1)
})
