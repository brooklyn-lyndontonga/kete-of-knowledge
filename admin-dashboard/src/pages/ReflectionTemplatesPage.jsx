/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { api } from "../api/client"
import AdminTable from "../components/AdminTable"

export default function ReflectionTemplatesPage() {
  const [templates, setTemplates] = useState([])
  const [formState, setFormState] = useState({ title: "", story: "", caption: "" })
  const [editingId, setEditingId] = useState(null)

  async function loadTemplates() {
    const data = await api.get("/admin/reflection-templates")
    setTemplates(data || [])
  }

  useEffect(() => {
    loadTemplates()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    if (editingId) {
      await api.put(`/admin/reflection-templates/${editingId}`, formState)
      setEditingId(null)
    } else {
      await api.post("/admin/reflection-templates", formState)
    }

    setFormState({ title: "", story: "", caption: "" })
    loadTemplates()
  }

  function startEdit(t) {
    setEditingId(t.id)
    setFormState({
      title: t.title,
      story: t.story,
      caption: t.caption,
    })
  }

  async function handleDelete(id) {
    await api.delete(`/admin/reflection-templates/${id}`)
    loadTemplates()
  }

  return (
    <div className="page">
      <h1>Reflection Templates</h1>

      {/* Form */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={formState.title}
          onChange={(e) => setFormState({ ...formState, title: e.target.value })}
        />
        <textarea
          placeholder="Story"
          value={formState.story}
          onChange={(e) => setFormState({ ...formState, story: e.target.value })}
        />
        <input
          placeholder="Caption"
          value={formState.caption}
          onChange={(e) => setFormState({ ...formState, caption: e.target.value })}
        />

        <button type="submit">
          {editingId ? "Update Template" : "Add Template"}
        </button>
      </form>

      {/* Table */}
      <AdminTable
        data={templates}
        fields={["title", "story", "caption"]}
        onEdit={startEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
