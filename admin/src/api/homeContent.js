// src/api/homeContent.js
import { api } from "./client"

// Fetch admin stats from /api/admin/stats
export function fetchAdminStats() {
  return api.get("/admin/stats")   // MUST start with `/` so it becomes /api/admin/stats
}
