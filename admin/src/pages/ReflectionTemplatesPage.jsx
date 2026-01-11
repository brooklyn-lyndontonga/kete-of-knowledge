// admin/src/pages/ReflectionTemplatesPage.jsx
import React, { useEffect, useState } from "react"
import { useAdminToast } from "../components/AdminToastProvider.jsx"
import * as templatesApi from "../api/reflectionTemplates"

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

  // --------- Load data (React 18 SAFE) ----------
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
        console.error(err)
        showToast(err.message || "Failed to load templates", "error")
      } finally {
        setLoading(false)
      }
    }

    loadTemplates()

    return () => {
      controller.abort()
    }
  }, [showToast])

  // --------- Form helpers ----------
  function handleChange(e) {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  function resetForm() {
    setEditingId(null)
    setFormValues({
      category: "",
      title: "",
      prompt: "",
    })
  }

  function startEdit(template) {
    setEditingId(template.id)
    setFormValues({
      category: template.category || "",
      title: template.title || "",
      prompt: template.prompt || "",
    })
  }

  // --------- Create / Update ----------
  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)

    try {
      if (!formValues.category || !formValues.title || !formValues.prompt) {
        showToast("Please fill in all fields", "error")
        setSaving(false)
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
        showToast("Template updated", "success")
      } else {
        const created = await templatesApi.createReflectionTemplate(formValues)
        setTemplates((prev) => [created, ...prev])
        showToast("Template created", "success")
      }

      resetForm()
    } catch (err) {
      console.error(err)
      showToast(err.message || "Failed to save template", "error")
    } finally {
      setSaving(false)
    }
  }

  // --------- Delete ----------
  async function handleDelete(id) {
    if (!window.confirm("Delete this template? This cannot be undone.")) return

    try {
      await templatesApi.deleteReflectionTemplate(id)
      setTemplates((prev) => prev.filter((t) => t.id !== id))
      showToast("Template deleted", "success")
    } catch (err) {
      console.error(err)
      showToast(err.message || "Failed to delete template", "error")
    }
  }

  // --------- UI ----------
  return (
    <div className="page-container">
      <h1 className="page-title">Reflection Templates</h1>

      {/* Form */}
      <section className="card">
        <h2 className="section-title">
          {editingId ? "Edit Template" : "Create New Template"}
        </h2>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              name="category"
              type="text"
              value={formValues.category}
              onChange={handleChange}
              placeholder="e.g. daily, weekly, evening"
            />
          </div>

          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formValues.title}
              onChange={handleChange}
              placeholder="e.g. Daily Reflection"
            />
          </div>

          <div className="form-field form-field--full">
            <label htmlFor="prompt">Prompt</label>
            <textarea
              id="prompt"
              name="prompt"
              rows={3}
              value={formValues.prompt}
              onChange={handleChange}
              placeholder="What question do you want users to reflect on?"
            />
          </div>

          <div className="form-actions">
            {editingId && (
              <button
                type="button"
                className="btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

            <button type="submit" className="btn-primary" disabled={saving}>
              {saving
                ? editingId
                  ? "Saving..."
                  : "Creating..."
                : editingId
                ? "Save Changes"
                : "Create Template"}
            </button>
          </div>
        </form>
      </section>

      {/* Table */}
      <section className="card" style={{ marginTop: "1.5rem" }}>
        <h2 className="section-title">Existing Templates</h2>

        {loading ? (
          <p>Loading templates…</p>
        ) : templates.length === 0 ? (
          <p>No templates yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Title</th>
                <th>Prompt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((tpl) => (
                <tr key={tpl.id}>
                  <td>{tpl.id}</td>
                  <td>{tpl.category}</td>
                  <td>{tpl.title}</td>
                  <td className="table-cell--wrap">{tpl.prompt}</td>
                  <td>
                    <button
                      type="button"
                      className="btn-small"
                      onClick={() => startEdit(tpl)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-small btn-danger"
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
      </section>
    </div>
  )
}
