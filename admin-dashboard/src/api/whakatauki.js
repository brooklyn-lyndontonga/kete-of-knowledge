// admin-dashboard/src/api/whakatauki.js
import { API_URL } from "./config"

export const whakataukiAPI = {
  async list() {
    const res = await fetch(`${API_URL}/whakatauki`)
    if (!res.ok) throw new Error("Failed to load whakataukī")
    return res.json()
  },

  async create(data) {
    const res = await fetch(`${API_URL}/whakatauki`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create item")
    return res.json()
  },

  async update(id, data) {
    const res = await fetch(`${API_URL}/whakatauki/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update item")
    return res.json()
  },

  async remove(id) {
    const res = await fetch(`${API_URL}/whakatauki/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete item")
    return true
  },
}
