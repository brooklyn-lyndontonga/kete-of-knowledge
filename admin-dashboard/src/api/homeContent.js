import { api } from "./client";

export function fetchAdminStats() {
  return api.get("/admin/stats");
}
