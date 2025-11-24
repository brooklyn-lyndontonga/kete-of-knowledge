import { api } from "./client"

export const profileSeedsAPI = {
  list: () => api.get("/profile-seeds"),
  create: (data) => api.post("/profile-seeds", data),
  update: (id, data) => api.put(`/profile-seeds/${id}`, data),
  remove: (id) => api.delete(`/profile-seeds/${id}`),
}
