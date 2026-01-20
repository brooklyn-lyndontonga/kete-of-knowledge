// admin/src/api/reflectionTemplates.js
import { api } from "../../api/adminClient"


// GET all templates
export async function fetchReflectionTemplates() {
  return api.get("/admin/reflection-templates")
}

// GET one by id
export async function fetchReflectionTemplate(id) {
  return api.get(`/admin/reflection-templates/${id}`)
}

// CREATE
export async function createReflectionTemplate(payload) {
  return api.post("/admin/reflection-templates", payload)
}

// UPDATE
export async function updateReflectionTemplate(id, payload) {
  return api.put(`/admin/reflection-templates/${id}`, payload)
}

// DELETE
export async function deleteReflectionTemplate(id) {
  return api.del(`/admin/reflection-templates/${id}`)
}
