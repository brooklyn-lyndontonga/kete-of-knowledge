import { API_URL } from "./client"

export const resourcesApi = {
  list: async () => {
    const res = await fetch(`${API_URL}/admin/resources`)
    if (!res.ok) throw new Error("Failed to fetch resources")
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${API_URL}/admin/resources`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create resource")
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/admin/resources/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update resource")
    return res.json()
  },

  remove: async (id) => {
    const res = await fetch(`${API_URL}/admin/resources/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete resource")
    return res.json()
  },
}
