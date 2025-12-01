import { useState, useEffect } from "react"
import api from "../lib/api"

export function useReflections() {
  const [reflections, setReflections] = useState([])

  async function loadReflections() {
    const res = await api.get("/user-reflections")
    setReflections(res.data)
  }

  async function addReflection(title, story, caption) {
    const res = await api.post("/user-reflections", {
      title,
      story,
      caption
    })
    setReflections(prev => [...prev, res.data])
  }

  async function deleteReflection(id) {
    await api.delete(`/user-reflections/${id}`)
    setReflections(prev => prev.filter(r => r.id !== id))
  }

  useEffect(() => {
    loadReflections()
  }, [])

  return {
    reflections,
    addReflection,
    deleteReflection,
    reload: loadReflections
  }
}
