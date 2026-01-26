/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import {
  fetchReflectionTemplates,
  createReflectionTemplate,
  updateReflectionTemplate,
  deleteReflectionTemplate,
} from "../api/content.api"

function showToast(message, type = "info") {
  console.log(`[${type}]`, message)
}

export default function ReflectionTemplatesPage() {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const [formValues, setFormValues] = useState({
    category: "",
    title: "",
    prompt: "",
  })

  useEffect(() => {
    fetchReflectionTemplates()
      .then(setTemplates)
      .finally(() => setLoading(false))
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  function resetForm() {
    setEditingId(null)
    setFormValues({ category: "", title: "", prompt: "" })
  }

  function startEdit(tpl) {
    setEditingId(tpl.id)
    setFormValues({
      category: tpl.category || "",
      title: tpl.title || "",
      prompt: tpl.prompt || "",
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingId) {
        const updated = await updateReflectionTemplate(editingId, formValues)
        setTemplates((prev) =>
          prev.map((t) => (t.id === editingId ? updated : t))
        )
        showToast("Template updated")
      } else {
        const created = await createReflectionTemplate(formValues)
        setTemplates((prev) => [created, ...prev])
        showToast("Template created")
      }
      resetForm()
    } catch (err) {
      showToast(err.message, "error")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this template?")) return
    await deleteReflectionTemplate(id)
    setTemplates((prev) => prev.filter((t) => t.id !== id))
    showToast("Template deleted")
  }

  return (
    <>
      <h1>Reflection Templates</h1>

      <form onSubmit={handleSubmit} className="card mt-2">
        <input name="category" placeholder="Category" value={formValues.category} onChange={handleChange} />
        <input name="title" placeholder="Title" value={formValues.title} onChange={handleChange} />
        <textarea name="prompt" rows={3} placeholder="Prompt" value={formValues.prompt} onChange={handleChange} />
        <button className="btn btn-primary" disabled={saving}>
          {editingId ? "Save Changes" : "Create"}
        </button>
      </form>

      <table className="admin-table mt-2">
        <thead>
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Prompt</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {templates.map((tpl) => (
            <tr key={tpl.id}>
              <td>{tpl.category}</td>
              <td>{tpl.title}</td>
              <td>{tpl.prompt}</td>
              <td>
                <button onClick={() => startEdit(tpl)}>Edit</button>
                <button onClick={() => handleDelete(tpl.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
