import { useEffect, useState } from "react"
import { useAdminToast } from "../components/AdminToastProvider"
import * as templatesApi from "./reflectionTemplates.api"

export default function ReflectionTemplatesPage() {
  const { showToast } = useAdminToast()

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
    const controller = new AbortController()

    async function loadTemplates() {
      try {
        setLoading(true)
        const data = await templatesApi.fetchReflectionTemplates({
          signal: controller.signal,
        })
        setTemplates(Array.isArray(data) ? data : [])
      } catch (err) {
        if (err.name === "AbortError") return
        showToast(err.message || "Failed to load templates", "error")
      } finally {
        setLoading(false)
      }
    }

    loadTemplates()
    return () => controller.abort()
  }, [showToast])

  function handleChange(e) {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  function resetForm() {
    setEditingId(null)
    setFormValues({ category: "", title: "", prompt: "" })
  }

  function startEdit(template) {
    setEditingId(template.id)
    setFormValues({
      category: template.category || "",
      title: template.title || "",
      prompt: template.prompt || "",
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)

    try {
      if (!formValues.category || !formValues.title || !formValues.prompt) {
        showToast("Please fill in all fields", "error")
        return
      }

      if (editingId) {
        const updated = await templatesApi.updateReflectionTemplate(
          editingId,
          formValues
        )
        setTemplates((prev) =>
          prev.map((t) => (t.id === editingId ? updated : t))
        )
        showToast("Template updated")
      } else {
        const created = await templatesApi.createReflectionTemplate(formValues)
        setTemplates((prev) => [created, ...prev])
        showToast("Template created")
      }

      resetForm()
    } catch (err) {
      showToast(err.message || "Failed to save template", "error")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this template?")) return

    try {
      await templatesApi.deleteReflectionTemplate(id)
      setTemplates((prev) => prev.filter((t) => t.id !== id))
      showToast("Template deleted")
    } catch (err) {
      showToast(err.message || "Failed to delete template", "error")
    }
  }

  return (
    <>
      <h1>Reflection Templates</h1>

      <div className="card mt-2">
        <h2>{editingId ? "Edit Template" : "Create New Template"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="category"
            placeholder="Category"
            value={formValues.category}
            onChange={handleChange}
          />

          <input
            name="title"
            placeholder="Title"
            value={formValues.title}
            onChange={handleChange}
          />

          <textarea
            name="prompt"
            rows={3}
            placeholder="Prompt"
            value={formValues.prompt}
            onChange={handleChange}
          />

          <div className="flex gap-2 mt-2">
            {editingId && (
              <button type="button" className="btn" onClick={resetForm}>
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? "Saving…" : editingId ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </div>

      <div className="card mt-2">
        <h2>Existing Templates</h2>

        {loading ? (
          <p className="text-muted">Loading…</p>
        ) : templates.length === 0 ? (
          <p className="text-muted">No templates yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Title</th>
                <th>Prompt</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {templates.map((tpl) => (
                <tr key={tpl.id}>
                  <td>{tpl.id}</td>
                  <td>{tpl.category}</td>
                  <td>{tpl.title}</td>
                  <td>{tpl.prompt}</td>
                  <td>
                    <button className="btn" onClick={() => startEdit(tpl)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(tpl.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
