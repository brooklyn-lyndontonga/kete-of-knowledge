const BASE_URL = "http://YOUR-SERVER-IP:3000/api"

export async function apiGet(path) {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error("Network error")
  return res.json()
}
