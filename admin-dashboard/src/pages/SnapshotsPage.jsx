/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { api } from "../api/client"
import CrudTable from "../components/CrudTable"

export default function SnapshotsPage() {
  const [items, setItems] = useState([])
  const [label, setLabel] = useState("")
  const [percentage, setPercentage] = useState("")

  async function load() {
    const res = await api.get("/admin/snapshots")
    setItems(res)
  }

  async function create() {
    await api.post("/admin/snapshots", {
      label,
      percentage: Number(percentage),
    })
    setLabel("")
    setPercentage("")
    load()
  }

  async function remove(id) {
    await api.delete(`/admin/snapshots/${id}`)
    load()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <h1>Progress Snapshots</h1>

      <div className="form-row">
        <input placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
        <input
          placeholder="Percentage"
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />

        <button onClick={create}>Add Snapshot</button>
      </div>

      <CrudTable
        columns={["id", "label", "percentage", "created_at"]}
        data={items}
        onDelete={remove}
      />
    </div>
  )
}
