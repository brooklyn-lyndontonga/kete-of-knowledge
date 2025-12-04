/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { api } from "../api/client"
import CrudTable from "../components/CrudTable"

export default function ConditionsPage() {
  const [conditions, setConditions] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  async function load() {
    const res = await api.get("/admin/conditions")
    setConditions(res)
  }

  async function create() {
    await api.post("/admin/conditions", {
      name,
      description,
      triggers: "[]",
      treatments: "[]",
      images: "[]",
    })
    setName("")
    setDescription("")
    load()
  }

  async function remove(id) {
    await api.delete(`/admin/conditions/${id}`)
    load()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <h1>Conditions</h1>

      <div className="form-row">
        <input
          placeholder="Condition Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={create}>Add Condition</button>
      </div>

      <CrudTable
        columns={["id", "name", "description"]}
        data={conditions}
        onDelete={remove}
      />
    </div>
  )
}
