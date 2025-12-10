import { API_URL } from "./client"

export const snapshotsApi = {
  list: async () => {
    const res = await fetch(`${API_URL}/admin/snapshots`)
    if (!res.ok) throw new Error("Failed to fetch snapshots")
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${API_URL}/admin/snapshots`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create snapshot")
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/admin/snapshots/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update snapshot")
    return res.json()
  },

  remove: async (id) => {
    const res = await fetch(`${API_URL}/admin/snapshots/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete snapshot")
    return res.json()
  },
}
