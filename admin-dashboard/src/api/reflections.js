// src/api/reflections.js
import { api } from "./client"

export function fetchReflectionTemplates() {
  return api.get("/api/admin/reflection-templates")
}

export function createReflectionTemplate(body) {
  return api.post("/api/admin/reflection-templates", body)
}

export function updateReflectionTemplate(id, body) {
  return api.put(`/api/admin/reflection-templates/${id}`, body)
}

export function deleteReflectionTemplate(id) {
  return api.delete(`/api/admin/reflection-templates/${id}`)
}
