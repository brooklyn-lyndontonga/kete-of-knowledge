import { api } from "./client"

export const resourcesAPI = {
  list: () => api.get("/resources"),
  listByCategory: (categoryId) =>
    api.get(`/resources/category/${categoryId}`),
  create: (data) => api.post("/resources", data),
  update: (id, data) => api.put(`/resources/${id}`, data),
  remove: (id) => api.delete(`/resources/${id}`),
}
