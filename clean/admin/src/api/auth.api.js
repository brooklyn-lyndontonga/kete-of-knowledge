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
