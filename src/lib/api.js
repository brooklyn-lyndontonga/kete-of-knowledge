import Constants from "expo-constants"

const API_URL =
  Constants.expoConfig?.extra?.API_URL ||
  Constants.manifest?.extra?.API_URL

if (!API_URL) {
  console.error("❌ API_URL is missing from Expo config")
} else {
  console.log("🌐 API_URL =", API_URL)
}

export async function api(path, method = "GET", body) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || "API request failed")
  }

  return res.json()
}

export { API_URL }
