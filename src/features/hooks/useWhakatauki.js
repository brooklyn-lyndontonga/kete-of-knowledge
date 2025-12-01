import { useState, useEffect } from "react"
import api from "../lib/api"

export function useWhakatauki() {
  const [list, setList] = useState([])

  async function loadWhakatauki() {
    const res = await api.get("/whakatauki")
    setList(res.data)
  }

  useEffect(() => {
    loadWhakatauki()
  }, [])

  return {
    list,
    reload: loadWhakatauki
  }
}
