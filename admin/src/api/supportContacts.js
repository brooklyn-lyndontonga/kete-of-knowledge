// src/api/supportContacts.js
import { api } from "./client"

export function fetchSupportContacts() {
  return api.get("/api/admin/support")
}

export function createSupport(body) {
  return api.post("/api/admin/support", body)
}

export function updateSupport(id, body) {
  return api.put(`/api/admin/support/${id}`, body)
}

export function deleteSupport(id) {
  return api.delete(`/api/admin/support/${id}`)
}
