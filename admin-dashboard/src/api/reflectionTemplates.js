import { API_URL } from "./client"

export const reflectionTemplatesApi = {
  list: async () => {
    const res = await fetch(`${API_URL}/admin/reflection-templates`)
    if (!res.ok) throw new Error("Failed to fetch reflection templates")
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${API_URL}/admin/reflection-templates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create template")
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/admin/reflection-templates/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update template")
    return res.json()
  },

  remove: async (id) => {
    const res = await fetch(`${API_URL}/admin/reflection-templates/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete template")
    return res.json()
  },
}
