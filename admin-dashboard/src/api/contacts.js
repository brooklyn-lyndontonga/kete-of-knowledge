import { API_URL } from "./client"

export const contactsApi = {
  list: async () => {
    const res = await fetch(`${API_URL}/user/contacts`)
    if (!res.ok) throw new Error("Failed to fetch contacts")
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${API_URL}/user/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create contact")
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/user/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update contact")
    return res.json()
  },

  remove: async (id) => {
    const res = await fetch(`${API_URL}/user/contacts/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete contact")
    return res.json()
  },
}
