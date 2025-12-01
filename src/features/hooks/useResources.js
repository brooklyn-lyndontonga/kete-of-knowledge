import { useState, useEffect } from "react"
import api from "../lib/api"

export function useResources() {
  const [categories, setCategories] = useState([])
  const [resources, setResources] = useState([])

  async function loadCategories() {
    const res = await api.get("/resource-categories")
    setCategories(res.data)
  }

  async function loadResources() {
    const res = await api.get("/resources")
    setResources(res.data)
  }

  async function loadResourcesByCategory(id) {
    const res = await api.get(`/resources/category/${id}`)
    return res.data
  }

  async function getResource(id) {
    const res = await api.get(`/resources/${id}`)
    return res.data
  }

  useEffect(() => {
    loadCategories()
    loadResources()
  }, [])

  return {
    categories,
    resources,
    loadResourcesByCategory,
    getResource,
    reload: () => {
      loadCategories()
      loadResources()
    }
  }
}
