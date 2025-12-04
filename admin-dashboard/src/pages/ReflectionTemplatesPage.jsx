/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { api } from "../api/client"
import CrudTable from "../components/CrudTable"

export default function ReflectionTemplatesPage() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState("")
  const [story, setStory] = useState("")

  async function load() {
    const res = await api.get("/admin/reflection-templates")
    setItems(res)
  }

  async function create() {
    await api.post("/admin/reflection-templates", {
      title,
      story,
    })
    setTitle("")
    setStory("")
    load()
  }

  async function remove(id) {
    await api.delete(`/admin/reflection-templates/${id}`)
    load()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <h1>Reflection Templates</h1>

      <div className="form-row">
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <textarea
          placeholder="Story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />

        <button onClick={create}>Add Template</button>
      </div>

      <CrudTable
        columns={["id", "title", "story", "created_at"]}
        data={items}
        onDelete={remove}
      />
    </div>
  )
}
