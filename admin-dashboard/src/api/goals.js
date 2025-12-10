import { API_URL } from "./client"

export const goalsApi = {
  list: async () => {
    const res = await fetch(`${API_URL}/user/goals`)
    if (!res.ok) throw new Error("Failed to fetch goals")
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${API_URL}/user/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create goal")
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/user/goals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update goal")
    return res.json()
  },

  remove: async (id) => {
    const res = await fetch(`${API_URL}/user/goals/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Failed to delete goal")
    return res.json()
  },
}
