/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { api } from "../api/client"
import CrudTable from "../components/CrudTable"

export default function WhakataukiPage() {
  const [items, setItems] = useState([])
  const [text, setText] = useState("")
  const [translation, setTranslation] = useState("")

  async function load() {
    const res = await api.get("/admin/whakatauki")
    setItems(res)
  }

  async function create() {
    await api.post("/admin/whakatauki", {
      text,
      translation,
    })
    setText("")
    setTranslation("")
    load()
  }

  async function remove(id) {
    await api.delete(`/admin/whakatauki/${id}`)
    load()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <h1>Whakataukī</h1>

      <div>
        <input
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          placeholder="Translation"
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
        />
        <button onClick={create}>Add</button>
      </div>

      <CrudTable
        columns={["id", "text", "translation"]}
        data={items}
        onDelete={remove}
      />
    </div>
  )
}
