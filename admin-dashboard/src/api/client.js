import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3000",
})

export async function request(url, method = "GET", data = null) {
  const res = await api({ url, method, data })
  return res.data
}
