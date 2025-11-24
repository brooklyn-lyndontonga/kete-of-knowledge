import { api } from "./client"

export const conditionsAPI = {
  list: () => api.get("/conditions"),
  create: (data) => api.post("/conditions", data),
  update: (id, data) => api.put(`/conditions/${id}`, data),
  remove: (id) => api.delete(`/conditions/${id}`),
}
