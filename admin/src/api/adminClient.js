// admin/src/api/adminClient.js
import axios from "axios"

const TOKEN_KEY = "admin_token"
const ADMIN_KEY = "admin_user"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
})

// --------------------
// Token helpers
// --------------------
export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY)
  delete api.defaults.headers.common.Authorization
}

// --------------------
// Admin helpers
// --------------------
export function getStoredAdmin() {
  const raw = localStorage.getItem(ADMIN_KEY)
  return raw ? JSON.parse(raw) : null
}

export function setStoredAdmin(admin) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin))
}

export function clearStoredAdmin() {
  localStorage.removeItem(ADMIN_KEY)
}

// --------------------
// API calls
// --------------------
export async function loginAdminApi(credentials) {
  const { data } = await api.post("/api/admin/login", credentials)
  return data
}

export async function fetchAdminMe() {
  const { data } = await api.get("/api/admin/me")
  return data
}
