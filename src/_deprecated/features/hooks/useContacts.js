import { useState, useEffect } from "react"
import api from "../lib/api"

export function useContacts() {
  const [contacts, setContacts] = useState([])

  async function loadContacts() {
    const res = await api.get("/contacts")
    setContacts(res.data)
  }

  async function addContact(name, phone, relationship) {
    const res = await api.post("/contacts", { name, phone, relationship })
    setContacts(prev => [...prev, res.data])
  }

  async function deleteContact(id) {
    await api.delete(`/contacts/${id}`)
    setContacts(prev => prev.filter(c => c.id !== id))
  }

  useEffect(() => {
    loadContacts()
  }, [])

  return { contacts, addContact, deleteContact, reload: loadContacts }
}
