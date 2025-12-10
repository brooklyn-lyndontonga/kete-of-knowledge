import { api } from "./client";

export function fetchSettings() {
  return api.get("/admin/settings");
}

export function updateSettings(data) {
  return api.put("/admin/settings", data);
}
