import { api } from "../../api/adminClient"

// GET all categories
export async function fetchResourceCategories({ signal } = {}) {
  const { data } = await api.get(
    "/api/admin/resource-categories",
    { signal }
  )
  return data
}

// CREATE
export async function createResourceCategory(category) {
  const { data } = await api.post(
    "/api/admin/resource-categories",
    category
  )
  return data
}

// UPDATE
export async function updateResourceCategory(id, category) {
  const { data } = await api.put(
    `/api/admin/resource-categories/${id}`,
    category
  )
  return data
}

// DELETE
export async function deleteResourceCategory(id) {
  const { data } = await api.delete(
    `/api/admin/resource-categories/${id}`
  )
  return data
}
