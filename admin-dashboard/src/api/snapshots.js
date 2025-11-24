import { api } from "./client"

export const snapshotsAPI = {
  list: () => api.get("/snapshots"),
  update: (id, data) => api.put(`/snapshots/${id}`, data),
}
