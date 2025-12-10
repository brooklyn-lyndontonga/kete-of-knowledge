import { API_URL } from "./client"

export const resourceCategoriesApi = {
  list: async () => {
    const res = await fetch(`${API_URL}/admin/resource-categories`)
    if (!res.ok) throw new Error("Failed to fetch resource categories")
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${API_URL}/admin/resource-categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create resource category")
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/admin/resource-categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update resource category")
    return res.json()
  },

  remove: async (id) => {
    const res = await fetch(`${API_URL}/admin/resource-categories/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete resource category")
    return res.json()
  },
}
