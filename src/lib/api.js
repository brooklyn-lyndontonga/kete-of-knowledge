// 🚀 Use your Mac's LAN IP so iOS simulator can reach the backend
const API_URL = "http://10.1.1.200:3000"

async function get(path) {
  const res = await fetch(API_URL + path)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GET ${path} failed: ${res.status} - ${text}`)
  }
  return res.json()
}

async function post(path, body) {
  const res = await fetch(API_URL + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`POST ${path} failed: ${res.status} - ${text}`)
  }
  return res.json()
}

async function del(path) {
  const res = await fetch(API_URL + path, { method: "DELETE" })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`DELETE ${path} failed: ${res.status} - ${text}`)
  }
  return res.json()
}

export default { get, post, del }
