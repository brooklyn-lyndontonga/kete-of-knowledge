import { API_URL } from "./client";

export async function fetchUserMedicines() {
  const res = await fetch(`${API_URL}/mymedicines`);
  if (!res.ok) throw new Error("Failed to load user medicines");
  return res.json();
}
