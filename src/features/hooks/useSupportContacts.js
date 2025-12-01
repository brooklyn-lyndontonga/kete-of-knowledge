import { useState, useEffect } from "react"
import api from "../lib/api"

export function useSupportContacts() {
  const [services, setServices] = useState([])

  async function loadServices() {
    const res = await api.get("/support-contacts")
    setServices(res.data)
  }

  useEffect(() => {
    loadServices()
  }, [])

  return { services, reload: loadServices }
}
