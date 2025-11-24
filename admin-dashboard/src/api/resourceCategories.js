import { api } from "./client"

export const resourceCategoriesAPI = {
  list: () => api.get("/resource-categories"),
  create: (data) => api.post("/resource-categories", data),
  update: (id, data) => api.put(`/resource-categories/${id}`, data),
  remove: (id) => api.delete(`/resource-categories/${id}`),
}
