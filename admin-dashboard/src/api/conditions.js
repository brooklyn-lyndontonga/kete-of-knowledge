import { API_URL } from "./client"

export const conditionsApi = {
  list: async () => {
    const res = await fetch(`${API_URL}/admin/conditions`)
    if (!res.ok) throw new Error("Failed to fetch conditions")
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${API_URL}/admin/conditions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create condition")
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/admin/conditions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update condition")
    return res.json()
  },

  remove: async (id) => {
    const res = await fetch(`${API_URL}/admin/conditions/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete condition")
    return res.json()
  },
}
