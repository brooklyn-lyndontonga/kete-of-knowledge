import { api } from "./client"

export const reflectionsAPI = {
  list: () => api.get("/reflections"),
  create: (data) => api.post("/reflections", data),
  update: (id, data) => api.put(`/reflections/${id}`, data),
  remove: (id) => api.delete(`/reflections/${id}`),
}
