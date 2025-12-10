import { API_URL } from "./client"

export const profileSeedsApi = {
  list: async () => {
    const res = await fetch(`${API_URL}/admin/profile-seeds`)
    if (!res.ok) throw new Error("Failed to fetch profile seeds")
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${API_URL}/admin/profile-seeds`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create profile seed")
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/admin/profile-seeds/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update profile seed")
    return res.json()
  },

  remove: async (id) => {
    const res = await fetch(`${API_URL}/admin/profile-seeds/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete profile seed")
    return res.json()
  },
}
