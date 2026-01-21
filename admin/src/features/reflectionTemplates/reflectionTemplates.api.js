import { api } from "../../api/adminClient"

// GET all templates
export async function fetchReflectionTemplates({ signal } = {}) {
  const { data } = await api.get("/api/admin/reflection-templates", { signal })
  return data
}

// GET one
export async function fetchReflectionTemplate(id) {
  const { data } = await api.get(`/api/admin/reflection-templates/${id}`)
  return data
}

// CREATE
export async function createReflectionTemplate(payload) {
  const { data } = await api.post(
    "/api/admin/reflection-templates",
    payload
  )
  return data
}

// UPDATE
export async function updateReflectionTemplate(id, payload) {
  const { data } = await api.put(
    `/api/admin/reflection-templates/${id}`,
    payload
  )
  return data
}

// DELETE
export async function deleteReflectionTemplate(id) {
  const { data } = await api.delete(
    `/api/admin/reflection-templates/${id}`
  )
  return data
}
