import { api } from "./client";

export function fetchUserSettings() {
  return api.get("/user/settings");
}

export function updateUserSettings(data) {
  return api.put("/user/settings", data);
}
