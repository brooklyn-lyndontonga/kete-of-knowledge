export const API_URL = "http://localhost:3000/api"

async function request(path, options = {}) {
  const url = `${API_URL}${path}`

  const config = {
    headers: { "Content-Type": "application/json" },
    ...options,
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`API Error: ${message}`)
  }

  try {
    return await response.json()
  } catch {
    return null
  }
}

export const api = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) =>
    request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
}
