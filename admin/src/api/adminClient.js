// src/api/adminClient.js

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

const TOKEN_KEY = "kofk_admin_token"
const ADMIN_KEY = "kofk_admin"

// ------- Token + admin helpers -------
export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getStoredAdmin() {
  const raw = localStorage.getItem(ADMIN_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function setStoredAdmin(admin) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin))
}

export function clearStoredAdmin() {
  localStorage.removeItem(ADMIN_KEY)
}

// ------- Core fetch wrapper with auth -------
export async function apiFetch(path, options = {}) {
  const token = getAdminToken()

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const isJson = res.headers.get("content-type")?.includes("application/json")
  const data = isJson ? await res.json().catch(() => null) : null

  if (!res.ok) {
    const message = data?.error || data?.message || res.statusText

    if (res.status === 401) {
      const err = new Error(message || "Unauthorized")
      err.code = "UNAUTHORIZED"
      throw err
    }

    throw new Error(message || "Request failed")
  }

  return data
}

// ------- Auth-specific calls -------
export async function loginAdminApi({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.error || "Login failed")
  }

  // { token, admin }
  return data
}

export async function fetchAdminMe() {
  return apiFetch("/api/admin/me")
}

export async function fetchAdminStats() {
  return apiFetch("/api/admin/stats")
}
