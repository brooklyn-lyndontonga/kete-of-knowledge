/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { api } from "../api/client"
import CrudTable from "../components/CrudTable"

export default function SymptomsPage() {
  const [items, setItems] = useState([])

  async function load() {
    const res = await api.get("/symptoms")
    setItems(res)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <h1>User Symptoms (Read-only)</h1>

      <CrudTable
        columns={["id", "date", "symptom", "severity", "notes"]}
        data={items}
        onDelete={null} // no delete
      />
    </div>
  )
}
