/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { api } from "../api/client"
import CrudTable from "../components/CrudTable"

export default function ContactsPage() {
  const [items, setItems] = useState([])

  async function load() {
    const res = await api.get("/contacts")
    setItems(res)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <h1>User Saved Contacts (Read-only)</h1>

      <CrudTable
        columns={["id", "name", "phone", "relationship"]}
        data={items}
        onDelete={null}
      />
    </div>
  )
}
