/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"

export default function CrudModal({
  open,
  initial,
  fields,
  onSave,
  onClose,
  children,
}) {
  const [form, setForm] = useState({})

  // Populate form when opening or editing
  useEffect(() => {
    setForm(initial || {})
  }, [initial, open])

  if (!open) return null

  function handleChange(e) {
    const { name, value, type, files } = e.target

    // Handle file uploads
    if (type === "file") {
      setForm((prev) => ({
        ...prev,
        [name]: files[0] || null,
      }))
      return
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave(form)
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{initial ? "Edit" : "Create"}</h2>

        <form className="form-grid" onSubmit={handleSubmit}>
          {/* Standard fields */}
          {fields.map((f) => (
            <div
              key={f.name}
              className={`form-field ${
                f.type === "textarea" ? "form-field--full" : ""
              }`}
            >
              <label>{f.label}</label>

              {f.type === "textarea" ? (
                <textarea
                  name={f.name}
                  value={form[f.name] || ""}
                  onChange={handleChange}
                />
              ) : f.type === "select" ? (
                <select
                  name={f.name}
                  value={form[f.name] || ""}
                  onChange={handleChange}
                >
                  <option value="">Select…</option>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : f.type === "file" ? (
                <input
                  type="file"
                  name={f.name}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  name={f.name}
                  value={form[f.name] || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          {/* 🔹 Custom content (categories, checkboxes, helpers) */}
          {children}

          {/* Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
