import { API_URL } from "./client"

export const symptomsApi = {
  list: async () => {
    const res = await fetch(`${API_URL}/user/symptoms`)
    if (!res.ok) throw new Error("Failed to fetch symptoms")
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${API_URL}/user/symptoms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create symptom record")
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/user/symptoms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update symptom")
    return res.json()
  },

  remove: async (id) => {
    const res = await fetch(`${API_URL}/user/symptoms/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete symptom record")
    return res.json()
  },
}
