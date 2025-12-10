import { API_URL } from "./client"

export const reflectionsApi = {
  list: async () => {
    const res = await fetch(`${API_URL}/user/reflections`)
    if (!res.ok) throw new Error("Failed to fetch reflections")
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${API_URL}/user/reflections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create reflection")
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/user/reflections/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update reflection")
    return res.json()
  },

  remove: async (id) => {
    const res = await fetch(`${API_URL}/user/reflections/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete reflection")
    return res.json()
  },
}
