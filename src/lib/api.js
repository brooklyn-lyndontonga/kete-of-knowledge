const API_URL = "http://localhost:3000"  // or your deployed URL

export async function fetchProfiles() {
  const res = await fetch(`${API_URL}/profiles`)
  return res.json()
}

export async function createProfile(profile) {
  const res = await fetch(`${API_URL}/profiles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  })
  return res.json()
}
