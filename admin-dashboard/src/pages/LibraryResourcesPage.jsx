/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { api } from "../api/client"
import CrudTable from "../components/CrudTable"

export default function LibraryResourcesPage() {
  const [resources, setResources] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState([])

  async function load() {
    const res = await api.get("/admin/resources")
    setResources(res)

    const cats = await api.get("/admin/resource-categories")
    setCategories(cats)
  }

  async function create() {
    await api.post("/admin/resources", {
      title,
      content,
      category_id: Number(categoryId),
    })
    setTitle("")
    setContent("")
    setCategoryId("")
    load()
  }

  async function remove(id) {
    await api.delete(`/admin/resources/${id}`)
    load()
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div>
      <h1>Library Resources</h1>

      <div className="form-row">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Choose category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button onClick={create}>Add Resource</button>
      </div>

      <CrudTable
        columns={["id", "title", "content", "category_id"]}
        data={resources}
        onDelete={remove}
      />
    </div>
  )
}
