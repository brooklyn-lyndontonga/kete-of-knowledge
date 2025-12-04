/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { api } from "../api/client"
import CrudTable from "../components/CrudTable"

export default function MyMedicinesPage() {
  const [items, setItems] = useState([])

  async function load() {
    const res = await api.get("/mymedicines")
    setItems(res)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <h1>User Medicines (Read-only)</h1>

      <CrudTable
        columns={["id", "name", "dosage", "frequency"]}
        data={items}
        onDelete={null}
      />
    </div>
  )
}
