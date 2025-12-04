import { API_URL } from "./client";

export async function fetchUserSymptoms() {
  const res = await fetch(`${API_URL}/symptoms`);
  if (!res.ok) throw new Error("Failed to load symptoms");
  return res.json();
}
