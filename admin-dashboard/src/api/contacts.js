import { API_URL } from "./client";

export async function fetchUserContacts() {
  const res = await fetch(`${API_URL}/contacts`);
  if (!res.ok) throw new Error("Failed to load user contacts");
  return res.json();
}
