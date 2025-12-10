import { api } from "./client"

export async function getAdminStats() {
  return api.get(`/admin/stats`)
}
