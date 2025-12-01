import { useState, useEffect } from "react"
import api from "../lib/api"

export function useMedicines() {
  const [medicines, setMedicines] = useState([])

  async function loadMedicines() {
    const res = await api.get("/mymedicines")
    setMedicines(res.data)
  }

  async function addMedicine(name, dosage, frequency) {
    const res = await api.post("/mymedicines", { name, dosage, frequency })
    setMedicines(prev => [...prev, res.data])
  }

  async function deleteMedicine(id) {
    await api.delete(`/mymedicines/${id}`)
    setMedicines(prev => prev.filter(m => m.id !== id))
  }

  useEffect(() => {
    loadMedicines()
  }, [])

  return { medicines, addMedicine, deleteMedicine, reload: loadMedicines }
}
