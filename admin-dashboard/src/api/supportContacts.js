import { API_URL } from "./client"

export const supportContactsApi = {
  list: async () => {
    const res = await fetch(`${API_URL}/admin/support`)
    if (!res.ok) throw new Error("Failed to fetch support contacts")
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${API_URL}/admin/support`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create support contact")
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/admin/support/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update support contact")
    return res.json()
  },

  remove: async (id) => {
    const res = await fetch(`${API_URL}/admin/support/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete support contact")
    return res.json()
  },
}
