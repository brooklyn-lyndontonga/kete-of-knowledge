const DEFAULT_API_URL = "http://localhost:3000"
const API_ROOT = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(
  /\/$/,
  ""
)
const AUTH_API = `${API_ROOT}/api/admin/auth`

export async function loginAdmin(email, password) {
  const res = await fetch(`${AUTH_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || "Login failed")
  }

  return res.json()
}

export async function forgotPassword(email) {
  const res = await fetch(`${AUTH_API}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || "Request failed")
  }

  return res.json()
}

export async function resetPassword(token, password) {
  const res = await fetch(`${AUTH_API}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || "Reset failed")
  }

  return res.json()
}
