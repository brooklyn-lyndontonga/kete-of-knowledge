import { api } from "./client"

export const supportContactsAPI = {
  list: () => api.get("/support-contacts"),
  create: (data) => api.post("/support-contacts", data),
  update: (id, data) => api.put(`/support-contacts/${id}`, data),
  remove: (id) => api.delete(`/support-contacts/${id}`),
}
