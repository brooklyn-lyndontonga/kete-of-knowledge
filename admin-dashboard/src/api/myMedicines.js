import { API_URL } from "./client"

export const myMedicinesApi = {
  list: async () => {
    const res = await fetch(`${API_URL}/user/medicines`)
    if (!res.ok) throw new Error("Failed to fetch medicines")
    return res.json()
  },

  create: async (data) => {
    const res = await fetch(`${API_URL}/user/medicines`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to add medicine")
    return res.json()
  },

  update: async (id, data) => {
    const res = await fetch(`${API_URL}/user/medicines/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to update medicine")
    return res.json()
  },

  remove: async (id) => {
    const res = await fetch(`${API_URL}/user/medicines/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete medicine")
    return res.json()
  },
}
